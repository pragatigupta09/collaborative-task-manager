import path from "path";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import http from "http";

import { connectDB } from "./config/db";
import { initSocket } from "./config/socket";

import authRoutes from "./routes/auth.routes";
import boardRoutes from "./routes/board.routes";
import taskRoutes from "./routes/task.routes";
import notificationRoutes from "./routes/notification.routes";

import { errorHandler } from "./middleware/error.middleware";

const app = express();

app.use(
  cors({
    origin: "*", 
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(errorHandler);

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/tasks", taskRoutes);

app.use(express.static(path.join(__dirname, "../public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

const server = http.createServer(app);

connectDB();
initSocket(server);

export { server };