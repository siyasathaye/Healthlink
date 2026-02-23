"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { Session } from "@supabase/supabase-js";
import Link from "next/link";

type Event = {
  id: string;
  title: string;
  date: string;
  location?: string | null;
  accessCode?: string | null;
};

export default function CheckInPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [activeEvent, setActiveEvent] = useState<Event | null>(null);
  const [eventLoading, setEventLoading] = useState(false);
  const [eventError, setEventError] = useState<string | null>(null);

  const [code, setCode] = useState("");
  const [checkinLoading, setCheckinLoading] = useState(false);
  const [checkinError, setCheckinError] = useState<string | null>(null);
  const [checkinSuccess, setCheckinSuccess] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
      setAuthLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!session) {
      setActiveEvent(null);
      return;
    }

    const fetchEvent = async () => {
      setEventLoading(true);
      setEventError(null);

      try {
        const res = await fetch("/api/events/upcoming");
        if (!res.ok) throw new Error("Failed to load event");
        const events = (await res.json()) as any[];

        if (!events || events.length === 0) {
          setActiveEvent(null);
        } else {
          const evt = events[0];
          setActiveEvent({
            id: evt.id,
            title: evt.title || "Event",
            date: evt.checkinOpensAt || evt.date || evt.createdAt,
            location: evt.location ?? null,
            accessCode: evt.checkinCode ?? null,
          });
        }
      } catch (err) {
        setEventError((err as Error).message);
        setActiveEvent(null);
      }

      setEventLoading(false);
    };

    fetchEvent();
  }, [session]);

  const handleSendLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setAuthError(null);
    setSent(false);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/checkin`,
      },
    });

    if (error) {
      setAuthError(error.message);
    } else {
      setSent(true);
    }

    setSending(false);
  };

  const handleCheckIn = async () => {
    if (!session || !activeEvent) return;
    setCheckinLoading(true);
    setCheckinError(null);
    setCheckinSuccess(null);

    const trimmedCode = code.trim();
    if (!trimmedCode) {
      setCheckinError("Please enter the access code.");
      setCheckinLoading(false);
      return;
    }

    if (activeEvent.accessCode !== trimmedCode) {
      setCheckinError("Incorrect code. Please try again.");
      setCheckinLoading(false);
      return;
    }

    const { error } = await supabase.from("checkins").insert({
      event_id: activeEvent.id,
      user_id: session.user.id,
    });

    if (error) {
      setCheckinError(error.message);
    } else {
      setCheckinSuccess("You're checked in! See you at the event.");
      setCode("");
    }

    setCheckinLoading(false);
  };

  if (authLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#071225] via-[#0a1b35] to-[#102647] text-white flex items-center justify-center px-6">
        <p className="text-lg">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#071225] via-[#0a1b35] to-[#102647] text-white flex items-center justify-center px-6">
      <section className="w-full max-w-md bg-white/5 border border-blue-500/30 rounded-3xl shadow-2xl shadow-blue-900/40 p-8 space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block mb-2">
            <h1 className="text-3xl font-extrabold text-white hover:text-blue-300 transition">
              HealthLink Check-In
            </h1>
          </Link>
          <p className="text-xs uppercase tracking-[0.3em] text-blue-300">Event Access</p>
        </div>

        {!session ? (
          <form onSubmit={handleSendLink} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm text-neutral-300">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@ucsd.edu"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              />
            </div>

            {authError && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3">
                <p className="text-sm text-red-400">{authError}</p>
              </div>
            )}

            {sent && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3">
                <p className="text-sm text-green-300">✓ Check your email for a sign-in link.</p>
              </div>
            )}

            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3 font-semibold text-white shadow-lg shadow-blue-900/40 hover:shadow-xl hover:shadow-blue-900/60 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {sending ? "Sending..." : "Send Magic Link"}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            {eventLoading ? (
              <p className="text-neutral-300 text-center">Loading event...</p>
            ) : eventError ? (
              <p className="text-red-400 text-center">{eventError}</p>
            ) : !activeEvent ? (
              <p className="text-neutral-300 text-center">
                No active events right now. Please check back later.
              </p>
            ) : (
              <>
                <div className="bg-white/5 border border-blue-500/30 rounded-2xl p-4 space-y-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-blue-200">Active Event</p>
                  <h2 className="text-2xl font-bold text-white">{activeEvent.title}</h2>
                  <p className="text-sm text-neutral-200">
                    {new Date(activeEvent.date).toLocaleString()}
                  </p>
                  {activeEvent.location && (
                    <p className="text-sm text-neutral-300">{activeEvent.location}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-neutral-300">Enter Access Code</label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Event access code"
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                  />
                  <button
                    onClick={handleCheckIn}
                    disabled={checkinLoading}
                    className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3 font-semibold text-white shadow-lg shadow-blue-900/40 hover:shadow-xl hover:shadow-blue-900/60 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    {checkinLoading ? "Checking in..." : "Check In"}
                  </button>
                  {checkinError && (
                    <p className="text-xs text-red-400 text-center">{checkinError}</p>
                  )}
                  {checkinSuccess && (
                    <p className="text-xs text-green-300 text-center">{checkinSuccess}</p>
                  )}
                </div>

                <button
                  onClick={() => supabase.auth.signOut()}
                  className="w-full rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-3 font-semibold text-white transition"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
