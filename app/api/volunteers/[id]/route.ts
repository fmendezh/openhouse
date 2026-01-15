import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/volunteers/:id - Get a specific volunteer
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    const { id } = await params;
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const volunteer = await prisma.volunteer.findUnique({
      where: { id },
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
            event: true,
          },
        },
        hours: {
          orderBy: {
            date: "desc",
          },
        },
      },
    });

    if (!volunteer) {
      return NextResponse.json(
        { error: "Volunteer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(volunteer);
  } catch (error) {
    console.error("Error fetching volunteer:", error);
    return NextResponse.json(
      { error: "Failed to fetch volunteer" },
      { status: 500 }
    );
  }
}

// PUT /api/volunteers/:id - Update a volunteer profile
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    const { id } = await params;
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
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

    const volunteer = await prisma.volunteer.update({
      where: { id },
      data: {
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

    return NextResponse.json(volunteer);
  } catch (error) {
    console.error("Error updating volunteer:", error);
    return NextResponse.json(
      { error: "Failed to update volunteer profile" },
      { status: 500 }
    );
  }
}

// DELETE /api/volunteers/:id - Delete a volunteer profile
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    const { id } = await params;
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check user role - only admin can delete
    const user = await prisma.user.findUnique({
      where: { email: session.user?.email || "" },
    });

    if (user?.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 }
      );
    }

    await prisma.volunteer.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Volunteer profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting volunteer:", error);
    return NextResponse.json(
      { error: "Failed to delete volunteer profile" },
      { status: 500 }
    );
  }
}
