// image upload component
import React, { useState } from "react";
import "./ImageUpload.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

const ImageUploadComponent = ({ refetchImages }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({}); // error for missing field values
  const [uploadError, setUploadError] = useState(null); // error for invalid file or upload error

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  //reset errors and field values when modal is closed
  const handleClose = () => {
    setShowModal(false);
    setSelectedFile(null);
    setTitle("");
    setDescription("");
    setErrors({});
  };

  // set appropriate error for specific fields
  const handleError = () => {
    const newErrors = {};

    if (!selectedFile) {
      newErrors.file = "Please select an image";
    }

    if (!title) {
      newErrors.title = "Please provide a title";
    }

    if (!description) {
      newErrors.description = "Please provide a description";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return true;
    }
    return false;
  };

  const handleUpload = async () => {
    if (handleError()) {
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("title", title);
    formData.append("description", description);

    // POST request for sending uploading image, title, and description
    try {
      const response = await fetch(`${API_URL}/images`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error uploading image");
      }

      await response.json();
      setUploadError(null);
      refetchImages();
      handleClose();
    } catch (error) {
      setUploadError(error.message);
    }
  };

  return (
    <div>
      <button className="upload-button" onClick={() => setShowModal(true)}>
        Upload Image
      </button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="modal-title">Upload Image</h2>
            <input type="file" onChange={handleFileUpload} />
            {errors.file && <div className="error">{errors.file}</div>}
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="Title"
            />
            {errors.title && <div className="error">{errors.title}</div>}
            <input
              type="text"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Description"
            />
            {errors.description && (
              <div className="error">{errors.description}</div>
            )}
            <button onClick={handleUpload}>Upload</button>
            <button onClick={handleClose}>Cancel</button>
            {uploadError && <div>Error uploading image: {uploadError}</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploadComponent;
