const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Define a route for /images
app.get('/images', (req, res) => {
  const imagesDirectory = path.join(__dirname, 'images'); // Assuming images are in a directory named 'images'
  const articlesDirectory = path.join(__dirname, 'data', 'articles.json'); // Assuming articles are stored in a JSON file

  fs.readdir(imagesDirectory, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading images directory' });
    }

    fs.readFile(articlesDirectory, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Error reading articles file' });
      }

      const articles = JSON.parse(data);
      const imageArticleMap = {};
      files.forEach((file) => {
        const imageName = file.split('.')[0];
        const associatedArticles = articles.filter((article) => article.image === imageName);

        if (associatedArticles.length > 0) {
          imageArticleMap[imageName] = associatedArticles;
        }
      });
      res.json(imageArticleMap);
    });
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
