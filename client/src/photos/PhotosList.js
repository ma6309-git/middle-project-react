import { useEffect, useState } from "react";
import Axios from "axios";
import PhotoCard from "../MuiCodes/PhotoCard";
import { Link } from "react-router-dom";
import { Box, IconButton, Typography } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const PhotosList = () => {
  const [photos, setPhotos] = useState([]);

  const fetchPhotos = async () => {
    try {
      const { data } = await Axios.get("http://localhost:5000/api/photos");
      setPhotos(data);
    } catch (error) { console.error(error); }
  };

  useEffect(() => { fetchPhotos(); }, []);

  const handleUpdate = async (id, updatedData) => {
    await Axios.put("http://localhost:5000/api/photos", { id, ...updatedData });
    setPhotos(prev => prev.map(p => p._id === id ? { ...p, ...updatedData } : p));
    fetchPhotos(); // רענון מהשרת כדי לקבל updatedAt מעודכן אם צריך
  };

  const handleDelete = async (id) => {
    await Axios.delete("http://localhost:5000/api/photos", { data: { id } });
    setPhotos(photos.filter(p => p._id !== id));
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold", color: "#004d40" }}>
        Photo Gallery
      </Typography>

      <Box sx={{ position: "fixed", top: 90, right: 70, zIndex: 1000 }}>
        <IconButton
          component={Link}
          to="/photos/add"
          sx={{
            bgcolor: "#b2dfdb",
            color: "#004d40",
            width: 60, height: 60, boxShadow: 3,
            "&:hover": { bgcolor: "#80cbc4" },
          }}
        >
          <AddPhotoAlternateIcon sx={{ fontSize: 35 }} />
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        {photos.length > 0 ? (
          photos.map((p) => (
            <PhotoCard key={p._id} photo={p} onUpdate={(d) => handleUpdate(p._id, d)} onDelete={handleDelete} />
          ))
        ) : (
          <Typography color="text.secondary">הגלריה ריקה...</Typography>
        )}
      </Box>
    </Box>
  );
};

export default PhotosList;