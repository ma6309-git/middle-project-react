import { useEffect, useState } from "react";
import Axios from "axios";
import PostCard from "../MuiCodes/PostCard";
import { Link } from "react-router-dom";
import { 
  Box, IconButton, Typography, TextField, 
  InputAdornment, Container 
} from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import SearchIcon from "@mui/icons-material/Search";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  // 1. סטייט לחיפוש
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPosts = async () => {
    try {
      const { data } = await Axios.get("http://localhost:5000/api/posts");
      setPosts(data);
    } catch (error) { console.error(error); }
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleUpdate = async (id, updatedData) => {
    await Axios.put("http://localhost:5000/api/posts", { id, ...updatedData });
    setPosts(prev => prev.map(p => p._id === id ? { ...p, ...updatedData } : p));
  };

  const handleDelete = async (id) => {
    await Axios.delete("http://localhost:5000/api/posts", { data: { id } });
    setPosts(posts.filter(p => p._id !== id));
  };

  // 2. לוגיקת סינון לפי BODY (תוכן הפוסט)
  const filteredPosts = posts.filter((post) =>
    post.body?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fbf9ff" }}>
      
      {/* --- שורת חיפוש דביקה (Sticky) --- */}
      <Box sx={{ 
        position: "sticky", 
        top: 0, 
        zIndex: 1100, 
        backgroundColor: "rgba(255, 255, 255, 0.9)", // לבן חצי שקוף
        backdropFilter: "blur(8px)", // אפקט טשטוש יוקרתי
        borderBottom: "2px solid #e1bee7",
        py: 2,
        px: 4,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0px 4px 12px rgba(74, 20, 140, 0.05)"
      }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#4a148c" }}>
          Community Feed
        </Typography>

        <TextField
          variant="outlined"
          placeholder="Search in posts..."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ 
            width: 350,
            "& .MuiOutlinedInput-root": {
              borderRadius: 4,
              "& fieldset": { borderColor: "#e1bee7" },
              "&:hover fieldset": { borderColor: "#4a148c" },
              "&.Mui-focused fieldset": { borderColor: "#4a148c" },
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#4a148c" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* --- תוכן הפוסטים --- */}
      <Container maxWidth="xl" sx={{ mt: 4, pb: 6 }}>
        
        {/* כפתור הוספת פוסט - מיקום קבוע */}
        <Box sx={{ position: "fixed", bottom: 40, right: 40, zIndex: 1200 }}>
          <IconButton
            component={Link}
            to="/posts/add"
            sx={{
              bgcolor: "#e1bee7",
              color: "#4a148c",
              width: 70, height: 70,
              boxShadow: 6,
              "&:hover": { 
                bgcolor: "#d1c4e9",
                transform: "scale(1.1)" 
              },
              transition: "all 0.3s ease"
            }}
          >
            <PostAddIcon sx={{ fontSize: 35 }} />
          </IconButton>
        </Box>

        {/* הצגת הפוסטים המפולטרים */}
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", justifyContent: "center" }}>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCard 
                key={post._id} 
                post={post} 
                onUpdate={(data) => handleUpdate(post._id, data)} 
                onDelete={handleDelete} 
              />
            ))
          ) : (
            <Box sx={{ textAlign: "center", mt: 10 }}>
              <Typography variant="h6" sx={{ color: "#9c27b0", fontStyle: "italic" }}>
                {searchQuery ? `No posts found containing "${searchQuery}"` : "No posts available."}
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default PostsList;