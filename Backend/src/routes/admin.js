const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic');

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'quantumwebber123';

// Password check middleware
const auth = (req, res, next) => {
  const pass = req.headers['x-admin-password'];
  if (pass !== ADMIN_PASSWORD) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  next();
};

// GET all topics (admin)
router.get('/topics', auth, async (req, res) => {
  try {
    const topics = await Topic.find().sort({ order: 1 });
    res.json({ success: true, data: topics });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST new topic
router.post('/topics', auth, async (req, res) => {
  try {
    const topic = new Topic(req.body);
    await topic.save();
    res.status(201).json({ success: true, data: topic });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PUT update topic
router.put('/topics/:id', auth, async (req, res) => {
  try {
    const topic = await Topic.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!topic) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: topic });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE topic
router.delete('/topics/:id', auth, async (req, res) => {
  try {
    await Topic.findOneAndDelete({ id: req.params.id });
    res.json({ success: true, message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;