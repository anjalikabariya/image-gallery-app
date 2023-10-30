import { useState, useEffect } from 'react';
const API_URL = 'http://localhost:8000';

const useImageFetcher = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchImages = () => {
    try {
      fetch(`${API_URL}/images`)
      .then(response => response.json())
      .then(data => {
        setImages(data)
        setLoading(false);
      })
      .catch(error => {throw new Error('Failed to fetch images')});
      
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return { images, loading, error, refetchImages: fetchImages };
};

export default useImageFetcher;
