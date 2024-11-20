"use client";

import React, { useState, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import { db } from "@/app/config/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import AddCheckinModal from "./components/AddCheckinModal";
import CheckinCard from "./components/CheckinCard";

export default function Page() {
  const [checkins, setCheckins] = useState<
    { id: string; title: string; description: string; image: string; createdAt: string }[]
  >([]);
  const [openModal, setOpenModal] = useState(false);

  const fetchCheckins = async () => {
    try {
      const data = await getDocs(collection(db, "checkins"));
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

  const handleAddCheckin = async (title: string, description: string, image: File | null) => {
    try {
      const imageUrl = image ? URL.createObjectURL(image) : "";
      await addDoc(collection(db, "checkins"), {
        title,
        description,
        image: imageUrl,
        createdAt: new Date().toLocaleDateString(),
      });
      fetchCheckins();
      setOpenModal(false);
    } catch (error) {
      console.error("Error adding check-in:", error);
    }
  };

  useEffect(() => {
    fetchCheckins();
  }, []);

  return (
    <>
      <Navbar />
      <Header onAddCheckin={() => setOpenModal(true)} />
      <AddCheckinModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onAddCheckin={handleAddCheckin}
      />
      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Grid container spacing={3}>
          {checkins.map((checkin) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={checkin.id}>
              <CheckinCard
                title={checkin.title}
                description={checkin.description}
                image={checkin.image}
                createdAt={checkin.createdAt}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
