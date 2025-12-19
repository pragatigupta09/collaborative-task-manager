import { useEffect } from "react";
import { socket } from "./lib/socket";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  useEffect(() => {
    socket.on("task-assigned", (data) => {
      alert(`You have been assigned: ${data.title}`);
    });

    return () => {
      socket.off("task-assigned");
    };
  }, []);

  return <AppRoutes />;
}

// import { Routes, Route } from "react-router-dom";
// import AppLayout from "./components/layout/AppLayout";
// import Dashboard from "./pages/Dashboard";
// import Boards from "./pages/Boards";
// import BoardPage from "./pages/BoardPage";
// import Tasks from "./pages/Tasks";
// import Login from "./features/auth/Login";
// import Register from "./features/auth/Register";
// import NotFound from "./pages/NotFound";
// import { useEffect } from "react";
// import { socket } from "./lib/socket";
// import AppRoutes from "./routes/AppRoutes";

// export default function App() {
//   useEffect(() => {
//     socket.on("task-assigned", (data) => {
//       alert(`You have been assigned: ${data.title}`);
//     });

//     return () => {
//       socket.off("task-assigned");
//     };
//   }, []);

//   return <AppRoutes />;

//   return (
//     <Routes>
//       <Route element={<AppLayout />}>
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/boards" element={<Boards />} />
//         <Route path="/boards/:id" element={<BoardPage />} />
//         <Route path="/tasks" element={<Tasks />} />
//       </Route>

      {/* <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} /> */}
//     </Routes>
//   );
// }
