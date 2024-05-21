import { Box } from '@mui/material';
import GuyWithDog from '@src/assets/guy_with_dog.webp';
import WomanWithDog from '@src/assets/woman_with_dog.jpg';
import { useState } from 'react';

import ImageCard from './ImageCard';
import PawButton from './PawButton';

function Home() {
  const [guy, setGuy] = useState(true);

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
      <Box
        sx={{
          position: 'relative',
          height: '500px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <ImageCard
          src={GuyWithDog}
          name="John"
          age={31}
          description="Love hiking with my dog."
          style={{ display: !guy ? 'none' : '' }}
        />
        <ImageCard
          src={WomanWithDog}
          name="Jane"
          age={42}
          description="Enjoy long walks on the beach with my furry friend."
          style={{ display: guy ? 'none' : '' }}
        />
      </Box>

      <Box display="flex" flexDirection="row" justifyContent="space-between" px={4}>
        <PawButton color="red" onClick={() => setGuy((p) => !p)} />
        <PawButton color="green" onClick={() => setGuy((p) => !p)} />
      </Box>
    </Box>
  );
}

export default Home;
