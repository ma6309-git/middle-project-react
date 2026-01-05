import { useState } from "react";
import { Card, CardContent, CardActions, Typography, TextField, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AddPost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleCreate = async () => {
    if (!title) return alert("Title is required");
    await Axios.post("http://localhost:5000/api/posts", { title, body });
    navigate("/posts");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 5 }}>
      <Box sx={{ width: 500, mb: 1 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate("/posts")}>Back</Button>
      </Box>
      <Card sx={{ width: 500, borderRadius: 4, boxShadow: 8 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 3, color: "#4a148c", fontWeight: "bold" }}>New Post</Typography>
          <TextField 
            fullWidth label="Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            sx={{ mb: 3 }} 
          />
          <TextField 
            fullWidth label="Content" 
            multiline rows={6} 
            value={body} 
            onChange={(e) => setBody(e.target.value)} 
          />
        </CardContent>
        <CardActions sx={{ p: 2 }}>
          <Button fullWidth variant="contained" onClick={handleCreate} sx={{ bgcolor: "#4a148c", color: "#fff", height: 50 }}>
            PUBLISH POST
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default AddPost;