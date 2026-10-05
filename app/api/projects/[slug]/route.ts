import { NextRequest, NextResponse } from "next/server";
import { fail, handleError, pick, readJson, requireAdmin } from "@/lib/api";
import { connectDB } from "@/lib/mongodb";
import Project, { PROJECT_FIELDS } from "@/models/Project";

// Public: one project by slug.
export async function GET(_req: NextRequest, ctx: RouteContext<"/api/projects/[slug]">) {
  try {
    const { slug } = await ctx.params;
    await connectDB();

    const project = await Project.findOne({ slug }).lean();
    if (!project) return fail("Project not found", 404);

    return NextResponse.json(project);
  } catch (error) {
    return handleError("GET PROJECT", error);
  }
}

// Admin: partial update.
export async function PATCH(request: NextRequest, ctx: RouteContext<"/api/projects/[slug]">) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  try {
    const { slug } = await ctx.params;
    const body = await readJson(request);
    if (!body) return fail("Request body must be a JSON object", 400);

    const data = pick(body, PROJECT_FIELDS);
    if (Object.keys(data).length === 0) return fail("No updatable fields provided", 400);

    await connectDB();
    const project = await Project.findOneAndUpdate(
      { slug },
      { $set: data },
      { returnDocument: "after", runValidators: true },
    );
    if (!project) return fail("Project not found", 404);

    return NextResponse.json(project);
  } catch (error) {
    return handleError("UPDATE PROJECT", error);
  }
}

// Admin: delete.
export async function DELETE(request: NextRequest, ctx: RouteContext<"/api/projects/[slug]">) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  try {
    const { slug } = await ctx.params;
    await connectDB();

    const project = await Project.findOneAndDelete({ slug });
    if (!project) return fail("Project not found", 404);

    return NextResponse.json({ message: "Project deleted" });
  } catch (error) {
    return handleError("DELETE PROJECT", error);
  }
}
