import { type NotificationDoc, NotificationType } from '../../models/notification.js';

export interface NotificationDto {
  id: string;
  title: string;
  content: string;
  read: boolean;
  image?: string;
  pawedBy?: string;
  isSuperPaw: boolean;
}

export const toNotificationDto = (notification: NotificationDoc): NotificationDto => {
  let title: string;
  let content: string;

  if (notification.type === NotificationType.YouWereLiked) {
    title = `${notification.pawedBy!.firstName} pawed you!`;
    content = "See if it's a match!";
  } else if (notification.type === NotificationType.YouWereSuperLiked) {
    title = `${notification.pawedBy!.firstName} sent you a super paw!`;
    content = "See if it's a match!";
  } else {
    throw new Error(`Unexpected notification type ${notification.type}`);
  }

  return {
    id: notification._id.toString(),
    title,
    content,
    read: notification.read,
    image: notification.image || undefined,
    pawedBy: notification.pawedBy?._id.toString(),
    isSuperPaw: notification.type === NotificationType.YouWereSuperLiked,
  };
};
