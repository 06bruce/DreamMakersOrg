const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');

require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());

// Use admin routes
app.use('/api/admin', adminRoutes);
app.use ('/api/users', userRoutes);

// Connect to MongoDB (update with your URI)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('📅 MongoDB connected'))
  .catch(err => console.error(err));

app.listen(5000, () => console.log('🚀 Server running on port 5000'));