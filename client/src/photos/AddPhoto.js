import { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Box,
  Button,
  CardMedia,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AddPhoto = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleCreate = async () => {
    if (!title || !imageUrl) return alert("Please fill all fields");
    try {
      await Axios.post("http://localhost:5000/api/photos", { title, imageUrl });
      navigate("/photos");
    } catch (e) {
      alert("Error saving photo");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 5,
      }}
    >
      <Box sx={{ width: 400, mb: 1 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/photos")}
          sx={{ color: "#004d40" }}
        >
          Back to Gallery
        </Button>
      </Box>

      <Card sx={{ width: 400, borderRadius: 4, boxShadow: 10 }}>
        {/* תצוגה מקדימה של התמונה שנוספת */}
        {imageUrl && (
          <CardMedia
            component="img"
            height="200"
            image={imageUrl}
            sx={{ bgcolor: "#f0f0f0" }}
          />
        )}

        <CardContent>
          <Typography
            variant="h6"
            sx={{ mb: 3, fontWeight: "bold", color: "#004d40" }}
          >
            Add New Photo
          </Typography>
          <TextField
            fullWidth
            label="Photo Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            label="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        </CardContent>

        <CardActions sx={{ p: 2 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleCreate}
            sx={{
              bgcolor: "#00796b",
              "&:hover": { bgcolor: "#004d40" },
              height: 50,
            }}
          >
            UPLOAD TO GALLERY
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default AddPhoto;
