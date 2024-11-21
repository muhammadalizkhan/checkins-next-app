"use client";

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import InfoIcon from "@mui/icons-material/Info";
import FeedbackIcon from "@mui/icons-material/Feedback";

const Navbar: React.FC = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600, color: "#333" }}>
          CheckIns
        </Typography>
        <Button startIcon={<FeedbackIcon />} variant="text" sx={{ color: "#877b9e" }}>
          Feedback
        </Button>
        <IconButton sx={{ color: "#877b9e" }}>
          <NotificationsIcon />
        </IconButton>
        <IconButton sx={{ color: "#877b9e", mr: 2 }}>
          <InfoIcon />
        </IconButton>
        <Avatar sx={{ bgcolor: "#877b9e", width: 32, height: 32 }}>Admin</Avatar>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
