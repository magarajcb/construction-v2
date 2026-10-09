import mongoose, { Model, Schema } from "mongoose";

/**
 * An uploaded image, stored directly in MongoDB so uploads work on hosts with
 * a read-only filesystem (such as Vercel). Served by /api/uploads/[id].
 */
export interface IUpload {
  filename: string;
  contentType: string;
  size: number;
  data: Buffer;
  createdAt: Date;
}

const UploadSchema = new Schema<IUpload>(
  {
    filename: { type: String, trim: true },
    contentType: { type: String, required: true },
    size: { type: Number, required: true },
    data: { type: Buffer, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

const Upload: Model<IUpload> =
  mongoose.models.Upload || mongoose.model<IUpload>("Upload", UploadSchema);

export default Upload;
