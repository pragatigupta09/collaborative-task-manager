import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Boards from "../pages/Boards";
import BoardPage from "../pages/BoardPage";
import TasksPage from "../pages/TasksPage";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/boards/:id" element={<BoardPage />} />
        <Route path="/tasks" element={<TasksPage />} />
      </Route>
    </Routes>
  );
}
