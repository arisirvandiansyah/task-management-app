const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    maxlength: 50,
    minlength: 3,
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
    maxlength: 200,
  },
  status: {
    type: String,
    enum: ["Pending", "In-progress", "Waiting", "Rejected", "Completed"],
    default: "Pending",
  },
  deadline: {
    type: Date,
    required: [true, "Please provide a deadline"],
  },
  assigned_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  assigned_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);
