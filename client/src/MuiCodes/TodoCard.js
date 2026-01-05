import { Card, CardContent, CardActions, Typography, IconButton, TextField, Avatar, Box, Chip, Stack, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

const TodoCard = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [tags, setTags] = useState(todo.tags || []);
  const [addingTag, setAddingTag] = useState(false);
  const [newTag, setNewTag] = useState("");

  // צבע אפור קבוע לאוואטר
  const avatarStyle = { bgcolor: "#e0e0e0", color: "#424242", width: 50, height: 50, fontSize: 22 };

  const handleToggleCompleted = () => {
    // שולחים לאבא את הסטטוס ההפוך
    onUpdate({ title, tags, completed: !todo.completed });
  };

  const handleSave = () => {
    // שולחים לאבא את כל הנתונים החדשים
    onUpdate({ title, tags, completed: todo.completed });
    setIsEditing(false);
  };

  const handleAddTag = () => {
    if (newTag.trim()) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
    setAddingTag(false);
  };

  return (
    <Card sx={{ width: 380, borderRadius: 4, boxShadow: 6, mb: 3, mx: 1 }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 2 }}>
          <Avatar sx={avatarStyle}>{title.charAt(0).toUpperCase()}</Avatar>
          {isEditing ? (
            <TextField 
              fullWidth 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              size="small"
            />
          ) : (
            <Typography variant="h5" sx={{ textDecoration: todo.completed ? "line-through" : "none" }}>
              {todo.title}
            </Typography>
          )}
        </Box>

        <Stack direction="row" spacing={1} flexWrap="wrap" mb={1}>
          {tags.map((tag, i) => (
            <Chip 
              key={i} 
              label={tag} 
              onDelete={isEditing ? () => setTags(tags.filter((_, idx) => idx !== i)) : undefined}
              sx={{ bgcolor: "#f5f5f5" }}
            />
          ))}
        </Stack>

        {isEditing && (
          <Box sx={{ mt: 1 }}>
            {addingTag ? (
              <TextField
                size="small" autoFocus value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onBlur={handleAddTag}
                onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
              />
            ) : (
              <Chip icon={<AddIcon />} label="Add" variant="outlined" onClick={() => setAddingTag(true)} />
            )}
          </Box>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
        <Button
          variant={todo.completed ? "outlined" : "contained"}
          color={todo.completed ? "success" : "error"}
          onClick={handleToggleCompleted}
        >
          {todo.completed ? "Completed" : "Mark as Done"}
        </Button>

        <Box>
          {isEditing ? (
            <IconButton onClick={handleSave} color="primary"><SaveIcon /></IconButton>
          ) : (
            <IconButton onClick={() => setIsEditing(true)}><EditIcon /></IconButton>
          )}
          <IconButton color="error" onClick={() => onDelete(todo._id)}><DeleteIcon /></IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

export default TodoCard;