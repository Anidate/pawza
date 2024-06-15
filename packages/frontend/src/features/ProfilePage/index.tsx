import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Alert, Avatar, Box, Button, Snackbar } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';

import { uploadProfileImage } from '../../api/profile';
import { useAuth } from '../Auth/useAuth';

export default function ProfilePage() {
  const { user } = useAuth();
  const [profilePicSrc, setProfilePicSrc] = useState(user!.profilePictureSrc);

  const [alertMessage, setAlertMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutateAsync: uploadProfileImageMutation, isPending } = useMutation({
    mutationFn: (file: File) => uploadProfileImage(file),
  });

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    try {
      const file = event.target.files[0];

      const res = await uploadProfileImageMutation(file);

      setProfilePicSrc(res.data.filename);

      // Reset file input
      event.target.value = '';
    } catch (error) {
      setAlertMessage('Failed to upload image.');
    }
  };

  return (
    <Box height="100%">
      <Button
        sx={{
          position: 'relative',
          display: 'inline-block',
          borderRadius: '50%',
          my: 8,
          width: '100%',
          aspectRatio: 1,
        }}
        onClick={() => fileInputRef.current?.click()}
        disabled={isPending}
      >
        <Avatar
          src={profilePicSrc}
          alt="Profile Picture"
          style={{
            width: '100%',
            height: '100%',
            border: '2px solid #fff',
            boxShadow: '0px 0px 5px rgba(0,0,0,0.5)',
            filter: isPending ? 'brightness(50%)' : '',
          }}
        />
        {!isPending && (
          <AddPhotoAlternateIcon
            style={{
              position: 'absolute',
              top: '98%',
              left: '50%',
              transform: 'translate(-50%, -100%)',
              color: '#fff',
              fontSize: '3rem',
            }}
          />
        )}
      </Button>

      <input
        ref={fileInputRef}
        id="fileInput"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        disabled={isPending}
      />

      <Snackbar open={!!alertMessage} autoHideDuration={6000} onClose={() => setAlertMessage('')}>
        <Alert severity="error" onClose={() => setAlertMessage('')}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
