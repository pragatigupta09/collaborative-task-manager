import { Link } from "react-router-dom";
import boardIcon from "../../assets/icons/board.png";

export default function BoardCard({ board }: any) {
  return (
    <Link
      key={board._id}
      to={`/boards/${board._id}`}
      className="flex items-center gap-3 p-4 border rounded hover:bg-gray-100"
    >
      <img src={boardIcon} alt="Board" className="w-5 h-5" />
      <span className="font-medium">{board.title}</span>
    </Link>
  );
}
