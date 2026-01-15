import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/registrations - List all registrations
export async function GET(req: Request) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get("eventId");
    const volunteerId = searchParams.get("volunteerId");
    const status = searchParams.get("status");

    const where: any = {};
    if (eventId) where.eventId = eventId;
    if (volunteerId) where.volunteerId = volunteerId;
    if (status) where.status = status;

    const registrations = await prisma.eventRegistration.findMany({
      where,
      include: {
        event: {
          include: {
            organizer: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        volunteer: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(registrations);
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return NextResponse.json(
      { error: "Failed to fetch registrations" },
      { status: 500 }
    );
  }
}

// POST /api/registrations - Create a new registration
export async function POST(req: Request) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { eventId, volunteerId, notes } = body;

    if (!eventId || !volunteerId) {
      return NextResponse.json(
        { error: "Missing required fields: eventId, volunteerId" },
        { status: 400 }
      );
    }

    // Check if event exists and has capacity
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        registrations: true,
      },
    });

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    // Check capacity
    const confirmedRegistrations = event.registrations.filter(
      (r) => r.status === "CONFIRMED" || r.status === "PENDING"
    ).length;

    if (confirmedRegistrations >= event.capacity) {
      return NextResponse.json(
        { error: "Event is at full capacity" },
        { status: 400 }
      );
    }

    // Check for existing registration
    const existingRegistration = await prisma.eventRegistration.findUnique({
      where: {
        eventId_volunteerId: {
          eventId,
          volunteerId,
        },
      },
    });

    if (existingRegistration) {
      return NextResponse.json(
        { error: "Volunteer is already registered for this event" },
        { status: 400 }
      );
    }

    const registration = await prisma.eventRegistration.create({
      data: {
        eventId,
        volunteerId,
        notes,
        status: "PENDING",
      },
      include: {
        event: true,
        volunteer: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(registration, { status: 201 });
  } catch (error) {
    console.error("Error creating registration:", error);
    return NextResponse.json(
      { error: "Failed to create registration" },
      { status: 500 }
    );
  }
}
