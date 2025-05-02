import { User, Message } from './types';

export const INITIAL_USERS: User[] = [
  { id: '1', name: 'Alex Johnson', avatar: 'A', status: 'online', isTyping: false },
  { id: '2', name: 'Maya Patel', avatar: 'M', status: 'busy', isTyping: false },
  { id: '3', name: 'Carlos Rodriguez', avatar: 'C', status: 'away', isTyping: false },
  { id: '4', name: 'Sophie Kim', avatar: 'S', status: 'online', isTyping: false },
  { id: '5', name: 'James Wilson', avatar: 'J', status: 'offline', isTyping: false, lastSeen: new Date(Date.now() - 1000 * 60 * 30) },
];

export const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    content: 'Hey everyone! Welcome to the new chat app.',
    senderId: '1',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    reactions: [{ emoji: '👋', users: ['2', '3'] }, { emoji: '❤️', users: ['4'] }],
    isStatusUpdate: false,
  },
  {
    id: '2',
    content: 'Thanks Alex! The interface looks great.',
    senderId: '2',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    reactions: [],
    isStatusUpdate: false,
  },
  {
    id: '3',
    content: 'busy',
    senderId: '2',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    reactions: [],
    isStatusUpdate: true,
  },
  {
    id: '4',
    content: 'I agree! Very intuitive to use.',
    senderId: '4',
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
    reactions: [{ emoji: '👍', users: ['1'] }],
    isStatusUpdate: false,
  },
];

export const CURRENT_USER_ID = '1';
export const AVAILABLE_REACTIONS = ['👍', '❤️', '😂', '😮', '😢', '👏', '🎉', '🙏'];
export const STATUS_OPTIONS = ['online', 'busy', 'away', 'brb'];