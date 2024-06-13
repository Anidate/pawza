import { apiClient } from './base';

export enum NotificationType {
  YouWereLiked = 'you-were-liked',
}

export interface Notification {
  type: string;
  likedBy?: {
    id: string;
    firstName: string;
  };
  read: boolean;
  image?: string;
}

export const getUnreadNotificationsCount = () => apiClient.get<number>('/notifications/unread-count');

export const markNotificationAsRead = (id: string) => apiClient.put(`/notifications/${id}/mark-as-read`);
