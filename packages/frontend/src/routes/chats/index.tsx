import { createFileRoute } from '@tanstack/react-router';

import AuthenticatedRoute from '../../features/AuthenticatedRoute';
import ChatMenu from '../../features/Messages/Chat/Message/ChatMenu';

function Index() {
  return <ChatMenu />;
}

export const Route = createFileRoute('/chats/')({
  component: AuthenticatedRoute(Index),
});
