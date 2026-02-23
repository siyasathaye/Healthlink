"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Event = {
  id: string;
  title: string;
  checkinCode: string | null;
  checkinOpensAt: string | null;
  checkinClosesAt: string | null;
  createdAt: string | null;
};

export default function EventsPage() {
  const [eventToShow, setEventToShow] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [showCodeEntry, setShowCodeEntry] = useState(false);
  const [code, setCode] = useState("");
  const [checkinStatus, setCheckinStatus] = useState<{
    loading: boolean;
    error: string | null;
    success: string | null;
  }>({
    loading: false,
    error: null,
    success: null,
  });
  const router = useRouter();

  // Check authentication and fetch events
  useEffect(() => {
    const initPage = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          router.push("/login");
          return;
        }

        setUser(session.user);

        const res = await fetch("/api/events/upcoming");
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = (await res.json()) as any[];

        const now = Date.now();
        const parsed = data.map((evt) => {
          const opensTs = evt.checkinOpensAt ? new Date(evt.checkinOpensAt).getTime() : null;
          const closesTs = evt.checkinClosesAt ? new Date(evt.checkinClosesAt).getTime() : null;
          return { ...evt, opensTs, closesTs };
        });

        const openEvent = parsed
          .filter((evt) => evt.opensTs !== null && evt.closesTs !== null && evt.opensTs <= now && evt.closesTs >= now)
          .sort((a, b) => (b.opensTs ?? 0) - (a.opensTs ?? 0))[0];

        const nextEvent = parsed
          .filter((evt) => evt.opensTs !== null && evt.opensTs >= now)
          .sort((a, b) => (a.opensTs ?? 0) - (b.opensTs ?? 0))[0];

        const selected = openEvent ?? nextEvent ?? null;

        setEventToShow(
          selected
            ? {
                id: selected.id,
                title: selected.title,
                checkinCode: selected.checkinCode ?? null,
                checkinOpensAt: selected.checkinOpensAt ?? null,
                checkinClosesAt: selected.checkinClosesAt ?? null,
                createdAt: selected.createdAt ?? null,
              }
            : null
        );

        setError(null);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    initPage();
  }, [router]);

  const formattedTimes = useMemo(() => {
    if (!eventToShow) return { opens: "", closes: "" };
    const fmt = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
    return {
      opens: eventToShow.checkinOpensAt ? fmt.format(new Date(eventToShow.checkinOpensAt)) : "TBD",
      closes: eventToShow.checkinClosesAt ? fmt.format(new Date(eventToShow.checkinClosesAt)) : "TBD",
    };
  }, [eventToShow]);

  const handleCheckIn = async () => {
    if (!eventToShow) return;
    setCheckinStatus({ loading: true, error: null, success: null });

    const trimmed = code.trim();
    if (!trimmed) {
      setCheckinStatus({ loading: false, error: "Enter the code.", success: null });
      return;
    }

    const { data: authData } = await supabase.auth.getUser();
    const currentUser = authData?.user;
    if (!currentUser) {
      setCheckinStatus({ loading: false, error: "Please log in.", success: null });
      return;
    }

    const now = Date.now();
    const opens = eventToShow.checkinOpensAt ? new Date(eventToShow.checkinOpensAt).getTime() : null;
    const closes = eventToShow.checkinClosesAt ? new Date(eventToShow.checkinClosesAt).getTime() : null;
    if (opens && now < opens) {
      setCheckinStatus({ loading: false, error: "Check-in is not open yet.", success: null });
      return;
    }
    if (closes && now > closes) {
      setCheckinStatus({ loading: false, error: "Check-in is closed.", success: null });
      return;
    }

    if (!eventToShow.checkinCode) {
      setCheckinStatus({ loading: false, error: "No access code set for this event.", success: null });
      return;
    }

    if (trimmed !== eventToShow.checkinCode) {
      setCheckinStatus({ loading: false, error: "Incorrect code.", success: null });
      return;
    }

    const { error: insertError } = await supabase.from("checkins").insert({
      event_id: eventToShow.id,
      user_id: currentUser.id,
    });

    if (insertError) {
      if (insertError.code === "23505") {
        setCheckinStatus({ loading: false, error: "You already checked in.", success: null });
      } else if (insertError.code === "42501") {
        setCheckinStatus({ loading: false, error: "Check-in is closed.", success: null });
      } else {
        setCheckinStatus({ loading: false, error: insertError.message || "Check-in failed.", success: null });
      }
      return;
    }

    setCheckinStatus({ loading: false, error: null, success: "✅ Checked in!" });
    setCode("");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#071225] via-[#0a1b35] to-[#102647] text-white flex items-center justify-center px-6">
        <p className="text-lg">Loading events...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#071225] via-[#0a1b35] to-[#102647] text-white px-6 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold">Upcoming Check-in</h1>
            <p className="text-neutral-300 mt-2">Open event first, otherwise the next one.</p>
          </div>
          <Link
            href="/member"
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 font-semibold text-white transition"
          >
            Back
          </Link>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 mb-6">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {!eventToShow ? (
          <div className="bg-white/5 border border-blue-500/30 rounded-2xl p-10 text-center">
            <p className="text-neutral-300 text-lg">No upcoming check-ins right now.</p>
          </div>
        ) : (
          <div className="bg-white/5 border border-blue-500/30 rounded-2xl shadow-lg p-6 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-blue-200">Event</p>
                <h2 className="text-2xl font-bold text-white mt-1">{eventToShow.title}</h2>
              </div>
              <span className="text-xs text-neutral-400">
                {eventToShow.createdAt
                  ? `Created ${new Date(eventToShow.createdAt).toLocaleDateString()}`
                  : ""}
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-blue-200">Check-in opens</p>
                <p className="text-lg font-semibold text-white mt-1">{formattedTimes.opens}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-blue-200">Check-in closes</p>
                <p className="text-lg font-semibold text-white mt-1">{formattedTimes.closes}</p>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  setShowCodeEntry((prev) => !prev);
                  setCheckinStatus({ loading: false, error: null, success: null });
                }}
                className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3 font-semibold text-white shadow-lg shadow-blue-900/40 hover:shadow-xl hover:shadow-blue-900/60 hover:scale-[1.01] transition"
              >
                Access Code
              </button>

              {showCodeEntry && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                  <input
                    type="text"
                    placeholder="Enter Check-in Code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleCheckIn();
                      }
                    }}
                  />
                  <button
                    onClick={handleCheckIn}
                    disabled={checkinStatus.loading}
                    className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 font-semibold text-white shadow-lg shadow-blue-900/40 hover:shadow-xl hover:shadow-blue-900/60 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    {checkinStatus.loading ? "Checking in..." : "Check In"}
                  </button>
                  {checkinStatus.error && (
                    <p className="text-xs text-red-400 text-center">{checkinStatus.error}</p>
                  )}
                  {checkinStatus.success && (
                    <p className="text-xs text-green-300 text-center">{checkinStatus.success}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
