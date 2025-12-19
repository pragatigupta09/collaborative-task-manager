# Task Manager Application

A full‑stack task management system with real‑time collaboration, notifications, and authentication.


1. Setup Instructions

### Prerequisites
- Node.js (>= 18.x)
- npm or yarn
- MongoDB (local or Atlas)
- Environment variables configured in `.env`

Backend (Express + MongoDB)
```bash
cd server
npm install
npm run dev

Environment variables (.env):
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_jwt_secret

Frontend (React + Vite)
```bash
cd client
npm install
npm run dev

Environment variables (.env):
VITE_API_URL=http://localhost:5000/api


2. API Contract

Auth
- POST /api/auth/register → Register new user
- POST /api/auth/login → Login, returns JWT
Tasks
- POST /api/tasks → Create task
- GET /api/tasks → Get all tasks for logged‑in user
- GET /api/tasks/board/:boardId → Get tasks by board
- PUT /api/tasks/:id → Update task (status, priority, assignee)
- DELETE /api/tasks/:id → Delete task
Boards
- POST /api/boards → Create board
- GET /api/boards → Get all boards
Notifications
- GET /api/notifications → Get notifications for logged‑in user
- PUT /api/notifications/:id/read → Mark notification as read


3. Architecture Overview & Desgin Decisions

- Frontend: React + Vite, TanStack Query for data fetching, TailwindCSS for styling.
- Backend: Express.js with a service layer (TaskService) to separate business logic from controllers.
- Database: MongoDB chosen for flexibility in handling nested task/board structures and real‑time updates.
- Authentication: JWT stored in localStorage, attached via Axios interceptor. Middleware (protect) decodes token and attaches req.user.
- Service Layer: Encapsulates DB operations (create, update, delete tasks) for cleaner controllers and easier testing.


4. Real‑Time Functionality with Socket.io

- Integration: Socket.io initialized in config/socket.ts and attached to the HTTP server.
- Rooms:
- join-board → Users join board rooms to receive task updates.
- join-user → Users join personal rooms to receive assignment notifications.
- Events:
- task-created, task-updated, task-deleted → Broadcast to board room.
- task-assigned → Sent to specific user room.
- Frontend: Listens for these events and triggers toast notifications + refetches queries.


5. Trade‑offs & Assumptions

- Notifications: Stored in MongoDB for persistence, but also shown via toast for instant feedback. Trade‑off: duplicate logic (socket + DB).
- JWT Storage: Kept in localStorage for simplicity. Trade‑off: vulnerable to XSS; in production, consider HttpOnly cookies.
- Service Layer: Adds abstraction but increases boilerplate. Assumption: future scaling will benefit from separation.
- Socket.io: Chosen for simplicity over alternatives like WebSockets or GraphQL subscriptions. Assumption: task updates are lightweight and don’t require complex streaming.
