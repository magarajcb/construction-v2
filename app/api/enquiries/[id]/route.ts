import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { fail, handleError, readJson, requireAdmin } from "@/lib/api";
import { connectDB } from "@/lib/mongodb";
import Enquiry, { ENQUIRY_STATUSES } from "@/models/Enquiry";

// Admin: mark an enquiry as new / contacted / closed.
export async function PATCH(request: NextRequest, ctx: RouteContext<"/api/enquiries/[id]">) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  try {
    const { id } = await ctx.params;
    if (!mongoose.isValidObjectId(id)) return fail("Enquiry not found", 404);

    const body = await readJson(request);
    const status = body?.status;
    if (typeof status !== "string" || !(ENQUIRY_STATUSES as readonly string[]).includes(status)) {
      return fail(`status must be one of: ${ENQUIRY_STATUSES.join(", ")}`, 400);
    }

    await connectDB();
    const enquiry = await Enquiry.findByIdAndUpdate(
      id,
      { $set: { status } },
      { returnDocument: "after", runValidators: true },
    );
    if (!enquiry) return fail("Enquiry not found", 404);

    return NextResponse.json(enquiry);
  } catch (error) {
    return handleError("UPDATE ENQUIRY", error);
  }
}

// Admin: delete an enquiry.
export async function DELETE(request: NextRequest, ctx: RouteContext<"/api/enquiries/[id]">) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  try {
    const { id } = await ctx.params;
    if (!mongoose.isValidObjectId(id)) return fail("Enquiry not found", 404);

    await connectDB();
    const enquiry = await Enquiry.findByIdAndDelete(id);
    if (!enquiry) return fail("Enquiry not found", 404);

    return NextResponse.json({ message: "Enquiry deleted" });
  } catch (error) {
    return handleError("DELETE ENQUIRY", error);
  }
}
