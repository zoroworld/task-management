import { Request, Response } from "express";
import Task from "../models/task";

import{taskSchema, updateTaskSchema} from "../validations/taskValidation"

export const createTask = async (req: Request, res: Response): Promise<void> => {
  const { error } = taskSchema.validate(req.body);

  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return; // End execution if validation fails
  }

  const { title, description, status } = req.body; // Default status is "pending"
  const userId = (req as any).user.id;

  try {
    const task = await Task.create({
      title,
      description,
      status,
      user: userId // Linking the task to the logged-in user
    });

    res.status(201).json({success:true, task}); // Successfully created task
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ success:false, message: "Error creating task", error: err.message });
  }
};

export const getTasksByUser = async (req: Request, res: Response): Promise<void> => {
  // Ensure the user is authenticated
  if (!req.user || !req.user.id) {
    res.status(401).json({ success:false , message: "Unauthorized - No user found in the token" });
    return;
  }

  const userId = req.user.id; // Get the user ID from the decoded token

  try {
    // Query tasks by user ID
    const tasks = await Task.find({ user: userId }); // Find all tasks for the user

    if (!tasks.length) {
      res.status(404).json({ success:false ,message: "No tasks found for this user" });
      return;
    }

    res.status(200).json({success:true, tasks}); // Successfully retrieved tasks
  } catch (error) {
    const err = error as Error;
    res.status(500).json({success:false , message: "Error fetching tasks", error: err.message });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const taskId = req.params.id;
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      res.status(404).json({ success:false, message: "Task not found" });
      return;
    }
    res.status(200).json({ success:false, message: "Task deleted successfully" });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ success:false, message: err.message });
  }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  // Validate the request body for update
  const { error } = updateTaskSchema.validate(req.body);

  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return; // End execution if validation fails
  }

  try {
    const taskId = req.params.id;
    const { title, description, status } = req.body;

    const task = await Task.findByIdAndUpdate(
      taskId,
      { title, description, status },
      { new: true }
    );

    if (!task) {
      res.status(404).json({success:false, message: "Task not found" });
      return;
    }

    res.status(200).json({success:true, task}); // Successfully updated task
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ success:false, message: err.message });
  }
};
