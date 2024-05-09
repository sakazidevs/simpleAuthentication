const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./mysqlConnection');
const authRoutes = require('./auth');

const app = express();

app.use(cors());
app.use(bodyParser.json({
  origin: 'http://localhost:3000'
}));

// Check if users table exists, if not, create it
pool.query(`CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);`);

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
