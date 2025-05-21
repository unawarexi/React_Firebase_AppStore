/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { MessageCircle, Users, Plus, Search, Bell, Settings, Zap } from 'lucide-react';
import OnlineUsers from './OnlineUsers';
import MessagesComponent from './MessagesComponent';
import { Avatar, Avatar1, Avatar2, Avatar3 } from '../../assets/image';
import useResponsive from '../../hooks/responsive/useResponsive';

const Social = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const { isMobile } = useResponsive();
  
  // Mock data for demonstration
  const [notifications, setNotifications] = useState(5);
  const [groups, setGroups] = useState([
    { id: 1, name: 'Apex Legends Squad', members: 42, avatar: Avatar, },
    { id: 2, name: 'Minecraft Builders', members: 128, avatar: Avatar3, },
    { id: 3, name: 'Valorant Team Alpha', members: 16, avatar: Avatar2, },
    { id: 4, name: 'Game Dev Community', members: 256, avatar: Avatar1, }
  ]);
  
  const [feed, setFeed] = useState([
    { 
      id: 1, 
      user: 'BlazeGamer92', 
      avatar: Avatar,
      content: 'Just reached Diamond rank! Anyone want to team up for the weekend tournament?',
      likes: 24,
      comments: 8,
      time: '2h ago'
    },
    { 
      id: 2, 
      user: 'ProNoScope', 
      avatar: Avatar2,
      content: 'Our clan is recruiting new members! Must be level 50+ and active in Discord. DM me for details.',
      likes: 42,
      comments: 17,
      time: '4h ago'
    },
    { 
      id: 3, 
      user: 'GameDevStudio', 
      avatar: Avatar1,
      content: 'We just released a new update with 3 new maps and weapon balancing! Check it out and let us know what you think.',
      likes: 156,
      comments: 63,
      time: '6h ago'
    }
  ]);

  // Tab animation variants
  const tabVariants = {
    inactive: { opacity: 0.6, y: 5 },
    active: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } }
  };

  // Component animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
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

  // Modal for creating a group
  const CreateGroupModal = () => (
    <motion.div 
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowCreateGroup(false)}
    >
      <motion.div 
        className={`bg-white dark:bg-gray-900 rounded-xl w-full max-w-md ${isMobile ? 'mx-4 p-4' : 'p-6'} ${isMobile ? 'text-xs' : ''}`}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={`font-bold text-gray-900 dark:text-white mb-4 ${isMobile ? 'text-lg' : 'text-2xl'}`}>Create a New Group</h2>
        <form className="space-y-4">
          <div>
            <label className={`block text-gray-600 dark:text-gray-300 mb-1 ${isMobile ? 'text-xs' : ''}`}>Group Name</label>
            <input 
              type="text" 
              className={`w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${isMobile ? 'p-2 text-xs' : 'p-3'}`}
              placeholder="Enter a group name..."
            />
          </div>
          <div>
            <label className={`block text-gray-600 dark:text-gray-300 mb-1 ${isMobile ? 'text-xs' : ''}`}>Description</label>
            <textarea 
              className={`w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${isMobile ? 'p-2 text-xs h-16' : 'p-3 h-24'}`}
              placeholder="What's your group about?"
            ></textarea>
          </div>
          <div>
            <label className={`block text-gray-600 dark:text-gray-300 mb-1 ${isMobile ? 'text-xs' : ''}`}>Privacy</label>
            <select className={`w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${isMobile ? 'p-2 text-xs' : 'p-3'}`}>
              <option>Public</option>
              <option>Private</option>
              <option>Invite Only</option>
            </select>
          </div>
          <div className={`pt-2 flex space-x-3`}>
            <button 
              type="button" 
              className={`bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg transition-colors w-1/2 ${isMobile ? 'py-2 text-xs' : 'py-3 px-6'}`}
              onClick={() => setShowCreateGroup(false)}
            >
              Cancel
            </button>
            <button 
              type="button" 
              className={`bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors w-1/2 ${isMobile ? 'py-2 text-xs' : 'py-3 px-6'}`}
              onClick={() => setShowCreateGroup(false)}
            >
              Create Group
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );

  // Render active tab content
  const renderTabContent = () => {
    switch(activeTab) {
      case 'users':
        return <OnlineUsers />;
      case 'messages':
        return <MessagesComponent />;
      case 'feed':
      default:
        return (
          <motion.div 
            className={`${isMobile ? 'space-y-2 pb-16' : 'space-y-4 pb-20'}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Create post card */}
            <motion.div 
              className={`bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 ${isMobile ? 'p-2' : 'p-4'}`}
              variants={itemVariants}
            >
              <div className={`flex items-center ${isMobile ? 'space-x-2' : 'space-x-3'}`}>
                <div className={`${isMobile ? 'w-7 h-7' : 'w-10 h-10'} rounded-full bg-gray-100 dark:bg-gray-800 flex-shrink-0`}>
                  <img 
                    src="/api/placeholder/40/40" 
                    alt="Your avatar" 
                    className={`${isMobile ? 'w-7 h-7' : 'w-10 h-10'} rounded-full`}
                  />
                </div>
                <div 
                  className={`bg-gray-100 dark:bg-gray-800 rounded-full flex-grow text-gray-500 dark:text-gray-400 ${isMobile ? 'py-1 px-2 text-xs' : 'py-2 px-4'}`}
                >
                  What's on your mind?
                </div>
              </div>
              <div className={`flex justify-between ${isMobile ? 'mt-2' : 'mt-3'}`}>
                <button className={`flex items-center text-gray-500 dark:text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                  <Users size={isMobile ? 12 : 16} className="mr-1" />
                  Tag Players
                </button>
                <button className={`flex items-center text-gray-500 dark:text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                  <Zap size={isMobile ? 12 : 16} className="mr-1" />
                  Share Gameplay
                </button>
                <button className={`bg-blue-600 hover:bg-blue-500 text-white rounded-lg ${isMobile ? 'px-2 py-0.5 text-xs' : 'px-3 py-1'}`}>
                  Post
                </button>
              </div>
            </motion.div>

            {/* Feed posts */}
            {feed.map((post) => (
              <motion.div 
                key={post.id} 
                className={`bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 ${isMobile ? 'p-2' : 'p-4'}`}
                variants={itemVariants}
              >
                <div className={`flex items-center ${isMobile ? 'space-x-2' : 'space-x-3'}`}>
                  <div className={`${isMobile ? 'w-7 h-7' : 'w-10 h-10'} rounded-full bg-gray-100 dark:bg-gray-800 flex-shrink-0`}>
                    <img 
                      src={post.avatar} 
                      alt={post.user}
                      className={`${isMobile ? 'w-7 h-7' : 'w-10 h-10'} rounded-full`} 
                    />
                  </div>
                  <div>
                    <div className={`font-medium text-gray-900 dark:text-gray-200 ${isMobile ? 'text-xs' : ''}`}>{post.user}</div>
                    <div className={`text-xs text-gray-500 dark:text-gray-400 ${isMobile ? 'text-[10px]' : ''}`}>{post.time}</div>
                  </div>
                </div>
                <div className={`text-gray-900 dark:text-gray-200 ${isMobile ? 'mt-2 text-xs' : 'mt-3'}`}>
                  {post.content}
                </div>
                <div className={`flex justify-between items-center ${isMobile ? 'mt-2' : 'mt-4'}`}>
                  <div className={`flex ${isMobile ? 'space-x-2' : 'space-x-4'}`}>
                    <button className={`flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors ${isMobile ? 'text-xs' : ''}`}>
                      <motion.svg 
                        whileTap={{ scale: 1.3 }}
                        className={`${isMobile ? 'w-4 h-4 mr-0.5' : 'w-5 h-5 mr-1'}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"></path>
                        <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                      </motion.svg>
                      {post.likes}
                    </button>
                    <button className={`flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors ${isMobile ? 'text-xs' : ''}`}>
                      <MessageCircle size={isMobile ? 13 : 18} className="mr-1" />
                      {post.comments}
                    </button>
                  </div>
                  <button className={`text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors ${isMobile ? 'text-xs' : 'text-sm'}`}>
                    Reply
                  </button>
                </div>
              </motion.div>
            ))}
            
            {/* Groups section */}
            <motion.div 
              className={`bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 ${isMobile ? 'p-2' : 'p-4'}`}
              variants={itemVariants}
            >
              <div className={`flex justify-between items-center ${isMobile ? 'mb-2' : 'mb-3'}`}>
                <h3 className={`font-bold text-gray-900 dark:text-gray-200 ${isMobile ? 'text-base' : 'text-lg'}`}>Your Groups</h3>
                <button 
                  onClick={() => setShowCreateGroup(true)}
                  className={`text-blue-600 hover:text-blue-500 flex items-center ${isMobile ? 'text-xs' : ''}`}
                >
                  <Plus size={isMobile ? 12 : 16} className="mr-1" />
                  Create
                </button>
              </div>
              <div className={`grid grid-cols-2 ${isMobile ? 'gap-2' : 'gap-3'}`}>
                {groups.map(group => (
                  <div 
                    key={group.id}
                    className={`bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${isMobile ? 'p-2 space-x-2' : 'p-3 space-x-3'}`}
                  >
                    <div className={`${isMobile ? 'w-7 h-7' : 'w-10 h-10'} rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0`}>
                      <img 
                        src={group.avatar} 
                        alt={group.name}
                        className={`${isMobile ? 'w-7 h-7' : 'w-10 h-10'} rounded-full`} 
                      />
                    </div>
                    <div>
                      <div className={`font-medium text-gray-900 dark:text-gray-200 ${isMobile ? 'text-xs' : ''}`}>{group.name}</div>
                      <div className={`text-xs text-gray-500 dark:text-gray-400 ${isMobile ? 'text-[10px]' : ''}`}>{group.members} members</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        );
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 min-h-screen">
      {/* Header */}
      <header className={`sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800`}>
        <div className={`container mx-auto ${isMobile ? 'px-2 py-2' : 'px-4 py-3'}`}>
          <div className={`flex justify-between items-center ${isMobile ? 'min-h-[36px]' : ''}`}>
            <h1 className={`${isMobile ? 'text-base font-semibold' : 'text-xl font-bold'}`}>Social Hub</h1>
            <div className={`flex items-center ${isMobile ? 'space-x-2' : 'space-x-3'}`}>
              <div className="relative">
                <button className={`relative ${isMobile ? 'p-1' : 'p-2'}`}>
                  <Bell size={isMobile ? 16 : 20} />
                  {notifications > 0 && (
                    <span className={`absolute top-0 right-0 bg-red-500 rounded-full ${isMobile ? 'w-3 h-3 text-[10px]' : 'w-4 h-4 text-xs'} flex items-center justify-center text-white`}>
                      {notifications}
                    </span>
                  )}
                </button>
              </div>
              <button>
                <Settings size={isMobile ? 16 : 20} />
              </button>
            </div>
          </div>
          
          {/* Search bar */}
          <div className={`relative ${isMobile ? 'mt-2' : 'mt-3'}`}>
            <Search size={isMobile ? 14 : 18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search players, groups or posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`bg-gray-100 dark:bg-gray-800 w-full rounded-lg ${isMobile ? 'py-1.5 pl-8 pr-3 text-xs' : 'py-2 pl-10 pr-4'} text-gray-900 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className={`container mx-auto ${isMobile ? 'px-1 py-1' : 'px-4 py-4'}`}>
        {renderTabContent()}
      </main>
      
      {/* Bottom tabs */}
      <nav className={`fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-10
        ${isMobile ? 'h-[58px]' : ''}
      `}>
        <div className={`container mx-auto ${isMobile ? 'px-1' : 'px-4'}`}>
          <div className={`flex justify-around ${isMobile ? 'py-1' : 'py-3'}`}>
            <motion.button 
              className={`flex flex-col items-center ${isMobile ? 'text-[10px] space-y-0.5' : 'text-sm'}`}
              variants={tabVariants}
              animate={activeTab === 'feed' ? "active" : "inactive"}
              onClick={() => setActiveTab('feed')}
            >
              <Zap size={isMobile ? 16 : 22} />
              <span>Feed</span>
            </motion.button>
            <motion.button 
              className={`flex flex-col items-center ${isMobile ? 'text-[10px] space-y-0.5' : 'text-sm'}`}
              variants={tabVariants}
              animate={activeTab === 'users' ? "active" : "inactive"}
              onClick={() => setActiveTab('users')}
            >
              <Users size={isMobile ? 16 : 22} />
              <span>Players</span>
            </motion.button>
            <motion.button 
              className={`flex flex-col items-center ${isMobile ? 'text-[10px] space-y-0.5' : 'text-sm'}`}
              variants={tabVariants}
              animate={activeTab === 'messages' ? "active" : "inactive"}
              onClick={() => setActiveTab('messages')}
            >
              <MessageCircle size={isMobile ? 16 : 22} />
              <span>Messages</span>
            </motion.button>
          </div>
        </div>
      </nav>
      
      {/* Create group modal */}
      {showCreateGroup && <CreateGroupModal />}
    </div>
  );
};

export default Social;