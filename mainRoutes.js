
const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

router.get('/', async (req, res) => {
  const questions = await Question.find().sort({ createdAt: -1 });
  res.render('home', { questions });
});

router.get('/questions', async (req, res) => {
  const questions = await Question.find().sort({ createdAt: -1 });
  res.render('questions', { questions });
});

router.post('/submit-question', async (req, res) => {
  const { title, body, askedBy } = req.body;
  const newQuestion = new Question({ title, body, askedBy });
  await newQuestion.save();
  res.redirect('/questions');
});

router.post('/reply/:id', async (req, res) => {
  const { name, message } = req.body;
  await Question.findByIdAndUpdate(req.params.id, {
    $push: { replies: { name, message } }
  });
  res.redirect('/questions');
});

router.get('/about', (req, res) => {
  res.render('about');
});

module.exports = router;
