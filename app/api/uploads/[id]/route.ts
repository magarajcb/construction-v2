import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Upload from "@/models/Upload";

// Public: serve an uploaded image.
export async function GET(_req: NextRequest, ctx: RouteContext<"/api/uploads/[id]">) {
  try {
    const { id } = await ctx.params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ message: "Image not found" }, { status: 404 });
    }

    await connectDB();

    const upload = await Upload.findById(id).select("data contentType");

    if (!upload) {
      return NextResponse.json({ message: "Image not found" }, { status: 404 });
    }

    return new NextResponse(new Uint8Array(upload.data), {
      headers: {
        "Content-Type": upload.contentType,
        "Content-Length": String(upload.data.length),
        // Each upload has its own id and is never modified, so it can be cached forever.
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("GET UPLOAD ERROR:", error);

    return NextResponse.json({ message: "Failed to load image" }, { status: 500 });
  }
}
