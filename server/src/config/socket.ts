import { Server } from "socket.io";
import http from "http";

let io: Server;

export const initSocket = (server: http.Server) => {
  io = new Server(server, {
    cors: {
  origin: "*",
  credentials: true,
}
    // cors: {
    //   origin: "http://localhost:3000",
    //   credentials: true,
    // },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("join-board", (boardId: string) => {
      socket.join(boardId);
    });

    socket.on("join-user", (userId: string) => {
      socket.join(userId);
      console.log(`Socket ${socket.id} joined user room: ${userId}`);
    });
  });
  

  return io;  
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};


// import { Server } from "socket.io";
// import { Server as HTTPServer } from "http";

// let io: Server;

// export const initSocket = (server: HTTPServer) => {
//   io = new Server(server, {
//     cors: { origin: "*" },
//   });

//   io.on("connection", (socket) => {
//     console.log(" Socket connected:", socket.id);

//     socket.on("join-board", (boardId: string) => {
//       socket.join(boardId);
//     });

//     socket.on("disconnect", () => {
//       console.log(" Socket disconnected:", socket.id);
//     });
//   });
// };

// export const getIO = () => {
//   if (!io) throw new Error("Socket not initialized");
//   return io;
// };
