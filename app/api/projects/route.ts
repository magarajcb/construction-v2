import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/auth";
import Project, { PROJECT_FIELDS } from "@/models/Project";

export async function GET() {
  try {
    await connectDB();

    const projects = await Project.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(projects);
  } catch (error) {
    console.error("GET PROJECTS ERROR:", error);

    return NextResponse.json(
      { message: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authenticated = await verifyAdmin();

    if (!authenticated) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();

    // Only accept known fields; drop empty optional strings.
    const data: Record<string, unknown> = {};
    for (const field of PROJECT_FIELDS) {
      const value = body[field];
      if (value === undefined || value === null) continue;
      data[field] = typeof value === "string" ? value.trim() : value;
    }

    const missing = ["title", "slug", "location", "category", "description"].filter(
      (field) => !data[field],
    );
    if (missing.length) {
      return NextResponse.json(
        { message: `Please fill in: ${missing.join(", ")}` },
        { status: 400 },
      );
    }

    const project = await Project.create(data);

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("CREATE PROJECT ERROR:", error);

    if ((error as { code?: number })?.code === 11000) {
      return NextResponse.json(
        { message: "A project with this slug already exists. Change the title or slug." },
        { status: 409 },
      );
    }
    if (error instanceof Error && error.name === "ValidationError") {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    const mongo = error as { code?: number; codeName?: string; message?: string };
    if (mongo?.code === 13 || /not authorized|not allowed/i.test(mongo?.message ?? "")) {
      return NextResponse.json(
        {
          message:
            "MongoDB user has no write permission. In Atlas → Database Access, give this user 'Read and write to any database'.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        message: `Failed to create project: ${mongo?.codeName ? mongo.codeName + " — " : ""}${mongo?.message ?? "unknown error"}`,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authenticated = await verifyAdmin();

    if (!authenticated) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "Project ID is required" },
        { status: 400 }
      );
    }

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("DELETE PROJECT ERROR:", error);

    return NextResponse.json(
      { message: "Failed to delete project" },
      { status: 500 }
    );
  }
}