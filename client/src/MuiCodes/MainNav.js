import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";

export default function MainNav() {
  const location = useLocation();

  const links = [
    { label: "Home", to: "/" },
    { label: "Todos", to: "/todos" },
    { label: "Add Todo", to: "/todos/add" },
    { label: "Users", to: "/users" },
    { label: "Posts", to: "/posts" },
    {label: "Photos", to: "/Photos" }
  ];

  return (
    <List>
      {links.map((link) => (
        <ListItem
          key={link.to}
          component={NavLink}
          to={link.to}
          sx={{
            textDecoration: "none",
            color: location.pathname === link.to ? "white" : "black",
            backgroundColor: location.pathname === link.to ? "black" : "white",
            mb: 1,
            borderRadius: 1,
            "&:hover": {
              textDecoration: "none",
              backgroundColor: location.pathname === link.to ? "black" : "#eee",
            },
          }}
        >
          {link.label}
        </ListItem>
      ))}
    </List>
  );
}
