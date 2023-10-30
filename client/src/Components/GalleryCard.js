import React from "react";

const GalleryCard = ({ title, description, imageUrl }) => {
  return (
    <div className="card">
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
      </div>
      <img src={imageUrl} alt={title} />
    </div>
  );
};

export default GalleryCard;
