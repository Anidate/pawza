import { Box, Typography } from '@mui/material';
import { type ComponentPropsWithRef } from 'react';

interface ImageCardProps extends ComponentPropsWithRef<'img'> {
  name: string;
  age: number;
  description: string;
}

function ImageCard({ name, age, description, ...props }: ImageCardProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '16px',
      }}
    >
      <img {...props} style={{ borderRadius: '2rem', width: '100%', ...props.style }} />
      <Box
        px={'1rem'}
        py={'0.5rem'}
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          color: 'white',
          width: '100%',
          boxSizing: 'border-box',
          borderRadius: '0 0 16px 16px',
        }}
      >
        <Typography variant="h6">
          {name}, {age}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </Box>
    </Box>
  );
}

export default ImageCard;
