require('dotenv').config();
const express = require('express');
// const multer = require('multer');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./database/db');
// const companiesRoutes = require('./server/routes/company.routes')
const reportRoutes = require('./server/routes/reports.routes');
const companyRoutes = require('./server/routes/company.routes');
const engineerRoutes = require('./server/routes/engineer.routes');
const authRoutes = require('./server/routes/auth.routes');

const app = express();

// Connect to MongoDB
connectDB();

// MIDDLEWARES
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.status(200).json({ status: 200, message: 'System is healthy' });
});

// app.use(route);
app.use(
  '/Products_Images',
  express.static(path.join(__dirname, 'Products_Images'))
);
app.use('/User_Images', express.static(path.join(__dirname, 'User_Images')));

// app.use('/api/v1/companies', companiesRoutes);
app.use('/api/v1/reports', reportRoutes);
app.use('/api/v1/companies', companyRoutes);
app.use('/api/v1/engineer', engineerRoutes);
app.use('/api/v1', authRoutes);

const { lookup } = require('dns').promises;
const os = require('os');

const PORT = process.env.PORT || 2300;
app.enable('trust proxy');

app.use((err, req, res, _next) => {
  if (err instanceof multer.MulterError) {
    // A Multer error occurred during file upload
    console.log(err.code);
    if (err.code == 'LIMIT_UNEXPECTED_FILE') {
      res
        .status(406)
        .json({ Message: 'Maximum number of pictures you upload is 3' });
    } else {
      res.status(406).json({ Message: err.message });
    }
  } else {
    res.status(500).json({ Message: err.message });
  }
});
app.use((err, req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.listen(PORT, async () => {
  const IP = (await lookup(os.hostname())).address;
  console.log(
    `Server started at ${
      process.env.NODE_ENV === 'development' ? 'http' : 'https'
    }://${IP}:${PORT}`
  );
});

module.exports = app;
