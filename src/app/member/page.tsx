"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function MemberPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          // Not authenticated, redirect to login
          router.push("/login");
          return;
        }

        setUser(session.user);
        setError(null);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#071225] via-[#0a1b35] to-[#102647] text-white flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-lg">Loading...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#071225] via-[#0a1b35] to-[#102647] text-white flex items-center justify-center px-6">
        <section className="w-full max-w-md bg-white/5 border border-red-500/30 rounded-3xl shadow-2xl shadow-red-900/40 p-8 text-center space-y-4">
          <p className="text-red-400">Error: {error}</p>
          <Link
            href="/login"
            className="inline-block px-4 py-2 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
          >
            Back to Login
          </Link>
        </section>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#071225] via-[#0a1b35] to-[#102647] text-white flex items-center justify-center px-6">
        <section className="w-full max-w-md bg-white/5 border border-blue-500/30 rounded-3xl shadow-2xl shadow-blue-900/40 p-8 text-center space-y-4">
          <p className="text-neutral-300">Not authenticated.</p>
          <Link
            href="/login"
            className="inline-block px-4 py-2 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
          >
            Go to Login
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#071225] via-[#0a1b35] to-[#102647] text-white flex items-center justify-center px-6">
      <section className="w-full max-w-md bg-white/5 border border-blue-500/30 rounded-3xl shadow-2xl shadow-blue-900/40 p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold">Welcome!</h1>
          <p className="text-blue-300 text-sm">You're signed in to HealthLink</p>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4 space-y-3">
          <p className="text-sm text-neutral-300">
            <span className="text-blue-300 font-semibold">Email:</span> {user.email}
          </p>
          {user.user_metadata?.full_name && (
            <p className="text-sm text-neutral-300">
              <span className="text-blue-300 font-semibold">Name:</span>{" "}
              {user.user_metadata.full_name}
            </p>
          )}
          <p className="text-xs text-neutral-500">
            <span className="text-blue-300 font-semibold">ID:</span> {user.id}
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-neutral-400 text-center">
            Your account has been created. You can now view events and track your attendance.
          </p>
          <p className="text-xs text-neutral-500 text-center">
            Member portal features coming soon! For now, officers can view your attendance on the officer dashboard.
          </p>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col gap-3">
          <Link
            href="/events/upcoming"
            className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3 font-semibold text-white text-center shadow-lg shadow-blue-900/40 hover:shadow-xl hover:shadow-blue-900/60 transition"
          >
            View Upcoming Events
          </Link>
          <div className="flex gap-2">
            <Link
              href="/"
              className="flex-1 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-3 font-semibold text-white text-center transition"
            >
              Home
            </Link>
            <button
              onClick={() => supabase.auth.signOut()}
              className="flex-1 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-3 font-semibold text-white transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
