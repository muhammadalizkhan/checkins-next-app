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
        <Button startIcon={<FeedbackIcon />} variant="text" sx={{ color: "#6200ea" }}>
          Feedback
        </Button>
        <IconButton sx={{ color: "#6200ea" }}>
          <NotificationsIcon />
        </IconButton>
        <IconButton sx={{ color: "#6200ea", mr: 2 }}>
          <InfoIcon />
        </IconButton>
        <Avatar sx={{ bgcolor: "#6200ea", width: 32, height: 32 }}>JD</Avatar>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
