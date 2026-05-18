import { Timestamp } from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  displayName: string;
  username?: string;
  photoURL: string;
  email: string;
  messengerId?: string;
  status: 'online' | 'offline';
  lastSeen?: Timestamp;
  isBanned?: boolean;
  role?: 'admin' | 'user';
  createdAt?: Timestamp;
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  createdAt: Timestamp;
  active: boolean;
}
