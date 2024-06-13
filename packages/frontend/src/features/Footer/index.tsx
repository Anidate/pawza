import {
  Home as HomeIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { AppBar, Badge, IconButton, Toolbar } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';

import { getUnreadNotificationsCount } from '../../api/notifications';
import { useAuth } from '../Auth/useAuth';

const Footer = () => {
  const { user } = useAuth();
  const { data: unreadNotificationsCount } = useQuery({
    queryKey: ['unreadNotificationsCount'],
    queryFn: getUnreadNotificationsCount,
    enabled: !!user,
  });

  return (
    <AppBar component="footer" position="sticky" sx={{ height: '4rem', background: '#DA940719', boxShadow: 'none' }}>
      <Toolbar
        sx={{
          height: '4rem',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          fontSize: '2rem',
        }}
      >
        {!!user && (
          <>
            <IconButton color="inherit" sx={{ fontSize: 'inherit' }}>
              <Link to="/home">
                <HomeIcon fontSize="inherit" sx={{ color: 'white' }} />
              </Link>
            </IconButton>

            <IconButton color="inherit" sx={{ fontSize: 'inherit' }}>
              {unreadNotificationsCount?.data ? (
                <Badge badgeContent={unreadNotificationsCount.data} color="error">
                  <Link to="/notifications">
                    <NotificationsIcon fontSize="inherit" sx={{ color: 'white' }} />
                  </Link>
                </Badge>
              ) : (
                <Link to="/notifications">
                  <NotificationsIcon fontSize="inherit" sx={{ color: 'white' }} />
                </Link>
              )}
            </IconButton>

            <IconButton color="inherit" sx={{ fontSize: 'inherit' }}>
              <Badge badgeContent={2} color="error">
                <MessageIcon fontSize="inherit" />
              </Badge>
            </IconButton>

            <IconButton color="inherit" sx={{ fontSize: 'inherit' }}>
              <PersonIcon fontSize="inherit" />
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
