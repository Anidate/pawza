import { Box, Typography } from '@mui/material';
import GuyWithDog from '@src/assets/guy_with_dog.webp';
import WomanWithDog from '@src/assets/woman_with_dog.jpg';
import { useState } from 'react';

import ImageCard from './ImageCard';
import PawButton from './PawButton';

function Home() {
  const [guy, setGuy] = useState(true);

  // Dummy data for two users
  const userData = [
    {
      name: "John",
      age: 35,
      description: "Dog lover and outdoor enthusiast.",
      image: GuyWithDog,
    },
    {
      name: "Emily",
      age: 28,
      description: "Animal rescuer with a passion for hiking.",
      image: WomanWithDog,
    }
  ];

  return (
    <Box
      p={4}
      sx={{
        height: '100%',
        boxSizing: 'border-box',
        gap: '3rem',
      }}
      display="flex"
      flexDirection="column"
      justifyContent="end"
    >
      {/* Display user information of the current user */}
      {guy && (
        <>
          <Typography variant="h4" align="center" gutterBottom>
            {userData[0].name}, {userData[0].age}
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            {userData[0].description}
          </Typography>

          {/* ImageCard for the current user */}
          <ImageCard src={userData[0].image} />
        </>
      )}

      {/* Display user information of the other user */}
      {!guy && (
        <>
          <Typography variant="h4" align="center" gutterBottom>
            {userData[1].name}, {userData[1].age}
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            {userData[1].description}
          </Typography>

          {/* ImageCard for the other user */}
          <ImageCard src={userData[1].image} />
        </>
      )}

      <Box display="flex" flexDirection="row" justifyContent="space-between" px={4}>
        <PawButton color="red" onClick={() => setGuy((p) => !p)} />
        <PawButton color="green" onClick={() => setGuy((p) => !p)} />
      </Box>
    </Box>
  );
}

export default Home;
