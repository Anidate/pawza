import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import { Alert, Button, IconButton, Snackbar } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useState } from 'react';

interface ItemData {
  img: string;
  title: string;
}

export default function StandardImageList() {
  const initialItemData: ItemData[] = [
    {
      img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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

  const [profileIndex, setProfileIndex] = useState(0);
  const [itemData, setItemData] = useState(initialItemData);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [key, setKey] = useState(0);

  const handleImageUpload = (newItem: ItemData) => {
    if (newItem.title === 'profilepic') {
      if (itemData.some((item) => item.title === 'profilepic')) {
        setAlertMessage('You can only upload one profile picture.');
        setOpenAlert(true);
        return;
      }
    } else if (itemData.length >= 10) {
      setAlertMessage('You can only upload a maximum of 10 images.');
      setOpenAlert(true);
      return;
    }
    setItemData((prevItemData) => [...prevItemData, newItem]);
  };

  const handleImageDelete = (index: number) => {
    setItemData((prevItemData) => prevItemData.filter((_, i) => i !== index));
  };

  const handleAddImage = () => {
    if (itemData.length >= 10) {
      setAlertMessage('You can only upload a maximum of 10 images.');
      setOpenAlert(true);
      return;
    }

    const newItem: ItemData = {
      img: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce',
      title: `Apple${key}`,
    };
    setKey(key + 1);
    handleImageUpload(newItem);
  };

  return (
    <>
      {itemData.length > 0 && (
        <img alt="Avatar" src={itemData[profileIndex].img} height={200} width={200} style={{ borderRadius: '50%' }} />
      )}

      <ImageList sx={{ width: 400, height: 450 }} cols={3} rowHeight={164}>
        {itemData.map(
          (item, index) =>
            index !== profileIndex && (
              <ImageListItem key={item.title}>
                <img
                  srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                  alt={item.title}
                  loading="lazy"
                />
                <IconButton onClick={() => handleImageDelete(index)} style={{ position: 'absolute', top: 0, right: 0 }}>
                  <DeleteIcon />
                </IconButton>
              </ImageListItem>
            ),
        )}
      </ImageList>

      <Button variant="contained" color="primary" startIcon={<AddPhotoAlternateIcon />} onClick={handleAddImage}>
        Add Image
      </Button>

      <Snackbar open={openAlert} autoHideDuration={6000} onClose={() => setOpenAlert(false)}>
        <Alert severity="error" onClose={() => setOpenAlert(false)}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
