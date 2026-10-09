import { NextRequest, NextResponse } from "next/server";
import {connectDB} from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";
import { verifyAdmin } from "@/lib/auth";

// Admin only: customer names, phones and emails must not be public.
export async function GET() {
  try {
    if (!(await verifyAdmin())) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const inquiries = await Inquiry.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(inquiries);
  } catch (error) {
    console.error("GET INQUIRIES ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to load inquiries",
      },
      { status: 500 }
    );
  }
}
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      name,
      email,
      phone,
      projectType,
      details,
    } = body;

    if (!name || !email || !phone || !projectType || !details) {
      return NextResponse.json(
        {
          message: "Please fill in all fields.",
        },
        { status: 400 }
      );
    }

    const inquiry = await Inquiry.create({
      name,
      email,
      phone,
      projectType,
      details,
    });

    return NextResponse.json(
      {
        message: "Inquiry submitted successfully!",
        inquiry,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Inquiry submission error:", error);

    return NextResponse.json(
      {
        message: "Failed to submit inquiry.",
      },
      { status: 500 }
    );
  }
}