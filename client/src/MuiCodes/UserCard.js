import { Card, CardContent, CardActions, Typography, IconButton, TextField, Avatar, Box, Divider, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";

import { useState } from "react";

const UserCard = ({ user, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  const handleSave = () => {
    onUpdate(formData); // "משחילים" את כל האובייקט המעודכן לאבא
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Card sx={{ width: 350, borderRadius: 4, boxShadow: 5, m: 2 }}>
      <CardContent>
        {/* חלק עליון - שם ואוואטר */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Avatar sx={{ bgcolor: "#e0e0e0", color: "#424242", width: 60, height: 60 }}>
            {formData.name.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            {isEditing ? (
              <TextField size="small" name="name" value={formData.name} onChange={handleChange} label="Full Name" sx={{ mb: 1 }} />
            ) : (
              <Typography variant="h6" fontWeight="bold">{formData.name}</Typography>
            )}
            <Typography variant="body2" color="text.secondary">@{formData.userName}</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 1.5 }} />

        {/* פרטי קשר - כאן "משתילים" את האייקונים */}
        <Stack spacing={1.5}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <EmailIcon fontSize="small" color="action" />
            {isEditing ? (
              <TextField fullWidth size="small" name="email" value={formData.email} onChange={handleChange} />
            ) : (
              <Typography variant="body2">{formData.email}</Typography>
            )}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <PhoneIcon fontSize="small" color="action" />
            {isEditing ? (
              <TextField fullWidth size="small" name="phone" value={formData.phone} onChange={handleChange} />
            ) : (
              <Typography variant="body2">{formData.phone}</Typography>
            )}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <HomeIcon fontSize="small" color="action" />
            {isEditing ? (
              <TextField fullWidth size="small" name="address" value={formData.address} onChange={handleChange} />
            ) : (
              <Typography variant="body2">{formData.address}</Typography>
            )}
          </Box>
        </Stack>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end", bgcolor: "#f9f9f9", p: 1 }}>
        {isEditing ? (
          <IconButton onClick={handleSave} color="primary"><SaveIcon /></IconButton>
        ) : (
          <IconButton onClick={() => setIsEditing(true)}><EditIcon /></IconButton>
        )}
        <IconButton onClick={() => onDelete(user._id)} color="error"><DeleteIcon /></IconButton>
      </CardActions>
    </Card>
  );
};

export default UserCard;