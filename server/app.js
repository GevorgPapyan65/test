const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const app = express();
const path = require('path');
const cors = require('cors');
const multer = require('multer');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (err) => console.log('DB Error:', err));
db.once('open', () => console.log('DB connected successfully'));

app.use(cors({
  origin: '*', // Update this with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Middleware
app.use(bodyParser.json());
app.use('/public/images', express.static(path.join(__dirname, 'public/images'))); // Serve static files

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, './public/images')); // Ensure this path is correct
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Save the file with its original name
  },
});

const upload = multer({ storage: storage });

// Route for file upload
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  console.log('File:', req.file); // Debugging: Check if file is received
  res.status(200).json({ message: 'File uploaded successfully', filePath: req.file.filename });
});

// Route to get the image file by filename
app.get('/api/images/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'public/images', filename);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('File not found:', err);
      res.status(404).send('Image not found');
    }
  });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/companies', require('./routes/companies'));
app.use('/api/vote', require('./routes/vote'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
