import { createFileRoute } from '@tanstack/react-router';

import FullScreenLoader from '../../features/Loader/FullScreenLoader';
import RegisterPage from '../../features/RegisterPage';

function Index() {
  return <RegisterPage />;
}
export const Route = createFileRoute('/register/')({
  component: Index,
  pendingComponent: FullScreenLoader,
});
