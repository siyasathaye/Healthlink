import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

/**
 * POST /api/events/check-in-kiosk
 * Body: { eventId: string, accessCode: string, email: string, name?: string }
 * Pure Supabase version: validates access code against Supabase events table
 * and records attendance in a Supabase table (attendances).
 */
export async function POST(req: Request) {
  try {
    const { eventId, accessCode, email, name } = await req.json();

    if (!eventId || !accessCode || !email) {
      return NextResponse.json(
        { error: "eventId, accessCode, and email are required" },
        { status: 400 },
      );
    }

    // Verify event and code
    const { data: event, error: eventError } = await supabaseAdmin
      .from("events")
      .select("id, checkin_code")
      .eq("id", eventId)
      .single();

    if (eventError || !event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    if (event.checkin_code !== accessCode) {
      return NextResponse.json({ error: "Invalid access code" }, { status: 401 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Insert attendance into Supabase table
    const { error: insertError } = await supabaseAdmin.from("attendances").insert({
      event_id: eventId,
      email: normalizedEmail,
      name: name?.trim() || null,
    });

    if (insertError) {
      if (insertError.code === "23505") {
        return NextResponse.json(
          { error: "You already checked in for this event" },
          { status: 409 },
        );
      }
      return NextResponse.json(
        { error: insertError.message || "Failed to check in" },
        { status: 500 },
      );
    }

    return NextResponse.json({ message: "Check-in successful" }, { status: 201 });
  } catch (error: any) {
    console.error("Kiosk check-in error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to check in" },
      { status: 500 },
    );
  }
}
