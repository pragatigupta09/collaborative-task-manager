import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  dueDate: Date;
  priority: "low" | "medium" | "high" | "urgent";
  status: "todo" | "in-progress" | "review" | "completed";
  creatorId: mongoose.Types.ObjectId;
  assignedToId?: mongoose.Types.ObjectId;
  boardId: mongoose.Types.ObjectId;
}

const TaskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },

    description: {
      type: String,
    },

    dueDate: {
      type: Date,
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },

    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo",
    },

    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignedToId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    boardId: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>("Task", TaskSchema);

// import mongoose, { Schema, Document } from "mongoose";

// export interface ITask extends Document {
//   title: string;
//   status: "todo" | "in-progress" | "done";
//   boardId: mongoose.Types.ObjectId;
//   userId: mongoose.Types.ObjectId;
// }

// const TaskSchema = new Schema<ITask>(
//   {
//     title: { type: String, required: true },

//     status: {
//       type: String,
//       enum: ["todo", "in-progress", "done"],
//       default: "todo",
//     },

//     boardId: {
//       type: Schema.Types.ObjectId,
//       ref: "Board",
//       required: true,
//     },

//     userId: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model<ITask>("Task", TaskSchema);
