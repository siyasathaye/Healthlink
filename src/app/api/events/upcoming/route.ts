import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

/**
 * GET /api/events/upcoming
 * Returns all upcoming events (ordered by date)
 * Does NOT include access codes (for security)
 */
export async function GET(req: Request) {
  try {
    const nowIso = new Date().toISOString();

    const { data, error } = await supabaseAdmin
      .from("events")
      .select("id, title, checkin_code, checkin_opens_at, checkin_closes_at, created_at")
      .gte("checkin_closes_at", nowIso)
      .order("checkin_opens_at", { ascending: true });

    if (error) {
      throw error;
    }

    const normalized =
      data?.map((event: any) => ({
        id: event.id,
        title: event.title,
        description: null,
        date: event.checkin_opens_at,
        checkinOpensAt: event.checkin_opens_at,
        checkinClosesAt: event.checkin_closes_at,
        checkinCode: event.checkin_code,
        location: null,
        createdAt: event.created_at ?? null,
      })) ?? [];

    return NextResponse.json(normalized);
  } catch (error: any) {
    console.error("Upcoming events fetch failed:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch events" },
      { status: 500 }
    );
  }
}
