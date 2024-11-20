"use client";

import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";
import { db } from "@/app/config/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import NotificationsIcon from "@mui/icons-material/Notifications";
import InfoIcon from "@mui/icons-material/Info";
import FeedbackIcon from "@mui/icons-material/Feedback";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

export default function Page() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [openModal, setOpenModal] = useState(false);

  interface Checkin {
    id: string;
    title: string;
    description: string;
    image?: string;
    createdAt?: string;
  }

  const [checkins, setCheckins] = useState<Checkin[]>([]);
  const checkinsCollection = collection(db, "checkins");

  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleAddCheckin = async () => {
    if (!title || !description) {
      alert("Title and Description are required!");
      return;
    }

    try {
      let imageUrl = "";
      if (image) {
        imageUrl = URL.createObjectURL(image);
      }
      await addDoc(checkinsCollection, {
        title,
        description,
        image: imageUrl,
        createdAt: getCurrentDate(),
      });
      setTitle("");
      setDescription("");
      setImage(null);
      fetchCheckins();
      setOpenModal(false);
    } catch (error) {
      console.error("Error adding check-in:", error);
    }
  };

  const fetchCheckins = async () => {
    try {
      const data = await getDocs(checkinsCollection);
      setCheckins(
        data.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            description: data.description,
            image: data.image,
            createdAt: data.createdAt,
          };
        })
      );
    } catch (error) {
      console.error("Error fetching check-ins:", error);
    }
  };

  useEffect(() => {
    fetchCheckins();
  }, []);

  return (
    <Box>
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
            onClick={() => setOpenModal(true)}
          >
            Add Check-in
          </Button>
        </Box>
      </Box>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 500,
              bgcolor: "background.paper",
              borderRadius: "12px",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                textAlign: "left",
                fontWeight: "600",
                fontSize: "20px",
                color: "#333",
              }}
            >
              Add Check In
            </Typography>
            <TextField
              label="Title"
              placeholder="Enter title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  fontSize: "14px",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "14px",
                },
              }}
            />
            <TextField
              label="Description"
              placeholder="Enter description"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              margin="normal"
              multiline
              rows={3}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  fontSize: "14px",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "14px",
                },
              }}
            />
            <Box
              sx={{
                border: "2px dashed #6200ea",
                borderRadius: "8px",
                textAlign: "center",
                padding: "24px",
                mt: 2,
                cursor: "pointer",
              }}
              onClick={() => document.getElementById("upload-image")?.click()}
            >
              <CloudUploadOutlinedIcon sx={{ fontSize: 48, color: "#6200ea" }} />
              <Typography
                variant="body1"
                sx={{
                  mt: 1,
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#6200ea",
                }}
              >
                Click or drag file to this area to upload
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "#666",
                  fontSize: "12px",
                }}
              >
                Support for a single or bulk upload.
              </Typography>
              <input
                id="upload-image"
                type="file"
                style={{ display: "none" }}
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setImage(e.target.files[0]);
                  }
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                mt: 4,
              }}
            >
              <Button
                onClick={() => setOpenModal(false)}
                sx={{
                  marginRight: "1rem",
                  color: "#666",
                  textTransform: "capitalize",
                  fontWeight: "500",
                  fontSize: "14px",
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleAddCheckin}
                sx={{
                  backgroundColor: "#6200ea",
                  color: "#fff",
                  textTransform: "capitalize",
                  padding: "8px 24px",
                  fontWeight: "bold",
                  fontSize: "14px",
                  borderRadius: "8px",
                }}
              >
                Add
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
          Added Check-ins
        </Typography>
      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Stack
          direction="row"
          flexWrap="wrap"
          spacing={3}
          justifyContent="flex-start"
        >
          {checkins.map((checkin) => (
            <Card
              key={checkin.id}
              sx={{
                width: "300px",
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
                image={checkin.image || "/placeholder-image.jpg"}
                alt={checkin.title}
              />
              <CardContent sx={{ padding: "16px" }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "600", fontSize: "16px", marginBottom: "8px" }}
                >
                  {checkin.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: "14px", marginBottom: "8px" }}
                >
                  {checkin.description}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontSize: "12px", display: "block", marginBottom: "8px" }}
                >
                  {checkin.createdAt}
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

          ))}
        </Stack>
      </Container>
    </Box>
  );
}
