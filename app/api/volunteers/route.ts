import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/volunteers - List all volunteers
export async function GET() {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const volunteers = await prisma.volunteer.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        registrations: {
          include: {
            event: {
              select: {
                id: true,
                title: true,
                startDate: true,
                endDate: true,
              },
            },
          },
        },
        hours: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(volunteers);
  } catch (error) {
    console.error("Error fetching volunteers:", error);
    return NextResponse.json(
      { error: "Failed to fetch volunteers" },
      { status: 500 }
    );
  }
}

// POST /api/volunteers - Create a volunteer profile
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
    const {
      userId,
      phone,
      address,
      city,
      state,
      zipCode,
      skills,
      interests,
      availability,
      bio,
      emergencyContact,
      emergencyPhone,
    } = body;

    // Check if volunteer profile already exists
    const existingVolunteer = await prisma.volunteer.findUnique({
      where: { userId },
    });

    if (existingVolunteer) {
      return NextResponse.json(
        { error: "Volunteer profile already exists for this user" },
        { status: 400 }
      );
    }

    const volunteer = await prisma.volunteer.create({
      data: {
        userId,
        phone,
        address,
        city,
        state,
        zipCode,
        skills: skills || [],
        interests: interests || [],
        availability: availability || [],
        bio,
        emergencyContact,
        emergencyPhone,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    return NextResponse.json(volunteer, { status: 201 });
  } catch (error) {
    console.error("Error creating volunteer:", error);
    return NextResponse.json(
      { error: "Failed to create volunteer profile" },
      { status: 500 }
    );
  }
}
