import mongoose, { Document, Model, Schema } from "mongoose";

export interface IProject extends Document {
  title: string;
  slug: string;
  client?: string;
  location: string;
  category: string;
  year?: string;
  status: string;
  description: string;
  coverImage?: string;
  images: string[];
  videos: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    client: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    year: {
      type: String,
    },

    status: {
      type: String,
      default: "Completed",
    },

    description: {
      type: String,
      required: true,
    },

    coverImage: {
      type: String,
    },

    images: {
      type: [String],
      default: [],
    },

    videos: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const Project: Model<IProject> =
  mongoose.models.Project ||
  mongoose.model<IProject>("Project", ProjectSchema);
export default Project;