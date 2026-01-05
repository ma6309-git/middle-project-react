import { Outlet } from "react-router-dom";
import MainNav from "../MuiCodes/MainNav";
import Box from "@mui/material/Box";
import Header from "../MuiCodes/Header";
import { Typography } from "@mui/material";

const Layout = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        height: "100vh",
        bgcolor: "#fcfcfc", // רקע כמעט לבן, נקי מאוד
      }}
    >
      {/* HEADER - שומרים על השחור אבל עם צל עדין מאוד */}
      <Header />

      {/* MAIN AREA */}
      <Box sx={{ display: "flex", overflow: "hidden" }}>
        
        {/* SIDEBAR - לבן, נקי, עם צל עדין במקום קו חותך */}
        <Box
          sx={{
            width: 240,
            backgroundColor: "white",
            // במקום borderRight בולט, שמתי צל עדין שנותן עומק
            boxShadow: "4px 0 12px rgba(0,0,0,0.03)", 
            p: 3,
            boxSizing: "border-box",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* כותרת קטנה מעל התפריט ליופי */}
          <Typography 
            variant="overline" 
            sx={{ color: "#aaa", fontWeight: "bold", mb: 2, ml: 1, letterSpacing: 1.5 }}
          >
            Menu
          </Typography>
          
          <MainNav />
        </Box>

        {/* CONTENT AREA */}
        <Box
          sx={{
            flex: 1,
            p: 4,
            overflowY: "auto",
            backgroundColor: "#fafafa", // אפור בהיר מאוד שנותן ניגודיות לכרטיסים הלבנים
          }}
        >
          {/* ה-Container הזה דואג שהתוכן לא יתפרס יותר מדי לצדדים במסכים גדולים */}
          <Box sx={{ maxWidth: "1400px", mx: "auto" }}>
            <Outlet />
          </Box>
        </Box>
      </Box>

      {/* FOOTER - פשוט, דק ולא משתלט */}
      <Box
        sx={{
          backgroundColor: "#f1f1f1",
          color: "#888",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 1.5,
          fontSize: "0.8rem",
          borderTop: "1px solid #eee"
        }}
      >
        © {new Date().getFullYear()} • <strong>Entity Hub</strong> • Built with Precision
      </Box>
    </Box>
  );
};

export default Layout;