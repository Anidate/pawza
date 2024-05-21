/* +++++++++++++++++++++++++++++++++++++++++++++++++ Imports +++++++++++++++++++++++++++++++++++++++++++++++++ */
import { Box, Typography } from '@mui/material';
import GuyWithDog from '@src/assets/guy_with_dog.webp';
import WomanWithDog from '@src/assets/woman_with_dog.jpg';
import { useEffect, useRef, useState } from 'react';

import TinderCard from '../TinderCard';
// import TinderCard from 'react-tinder-card';
import ImageCard from './ImageCard';
import PawButton from './PawButton';

const db = [
  {
    name: 'Rafi Zanzifar',
    img: GuyWithDog,
  },

  {
    name: 'Simha Riff',
    img: WomanWithDog,
  },
];

function Home() {
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const topCard = useRef<any>(null);

  const canSwipe = suggestionIndex <= db.length;
  const swipe = async (dir: 'left' | 'right') => {
    if (canSwipe && suggestionIndex < db.length && topCard.current) {
      await topCard.current.swipe(dir); // Swipe the card!
    }
  };

  useEffect(() => {
    if (topCard.current) {
      topCard.current.restoreCard({ instant: true });
    }
  }, [suggestionIndex, topCard]);

  /* const loadMoreSuggestions = () => {
    console.log(`New db stack approached: \n ${db[guy].name}`);
    setGuy(guy);
  }; */

  const suggested = db[suggestionIndex];
  const nextSuggestion = db[suggestionIndex + 1];

  return (
    <Box p={4} display="flex" flexDirection="column">
      {suggested ? (
        <>
          <Box position="relative" overflow="hidden">
            {nextSuggestion && (
              <Box zIndex={0} position="absolute">
                <ImageCard src={nextSuggestion.img} draggable="false"></ImageCard>
              </Box>
            )}

            <Box>
              <TinderCard
                ref={topCard}
                onCardLeftScreen={() => setSuggestionIndex((p) => p + 1)}
                preventSwipe={['up', 'down']}
              >
                <ImageCard src={suggested.img} draggable="false"></ImageCard>
              </TinderCard>
            </Box>
          </Box>

          <Box display="flex" flexDirection="row" justifyContent="space-between" px={4}>
            <PawButton color="red" onClick={() => swipe('left')} />
            <PawButton color="green" onClick={() => swipe('right')} />
          </Box>
        </>
      ) : (
        <Typography>{"We're all out of matches, try again tomorrow! 🐶"}</Typography>
      )}
    </Box>
  );
}

export default Home;
