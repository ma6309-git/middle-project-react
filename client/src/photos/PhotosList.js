import { useEffect, useState } from "react";
import Axios from "axios";
import PhotoCard from "../MuiCodes/PhotoCard";
import { Link } from "react-router-dom";
import { 
  Box, IconButton, Typography, TextField, 
  InputAdornment, Container 
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SearchIcon from "@mui/icons-material/Search";

const PhotosList = () => {
  const [photos, setPhotos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPhotos = async () => {
    try {
      const { data } = await Axios.get("http://localhost:5000/api/photos");
      setPhotos(data);
    } catch (error) { 
      console.error("Error fetching photos:", error); 
    }
  };

  useEffect(() => { 
    fetchPhotos(); 
  }, []);

  // פונקציית העדכון עם בדיקה שהכותרת לא ריקה
  const handleUpdate = async (id, updatedData) => {
    // בדיקה: אם אין כותרת או שהיא רק רווחים - אל תשלח לשרת
    if (!updatedData.title || updatedData.title.trim() === "") {
      alert("Error: Title cannot be empty!");
      return; 
    }

    try {
      await Axios.put("http://localhost:5000/api/photos", { id, ...updatedData });
      
      // עדכון הסטייט המקומי
      setPhotos(prev => prev.map(p => p._id === id ? { ...p, ...updatedData } : p));
      
      // רענון מהשרת (אופציונלי)
      fetchPhotos(); 
    } catch (error) { 
      console.error("Update failed:", error);
      alert("Failed to update photo.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await Axios.delete("http://localhost:5000/api/photos", { data: { id } });
      setPhotos(photos.filter(p => p._id !== id));
    } catch (error) { 
      console.error("Delete failed:", error); 
    }
  };

  // סינון לפי כותרת
  const filteredPhotos = photos.filter((p) =>
    p.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f2f7f6" }}>
      
      {/* שורת חיפוש דביקה */}
      <Box sx={{ 
        position: "sticky", 
        top: 0, 
        zIndex: 1100, 
        backgroundColor: "rgba(255, 255, 255, 0.9)", 
        backdropFilter: "blur(10px)",
        borderBottom: "2px solid #b2dfdb",
        py: 2,
        px: 4,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#004d40" }}>
          Photo Gallery
        </Typography>

        <TextField
          variant="outlined"
          placeholder="Search by title..."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: 300, bgcolor: "white", borderRadius: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#004d40" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Container maxWidth="xl" sx={{ mt: 4, pb: 6 }}>
        
        {/* כפתור הוספה צף - מתוקן */}
        <Box sx={{ position: "fixed", bottom: 40, right: 40, zIndex: 1200 }}>
          <IconButton
            component={Link}
            to="/photos/add"
            sx={{
              bgcolor: "#b2dfdb",
              color: "#004d40",
              width: 70, height: 70,
              boxShadow: 6,
              "&:hover": { bgcolor: "#80cbc4" },
            }}
          >
            <AddPhotoAlternateIcon sx={{ fontSize: 35 }} />
          </IconButton>
        </Box>

        {/* רשימת התמונות */}
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", justifyContent: "center" }}>
          {filteredPhotos.length > 0 ? (
            filteredPhotos.map((p) => (
              <PhotoCard 
                key={p._id} 
                photo={p} 
                onUpdate={(d) => handleUpdate(p._id, d)} 
                onDelete={handleDelete} 
              />
            ))
          ) : (
            <Typography sx={{ mt: 5, color: "gray" }}>
              {searchQuery ? "No results found." : "Loading photos..."}
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default PhotosList;