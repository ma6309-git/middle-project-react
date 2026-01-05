import { useEffect, useState } from "react";
import Axios from "axios";
import TodoCard from "../MuiCodes/TodoCard"; 
import { Link } from "react-router-dom";
import { 
  Box, IconButton, Typography, TextField, 
  InputAdornment, Container 
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

const TodosList = () => {
  const [todos, setTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchTodos = async () => {
    try {
      const { data } = await Axios.get("http://localhost:5000/api/todos");
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleUpdate = async (id, updatedData) => {
    try {
      await Axios.put("http://localhost:5000/api/todos", { id, ...updatedData });
      setTodos((prev) => prev.map((t) => t._id === id ? { ...t, ...updatedData } : t));
    } catch (error) { console.error(error); }
  };

  const handleDelete = async (id) => {
    try {
      await Axios.delete("http://localhost:5000/api/todos", { data: { id } });
      setTodos(todos.filter((t) => t._id !== id));
    } catch (error) { console.error(error); }
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f9f9f9" }}>
      
      {/* --- שורת החיפוש ה"דביקה" --- */}
      <Box sx={{ 
        position: "sticky", 
        top: 0,           // נצמד לקצה העליון של המסך
        zIndex: 1100,     // מעל הכרטיסים
        backgroundColor: "rgba(255, 255, 255, 0.95)", // לבן מעט שקוף (אפקט זכוכית)
        backdropFilter: "blur(4px)", // טשטוש עדין של מה שמתחת
        borderBottom: "1px solid #e0e0e0",
        py: 2,
        px: 4,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0px 2px 10px rgba(0,0,0,0.05)"
      }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333" }}>
          My Tasks
        </Typography>

        <TextField
          variant="outlined"
          placeholder="Search title..."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ 
            width: 300,
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              "& fieldset": { borderColor: "#ddd" },
              "&:hover fieldset": { borderColor: "#FFB3B3" },
              "&.Mui-focused fieldset": { borderColor: "#FFB3B3" },
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#FFB3B3" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* --- תוכן הרשימה --- */}
      <Container maxWidth="xl" sx={{ mt: 4, pb: 4 }}>
        
        {/* כפתור הוספה צף - נשאר קבוע יחסית למסך */}
        <Box sx={{ position: "fixed", bottom: 40, right: 40, zIndex: 1200 }}>
          <IconButton
            component={Link}
            to="/todos/add"
            sx={{
              bgcolor: "#FFB3B3",
              color: "#800000",
              width: 70, height: 70,
              boxShadow: 6,
              "&:hover": { bgcolor: "#FFCCCC", transform: "scale(1.1)" },
              transition: "0.2s"
            }}
          >
            <AddIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </Box>

        <Box sx={{ 
            display: "flex", 
            gap: 3, 
            flexWrap: "wrap", 
            justifyContent: "center" // מרכז את הכרטיסים למראה נקי יותר
        }}>
          {filteredTodos.length > 0 ? (
            filteredTodos.map((todo) => (
              <TodoCard
                key={todo._id}
                todo={todo}
                onUpdate={(updatedData) => handleUpdate(todo._id, updatedData)}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <Typography sx={{ color: "#999", mt: 10, fontSize: "1.2rem" }}>
              {searchQuery ? `No tasks match "${searchQuery}"` : "Your list is empty."}
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default TodosList;