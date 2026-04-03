const Topic = require('../models/Topic');

exports.getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find({ status: { $ne: 'draft' } }).sort({ order: 1, id: 1 });
    res.json({ success: true, data: topics });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getTopicById = async (req, res) => {
  try {
    const topic = await Topic.findOne({ id: req.params.id });
    if (!topic) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: topic });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createTopic = async (req, res) => {
  try {
    const topic = new Topic(req.body);
    await topic.save();
    res.status(201).json({ success: true, data: topic });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.updateTopic = async (req, res) => {
  try {
    const topic = await Topic.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (!topic) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: topic });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteTopic = async (req, res) => {
  try {
    await Topic.findOneAndDelete({ id: req.params.id });
    res.json({ success: true, message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};