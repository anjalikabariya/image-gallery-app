const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const fileUpload = require('express-fileupload');
const {postImage} = require('./image.service');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(fileUpload());

let articles = require('./data/articles.json');

app.get('/images', (req, res) => {
  res.json(articles);
});

// Endpoint to handle image upload

app.post('/images', async(req, res) => {
  const { file } = req.files;
  const { title, description } = req.body;
  try {
    const response = await postImage(file, title, description);
    return res.status(200).json(response);
  } catch (err) { 
    res.status(400).json(err.message);
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
