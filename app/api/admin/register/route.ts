import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    // Check if any admin user exists
    const existingAdmin = await prisma.user.findFirst({
      where: {
        role: "ADMIN",
      },
    });

    if (existingAdmin) {
      return NextResponse.json(
        {
          error: "Admin user already exists",
          message: "An admin user is already registered in the system",
        },
        { status: 400 }
      );
    }

    // Create initial admin user with default credentials
    const defaultEmail = "admin@admin.com";
    const defaultPassword = "admin123";
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    const adminUser = await prisma.user.create({
      data: {
        email: defaultEmail,
        name: "System Administrator",
        password: hashedPassword,
        role: "ADMIN",
        isActive: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Initial admin user created successfully",
      admin: {
        id: adminUser.id,
        email: adminUser.email,
        name: adminUser.name,
        role: adminUser.role,
      },
      credentials: {
        email: defaultEmail,
        password: defaultPassword,
        note: "Please change these credentials after first login",
      },
    });
  } catch (error) {
    console.error("Admin register error:", error);
    return NextResponse.json(
      { error: "Failed to create admin user" },
      { status: 500 }
    );
  }
}
