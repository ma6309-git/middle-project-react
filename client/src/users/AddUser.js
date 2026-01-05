import { useState } from "react";
import { 
  Card, CardContent, CardActions, Typography, TextField, 
  Avatar, Box, Stack, Button, Divider 
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const navigate = useNavigate();

  // State מרכזי לכל השדות של המשתמש
  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    email: "",
    phone: "",
    address: ""
  });

  // פונקציה שמעדכנת את השדה המתאים לפי ה-name של ה-Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCreate = async () => {
    // בדיקת חובה - השם הוא Required ב-Schema שלך
    if (!formData.name.trim()) {
      alert("Name is required!");
      return;
    }

    try {
      await Axios.post("http://localhost:5000/api/users", formData);
      // אחרי ההצלחה - חזרה לרשימת המשתמשים
      navigate("/users"); 
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 5 }}>
      
      {/* כפתור חזרה */}
      <Box sx={{ width: 380, mb: 1 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate("/users")}
          sx={{ color: "#666" }}
        >
          Back to Users
        </Button>
      </Box>

      <Card sx={{ width: 380, borderRadius: 4, boxShadow: 10 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}>
            Create New User Profile
          </Typography>

          {/* חלק עליון - אוואטר ושם */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <Avatar sx={{ bgcolor: "#e0e0e0", color: "#424242", width: 60, height: 60, fontSize: 24 }}>
              {formData.name ? formData.name.charAt(0).toUpperCase() : <PersonAddIcon />}
            </Avatar>
            <Stack spacing={1} sx={{ flexGrow: 1 }}>
              <TextField 
                label="Full Name" 
                name="name" 
                variant="standard" 
                value={formData.name} 
                onChange={handleChange} 
                fullWidth 
              />
              <TextField 
                label="Username" 
                name="userName" 
                variant="standard" 
                value={formData.userName} 
                onChange={handleChange} 
                fullWidth 
              />
            </Stack>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* שאר הפרטים */}
          <Stack spacing={2}>
            <TextField 
              label="Email Address" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              fullWidth 
            />
            <TextField 
              label="Phone Number" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              fullWidth 
            />
            <TextField 
              label="Physical Address" 
              name="address" 
              value={formData.address} 
              onChange={handleChange} 
              fullWidth 
            />
          </Stack>
        </CardContent>

        <CardActions sx={{ p: 2 }}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleCreate}
            sx={{
              bgcolor: "#B3CEFF", // צבע כחול בהיר (מתאים למשתמשים)
              color: "#002D80",   // טקסט כחול כהה
              fontWeight: "bold",
              height: 50,
              borderRadius: 3,
              "&:hover": { bgcolor: "#99BEFF" }
            }}
          >
            CREATE USER
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default AddUser;