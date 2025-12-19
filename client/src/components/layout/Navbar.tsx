import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";

export default function Navbar() {
  const token = useAuthStore((s) => s.token);
  const logout = useAuthStore((s) => s.logout);

  return (
    <nav className="h-14 bg-slate-900 text-white px-6 flex justify-between items-center">
      <span className="font-bold text-lg">Task Manager</span>

      <div className="space-x-4">
        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button
            onClick={logout}
            className="text-red-400 hover:text-red-300"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
