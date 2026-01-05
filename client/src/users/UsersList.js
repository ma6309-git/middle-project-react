import { useEffect, useState } from "react";
import Axios from "axios";
import UserCard from "../MuiCodes/UserCard"; 
import { Link } from "react-router-dom";
import { 
  Box, IconButton, Typography, TextField, 
  InputAdornment, Container 
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  // 1. סטייט לחיפוש
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUsers = async () => {
    try {
      const { data } = await Axios.get("http://localhost:5000/api/users");
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdate = async (id, updatedData) => {
    try {
      await Axios.put("http://localhost:5000/api/users", { id, ...updatedData });
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, ...updatedData } : u))
      );
    } catch (error) { alert("Update failed"); }
  };

  const handleDelete = async (id) => {
    try {
      await Axios.delete("http://localhost:5000/api/users", { data: { id } });
      setUsers(users.filter((u) => u._id !== id));
    } catch (error) { alert("Delete failed"); }
  };

  // 2. לוגיקת סינון מתקדמת (Name, Username, Email, Phone)
  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.name?.toLowerCase().includes(query) ||
      user.userName?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query) ||
      user.phone?.toLowerCase().includes(query)
    );
  });

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f4f7ff" }}>
      
      {/* --- שורת חיפוש דביקה (Sticky) בצבע כחול --- */}
      <Box sx={{ 
        position: "sticky", 
        top: 0, 
        zIndex: 1100, 
        backgroundColor: "rgba(255, 255, 255, 0.92)", 
        backdropFilter: "blur(10px)",
        borderBottom: "2px solid #B3CEFF",
        py: 2,
        px: 4,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0px 4px 15px rgba(0, 45, 128, 0.05)"
      }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#002D80" }}>
          System Users
        </Typography>

        <TextField
          variant="outlined"
          placeholder="Search name, email, phone..."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ 
            width: 400,
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              backgroundColor: "#fff",
              "& fieldset": { borderColor: "#B3CEFF" },
              "&:hover fieldset": { borderColor: "#002D80" },
              "&.Mui-focused fieldset": { borderColor: "#002D80" },
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#002D80" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Container maxWidth="xl" sx={{ mt: 4, pb: 6 }}>
        
        {/* כפתור הוספת משתמש קבוע */}
        <Box sx={{ position: "fixed", bottom: 40, right: 40, zIndex: 1200 }}>
          <IconButton
            component={Link}
            to="/users/add"
            sx={{
              bgcolor: "#B3CEFF",
              color: "#002D80",
              width: 70, height: 70,
              boxShadow: 6,
              "&:hover": { 
                bgcolor: "#99BEFF",
                transform: "scale(1.1)" 
              },
              transition: "0.3s"
            }}
          >
            <PersonAddIcon sx={{ fontSize: 35 }} />
          </IconButton>
        </Box>

        {/* הצגת המשתמשים המפולטרים */}
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <UserCard
                key={user._id}
                user={user}
                onUpdate={(updatedData) => handleUpdate(user._id, updatedData)}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <Box sx={{ textAlign: "center", mt: 10 }}>
              <Typography variant="h6" sx={{ color: "#002D80", opacity: 0.6 }}>
                {searchQuery ? `No users found matching "${searchQuery}"` : "No users in system."}
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default UsersList;