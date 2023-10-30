import React, {useState, useEffect} from 'react';
import ImageUpload from '../Components/ImageUpload';
import useImageFetcher from '../Hooks/useImageFetcher';
import GalleryCard from '../Components/GalleryCard';
import './GalleryPage.css';

const API_URL = "http://localhost:8000"
const GalleryPage = () => {
  const [articles, setArticles] = useState([])
  const { images, loading, error, refetchImages } = useImageFetcher();

  useEffect(() => {
    if(images.length > 0) {
      setArticles(images);
    }
  }, [images]);

  return (
    loading ? 
    <div>Loading...</div> : 
    <div className="gallery">
      {error && <div>Error fetching images: {error}</div>}
      <h1>Connect people & spaces</h1>
      {articles && articles.map((image, index) => (
        <GalleryCard key={index} title={image.title} description={image.description} imageUrl={API_URL+image.imageUrl}/>
      ))}
      <ImageUpload refetchImages={refetchImages} />
    </div>
  );
};

export default GalleryPage;
