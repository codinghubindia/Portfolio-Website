import { useState, useEffect } from 'react';

export const useImagePreload = (imageUrls: string[]) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const loadImage = (url: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve();
        img.onerror = reject;
      });
    };

    Promise.all(imageUrls.map(url => loadImage(url)))
      .then(() => setImagesLoaded(true))
      .catch(err => console.error('Error preloading images:', err));
  }, [imageUrls]);

  return imagesLoaded;
}; 