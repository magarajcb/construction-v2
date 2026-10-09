import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/auth";
import { v2 as cloudinary } from "cloudinary";
// Vercel rejects request bodies over ~4.5 MB, so keep a safe margin.
const MAX_BYTES = 4 * 1024 * 1024;

/** Detect the real image type from the file's first bytes (never trust the browser's label). */
function sniffImageType(bytes: Uint8Array): string | null {
  const startsWith = (sig: number[], offset = 0) =>
    sig.every((byte, i) => bytes[offset + i] === byte);

  if (startsWith([0xff, 0xd8, 0xff])) return "image/jpeg";
  if (startsWith([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return "image/png";
  if (startsWith([0x47, 0x49, 0x46, 0x38])) return "image/gif";
  if (startsWith([0x52, 0x49, 0x46, 0x46]) && startsWith([0x57, 0x45, 0x42, 0x50], 8)) {
    return "image/webp";
  }
  return null;
}

// Admin: upload one image, returns the URL to store on a project.
export async function POST(request: NextRequest) {
  try {
    if (!(await verifyAdmin())) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ message: "No image file received" }, { status: 400 });
    }

    if (file.size === 0) {
      return NextResponse.json({ message: "The file is empty" }, { status: 400 });
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { message: "Image is too large (maximum 4 MB)" },
        { status: 413 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const contentType = sniffImageType(buffer);

    if (!contentType) {
      return NextResponse.json(
        { message: "Only JPG, PNG, WebP or GIF images are allowed" },
        { status: 415 },
      );
    }

    // await connectDB();

    // const upload = await Upload.create({
    //   filename: file.name.slice(0, 200),
    //   contentType,
    //   size: buffer.length,
    //   data: buffer,
    // });
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  console.error("Cloudinary environment variables are missing");

  return NextResponse.json(
    { message: "Image storage is not configured" },
    { status: 500 },
  );
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

const result = await new Promise<{ secure_url: string }>(
  (resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "gloaro/projects",
        resource_type: "image",
      },
      (error, uploadedImage) => {
        if (error) {
          reject(error);
        } else if (!uploadedImage) {
          reject(new Error("Cloudinary returned no upload result"));
        } else {
          resolve(uploadedImage);
        }
      },
    );

    stream.end(buffer);
  },
);

   return NextResponse.json(
  { url: result.secure_url },
  { status: 201 },
);
  } catch (error) {
    console.error("UPLOAD IMAGE ERROR:", error);

    return NextResponse.json({ message: "Failed to upload image" }, { status: 500 });
  }
}
