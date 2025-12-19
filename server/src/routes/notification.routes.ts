import { Router } from "express";
import { protect } from "../middleware/auth.middleware";
import { getNotifications, markNotificationRead } from "../controllers/notification.controller";

const router = Router();

router.use(protect);

router.get("/", getNotifications);
router.put("/:id/read", markNotificationRead);

export default router;