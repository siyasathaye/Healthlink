import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

/**
 * GET /api/events/all
 * Returns all events ordered by check-in open time ascending
 */
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("events")
      .select(
        "id, title, description, location, checkin_code, checkin_opens_at, checkin_closes_at"
      )
      .order("checkin_opens_at", { ascending: true });

    if (error) throw error;

    const normalized =
      data?.map((event: any) => ({
        id: event.id,
        title: event.title,
        description: event.description,
        location: event.location,
        checkinCode: event.checkin_code,
        checkinOpensAt: event.checkin_opens_at,
        checkinClosesAt: event.checkin_closes_at,
      })) ?? [];

    return NextResponse.json(normalized);
  } catch (error: any) {
    console.error("All events fetch failed:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch events" },
      { status: 500 },
    );
  }
}
