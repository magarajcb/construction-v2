import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";

export async function GET() {
  try {
    await connectDB();

    const projects = await Project.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(projects);
   }
  //  catch (error) {
  //   console.error("GET PROJECTS ERROR:", error);

  //   return NextResponse.json(
  //     { message: "Failed to fetch projects" },
  //     { status: 500 },
  //   );
  // }
  catch (error) {
  console.error("GET PROJECTS ERROR:", error);

  return NextResponse.json(
    {
      message: "Failed to fetch projects",
      error: error instanceof Error ? error.message : String(error),
    },
    { status: 500 }
  );
}
  
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const project = await Project.create(body);

    return NextResponse.json(project, {
      status: 201,
    });
  } catch (error) {
    console.error("CREATE PROJECT ERROR:", error);

    return NextResponse.json(
      { message: "Failed to create project" },
      { status: 500 },
    );
  }
}