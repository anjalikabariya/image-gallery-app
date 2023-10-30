# kisi-marketing-technical-test

This is a boilerplate repository used for Kisi's marketing technical challenge. It comes with an [images](./images/) directory pre-populated with some images and a [data](./data/) directory with simple articles which will be used in the challenge.

# Instructions to run project locally

run the following command in base directory:

`npm install && npm run dev`

Working application can be found on http://localhost:3000

# Project Structure

## Client
Frontend created using create-react-app

### src
- **components**: Directory containing small components.
  - `GalleryCard`: Component for displaying image cards.
  - `ImageUploader`: Component for uploading images.

- **pages**: Directory containing pages of application.

- **hooks**: Directory containing custom hooks.
  - `useImageFetcher`: Hook for fetching images.

## Server
Backend API and service created using NodeJs and ExpressJS

- **index.js**: Entry point for the server. API endpoints for image service are exposed here.

- **image.service.js**: Service for handling image operations.
  
- **images**: Directory containing images.

- **data**: Directory containing JSON file for articles.
  - `articles.json`: JSON data for articles associated with images.


