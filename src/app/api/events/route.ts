import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/events/all
 * Returns all events (including access codes) - for officers only
 */
export async function GET(req: Request) {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json(events);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch events" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/events
 * Create a new event
 */
export async function POST(req: Request) {
  try {
    const { title, description, date, location, accessCode } = await req.json();

    if (!title || !date || !accessCode) {
      return NextResponse.json(
        { error: "title, date, and accessCode are required" },
        { status: 400 }
      );
    }

    const event = await prisma.event.create({
      data: {
        title,
        description: description || null,
        date: new Date(date),
        location: location || null,
        accessCode,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Access code already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: error.message || "Failed to create event" },
      { status: 500 }
    );
  }
}
