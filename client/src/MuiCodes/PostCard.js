import { Card, CardContent, CardActions, Typography, IconButton, TextField, Box, Divider, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

const PostCard = ({ post, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  // פונקציה לעיצוב התאריך שמגיע מה-Database (createdAt)
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("he-IL", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSave = () => {
    onUpdate({ title, body });
    setIsEditing(false);
  };

  return (
    <Card sx={{ width: 400, borderRadius: 3, boxShadow: 4, display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ flexGrow: 1 }}>
        {isEditing ? (
          <Stack spacing={2}>
            <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
            <TextField label="Body" value={body} onChange={(e) => setBody(e.target.value)} multiline rows={4} fullWidth />
          </Stack>
        ) : (
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#4a148c", mb: 0.5 }}>
              {post.title}
            </Typography>
            
            {/* כאן התיקון - מציג את התאריך המקורי של האובייקט */}
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 2 }}>
              פורסם ב: {formatDate(post.createdAt)}
            </Typography>
            
            <Divider sx={{ mb: 2 }} />
            
            <Typography variant="body2" color="text.primary" sx={{ lineHeight: 1.6, whiteSpace: "pre-line" }}>
              {post.body}
            </Typography>
          </Box>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end", p: 2, bgcolor: "#f3e5f5" }}>
        {isEditing ? (
          <IconButton onClick={handleSave} sx={{ color: "#4a148c" }}><SaveIcon /></IconButton>
        ) : (
          <IconButton onClick={() => setIsEditing(true)} sx={{ color: "#7b1fa2" }}><EditIcon /></IconButton>
        )}
        <IconButton onClick={() => onDelete(post._id)} color="error"><DeleteIcon /></IconButton>
      </CardActions>
    </Card>
  );
};

export default PostCard;