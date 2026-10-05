import { NextRequest, NextResponse } from "next/server";
import { fail, handleError, pagination, pick, readJson, requireAdmin } from "@/lib/api";
import { connectDB } from "@/lib/mongodb";
import Enquiry, { ENQUIRY_STATUSES, type EnquiryStatus } from "@/models/Enquiry";

const PUBLIC_FIELDS = ["name", "phone", "email", "projectType", "message"] as const;

// Public: the "Get a quote" / "Get in touch" form posts here.
export async function POST(request: NextRequest) {
  try {
    const body = await readJson(request);
    if (!body) return fail("Request body must be a JSON object", 400);

    // Honeypot: the form should include a hidden `website` input that humans
    // never fill. If a bot fills it, pretend success and save nothing.
    if (typeof body.website === "string" && body.website.trim() !== "") {
      return NextResponse.json({ message: "Enquiry received" }, { status: 201 });
    }

    await connectDB();
    await Enquiry.create(pick(body, PUBLIC_FIELDS));

    return NextResponse.json({ message: "Enquiry received" }, { status: 201 });
  } catch (error) {
    return handleError("CREATE ENQUIRY", error);
  }
}

// Admin: list enquiries, newest first. Optional ?status=new|contacted|closed
export async function GET(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  try {
    const params = request.nextUrl.searchParams;
    const status = params.get("status");
    if (status && !(ENQUIRY_STATUSES as readonly string[]).includes(status)) {
      return fail(`status must be one of: ${ENQUIRY_STATUSES.join(", ")}`, 400);
    }

    await connectDB();
    const { limit, skip } = pagination(params);
    const enquiries = await Enquiry.find(status ? { status: status as EnquiryStatus } : {})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json(enquiries);
  } catch (error) {
    return handleError("GET ENQUIRIES", error);
  }
}
