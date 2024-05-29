import { createLazyFileRoute, Navigate } from '@tanstack/react-router';

import { useAuth } from '../../features/Auth/useAuth';
import HomePage from '../../features/HomePage';
import FullScreenLoader from '../../features/Loader/FullScreenLoader';

function Index() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/home" />;
  }

  return <HomePage />;
}

export const Route = createLazyFileRoute('/login/')({
  component: Index,
  pendingComponent: FullScreenLoader,
});
