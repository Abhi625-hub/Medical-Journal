
const mongoose = require('mongoose');

const ReplySchema = new mongoose.Schema({
  name: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const QuestionSchema = new mongoose.Schema({
  title: String,
  body: String,
  askedBy: String,
  createdAt: { type: Date, default: Date.now },
  replies: [ReplySchema]
});

module.exports = mongoose.model('Question', QuestionSchema);
