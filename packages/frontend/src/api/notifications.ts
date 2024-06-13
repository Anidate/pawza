import { apiClient } from './base';

export const getUnreadNotificationsCount = () => apiClient.get<number>('/notifications/unread-count');
