import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";

const STATUSES = ["new", "contacted", "closed"] as const;

// Admin: change an inquiry's status (new / contacted / closed).
export async function PATCH(request: NextRequest, ctx: RouteContext<"/api/inquiries/[id]">) {
  try {
    if (!(await verifyAdmin())) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await ctx.params;
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ message: "Inquiry not found" }, { status: 404 });
    }

    const body = await request.json().catch(() => null);
    const status = body?.status;
    if (!STATUSES.includes(status)) {
      return NextResponse.json(
        { message: `Status must be one of: ${STATUSES.join(", ")}` },
        { status: 400 },
      );
    }

    await connectDB();
    const inquiry = await Inquiry.findByIdAndUpdate(
      id,
      { $set: { status } },
      { returnDocument: "after", runValidators: true },
    ).lean();

    if (!inquiry) {
      return NextResponse.json({ message: "Inquiry not found" }, { status: 404 });
    }

    return NextResponse.json(inquiry);
  } catch (error) {
    console.error("UPDATE INQUIRY ERROR:", error);
    return NextResponse.json({ message: "Failed to update inquiry" }, { status: 500 });
  }
}

// Admin: delete an inquiry.
export async function DELETE(_request: NextRequest, ctx: RouteContext<"/api/inquiries/[id]">) {
  try {
    if (!(await verifyAdmin())) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await ctx.params;
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ message: "Inquiry not found" }, { status: 404 });
    }

    await connectDB();
    const inquiry = await Inquiry.findByIdAndDelete(id);
    if (!inquiry) {
      return NextResponse.json({ message: "Inquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Inquiry deleted" });
  } catch (error) {
    console.error("DELETE INQUIRY ERROR:", error);
    return NextResponse.json({ message: "Failed to delete inquiry" }, { status: 500 });
  }
}
