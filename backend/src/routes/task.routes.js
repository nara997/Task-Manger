import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { getTasks, updateTask, deleteTask, createTask, updateTaskStatus, getTaskById } from "../controllers/task.controller.js";

const router = Router();

router.use(auth);
router.get("/", getTasks);
router.get("/:id", getTaskById);
router.post("/", createTask);
router.put("/:id", updateTask);
router.patch("/:id/status", updateTaskStatus);
router.delete("/:id", deleteTask);

export default router;
