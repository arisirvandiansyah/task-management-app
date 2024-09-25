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
