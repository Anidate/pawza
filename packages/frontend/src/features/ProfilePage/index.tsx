import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useEffect, useState } from 'react';

export default function StandardImageList() {
  const [profileIndex, setProfileIndex] = useState<number>(0);
  useEffect(() => {
    for (let i = 0; i < itemData.length; i++) {
      if (itemData[i].title === 'profilepic') setProfileIndex(i);
    }
  }, []);

  return (
    <>
      <img src={itemData[profileIndex].img} width={400} height={200} />
      <ImageList sx={{ width: 400, height: 450 }} cols={3} rowHeight={164}>
        {itemData.map(
          (item, index) =>
            index !== profileIndex && (
              <ImageListItem key={item.img}>
                <img
                  srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ),
        )}
      </ImageList>
    </>
  );
}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'profilepic',
  },
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
];
