"use client";

import React from "react";
import { Box, Typography, Button } from "@mui/material";

interface HeaderProps {
  onAddCheckin: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddCheckin }) => {
  return (
    <Box
      sx={{
        position: "relative",
        height: "300px",
        backgroundImage: `url('/header.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "12px",
        margin: "20px",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "10%",
          transform: "translateY(-50%)",
          color: "#fff",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          Hi! 👋 James Doe
        </Typography>
        <Typography sx={{ fontSize: "18px", mt: 1 }}>
          Lorem ipsum dolor sit amet, something important to say here.
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#6200ea",
            mt: 2,
          }}
          onClick={onAddCheckin}
        >
          Add Check-in
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
