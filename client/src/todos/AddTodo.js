import { useState } from "react";
import { 
  Card, CardContent, CardActions, Typography, TextField, 
  Avatar, Box, Chip, Stack, Button 
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const AddTodo = () => {
  const navigate = useNavigate();
  
  // State עבור השדות החדשים
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [addingTag, setAddingTag] = useState(false);

  // פונקציה להוספת תגית למערך המקומי
  const handleAddTag = () => {
    if (newTag.trim()) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
    setAddingTag(false);
  };

  // פונקציית השמירה (POST)
  const handleCreate = async () => {
    if (!title.trim()) {
      alert("Please enter a title");
      return;
    }

    try {
      await Axios.post("http://localhost:5000/api/todos", {
        title: title,
        tags: tags
      });
      
      // אחרי ההוספה - חזרה לדף הבית
      navigate("/todos");
    } catch (error) {
      console.error("Error creating todo:", error);
      alert("Failed to create todo");
    }
  };

  return (
    <Box sx={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      mt: 5 
    }}>
      {/* כפתור חזרה */}
      <Box sx={{ width: 380, mb: 1 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate("/todos")}
          sx={{ color: "#666" }}
        >
          Back to list
        </Button>
      </Box>

      <Card sx={{ width: 380, borderRadius: 4, boxShadow: 10 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold", color: "#333" }}>
            Create New Task
          </Typography>

          {/* Header - Avatar + Input */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <Avatar sx={{ bgcolor: "#e0e0e0", color: "#424242", width: 55, height: 55, fontSize: 24 }}>
              {title ? title.charAt(0).toUpperCase() : "?"}
            </Avatar>
            
            <TextField
              fullWidth
              label="What needs to be done?"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </Box>

          {/* Tags Section */}
          <Typography variant="body2" sx={{ mb: 1, color: "#777" }}>Tags:</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ minHeight: 40 }}>
            {tags.map((tag, i) => (
              <Chip
                key={i}
                label={tag}
                onDelete={() => setTags(tags.filter((_, idx) => idx !== i))}
                sx={{ bgcolor: "#f5f5f5", mb: 1 }}
              />
            ))}
            
            {addingTag ? (
              <TextField
                size="small"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onBlur={handleAddTag}
                onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                sx={{ width: 100 }}
              />
            ) : (
              <Chip
                icon={<AddIcon />}
                label="Add Tag"
                variant="outlined"
                onClick={() => setAddingTag(true)}
                sx={{ mb: 1, cursor: "pointer" }}
              />
            )}
          </Stack>
        </CardContent>

        <CardActions sx={{ p: 2, pt: 0 }}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleCreate}
            sx={{
              bgcolor: "#FFB3B3",
              color: "#800000",
              fontWeight: "bold",
              height: 50,
              borderRadius: 3,
              "&:hover": { bgcolor: "#FF9999" }
            }}
          >
            ADD TASK
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default AddTodo;