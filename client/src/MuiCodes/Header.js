import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "black" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* רווח שמאלי – אפשר להשאיר ריק */}
        <Box sx={{ width: 100 }} />

        {/* כותרת במרכז */}
        <Typography variant="h6" sx={{ textAlign: "center", flexGrow: 1 }}>
          My App Header
        </Typography>

        {/* שורת חיפוש מימין */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.15)",
            px: 2,
            borderRadius: 1,
          }}
        >
          <SearchIcon />
          <InputBase placeholder="Search…" sx={{ ml: 1, color: "inherit" }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;