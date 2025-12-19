import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";

export default function NotificationsPage() {
  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => (await api.get("/notifications")).data,
  });
  if (isLoading) return <p className="p-6">Loading notifications...</p>;

  if (!notifications || notifications.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        No new notifications
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Notifications</h2>
      <ul className="space-y-4">
        {notifications.map((n: any) => (
          <li
            key={n._id}
            className="bg-white rounded-lg shadow p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{n.message}</p>
              <small className="text-gray-500">
                {new Date(n.createdAt).toLocaleString()}
              </small>
            </div>
            {!n.read && (
              <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">
                Unread
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}