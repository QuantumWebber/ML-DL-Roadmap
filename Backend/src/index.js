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

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://ml-dl-roadmap.vercel.app'
  ]
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/topics', topicsRouter);
app.use('/api/admin', adminRouter);

app.get('/', (req, res) => res.json({ message: 'ML Portfolio API running 🚀' }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`✅ Server on port ${PORT}`));
  })
  .catch((err) => console.error('❌ MongoDB error:', err));