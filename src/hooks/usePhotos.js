import { useState, useEffect } from 'react';

const usePhotos = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const getPhotos = async () => {
      try {
        setPhotos(await (await fetch('/api/photos')).json());
      } catch (err) {
        console.log(err);
        setTimeout(getPhotos, 1000);
      }
    };

    getPhotos();
  }, []);

  return { photos };
};

export default usePhotos;
