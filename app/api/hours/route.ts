import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/hours - List volunteer hours
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
    const volunteerId = searchParams.get("volunteerId");
    const verified = searchParams.get("verified");

    const where: any = {};
    if (volunteerId) where.volunteerId = volunteerId;
    if (verified !== null) where.verified = verified === "true";

    const hours = await prisma.volunteerHours.findMany({
      where,
      include: {
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
        date: "desc",
      },
    });

    return NextResponse.json(hours);
  } catch (error) {
    console.error("Error fetching volunteer hours:", error);
    return NextResponse.json(
      { error: "Failed to fetch volunteer hours" },
      { status: 500 }
    );
  }
}

// POST /api/hours - Log volunteer hours
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
    const { volunteerId, date, hours: hoursAmount, description } = body;

    if (!volunteerId || !date || !hoursAmount || !description) {
      return NextResponse.json(
        { error: "Missing required fields: volunteerId, date, hours, description" },
        { status: 400 }
      );
    }

    if (hoursAmount <= 0) {
      return NextResponse.json(
        { error: "Hours must be greater than 0" },
        { status: 400 }
      );
    }

    const volunteerHours = await prisma.volunteerHours.create({
      data: {
        volunteerId,
        date: new Date(date),
        hours: hoursAmount,
        description,
        verified: false,
      },
      include: {
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

    return NextResponse.json(volunteerHours, { status: 201 });
  } catch (error) {
    console.error("Error logging volunteer hours:", error);
    return NextResponse.json(
      { error: "Failed to log volunteer hours" },
      { status: 500 }
    );
  }
}
