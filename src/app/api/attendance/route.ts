import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * POST /api/attendance
 * Body: { userId: string, eventId: string }
 * Records a member's attendance at an event.
 */
export async function POST(req: Request) {
  try {
    const { userId, eventId } = await req.json();

    if (!userId || !eventId) {
      return NextResponse.json(
        { error: "userId and eventId are required" },
        { status: 400 }
      );
    }

    const attendance = await prisma.attendance.create({
      data: {
        userId,
        eventId,
      },
      include: {
        user: true,
        event: true,
      },
    });

    return NextResponse.json(attendance, { status: 201 });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Member already marked as attended for this event" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: error.message || "Failed to record attendance" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/attendance?userId=xxx
 * Get attendance records for a user.
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId query parameter is required" },
        { status: 400 }
      );
    }

    const attendance = await prisma.attendance.findMany({
      where: { userId },
      include: { event: true },
    });

    return NextResponse.json(attendance);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch attendance" },
      { status: 500 }
    );
  }
}
