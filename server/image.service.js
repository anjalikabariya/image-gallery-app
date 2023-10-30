const path = require("path");
const fs = require("fs");
const articlesFilePath = path.join(__dirname, "data", "articles.json");
let articles = require(articlesFilePath);

// Determine the highest image number from existing images
const imagesDirectory = path.join(__dirname, "images");
const existingImages = fs.readdirSync(imagesDirectory);
let highestImageNumber = 0;

existingImages.forEach((file) => {
  const match = file.match(/^image(\d+)\.\w+$/);
  if (match) {
    const imageNumber = parseInt(match[1]);
    if (imageNumber > highestImageNumber) {
      highestImageNumber = imageNumber;
    }
  }
});
let imageCounter = highestImageNumber + 1;

const postImage = async (file, title, description) => {
  if (!file || !title || !description) {
    throw new Error("Please provide a file, title, and description");
  }
  // Check if the uploaded file is an image
  if (!file.mimetype.startsWith("image/")) {
    throw new Error("Uploaded file is not an image");
  }

  const imageName = `image${imageCounter}.${file.name.split(".").pop()}`;
  const imagePath = path.join(__dirname, "images", imageName);
  try {
    await new Promise((resolve, reject) => {
      file.mv(imagePath, async (error) => {
        if (error) {
          reject(error);
        } else {
          articles.push({
            title: title,
            description: description,
            imageUrl: `/images/${imageName}`,
            imageId: imageName,
          });
          await fs.writeFile(
            articlesFilePath,
            JSON.stringify(articles, null, 2),
            (error) => {
              if (error) {
                reject(error);
              } else {
                imageCounter++;
                resolve();
              }
            }
          );
        }
      });
    });
    return articles;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = { postImage };
