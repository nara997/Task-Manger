import Task from "../models/Task.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
});

export const getTaskById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const task = await Task.findOne({ _id: id, userId: req.user.id });

    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
});

export const createTask = asyncHandler(async (req, res) => {
    const { title, description = "", completed = false } = req.body || {};
    if (!title) return res.status(400).json({ error: "Title is required" });

    const task = await Task.create({
        userId: req.user.id,
        title,
        description,
        completed
    });
    res.status(201).json(task);
});

export const updateTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body || {};

    const task = await Task.findOneAndUpdate(
        { _id: id, userId: req.user.id },
        { $set: { title, description, completed } },
        { new: true, runValidators: true }
    );

    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
});


export const updateTaskStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;

    if (typeof completed !== "boolean") {
        return res.status(400).json({ error: "Completed must be true/false" });
    }

    const task = await Task.findOneAndUpdate(
        { _id: id, userId: req.user.id },
        { $set: { completed } },
        { new: true }
    );

    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
});


export const deleteTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Deleted" });
});
