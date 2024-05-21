import { Box } from '@mui/material';
import { useState } from 'react';

import ImageCard from './ImageCard';
import PawButton from './PawButton';
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
    <Box
      sx={{
        padding: '1rem',
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'end',
        gap: '3rem',
      }}
    >
      <ImageCard
        src={currentUser.image}
        name={currentUser.name}
        age={currentUser.age}
        description={currentUser.description}
        style={{ borderRadius: '16px' }}
      />

      <Box
        px={'1rem'}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: '1rem',
        }}
      >
        <PawButton color="red" onClick={handlePreviousUser} />
        <PawButton color="green" onClick={handleNextUser} />
      </Box>
    </Box>
  );
}

export default Home;
