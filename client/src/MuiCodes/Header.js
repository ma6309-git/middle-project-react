import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import HubIcon from "@mui/icons-material/Hub"; // אייקון שמתאים למערכת ניהול נתונים

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "black", boxShadow: 0, borderBottom: "1px solid #333" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* צד שמאל - לוגו וטקסט */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          {/* האייקון עם גרדיאנט שמשלב את צבעי המערכת (ורוד וכחול) */}
          <HubIcon sx={{ 
            fontSize: 35, 
            p: 0.5,
            borderRadius: "10px",
            background: "linear-gradient(45deg, #FFB3B3 30%, #B3CEFF 90%)",
            color: "black" 
          }} />
          
          <Box>
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: "bold",
                lineHeight: 1,
                letterSpacing: 1,
                background: "linear-gradient(45deg, #FFB3B3 30%, #B3CEFF 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ENTITY HUB
            </Typography>
            <Typography variant="caption" sx={{ color: "#666", display: "block", fontWeight: "bold" }}>
              DATA MANAGEMENT
            </Typography>
          </Box>
        </Box>
        

        {/* צד ימין - יכול להישאר ריק או להכיל טקסט עדין */}
        <Typography variant="body2" sx={{ color: "#444", fontStyle: "italic" }}>
          v1.0.2
        </Typography>

      </Toolbar>
    </AppBar>
  );
};

export default Header;