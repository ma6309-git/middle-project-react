import { Card, CardContent, CardActions, Typography, IconButton, TextField, Box, CardMedia, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

const PhotoCard = ({ photo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(photo.title);
  const [imageUrl, setImageUrl] = useState(photo.imageUrl);

  // פונקציה לעיצוב התאריך
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("he-IL", {
      year: "numeric", month: "short", day: "numeric"
    });
  };

  const handleSave = () => {
    onUpdate({ title, imageUrl });
    setIsEditing(false);
  };

  return (
    <Card sx={{ width: 220, borderRadius: 3, boxShadow: 3, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      
      {/* תצוגת התמונה - ללא חיתוך (contain) */}
      <CardMedia
        component="img"
        height="180" 
        image={photo.imageUrl || "https://via.placeholder.com/400x200?text=No+Image"}
        alt={photo.title}
        sx={{ 
          objectFit: "contain", // מונע מהתמונה להיחתך - רואים את כולה
          bgcolor: "#f5f5f5",   // רקע אפור עדין למקרה שהתמונה לא ממלאת את כל הריבוע
          p: 1                  // רווח קטן מסביב לתמונה
        }}
      />
      
      <CardContent sx={{ p: 1.5, flexGrow: 1 }}>
        {isEditing ? (
          <Stack spacing={1}>
            <TextField label="Title" size="small" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
            <TextField label="URL" size="small" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} fullWidth />
          </Stack>
        ) : (
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#00796b", lineHeight: 1.2, mb: 0.5 }}>
              {photo.title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatDate(photo.createdAt)}
            </Typography>
          </Box>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end", p: 0.5, bgcolor: "#e0f2f1" }}>
        {isEditing ? (
          <IconButton size="small" onClick={handleSave} color="primary">
            <SaveIcon fontSize="small" />
          </IconButton>
        ) : (
          <IconButton size="small" onClick={() => setIsEditing(true)} sx={{ color: "#00796b" }}>
            <EditIcon fontSize="small" />
          </IconButton>
        )}
        <IconButton size="small" color="error" onClick={() => onDelete(photo._id)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default PhotoCard;