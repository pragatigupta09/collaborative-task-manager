import { io } from "socket.io-client";

export const socket = io("/", { withCredentials: true });
// export const socket = io("http://localhost:5000", { withCredentials: true });

export const joinUserRoom = (userId: string) => {
  socket.emit("join-user", userId);
};


// import { io } from "socket.io-client";

// export const socket = io(import.meta.env.VITE_API_URL.replace("/api", ""));

// export const joinUserRoom = (userId: string) => {
//   socket.emit("join-user", userId);
// };
