import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-800 text-white min-h-screen p-4">
      <h2 className="text-xl font-semibold mb-6">Menu</h2>

      <nav className="space-y-4">
        <Link to="/" className="block hover:text-blue-400">
          Dashboard
        </Link>

        <Link to="/boards" className="block hover:text-blue-400">
          Boards
        </Link>

        <Link to="/tasks" className="block hover:text-blue-400">
          Tasks
        </Link>
      </nav>
    </aside>
  );
}
