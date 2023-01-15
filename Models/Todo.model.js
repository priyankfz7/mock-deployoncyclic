const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
  task: String,
  userID: Number,
  isCompleted: Boolean,
  date: String,
});

const TodoModel = mongoose.model("todo", TodoSchema);

module.exports = { TodoModel };
