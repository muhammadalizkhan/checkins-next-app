"use client";

import React, { useState } from "react";
import {
  Box,
  Modal,
  Backdrop,
  Fade,
  Typography,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

interface AddCheckinModalProps {
  open: boolean;
  onClose: () => void;
  onAddCheckin: (title: string, description: string, image: File | null) => void;
}

const AddCheckinModal: React.FC<AddCheckinModalProps> = ({
  open,
  onClose,
  onAddCheckin,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detect mobile screen size

  const handleAdd = () => {
    onAddCheckin(title, description, image);
    setTitle("");
    setDescription("");
    setImage(null);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isMobile ? "90%" : 500,
            bgcolor: "background.paper",
            borderRadius: "12px",
            boxShadow: 24,
            p: isMobile ? 2 : 4,
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
              onClick={onClose}
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
              onClick={handleAdd}
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
  );
};

export default AddCheckinModal;
