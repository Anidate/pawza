import { createFileRoute } from '@tanstack/react-router';

import FullScreenLoader from '../../features/Loader/FullScreenLoader';
import ProfilePage from '../../features/ProfilePage';

function Index() {
  return <ProfilePage />;
}
export const Route = createFileRoute('/profile/')({
  component: Index,
  pendingComponent: FullScreenLoader,
});
