import { Box } from '@mui/material';
import GuyWithDog from '@src/assets/guy_with_dog.webp';
import WomanWithDog from '@src/assets/woman_with_dog.jpg';
import { useEffect, useState } from 'react';

import TinderCard from 'react-tinder-card'

import ImageCard from './ImageCard';
import PawButton from './PawButton';



function Home() {
  
  const onSwipe = (direction) => {
    console.log(direction);

  }
  
  const onCardLeftScreen = () => {
    console.log(' left the screen');
    setGuy(guy-1);
  }
  const db=[
    {
      name: "Rafi Zanzifar",
      img : GuyWithDog
    },

    {
      name: "Simha Riff",
      img : WomanWithDog
    },
  ]
  const [guy, setGuy] = useState(db.length-1);
  useEffect(()=>{
    console.log(guy);
    
  },[guy])
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
    
      {db.map((character, index) => (
        <>
        {index===guy&&(
              <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen()} preventSwipe={['up', 'down']}>
              <Box>
              <ImageCard key={index} src={db[index].img} draggable="false"></ImageCard>3
              </Box>
            </TinderCard>
        )}
        </>
        ))} 
        

      <Box display="flex" flexDirection="row" justifyContent="space-between" px={4}>
        <PawButton color="red" onClick={onSwipe} />
        <PawButton color="green" onClick={onSwipe} />
      </Box>
    </Box>
  );
}

//<TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['right', 'left']}>Hello, World!</TinderCard>
//<ImageCard src={GuyWithDog} style={{ display: !guy ? 'none' : '' }} />
//<ImageCard src={WomanWithDog} style={{ display: guy ? 'none' : '' }} />
export default Home;


/*import React, { useState, useMemo, useRef } from 'react'
import TinderCard from 'react-tinder-card'

const db = [
  {
    name: 'Richard Hendricks',
    url: './img/richard.jpg'
  },
  {
    name: 'Erlich Bachman',
    url: './img/erlich.jpg'
  },
  {
    name: 'Monica Hall',
    url: './img/monica.jpg'
  },
  {
    name: 'Jared Dunn',
    url: './img/jared.jpg'
  },
  {
    name: 'Dinesh Chugtai',
    url: './img/dinesh.jpg'
  }
]

function Advanced () {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1)
  const [lastDirection, setLastDirection] = useState()
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < db.length - 1

  const canSwipe = currentIndex >= 0

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
  }

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  }

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }

  return (
    <div>
      <link
        href='https://fonts.googleapis.com/css?family=Damion&display=swap'
        rel='stylesheet'
      />
      <link
        href='https://fonts.googleapis.com/css?family=Alatsi&display=swap'
        rel='stylesheet'
      />
      <h1>React Tinder Card</h1>
      <div className='cardContainer'>
        {db.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className='swipe'
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}
          >
            <div
              style={{ backgroundImage: 'url(' + character.url + ')' }}
              className='card'
            >
              <h3>{character.name}</h3>
            </div>
          </TinderCard>
        ))}*/
 
