const Task = require("../models/task");
exports.store = async (req, res) => {
  let { name, description, deadline, assigned_to } = req.body;
  if (!name || !description || !deadline)
    return res.status(400).json({ msg: "Please fill all fields" });
  if (!assigned_to) assigned_to = req.user._id;
  const payload = {
    name,
    description,
    deadline,
    assigned_by: req.user._id,
    assigned_to,
  };
  try {
    const newTask = new Task(payload);
    await newTask.save();
    return res.status(201).json({ msg: "Task created successfully" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.update = async (req, res) => {
  const { name, description, deadline, status } = req.body;
  if (!name || !description || !deadline)
    return res.status(400).json({ msg: "Please fill all fields" });
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });
    if (task.assigned_to != req.user._id) return res.sendStatus(400);
    task.name = name;
    task.description = description;
    task.deadline = deadline;
    task.status = status;
    await task.save();
    return res.status(200).json({ msg: "Task updated successfully" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.remove = async (req, res) => {
  const id = req.params.id;
  try {
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ msg: "Task not found" });
    if (task.assigned_to != req.user._id) return res.sendStatus(400);
    await Task.findByIdAndDelete(id);
    return res.status(200).json({ msg: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
