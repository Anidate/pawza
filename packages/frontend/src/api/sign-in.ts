import { apiClient } from './base';

// TODO: Response interface

export const signIn = (data: { email: string; password: string }) => apiClient.post('/sign-in', data);
