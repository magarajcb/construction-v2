import { NextRequest, NextResponse } from "next/server";
import {connectDB} from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";

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