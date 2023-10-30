# kisi-marketing-technical-test

This is a boilerplate repository used for Kisi's marketing technical challenge. It comes with an [images](./images/) directory pre-populated with some images and a [data](./data/) directory with simple articles which will be used in the challenge.

## Instructions to run project locally

run the following command in base directory:

`npm install && npm run dev`

Working application can be found on http://localhost:3000

## Project Structure

-client: frontend created using create-react-app
--src:
---components: directory containing small components. This includes GalleryCard and ImageUploader components
---pages: directory containing pages of application
---hooks: directory containing custom hook for fetching images

-server: backend api and service created using NodeJs and ExpressJS
--index.js: entry point for server. API endpoints for image service are exposed here
--image.service.js: get and post image service
--images: directory containing images
--data: directory containing json file for articles.
---articles.json: file containing json data for articles associated with images

