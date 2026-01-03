import { useEffect, useState } from "react";
import Axios from "axios";


const PhotosList = () => {
  const [photos, setPhotos] = useState([]);
  const fetchPhotos = async () => {
    const { data } = await Axios.get("http://localhost:5000/api/photos");
    setPhotos(data);
  };
  useEffect(() => {
    fetchPhotos();
  }, []);
  if (photos.length === 0) return <h1>Louding</h1>;
  return (
    <>
      {photos.map((photo, index) => {
        return <div key={index} style={{ textAlign: "center" }}>
          <img
            src={photo.imageUrl}
            alt={photo.name}
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
          <h3>{photo.title}</h3>
        </div>
      })}
    </>
  );
};

export default PhotosList;
