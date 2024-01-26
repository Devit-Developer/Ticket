const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const timezone = require('timezone');

// Set the default time zone to Indian Standard Time (Asia/Kolkata)
timezone(require('timezone/Asia/Kolkata'));


const { MONGO_URI } = process.env;
const app = express();

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(MONGO_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Routes
const authRoutes = require('./src/routes/authRoutes');
app.use('/api', authRoutes);

const companyRoutes = require('./src/routes/companyRoutes');
app.use('/api', companyRoutes);

const companyTicketRoutes = require('./src/routes/companyTicketRoutes');
app.use('/api', companyTicketRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
