// import { socket } from "../lib/socket";

// export const useSocket = () => socket;

import { socket } from "../lib/socket";
import { useEffect } from "react";

export const useTaskSocket = (refetch: () => void) => {
  useEffect(() => {
    socket.on("task-updated", refetch);
    socket.on("task-created", refetch);

    return () => {
      socket.off("task-updated");
      socket.off("task-created");
    };
  }, [refetch]);
};
