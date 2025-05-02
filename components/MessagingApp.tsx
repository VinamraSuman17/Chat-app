'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Message, MessageReaction } from '../lib/types';
import { INITIAL_USERS, INITIAL_MESSAGES, CURRENT_USER_ID, AVAILABLE_REACTIONS, STATUS_OPTIONS } from '../lib/mockData';

export default function MessagingApp() {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputMessage, setInputMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [reactionMessage, setReactionMessage] = useState<string | null>(null);
  const [currentUserStatus, setCurrentUserStatus] = useState<User['status']>('online');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const currentUser = users.find(user => user.id === CURRENT_USER_ID)!;

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const isStatusUpdate = STATUS_OPTIONS.includes(inputMessage.toLowerCase());

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      senderId: CURRENT_USER_ID,
      timestamp: new Date(),
      reactions: [],
      isStatusUpdate,
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    if (isStatusUpdate) {
      setCurrentUserStatus(inputMessage.toLowerCase() as User['status']);
      updateUserStatus(CURRENT_USER_ID, inputMessage.toLowerCase() as User['status']);
    } else {
      simulateTyping();
    }
  };

  const updateUserStatus = (userId: string, status: User['status']) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, status } : user
      )
    );
  };

  const simulateTyping = () => {
    const onlineUsers = users.filter(user =>
      user.id !== CURRENT_USER_ID && user.status === 'online'
    );

    if (onlineUsers.length > 0) {
      const randomUser = onlineUsers[Math.floor(Math.random() * onlineUsers.length)];

      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === randomUser.id ? { ...user, isTyping: true } : user
        )
      );

      const delay = 1000 + Math.random() * 2000;
      setTimeout(() => {
        setUsers(prevUsers =>
          prevUsers.map(user =>
            user.id === randomUser.id ? { ...user, isTyping: false } : user
          )
        );

        const newMessage: Message = {
          id: Date.now().toString(),
          content: getRandomResponse(),
          senderId: randomUser.id,
          timestamp: new Date(),
          reactions: [],
          isStatusUpdate: false,
        };

        setMessages(prev => [...prev, newMessage]);
      }, delay);
    }
  };

  const getRandomResponse = (): string => {
    const responses = [
      "That's interesting!",
      "I see what you mean.",
      "Great point!",
      "I hadn't thought of that before.",
      "Thanks for sharing!",
      "What do others think?",
      "Let's discuss this more.",
      "I'm not sure I agree, but I see your perspective.",
      "That makes sense to me.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleAddReaction = (messageId: string, emoji: string) => {
    setMessages(prevMessages =>
      prevMessages.map(message => {
        if (message.id === messageId) {
          const existingReactionIndex = message.reactions.findIndex(r => r.emoji === emoji);

          if (existingReactionIndex >= 0) {
            const existingReaction = message.reactions[existingReactionIndex];

            if (existingReaction.users.includes(CURRENT_USER_ID)) {
              const updatedUsers = existingReaction.users.filter(id => id !== CURRENT_USER_ID);

              if (updatedUsers.length === 0) {
                const updatedReactions = message.reactions.filter(r => r.emoji !== emoji);
                return { ...message, reactions: updatedReactions };
              } else {
                const updatedReactions = [...message.reactions];
                updatedReactions[existingReactionIndex] = { ...existingReaction, users: updatedUsers };
                return { ...message, reactions: updatedReactions };
              }
            } else {
              const updatedReactions = [...message.reactions];
              updatedReactions[existingReactionIndex] = {
                ...existingReaction,
                users: [...existingReaction.users, CURRENT_USER_ID],
              };
              return { ...message, reactions: updatedReactions };
            }
          } else {
            return {
              ...message,
              reactions: [...message.reactions, { emoji, users: [CURRENT_USER_ID] }],
            };
          }
        }
        return message;
      })
    );

    setShowEmojiPicker(false);
    setReactionMessage(null);
  };

  const formatTimestamp = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'Yesterday';

    return date.toLocaleDateString();
  };

  const formatLastSeen = (date?: Date): string => {
    if (!date) return 'Unknown';
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);

    if (diffMins < 60) return `${diffMins} min ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;

    return date.toLocaleDateString();
  };

  const getUserStatusColor = (status: User['status']): string => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-red-500';
      case 'away': return 'bg-yellow-500';
      case 'brb': return 'bg-blue-500';
      default: return 'bg-gray-400';
    }
  };

  const getUserStatusText = (status: User['status']): string => {
    switch (status) {
      case 'online': return 'Online';
      case 'busy': return 'Busy';
      case 'away': return 'Away';
      case 'brb': return 'Be Right Back';
      default: return 'Offline';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-1 overflow-hidden bg-gray-50">
      {/* Toggle sidebar button for mobile */}
      <div className="md:hidden fixed top-4 left-4 z-20">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="p-2 bg-indigo-600 text-white rounded-full shadow-lg"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {showSidebar ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          )}
        </motion.button>
      </div>

      {/* Users sidebar */}
      <AnimatePresence>
        {(showSidebar || window.innerWidth >= 768) && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-md fixed md:relative z-10 h-full"
          >
            <div className="p-4 border-b border-gray-200 bg-indigo-600 text-white">
              <h2 className="text-lg font-medium">Chat Users</h2>
            </div>
            <div className="overflow-y-auto flex-1">
              {users.map(user => (
                <motion.div
                  key={user.id}
                  whileHover={{ backgroundColor: "#f9fafb" }}
                  className="flex items-center px-4 py-3 border-b border-gray-100"
                >
                  <div className="relative">
                    <motion.div 
                      className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-medium"
                      whileHover={{ scale: 1.05 }}
                    >
                      {user.avatar}
                    </motion.div>
                    <motion.span
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ${getUserStatusColor(user.status)} ring-2 ring-white`}
                    ></motion.span>
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between items-baseline">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      {user.status === 'offline' && user.lastSeen && (
                        <span className="text-xs text-gray-500">
                          {formatLastSeen(user.lastSeen)}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">
                      {user.isTyping ? (
                        <span className="text-indigo-500">Typing...</span>
                      ) : (
                        getUserStatusText(user.status)
                      )}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat area */}
      <div className="flex-1 flex flex-col bg-gray-50 md:ml-0 ml-0 relative">
        {/* Chat header */}
        <div className="bg-white border-b border-gray-200 p-4 shadow-sm flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center">
            <h2 className="text-lg font-medium text-gray-900">Group Chat</h2>
            <div className="ml-3 px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">
              {users.filter(user => user.status === 'online').length} online
            </div>
          </div>
          <motion.div 
            className="relative"
            animate={showStatusDropdown ? "open" : "closed"}
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-3 py-1 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setShowStatusDropdown(!showStatusDropdown)}
            >
              <span className={`w-3 h-3 rounded-full ${getUserStatusColor(currentUserStatus)}`}></span>
              <span>{getUserStatusText(currentUserStatus)}</span>
              <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </motion.button>

            <AnimatePresence>
              {showStatusDropdown && (
                <motion.div 
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50"
                >
                  {['online', 'busy', 'away', 'brb'].map((status) => (
                    <motion.button
                      key={status}
                      whileHover={{ backgroundColor: "#f3f4f6" }}
                      className="flex items-center px-4 py-2 w-full text-left"
                      onClick={() => {
                        setCurrentUserStatus(status as User['status']);
                        updateUserStatus(CURRENT_USER_ID, status as User['status']);
                        setShowStatusDropdown(false);
                      }}
                    >
                      <span className={`w-3 h-3 rounded-full ${getUserStatusColor(status as User['status'])} mr-3`}></span>
                      <span className="text-sm">{getUserStatusText(status as User['status'])}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Chat messages */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4"
        >
          <AnimatePresence initial={false}>
            {messages.map((message) => {
              const sender = users.find(user => user.id === message.senderId);
              const isCurrentUser = message.senderId === CURRENT_USER_ID;

              if (message.isStatusUpdate) {
                return (
                  <motion.div 
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex justify-center"
                  >
                    <div className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                      {sender?.name} is now {message.content}
                    </div>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex flex-col max-w-xs sm:max-w-md space-y-1">
                    <div className="flex items-end space-x-2">
                      {!isCurrentUser && (
                        <motion.div 
                          whileHover={{ scale: 1.1 }}
                          className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-medium flex-shrink-0"
                        >
                          {sender?.avatar || '?'}
                        </motion.div>
                      )}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className={`px-4 py-2 rounded-lg shadow-sm ${
                          isCurrentUser
                            ? 'bg-indigo-600 text-white rounded-br-none'
                            : 'bg-white text-gray-800 rounded-bl-none'
                        }`}
                      >
                        {message.content}
                        <div
                          className={`text-xs mt-1 ${
                            isCurrentUser ? 'text-indigo-200' : 'text-gray-500'
                          }`}
                        >
                          {formatTimestamp(message.timestamp)}
                        </div>
                      </motion.div>
                      {isCurrentUser && (
                        <motion.div 
                          whileHover={{ scale: 1.1 }}
                          className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-medium flex-shrink-0"
                        >
                          {currentUser.avatar}
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Reactions */}
                    {message.reactions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex flex-wrap gap-1 ${
                          isCurrentUser ? 'justify-end mr-10' : 'justify-start ml-10'
                        }`}
                      >
                        {message.reactions.map((reaction, index) => (
                          <motion.div
                            key={`${message.id}-${reaction.emoji}-${index}`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white shadow-sm rounded-full px-2 py-1 text-xs flex items-center cursor-pointer border border-gray-100"
                            onClick={() => handleAddReaction(message.id, reaction.emoji)}
                          >
                            <span>{reaction.emoji}</span>
                            <span className="ml-1 text-gray-600">{reaction.users.length}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                    
                    {/* Add reaction button */}
                    <motion.div
                      className={`flex ${
                        isCurrentUser ? 'justify-end mr-10' : 'justify-start ml-10'
                      }`}
                    >
                      <motion.button
                        whileHover={{ scale: 1.05, color: "#4F46E5" }}
                        className="text-xs text-gray-500 hover:text-indigo-600"
                        onClick={() => {
                          setReactionMessage(message.id);
                          setShowEmojiPicker(true);
                        }}
                      >
                        Add reaction
                      </motion.button>
                    </motion.div>
                    
                    {/* Emoji picker */}
                    <AnimatePresence>
                      {showEmojiPicker && reactionMessage === message.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className={`flex flex-wrap gap-2 p-2 bg-white border border-gray-200 rounded-lg shadow-lg ${
                            isCurrentUser ? 'justify-end mr-10' : 'justify-start ml-10'
                          }`}
                        >
                          {AVAILABLE_REACTIONS.map(emoji => (
                            <motion.button
                              key={emoji}
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-xl hover:bg-gray-100 p-1 rounded-full"
                              onClick={() => handleAddReaction(message.id, emoji)}
                            >
                              {emoji}
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          
          {/* Typing indicators */}
          <AnimatePresence>
            {users
              .filter(user => user.isTyping && user.id !== CURRENT_USER_ID)
              .map(user => (
                <motion.div 
                  key={`typing-${user.id}`} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-end space-x-2">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-medium">
                      {user.avatar}
                    </div>
                    <div className="bg-white shadow-sm text-gray-800 px-4 py-2 rounded-lg rounded-bl-none">
                      <div className="flex space-x-1">
                        <motion.div 
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}
                          className="w-2 h-2 bg-indigo-500 rounded-full"
                        ></motion.div>
                        <motion.div 
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
                          className="w-2 h-2 bg-indigo-500 rounded-full"
                        ></motion.div>
                        <motion.div 
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
                          className="w-2 h-2 bg-indigo-500 rounded-full"
                        ></motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="border-t border-gray-200 bg-white px-4 py-3 shadow-lg"
        >
          <div className="flex items-end space-x-3">
            <div className="flex-grow relative rounded-lg border border-gray-300 bg-white overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 shadow-sm">
              <textarea
                className="block w-full resize-none border-0 focus:ring-0 py-3 px-3 text-gray-900 placeholder-gray-500 focus:outline-none sm:text-sm"
                placeholder="Type your message or status (busy, away, brb)..."
                rows={1}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                style={{ minHeight: '40px', maxHeight: '120px' }}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#4338ca" }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="inline-flex items-center justify-center rounded-full h-12 w-12 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              onClick={handleSendMessage}
              disabled={inputMessage.trim() === ''}
            >
              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}