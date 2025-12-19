// import { io } from "socket.io-client";

// export const socket = io(import.meta.env.VITE_API_URL.replace("/api", ""));

import { io } from "socket.io-client";

export const socket = io("http://localhost:5000");

export const joinUserRoom = (userId: string) => {
  socket.emit("join-user", userId);
};
