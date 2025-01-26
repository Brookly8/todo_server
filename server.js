const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = 8080;
const app = express();
const prisma = new PrismaClient();
app.use(bodyParser.json());
app.use(cors());

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.status(200).json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch tasks", details: error.message });
  }
});

app.post("/tasks", async (req, res) => {
  const { title, color, completed } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title are required." });
  }
  if (title.length < 8) {
    return res.status(400).json({ error: "should be 8 or more characters" });
  }
  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        color,
        completed: completed ?? false,
      },
    });
    res.status(201).json(newTask);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create task", details: error.message });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Attempt to delete the task by ID
    const deletedTask = await prisma.task.delete({
      where: { id: parseInt(id, 10) },
    });

    res
      .status(200)
      .json({ message: "Task deleted successfully", task: deletedTask });
  } catch (error) {
    if (error.code === "P2025") {
      // Handle case where task doesn't exist
      return res.status(404).json({ error: "Task not found" });
    }

    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { title, color, completed } = req.body;

  try {
    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id, 10) },
      data: {
        title,
        color,
        completed,
      },
    });

    res
      .status(200)
      .json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    if (error.code === "P2025") {
      // Handle case where task doesn't exist
      return res.status(404).json({ error: "Task not found" });
    }

    console.error("Error updating task:", error);
    res.status(500).json({ error: "Failed to update task" });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
