export type User = {
    id: string;
    name: string;
    avatar: string;
    status: 'online' | 'offline' | 'busy' | 'away' | 'brb';
    isTyping: boolean;
    lastSeen?: Date;
  };
  
  export type MessageReaction = {
    emoji: string;
    users: string[];
  };
  
  export type Message = {
    id: string;
    content: string;
    senderId: string;
    timestamp: Date;
    reactions: MessageReaction[];
    isStatusUpdate: boolean;
  };
  
  export type Tab = 'home' | 'messages' | 'about' | 'pricing' | 'contact';