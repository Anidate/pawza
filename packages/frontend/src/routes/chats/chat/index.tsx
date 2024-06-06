import { createFileRoute } from '@tanstack/react-router';

import AuthenticatedRoute from '../../../features/AuthenticatedRoute';
import ChatArea from '../../../features/Messages/Chat/Message/ChatArea';

function Index() {
  return <ChatArea />;
}

export const Route = createFileRoute('/chats/chat/')({
  component: AuthenticatedRoute(Index),
});
