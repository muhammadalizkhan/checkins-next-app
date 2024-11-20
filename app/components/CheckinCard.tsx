"use client";

import React from "react";
import { Card, CardMedia, CardContent, Typography, Box, Avatar } from "@mui/material";

interface CheckinCardProps {
  title: string;
  description: string;
  image?: string;
  createdAt?: string;
}

const CheckinCard: React.FC<CheckinCardProps> = ({
  title,
  description,
  image,
  createdAt,
}) => {
  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: "12px",
        boxShadow: 2,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "10px",
          right: "10px",
          backgroundColor: "#6200ea",
          color: "#fff",
          padding: "4px 12px",
          borderRadius: "8px",
          fontSize: "12px",
          fontWeight: "bold",
          zIndex: 1,
        }}
      >
        Checked In
      </Box>
      <CardMedia
        component="img"
        height="150"
        image={image || "/placeholder-image.jpg"}
        alt={title}
      />
      <CardContent sx={{ padding: "16px" }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: "600", fontSize: "16px", marginBottom: "8px" }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: "14px", marginBottom: "8px" }}
        >
          {description}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontSize: "12px", display: "block", marginBottom: "8px" }}
        >
          {createdAt}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "12px",
            gap: "8px",
          }}
        >
          <Avatar sx={{ width: 32, height: 32, bgcolor: "#6200ea" }}>U</Avatar>
          <Typography variant="body2" sx={{ fontSize: "14px", fontWeight: "500" }}>
            Admin user
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CheckinCard;
