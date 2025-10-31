import { NextRequest, NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import { prisma } from "@/lib/prisma";
import { generateToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

const client = new OAuth2Client();

export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json();

    if (!idToken) {
      return NextResponse.json(
        { error: "ID token is required" },
        { status: 400 }
      );
    }

    // Support multiple client IDs (web, mobile, etc.)
    const allowedAudiences = [
      process.env.GOOGLE_CLIENT_ID,
      "188930484209-8p4a85jd2icaqdhnpni44picnl4vs2go.apps.googleusercontent.com", // Mobile web client ID (from token)
      "188930484209-8p4a85jd2icaqdhnpni44picnl4vs2go.apps.googleusercontent.com", // Mobile web client ID (from config)
      "188930484209-489r2d2jfr5fhfs5fedl4v0mbt8jp04g.apps.googleusercontent.com", // iOS client ID
      "188930484209-50u0s63o6dblc7cvi00snmeufm3jv190.apps.googleusercontent.com", // Original web client ID
    ].filter((id): id is string => Boolean(id));

    const ticket = await client.verifyIdToken({
      idToken,
      audience: allowedAudiences,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      return NextResponse.json(
        { error: "Invalid token payload" },
        { status: 400 }
      );
    }

    const { sub: googleId, email, name } = payload;

    let user = await prisma.user.findUnique({
      where: { googleId },
    });

    if (!user) {
      user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        // Set expiration date to 7 days from now for new users
        const expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 7);

        user = await prisma.user.create({
          data: {
            email,
            name: name || "",
            googleId,
            role: "USER",
            expireDate,
          },
        });
      } else if (!user.googleId) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: {
            googleId,
            name: name || user.name || "",
          },
        });
      }
    }

    if (!user.isActive) {
      return NextResponse.json(
        { error: "Account is deactivated" },
        { status: 403 }
      );
    }

    const token = generateToken(user);

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        expireDate: user.expireDate,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    console.error("Google auth error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
