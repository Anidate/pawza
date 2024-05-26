import { createFileRoute } from '@tanstack/react-router';

import AuthenticatedRoute from '../../features/AuthenticatedRoute';
import ChatApp from '../../features/Messages/Chat/Message';

function Index() {
  return <ChatApp />;
}

export const Route = createFileRoute('/chat/')({
  component: AuthenticatedRoute(Index),
});
