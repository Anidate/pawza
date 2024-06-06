import { Link } from '@tanstack/react-router';
import { Typography, Card, CardContent, Avatar } from '@mui/material';

type Props = {
  name: string;
  lastMessage: string;
  timeStamp: string;
  to: string;
};

function ChatItem({ props }: { props: Props }) {
  return (
    <Card
      component={Link}
      to={props.to}
      sx={{
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        margin: '0.5rem 0',
        padding: '0.5rem',
        borderRadius: '12px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <Avatar sx={{ bgcolor: '#3f51b5', marginRight: '1rem', fontSize: '1.25rem' }}>
        {props.name[0]}
      </Avatar>
      <CardContent sx={{ flex: '1', padding: '0.5rem' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#333' }}>
          {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: '0.5rem' }}>
          {props.lastMessage}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', marginTop: '0.5rem', textAlign: 'right' }}>
          {props.timeStamp}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ChatItem;
