"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { Session } from "@supabase/supabase-js";
import Link from "next/link";

export default function LoginPagex() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [isMember, setIsMember] = useState(false);

  const events = useMemo(
    () => [
      {
        title: "Speaker Series: Ronald Swanson",
        date: "2026-01-22",
        time: "6:00 – 7:30 PM",
        location: "Design & Innovation Building, UCSD",
      },
      {
        title: "Speaker Series Workshop: Emily Chen",
        date: "2026-01-29",
        time: "6:00 – 7:30 PM",
        location: "ECI Lifescience Consulting (Hybrid)",
      },
      {
        title: "Speaker Series: Gregory Peters",
        date: "2026-02-05",
        time: "6:00 – 7:30 PM",
        location: "Design & Innovation Building, UCSD",
      },
    ],
    [],
  );

  const upcomingEvent = useMemo(() => {
    const now = new Date();
    const sorted = [...events].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
    return sorted.find((e) => new Date(e.date) >= now) ?? sorted[0];
  }, [events]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function verifyMembership() {
      if (!session?.user?.email) {
        setIsMember(false);
        return;
      }

      try {
        const res = await fetch("/api/members/status");
        if (!res.ok) throw new Error("Failed to verify membership");

        const members: { email: string }[] = await res.json();
        const email = session.user.email.toLowerCase();
        const memberFound = members.some((m) => m.email?.toLowerCase() === email);

        if (!cancelled) {
          setIsMember(memberFound);
        }
      } catch {
        if (!cancelled) {
          setIsMember(false);
        }
      }
    }

    verifyMembership();

    return () => {
      cancelled = true;
    };
  }, [session]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: `${window.location.origin}/checkin`,
        },
      });

      if (error) {
        setError(error.message);
      } else {
        setSent(true);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#071225] via-[#0a1b35] to-[#102647] text-white flex items-center justify-center px-6">
      <section className="w-full max-w-md bg-white/5 border border-blue-500/30 rounded-3xl shadow-2xl shadow-blue-900/40 p-8 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block mb-2">
            <h1 className="text-3xl font-extrabold text-white hover:text-blue-300 transition">
              HealthLink
            </h1>
          </Link>
          <p className="text-xs uppercase tracking-[0.3em] text-blue-300">
            Member Access
          </p>
          <p className="text-neutral-300 text-sm pt-2">
            Sign in with your email
          </p>
        </div>

        {sent ? (
          // Success State
          <div className="space-y-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-4">
              <p className="text-sm text-green-300">
                ✓ Check your email for a sign-in link!
              </p>
            </div>
            <p className="text-sm text-neutral-400 text-center">
              We&apos;ve sent a link to <span className="font-semibold text-blue-300">{email}</span>
            </p>
            <p className="text-xs text-neutral-500 text-center">
              Didn&apos;t receive it? Check your spam folder or try again.
            </p>
            <button
              onClick={() => {
                setSent(false);
                setEmail("");
                setFullName("");
              }}
              className="w-full mt-4 px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white transition"
            >
              Try with a different email
            </button>
          </div>
        ) : (
          // Login Form
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm text-neutral-300">Full Name</label>
              <p className="text-xs text-neutral-500">(Required for new members)</p>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              />
            </div>

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

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3 font-semibold text-white shadow-lg shadow-blue-900/40 hover:shadow-xl hover:shadow-blue-900/60 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition"
            >
              {loading ? "Sending..." : "Send Link"}
            </button>

            <p className="text-center text-xs text-neutral-500 pt-2">
              You&apos;ll receive an email with a secure sign-in link.
            </p>
          </form>
        )}

        {session && isMember && upcomingEvent && (
          <div className="border-t border-white/10 pt-6">
            <div className="bg-white/5 border border-blue-500/30 rounded-2xl p-4 shadow-lg shadow-blue-900/30 space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] text-blue-200">
                Upcoming Event
              </p>
              <h2 className="text-2xl font-bold text-white">{upcomingEvent.title}</h2>
              <p className="text-sm text-neutral-200">
                {new Intl.DateTimeFormat("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }).format(new Date(upcomingEvent.date))}{" "}
                • {upcomingEvent.time}
              </p>
              <p className="text-sm text-neutral-300">{upcomingEvent.location}</p>
              <button className="mt-3 w-full rounded-xl bg-blue-500 px-4 py-2 font-semibold text-white shadow-blue-900/40 shadow-lg hover:scale-[1.01] transition">
                Check in
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-white/5 pt-6 text-center">
          <p className="text-xs text-neutral-500">
            <Link href="/" className="text-blue-300 hover:text-blue-200 transition">
              Back to HealthLink
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
