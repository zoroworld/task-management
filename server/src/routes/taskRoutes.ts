import express from "express";
import { createTask, getTasksByUser, deleteTask, updateTask } from "../controllers/taskController";
import { authMiddleware } from "../middlewares/userMiddleware";

const router = express.Router();

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getTasksByUser);
router.delete("/:id", authMiddleware, deleteTask);
router.put("/:id", authMiddleware, updateTask);


export default router;
