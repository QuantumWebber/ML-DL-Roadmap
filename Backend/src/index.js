const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const topicsRouter = require('./routes/topics');
const adminRouter = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS fix
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://ml-dl-roadmap.vercel.app',
    process.env.CLIENT_URL,
  ].filter(Boolean),
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-admin-password'],
  credentials: true,
}));

app.options('/(.*)', cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/topics', topicsRouter);
app.use('/api/admin', adminRouter);

app.get('/', (req, res) => res.json({ message: 'ML Portfolio API running 🚀' }));

// Keep alive — Render free tier sleep fix
const BACKEND_URL = process.env.RENDER_EXTERNAL_URL;
if (BACKEND_URL) {
  setInterval(() => {
    fetch(`${BACKEND_URL}/`)
      .then(() => console.log('✅ Keep alive ping'))
      .catch(() => {});
  }, 14 * 60 * 1000);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`✅ Server on port ${PORT}`));
  })
  .catch((err) => console.error('❌ MongoDB error:', err));