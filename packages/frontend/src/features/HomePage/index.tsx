/* +++++++++++++++++++++++++++++++++++++++++++++++++ Imports +++++++++++++++++++++++++++++++++++++++++++++++++ */
import { Box } from '@mui/material';
import GuyWithDog from '@src/assets/guy_with_dog.webp';
import WomanWithDog from '@src/assets/woman_with_dog.jpg';
import { useEffect, useRef, useState } from 'react';
import TinderCard from 'react-tinder-card';

import ImageCard from './ImageCard';
import PawButton from './PawButton';

function Home() {
  /* +++++++++++++++++++++++++++++++++++++++++++++++++ Data Base +++++++++++++++++++++++++++++++++++++++++++++++++ */
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

  /* +++++++++++++++++++++++++++++++++++++++++++++++++ Function Components +++++++++++++++++++++++++++++++++++++++++++++++++ */

  // Shows which direction the user swiped the card
  const onSwipe = (direction) => {
    console.log(direction);
  };

  // Set the size of the data base array
  const [guy, setGuy] = useState(db.length - 1);
  useEffect(() => {
    console.log(guy);
  }, [guy]);

  const canSwipe = guy >= 0;

  // The card has left the screen and decreased the data base of characters
  const onCardLeftScreen = () => {
    console.log(`${db[guy].name} left the screen`);
    setGuy(guy - 1);
  };

  const topCard = useRef(null);

  const swipe = async (dir: 'left' | 'right') => {
    if (canSwipe && guy < db.length) {
      await topCard.current.swipe(dir); // Swipe the card!
    }
  };

  /* const loadMoreSuggestions = () => {
    console.log(`New db stack approached: \n ${db[guy].name}`);
    setGuy(guy);
  }; */

  // TODO:
  // Show the next suggestion
  // If we have 2 suggestions remaining, call function "loadMoreSuggestions"
  /* if (only 2 left) {
      loadMoreSuggestions()
    } */
  // For now this function can be empty
  // render 2 imges combined 1 with absolute and the 2nd absolute

  /* +++++++++++++++++++++++++++++++++++++++++++++++++ UI +++++++++++++++++++++++++++++++++++++++++++++++++ */
  // sx={{ }}

  if (guy > 0)
    return (
      <Box
        key={2024}
        p={4}
        sx={{
          boxSizing: 'border-box',
          gap: '3rem',
          position: 'relative',
          width: '500px',
          height: '750px',
        }}
        display="flex"
        flexDirection="column"
        justifyContent="end"
      >
        {db.map((character, index) => (
          <>
            {
              <Box key={index - 1}>
                <Box sx={{ position: 'absolute', bottom: 30 }}>
                  <TinderCard
                    key={index}
                    onSwipe={onSwipe} // {onSwipe}
                    onCardLeftScreen={() => onCardLeftScreen()}
                    preventSwipe={['up', 'down']}
                  >
                    <ImageCard key={guy} src={db[guy - 1].img} draggable="false"></ImageCard>
                  </TinderCard>
                </Box>
                <Box sx={{ position: 'absolute', bottom: 30 }}>
                  <TinderCard
                    ref={topCard}
                    key={index}
                    onSwipe={onSwipe}
                    onCardLeftScreen={() => onCardLeftScreen()}
                    preventSwipe={['up', 'down']}
                  >
                    <ImageCard key={guy * 16} src={db[guy].img} draggable="false"></ImageCard>
                  </TinderCard>
                </Box>
              </Box>
            }
          </>
        ))}

        <Box key={66} display="flex" flexDirection="row" justifyContent="space-between" px={4}>
          <PawButton color="red" onClick={() => swipe('left')} />
          <PawButton color="green" onClick={() => swipe('right')} />
        </Box>
      </Box>
    );
  return (
    <Box
      key={2025}
      p={4}
      sx={{
        boxSizing: 'border-box',
        gap: '3rem',
        position: 'relative',
        width: '500px',
        height: '750px',
      }}
      display="flex"
      flexDirection="column"
      justifyContent="end"
    >
      <Box>
        <Box sx={{ position: 'absolute', bottom: 30 }}>
          <TinderCard
            ref={topCard}
            key={0}
            onSwipe={onSwipe}
            onCardLeftScreen={() => onCardLeftScreen()}
            preventSwipe={['up', 'down']}
          >
            <ImageCard key={guy * 16} src={db[0].img} draggable="false"></ImageCard>
          </TinderCard>
        </Box>

        <Box display="flex" flexDirection="row" justifyContent="space-between" px={4}>
          <PawButton color="red" onClick={() => swipe('left')} />
          <PawButton color="green" onClick={() => swipe('right')} />
        </Box>
      </Box>
    </Box>
  );
}

export default Home;

/*
         /* <Box>
              <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen()} preventSwipe={['up', 'down']}>
              <Box>
              <ImageCard key={index} src={db[index].img} draggable="false" style={{}}></ImageCard>
              </Box>
            </TinderCard>
            <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen()} preventSwipe={['up', 'down']}>
              <Box>
              <ImageCard key={index} src={db[index-1].img} draggable="false" style={{display:'none'}}></ImageCard>
              </Box>
            </TinderCard>
          </Box>


          <Box sx={{ position: 'absolute', order: 1 }}>
                  <TinderCard
                    key={index - 1}
                    onSwipe={onSwipe}
                    onCardLeftScreen={() => onCardLeftScreen()}
                    preventSwipe={['up', 'down']}
                  >
                    <ImageCard key={guy * 16} src={db[index].img} draggable="false"></ImageCard>
                  </TinderCard>
                </Box>

                {db.map((character, index) => (
          <>
            {
              <Box key={index - 1}>
                <Box sx={{ position: 'absolute', bottom: 45 }}>
                  <TinderCard
                    key={index}
                    onSwipe={(dir) => swiped(dir, character.name, index)} // {onSwipe}
                    onCardLeftScreen={() => onCardLeftScreen()}
                    preventSwipe={['up', 'down']}
                  >
                    <ImageCard key={guy} src={db[guy - 1].img} draggable="false"></ImageCard>
                  </TinderCard>
                </Box>
                <Box sx={{ position: 'absolute', bottom: 45 }}>
                  <TinderCard
                    ref={topCard}
                    key={index}
                    onSwipe={(dir) => swiped(dir, character.name, index)}
                    onCardLeftScreen={() => onCardLeftScreen()}
                    preventSwipe={['up', 'down']}
                  >
                    <ImageCard key={guy * 16} src={db[guy].img} draggable="false"></ImageCard>
                  </TinderCard>
                </Box>
              </Box>
            }
          </>
        ))}
*/
