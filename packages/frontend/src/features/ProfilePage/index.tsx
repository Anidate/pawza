import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import { Alert, Avatar, IconButton, Snackbar } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import axios from 'axios';
import { useRef, useState } from 'react';

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const handleImageUpload = (newItem: ItemData, index: number) => {
    setItemData((prevItemData) => {
      const updatedItemData = [...prevItemData];
      updatedItemData[index] = newItem;
      return updatedItemData;
    });
  };

  const handleImageDelete = (index: number) => {
    setItemData((prevItemData) => prevItemData.filter((_, i) => i !== index));
  };

  const handleAddImage = (index: number) => {
    setSelectedImageIndex(index);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('YOUR_UPLOAD_ENDPOINT', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const newItem: ItemData = {
          img: response.data.url,
          title: `Image${key}`,
        };
        setKey(key + 1);

        if (selectedImageIndex !== null) {
          handleImageUpload(newItem, selectedImageIndex);
        }

        // Reset file input
        event.target.value = '';
      } catch (error) {
        setAlertMessage('Failed to upload image.');
        setOpenAlert(true);
      }
    }
  };

  return (
    <>
      {itemData.length > 0 && (
        <div
          style={{
            position: 'relative',
            display: 'inline-block',
            cursor: 'pointer',
          }}
          onClick={() => handleAddImage(profileIndex)}
        >
          <Avatar
            src={itemData[profileIndex].img}
            alt="Avatar"
            style={{
              width: 200,
              height: 200,
              borderRadius: '50%',
              border: '2px solid #fff',
              boxShadow: '0px 0px 5px rgba(0,0,0,0.5)',
            }}
          />
          <AddPhotoAlternateIcon
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#fff',
              fontSize: '3rem',
            }}
          />
        </div>
      )}

      <ImageList sx={{ width: 400, height: 450 }} cols={3} rowHeight={164}>
        {itemData.map(
          (item, index) =>
            index !== profileIndex && (
              <ImageListItem key={item.title}>
                <div
                  style={{
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleAddImage(index)}
                >
                  <img
                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                    alt={item.title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                  <AddPhotoAlternateIcon
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      color: '#fff',
                      fontSize: '2rem',
                      opacity: 0.8,
                    }}
                  />
                </div>
                <IconButton onClick={() => handleImageDelete(index)} style={{ position: 'absolute', top: 0, right: 0 }}>
                  <DeleteIcon />
                </IconButton>
              </ImageListItem>
            ),
        )}
      </ImageList>

      <input
        ref={fileInputRef}
        id="fileInput"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      <Snackbar open={openAlert} autoHideDuration={6000} onClose={() => setOpenAlert(false)}>
        <Alert severity="error" onClose={() => setOpenAlert(false)}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
