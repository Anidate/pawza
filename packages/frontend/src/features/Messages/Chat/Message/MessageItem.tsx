import { Box, Typography } from '@mui/material';

interface MessageItemProps {
  content: string;
  timestamp: string;
  isCurrentUser: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ content, timestamp, isCurrentUser }) => (
  <Box
    sx={{
      alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',

      maxWidth: '60%',
      padding: '0.5rem',
      borderStartStartRadius: '1rem',
      borderStartEndRadius: '1rem',
      borderEndEndRadius: isCurrentUser ? 0 : '1rem',
      borderEndStartRadius: isCurrentUser ? '1rem' : 0,
      backgroundColor: isCurrentUser ? '#DCF8C6' : '#FFF',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      wordBreak: 'break-word',
      marginBottom: '1rem',
    }}
  >
    <Typography variant="body1" textAlign="left">
      {content}
    </Typography>
    <Typography
      variant="caption"
      sx={{ display: 'block', textAlign: isCurrentUser ? 'right' : 'left', marginTop: '0.5rem', color: '#888' }}
    >
      {new Date(timestamp).toLocaleString()}
    </Typography>
  </Box>
);

export default MessageItem;
