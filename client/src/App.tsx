import { useEffect } from "react";
import { socket } from "./lib/socket";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default function App() {
  useEffect(() => {
    socket.on("task-assigned", (data) => {
      toast.success(`You have been assigned: ${data.title}`);
    });

    return () => {
      socket.off("task-assigned");
    };
  }, []);

  return (
    <>
      <AppRoutes />
      <ToastContainer position="top-right" autoClose={4000} />
    </>
  );
}