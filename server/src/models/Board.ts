import mongoose, { Schema, Document } from "mongoose";

export interface IBoard extends Document {
  title: string;
  userId: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
}

const BoardSchema = new Schema<IBoard>(
  {
    title: { type: String, required: true },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.model<IBoard>("Board", BoardSchema);
