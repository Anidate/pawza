import { Box, Typography } from '@mui/material';
import { useState } from 'react';

import ImageCard from './ImageCard';
import PawButton from './PawButton';
import './style.css';
import userData from './UserData';

function Home() {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);

  const handleNextUser = () => {
    setCurrentUserIndex((prevIndex) => (prevIndex + 1) % userData.length);
  };

  const handlePreviousUser = () => {
    setCurrentUserIndex((prevIndex) => (prevIndex - 1 + userData.length) % userData.length);
  };

  const currentUser = userData[currentUserIndex];

  return (
    <Box className="home-container">
      <Box className="image-card-container">
        <ImageCard
          src={currentUser.image}
          style={{ borderRadius: '16px' }}
        />

        <Box className="image-card-description" sx={{ borderRadius: '0 0 16px 16px' }}>
          <Typography variant="h6">
            {currentUser.name}, {currentUser.age}
          </Typography>
          <Typography variant="body2">
            {currentUser.description}
          </Typography>
        </Box>
      </Box>

      <Box className="buttons-container">
        <PawButton color="red" onClick={handlePreviousUser} />
        <PawButton color="green" onClick={handleNextUser} />
      </Box>
    </Box>
  );
}

export default Home;
