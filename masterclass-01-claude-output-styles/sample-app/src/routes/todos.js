const express = require("express");
const Todo = require("../models/todo");

const router = express.Router();

// In-memory storage (deliberate issue: no persistence)
let todos = [];

// GET /api/todos - Get all todos
router.get("/", (req, res) => {
  res.json(todos);
});

// GET /api/todos/:id - Get single todo
router.get("/:id", (req, res) => {
  const todo = todos.find((t) => t.id === req.params.id);
  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }
  res.json(todo);
});

// POST /api/todos - Create new todo
// DELIBERATE ISSUES for demo:
// 1. No input validation
// 2. No error handling
// 3. Accepts any data structure
// 4. No sanitization
router.post("/", (req, res) => {
  const todo = new Todo(req.body.title, req.body.description);
  todos.push(todo);
  res.status(201).json(todo);
});

// PUT /api/todos/:id - Update todo
// DELIBERATE ISSUES:
// 1. No validation of update data
// 2. No checking if todo exists before update
// 3. No handling of invalid data types
router.put("/:id", (req, res) => {
  const todoIndex = todos.findIndex((t) => t.id === req.params.id);
  todos[todoIndex].update(req.body);
  res.json(todos[todoIndex]);
});

// DELETE /api/todos/:id - Delete todo
router.delete("/:id", (req, res) => {
  const todoIndex = todos.findIndex((t) => t.id === req.params.id);
  if (todoIndex === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }

  const deletedTodo = todos.splice(todoIndex, 1)[0];
  res.json({ message: "Todo deleted", todo: deletedTodo });
});

module.exports = router;
