import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/hours/:id - Get specific volunteer hours entry
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

    const hours = await prisma.volunteerHours.findUnique({
      where: { id },
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

    if (!hours) {
      return NextResponse.json(
        { error: "Volunteer hours entry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(hours);
  } catch (error) {
    console.error("Error fetching volunteer hours:", error);
    return NextResponse.json(
      { error: "Failed to fetch volunteer hours entry" },
      { status: 500 }
    );
  }
}

// PUT /api/hours/:id - Update volunteer hours entry
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
    const { date, hours: hoursAmount, description, verified, verifiedBy } = body;

    // Get user for verification
    const user = await prisma.user.findUnique({
      where: { email: session.user?.email || "" },
    });

    const updateData: any = {};
    
    if (date) updateData.date = new Date(date);
    if (hoursAmount !== undefined) {
      if (hoursAmount <= 0) {
        return NextResponse.json(
          { error: "Hours must be greater than 0" },
          { status: 400 }
        );
      }
      updateData.hours = hoursAmount;
    }
    if (description) updateData.description = description;
    
    // Only admins/organizers can verify hours
    if (typeof verified === "boolean" && (user?.role === "ADMIN" || user?.role === "ORGANIZER")) {
      updateData.verified = verified;
      updateData.verifiedBy = verified ? user.id : null;
    }

    const hours = await prisma.volunteerHours.update({
      where: { id },
      data: updateData,
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

    return NextResponse.json(hours);
  } catch (error) {
    console.error("Error updating volunteer hours:", error);
    return NextResponse.json(
      { error: "Failed to update volunteer hours entry" },
      { status: 500 }
    );
  }
}

// DELETE /api/hours/:id - Delete volunteer hours entry
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

    await prisma.volunteerHours.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Volunteer hours entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting volunteer hours:", error);
    return NextResponse.json(
      { error: "Failed to delete volunteer hours entry" },
      { status: 500 }
    );
  }
}
