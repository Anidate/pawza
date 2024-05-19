import { Box, Typography } from "@mui/material";
import { useState } from "react";

import ImageCard from "./ImageCard";
import PawButton from "./PawButton";
import userData from "./UserData";

function Home() {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);

  const handleNextUser = () => {
    setCurrentUserIndex((prevIndex) => (prevIndex + 1) % userData.length);
  };

  const handlePreviousUser = () => {
    setCurrentUserIndex(
      (prevIndex) => (prevIndex - 1 + userData.length) % userData.length
    );
  };

  const currentUser = userData[currentUserIndex];

  return (
    <Box
      sx={{
        padding: "1rem",
        height: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "end",
        gap: "3rem",
      }}
    >
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        <ImageCard src={currentUser.image} style={{ borderRadius: "16px" }} />

        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            padding: "0.5rem",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            color: "white",
            width: "100%",
            boxSizing: "border-box",
            borderRadius: "0 0 16px 16px",
          }}
        >
          <Typography variant="h6">
            {currentUser.name}, {currentUser.age}
          </Typography>
          <Typography variant="body2">{currentUser.description}</Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          marginTop: "1rem",
        }}
      >
        <PawButton color="red" onClick={handlePreviousUser} />
        <PawButton color="green" onClick={handleNextUser} />
      </Box>
    </Box>
  );
}

export default Home;
