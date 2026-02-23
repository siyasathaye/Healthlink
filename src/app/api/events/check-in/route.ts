import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabaseClient";

/**
 * POST /api/events/check-in
 * Body: { eventId: string, accessCode: string }
 * Records attendance when member enters correct access code
 */
export async function POST(req: Request) {
  try {
    const { eventId, accessCode } = await req.json();

    if (!eventId || !accessCode) {
      return NextResponse.json(
        { error: "eventId and accessCode are required" },
        { status: 400 }
      );
    }

    // Get the event and verify access code
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    if (event.accessCode !== accessCode) {
      return NextResponse.json(
        { error: "Invalid access code" },
        { status: 401 }
      );
    }

    // Get user from Supabase
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Check if user exists in our database, if not create them
    let user = await prisma.user.findUnique({
      where: { email: session.user.email! },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: session.user.email!,
          name: session.user.user_metadata?.full_name || session.user.email,
          role: "MEMBER",
        },
      });
    }

    // Check if already attended
    const existingAttendance = await prisma.attendance.findUnique({
      where: {
        userId_eventId: {
          userId: user.id,
          eventId,
        },
      },
    });

    if (existingAttendance) {
      return NextResponse.json(
        { error: "You've already checked in to this event" },
        { status: 409 }
      );
    }

    // Record attendance
    const attendance = await prisma.attendance.create({
      data: {
        userId: user.id,
        eventId,
      },
      include: {
        event: true,
      },
    });

    return NextResponse.json(
      {
        message: "Check-in successful!",
        attendance,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Check-in error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to check in" },
      { status: 500 }
    );
  }
}
