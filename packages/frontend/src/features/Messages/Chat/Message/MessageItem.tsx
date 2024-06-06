import { Box, Typography } from '@mui/material';

interface MessageItemProps {
  content: string;
  timestamp: string;
  isCurrentUser: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ content, timestamp, isCurrentUser }) => {
  return (
    <Box
      sx={{
        alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
        maxWidth: '60%',
        padding: '1rem',
        borderRadius: '1rem',
        backgroundColor: isCurrentUser ? '#DCF8C6' : '#FFF',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        wordBreak: 'break-word',
        marginBottom: '1rem',
      }}
    >
      <Typography variant="body1">{content}</Typography>
      <Typography variant="caption" sx={{ display: 'block', textAlign: isCurrentUser ? 'right' : 'left', marginTop: '0.5rem', color: '#888' }}>
        {new Date(timestamp).toLocaleString()}
      </Typography>
    </Box>
  );
};

export default MessageItem;
