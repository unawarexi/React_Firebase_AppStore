/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronLeft, Send, Paperclip, Smile, MoreVertical, Phone, Video, Users, ArrowLeft, Plus, Image, Mic, File, X } from 'lucide-react';
import { Avatar, Avatar1, Avatar2, Avatar3, Avatar5 } from '../../assets/image';
import Options from './Options';
import Attachments from './Attachments';

const MessagesComponent = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'single', 'group'
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);

  const messageEndRef = useRef(null);

  // Mock chats data
  const chats = [
    {
      id: 1,
      type: 'individual',
      name: 'GamingLegend',
      isOnline: true,
      avatar: Avatar,
      lastMessage: 'Are you joining the tournament tonight?',
      time: '10m ago',
      unread: 2,
      messages: [
        { id: 1, sent: false, text: 'Hey, are you free to play some ranked matches?', time: '12:30 PM' },
        { id: 2, sent: true, text: 'Sure, I can play after I finish this mission', time: '12:35 PM' },
        { id: 3, sent: false, text: `Perfect! Let me know when you're ready`, time: '12:36 PM' },
        { id: 4, sent: true, text: 'Almost done, should be ready in about 10 minutes', time: '12:40 PM' },
        { id: 5, sent: false, text: 'Are you joining the tournament tonight?', time: '12:50 PM' }
      ]
    },
    {
      id: 2,
      type: 'group',
      name: 'Apex Squad',
      isOnline: false,
      avatar: Avatar2,
      lastMessage: `StreamerPro: I'll be streaming our matches tonight`,
      time: '45m ago',
      unread: 0,
      members: 5,
      messages: [
        { id: 1, sent: false, user: 'ProSniper', text: `Who's up for some ranked games?`, time: '11:20 AM' },
        { id: 2, sent: true, text: 'I can join in 30 minutes', time: '11:25 AM' },
        { id: 3, sent: false, user: 'TacticalPlayer', text: `I'm in as well`, time: '11:27 AM' },
        { id: 4, sent: false, user: 'StreamerPro', text: `I'll be streaming our matches tonight`, time: '11:35 AM' }
      ]
    },
    {
      id: 3,
      type: 'individual',
      name: 'RPGWizard',
      isOnline: true,
      avatar: Avatar3,
      lastMessage: 'Check out this new build I found',
      time: '2h ago',
      unread: 0,
      messages: [
        { id: 1, sent: true, text: 'Have you tried the new expansion yet?', time: '10:05 AM' },
        { id: 2, sent: false, text: 'Yes! The new class is really fun to play', time: '10:15 AM' },
        { id: 3, sent: true, text: 'Which build are you using?', time: '10:17 AM' },
        { id: 4, sent: false, text: 'Check out this new build I found', time: '10:20 AM' }
      ]
    },
    {
      id: 4,
      type: 'group',
      name: 'Tournament Team',
      isOnline: false,
      avatar: Avatar1,
      lastMessage: 'CasualGamer99: When is the next practice?',
      time: '1d ago',
      unread: 0,
      members: 7,
      messages: [
        { id: 1, sent: false, user: 'GamingLegend', text: `Good job on yesterday's match everyone!`, time: 'Yesterday, 8:30 PM' },
        { id: 2, sent: true, text: 'Thanks, those last minutes were intense', time: 'Yesterday, 8:35 PM' },
        { id: 3, sent: false, user: 'ProSniper', text: 'We need to work on our coordination', time: 'Yesterday, 8:40 PM' },
        { id: 4, sent: false, user: 'CasualGamer99', text: 'When is the next practice?', time: 'Yesterday, 9:15 PM' }
      ]
    },
    {
      id: 5,
      type: 'individual',
      name: 'StreamerPro',
      isOnline: false,
      avatar: Avatar5,
      lastMessage: 'Want to join my stream as a guest?',
      time: '3d ago',
      unread: 0,
      messages: [
        { id: 1, sent: false, text: 'Hey, I saw your clutch play yesterday!', time: '3 days ago, 2:15 PM' },
        { id: 2, sent: true, text: 'Thanks! I was really focused haha', time: '3 days ago, 2:30 PM' },
        { id: 3, sent: false, text: 'Want to join my stream as a guest?', time: '3 days ago, 2:45 PM' }
      ]
    }
  ];

  // Filter chats based on tab and search query
  const filteredChats = chats.filter(chat => {
    if (activeTab === 'single') return chat.type === 'individual' && chat.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === 'group') return chat.type === 'group' && chat.name.toLowerCase().includes(searchQuery.toLowerCase());
    return chat.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Scroll to bottom of messages
  useEffect(() => {
    if (messageEndRef.current && activeChat) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeChat]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const chatContainerVariants = {
    hidden: { x: '100%' },
    visible: { 
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    exit: {
      x: '100%',
      transition: { ease: 'easeIn', duration: 0.2 }
    }
  };

  // Group creation modal
  const CreateGroupModal = () => {
    return (
      <motion.div 
        className="fixed inset-0 flex items-center justify-center z-50 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowCreateGroup(false)}
      >
        <motion.div 
          className="bg-white rounded-xl p-6 w-full max-w-md"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-bold mb-4 text-gray-900">Create Group Chat</h2>
          
          <div className="mb-4">
            <label className="block text-gray-600 mb-2 text-sm">Group Name</label>
            <input 
              type="text" 
              className="w-full bg-gray-100 text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter group name..."
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-600 mb-2 text-sm">Add Members</label>
            <div className="relative mb-2">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                className="w-full bg-gray-100 text-gray-900 rounded-lg py-2 pl-9 pr-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Search players..."
              />
            </div>
            <div className="max-h-40 overflow-y-auto">
              {chats
                .filter(chat => chat.type === 'individual')
                .map(user => (
                  <div key={user.id} className="flex items-center justify-between py-2">
                    <div className="flex items-center">
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="w-8 h-8 rounded-full mr-2" 
                      />
                      <span className="text-gray-900">{user.name}</span>
                    </div>
                    <button className="w-5 h-5 rounded-md border border-gray-300 flex items-center justify-center hover:bg-blue-500 hover:border-blue-500 transition-colors">
                      <Plus size={12} />
                    </button>
                  </div>
                ))}
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button 
              className="bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg py-2 px-4 flex-1 transition-colors"
              onClick={() => setShowCreateGroup(false)}
            >
              Cancel
            </button>
            <button 
              className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg py-2 px-4 flex-1 transition-colors"
              onClick={() => setShowCreateGroup(false)}
            >
              Create Group
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  // Handler for attachments
  const handleFileSelected = (file) => {
    // Implement file sending logic here
    // Example: console.log('File selected:', file);
  };
  const handleImageSelected = (file) => {
    // Implement image sending logic here
    // Example: console.log('Image selected:', file);
  };
  const handleVoiceRecorded = (blob) => {
    // Implement voice message sending logic here
    // Example: console.log('Voice recorded:', blob);
  };

  // Chat bubble component
  const ChatBubble = ({ message }) => (
    <div className={`flex ${message.sent ? 'justify-end' : 'justify-start'} mb-4`}>
      {!message.sent && message.user && (
        <div className="flex-shrink-0 mr-2">
          <img src={Avatar} alt={message.user} className="w-8 h-8 rounded-full" />
        </div>
      )}
      <div className={`max-w-xs lg:max-w-md ${message.sent ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'} rounded-2xl px-4 py-2`}>
        {!message.sent && message.user && (
          <div className="text-xs text-blue-600 font-medium mb-1">{message.user}</div>
        )}
        <p className="text-sm">{message.text}</p>
        <div className="text-xs opacity-70 text-right mt-1">{message.time}</div>
      </div>
    </div>
  );

  return (
    <div className="pb-20">
      <AnimatePresence mode="wait">
        <div className="flex flex-col md:flex-row h-[calc(100vh-5rem)] md:h-[calc(100vh-4rem)]">
          {/* Chat List */}
          <motion.div 
            key="chats"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`
              bg-white z-10
              ${activeChat ? 'hidden md:block md:w-1/3 lg:w-1/4' : 'block w-full'}
              h-full overflow-y-auto
              transition-all duration-300
            `}
          >
            {/* Tabs */}
            <div className="flex items-center space-x-2 mb-4">
              {['all', 'single', 'group'].map(tab => (
                <button
                  key={tab}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-colors
                    ${activeTab === tab ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}
                  `}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'all' && 'All'}
                  {tab === 'single' && 'Single'}
                  {tab === 'group' && 'Group'}
                  {activeTab === tab && (
                    <span className="absolute left-1/2 -bottom-1 transform -translate-x-1/2 w-2 h-2 bg-blue-600 rounded-full"></span>
                  )}
                </button>
              ))}
            </div>
            {/* Back button */}
            <div className="flex items-center mb-4">
              <button
                className="p-2 mr-2 rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => window.history.back()}
              >
                <ChevronLeft size={24} />
              </button>
              <h2 className="text-xl font-bold text-gray-900">Messages</h2>
              <div className="flex-grow" />
              <button 
                className="bg-blue-600 hover:bg-blue-500 text-white rounded-full p-2"
                onClick={() => setShowCreateGroup(true)}
              >
                <Users size={18} />
              </button>
            </div>
            {/* Search */}
            <div className="relative mb-4">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-100 w-full rounded-lg py-2 pl-10 pr-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Chat list */}
            <div className="space-y-2">
              {filteredChats.map(chat => (
                <motion.div 
                  key={chat.id}
                  className="bg-gray-100 rounded-xl p-3 flex items-center cursor-pointer hover:bg-gray-200 transition-colors"
                  variants={itemVariants}
                  onClick={() => setActiveChat(chat)}
                >
                  <div className="relative mr-3">
                    <img 
                      src={chat.avatar} 
                      alt={chat.name}
                      className="w-12 h-12 rounded-full" 
                    />
                    {chat.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                    {chat.type === 'group' && (
                      <div className="absolute -bottom-1 -right-1 bg-white rounded-full w-5 h-5 flex items-center justify-center text-xs border border-gray-300">
                        <Users size={10} />
                      </div>
                    )}
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-baseline">
                      <div className="font-medium text-gray-900 truncate">{chat.name}</div>
                      <div className="text-xs text-gray-500 flex-shrink-0 ml-2">{chat.time}</div>
                    </div>
                    <div className="text-sm text-gray-500 truncate">{chat.lastMessage}</div>
                  </div>
                  {chat.unread > 0 && (
                    <div className="ml-2 bg-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs text-white">
                      {chat.unread}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            {/* Empty state */}
            {filteredChats.length === 0 && (
              <div className="text-center py-10">
                <div className="text-gray-500 mb-2">No messages found</div>
                {searchQuery && (
                  <button 
                    className="text-blue-600 hover:text-blue-500"
                    onClick={() => setSearchQuery('')}
                  >
                    Clear search
                  </button>
                )}
              </div>
            )}
          </motion.div>

          {/* Chat Area */}
          {activeChat && (
            <motion.div 
              key="chat"
              className={`
                bg-white flex flex-col
                fixed inset-0 md:static md:inset-auto
                w-full md:w-2/3 lg:w-3/4
                md:ml-2
                transition-all duration-300
              `}
              variants={chatContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Chat header */}
              <div className="bg-gray-100 p-3 flex items-center border-b border-gray-200 relative">
                <button 
                  className="p-2 mr-2 md:hidden" 
                  onClick={() => setActiveChat(null)}
                >
                  <ArrowLeft size={20} />
                </button>
                <div className="flex-grow flex items-center">
                  <div className="relative mr-3">
                    <img 
                      src={activeChat.avatar} 
                      alt={activeChat.name}
                      className="w-10 h-10 rounded-full" 
                    />
                    {activeChat.isOnline && (
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{activeChat.name}</div>
                    <div className="text-xs text-gray-500">
                      {activeChat.type === 'group' 
                        ? `${activeChat.members} members` 
                        : (activeChat.isOnline ? 'Online' : 'Offline')
                      }
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="p-2 text-gray-600">
                    <Phone size={18} />
                  </button>
                  <button className="p-2 text-gray-600">
                    <Video size={18} />
                  </button>
                  {activeChat.type === 'group' && (
                    <button className="p-2 text-gray-600">
                      <Users size={18} />
                    </button>
                  )}
                  {/* 3-dot vertical menu */}
                  <div className="relative">
                    <button
                      className="p-2 text-gray-600"
                      onClick={() => setShowOptionsMenu((v) => !v)}
                      aria-label="More options"
                    >
                      <MoreVertical size={18} />
                    </button>
                    <AnimatePresence>
                      {showOptionsMenu && (
                        <Options
                          onClose={() => setShowOptionsMenu(false)}
                          chat={activeChat}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                  {/* Close icon for all screens */}
                  <button
                    className="p-2 ml-2 text-gray-600"
                    onClick={() => setActiveChat(null)}
                    aria-label="Close chat"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              {/* Chat messages */}
              <div className="flex-grow p-4 overflow-y-auto bg-gradient-to-b from-white to-gray-100">
                <div className="flex flex-col">
                  {activeChat.messages.map(msg => (
                    <ChatBubble key={msg.id} message={msg} />
                  ))}
                  <div ref={messageEndRef} />
                </div>
              </div>
              {/* Message input */}
              <div className="bg-gray-100 p-3 border-t border-gray-200 relative">
                <AnimatePresence>
                  {showOptions && (
                    <Attachments
                      onClose={() => setShowOptions(false)}
                      onFileSelected={handleFileSelected}
                      onImageSelected={handleImageSelected}
                      onVoiceRecorded={handleVoiceRecorded}
                    />
                  )}
                </AnimatePresence>
                <div className="flex items-center space-x-2">
                  <button 
                    className="p-2 text-gray-500"
                    onClick={() => setShowOptions(!showOptions)}
                  >
                    <Paperclip size={20} />
                  </button>
                  <div className="flex-grow relative">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="w-full bg-white rounded-full py-2.5 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-500">
                      <Smile size={20} />
                    </button>
                  </div>
                  <button 
                    className={`p-2 rounded-full ${message.trim() ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'}`}
                    disabled={!message.trim()}
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </AnimatePresence>
      {/* AnimatePresence for modal moved here, outside chat list */}
      <AnimatePresence>
        {showCreateGroup && <CreateGroupModal />}
      </AnimatePresence>
    </div>
  );
};

export default MessagesComponent;