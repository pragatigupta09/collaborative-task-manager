import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";
import { useNavigate } from "react-router-dom";

// IMAGES
import homeImage from "../assets/images/home.svg";
import boardsImage from "../assets/images/boards.svg";
import tasksImage from "../assets/images/tasks.svg";
import realtimeImage from "../assets/images/realtime.svg";

export default function Dashboard() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const createBoardMutation = useMutation({
    mutationFn: (title: string) => api.post("/boards", { title }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      navigate(`/boards/${res.data._id}`);
    },
  });

  const handleCreateBoard = () => {
    const title = prompt("Enter board name");
    if (!title) return;
    createBoardMutation.mutate(title);
  };

  return (
    <div className="w-full">

      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gray-50">
        <img
          src={homeImage}
          alt="Task Manager"
          className="w-80 mb-6"
        />

        <h1 className="text-4xl font-bold mb-4">
          Welcome to Task Manager
        </h1>

        <p className="text-gray-600 max-w-2xl mb-6">
          Manage projects, organize tasks, and boost productivity with
          a clean and intuitive workflow.
        </p>

        <button
          onClick={handleCreateBoard}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg"
        >
          + Create Your First Board
        </button>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Task Manager?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Feature
            title="Boards"
            text="Create multiple boards to organize projects and teams."
            img={boardsImage}
          />
          <Feature
            title="Tasks"
            text="Track tasks with statuses like Todo, In Progress and Done."
            img={tasksImage}
          />
          <Feature
            title="Real-time Updates"
            text="Get instant updates across devices using WebSockets."
            img={realtimeImage}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-16 text-center px-6">
        <h2 className="text-3xl font-bold mb-4">
          Ready to get organized?
        </h2>
        <p className="mb-6">
          Start managing your tasks smarter today.
        </p>
        <button
          onClick={handleCreateBoard}
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold"
        >
          Get Started
        </button>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-10 text-center">
        <p className="mb-2">
          © {new Date().getFullYear()} Task Manager
        </p>
        <p className="text-sm">
          Built with React, Node.js, MongoDB & Socket.IO
        </p>
      </footer>
    </div>
  );
}

function Feature({
  title,
  text,
  img,
}: {
  title: string;
  text: string;
  img: string;
}) {
  return (
    <div className="text-center p-6 border rounded-lg hover:shadow-lg transition">
      <img src={img} alt={title} className="w-32 mx-auto mb-4" />
      <h3 className="font-semibold text-xl mb-2">{title}</h3>
      <p className="text-gray-600">{text}</p>
    </div>
  );
}
