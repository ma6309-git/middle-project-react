import { Outlet } from "react-router-dom";
import MainNav from "../MuiCodes/MainNav";
import Box from "@mui/material/Box";
import Header from "../MuiCodes/Header";

const Layout = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        height: "100vh",
      }}
    >
      {/* HEADER */}
      <Header />

      {/* MAIN AREA */}
      <Box sx={{ display: "flex", overflow: "hidden" }}>
        {/* SIDEBAR */}
        <Box
          sx={{
            width: 200,
            backgroundColor: "white",
            borderRight: "1px solid #ddd",
            p: 2,
            boxSizing: "border-box",
          }}
        >
          <MainNav />
        </Box>

        {/* CONTENT */}
        <Box
          sx={{
            flex: 1,
            p: 3,
            overflowY: "auto",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Outlet />
        </Box>
      </Box>

      {/* FOOTER */}
      <Box
        sx={{
          backgroundColor: "black",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
     © 2026 M.E. All rights reserved.
      </Box>
    </Box>
  );
};

export default Layout;
