const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    phase: { type: String, enum: ['ml', 'dl', 'adv', 'proj'], required: true },
    folder: { type: String },
    description: { type: String },
    tags: [{ type: String }],
    status: { type: String, enum: ['published', 'coming_soon', 'draft'], default: 'published' },
    order: { type: Number, default: 0 },

    // Multiple links support
    githubLinks: [{ label: String, url: String }],
    notebookLinks: [{ label: String, url: String }],
    colabLinks: [{ label: String, url: String }],
    youtubeLinks: [{ label: String, url: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Topic', topicSchema);