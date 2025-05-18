/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, UserPlus, Shield, Star, Crown, Calendar, X, Check, Filter, ChevronRight, Users } from 'lucide-react';

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

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: { 
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 20 }
  }
};

// Status indicator color
const getStatusColor = (status) => {
  switch(status) {
    case 'online': return 'bg-green-500';
    case 'away': return 'bg-yellow-500';
    case 'busy': return 'bg-red-500';
    default: return 'bg-gray-400';
  }
};

// Rank badge color
const getRankColor = (rank) => {
  switch(rank) {
    case 'Bronze': return 'bg-yellow-100 text-yellow-800';
    case 'Silver': return 'bg-gray-200 text-gray-800';
    case 'Gold': return 'bg-yellow-300 text-yellow-900';
    case 'Platinum': return 'bg-blue-100 text-blue-900';
    case 'Diamond': return 'bg-blue-200 text-blue-900';
    case 'Master': return 'bg-purple-200 text-purple-900';
    case 'Elite': return 'bg-red-200 text-red-900';
    default: return 'bg-gray-200 text-gray-800';
  }
};

// ProfileCard modal
const ProfileCard = ({
  user,
  setShowProfileCard,
  setShowFriendRequest,
  setShowInviteToGroup
}) => {
  if (!user) return null;
  return (
    <motion.div 
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowProfileCard(false)}
    >
      <motion.div
        className="bg-white dark:bg-gray-900 rounded-xl w-full max-w-md overflow-hidden"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative">
          <div className="h-32 bg-gradient-to-r from-blue-400 to-purple-400"></div>
          <button 
            className="absolute top-3 right-3 bg-black bg-opacity-10 rounded-full p-1"
            onClick={() => setShowProfileCard(false)}
          >
            <X size={20} />
          </button>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <div className="relative">
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-20 h-20 rounded-full border-4 border-white" 
              />
              <div className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(user.status)}`}></div>
            </div>
          </div>
        </div>
        <div className="pt-12 pb-4 px-4">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h3>
            <div className="flex items-center justify-center mt-1 space-x-2">
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${getRankColor(user.rank)}`}>
                {user.rank}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">Level {user.level}</span>
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Currently playing: {user.game}
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{user.stats.wins ?? '-'}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Wins</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{user.stats.matches ?? '-'}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Matches</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{user.stats.kd ?? '-'}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">K/D</div>
            </div>
          </div>
          <div className="mt-6 flex justify-around">
            <button 
              className="flex flex-col items-center text-blue-600 hover:text-blue-500"
              onClick={() => {
                setShowProfileCard(false);
                // Handle message action
              }}
            >
              <MessageCircle size={24} />
              <span className="text-xs mt-1">Message</span>
            </button>
            {!user.isFriend ? (
              <button 
                className="flex flex-col items-center text-blue-600 hover:text-blue-500"
                onClick={() => {
                  setShowProfileCard(false);
                  setShowFriendRequest(true);
                }}
              >
                <UserPlus size={24} />
                <span className="text-xs mt-1">Add Friend</span>
              </button>
            ) : (
              <button 
                className="flex flex-col items-center text-blue-600 hover:text-blue-500"
                onClick={() => {
                  setShowProfileCard(false);
                  setShowInviteToGroup(true);
                }}
              >
                <Users size={24} />
                <span className="text-xs mt-1">Invite</span>
              </button>
            )}
            <button 
              className="flex flex-col items-center text-blue-600 hover:text-blue-500"
              onClick={() => {
                setShowProfileCard(false);
                // Handle report action
              }}
            >
              <Shield size={24} />
              <span className="text-xs mt-1">Report</span>
            </button>
          </div>
          <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
            <h4 className="font-medium mb-2 text-gray-900 dark:text-white">Achievements</h4>
            <div className="flex flex-wrap gap-2">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 text-xs flex items-center text-gray-900 dark:text-white">
                <Star size={12} className="text-yellow-500 mr-1" />
                Top 10%
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 text-xs flex items-center text-gray-900 dark:text-white">
                <Crown size={12} className="text-purple-500 mr-1" />
                Tournament Winner
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 text-xs flex items-center text-gray-900 dark:text-white">
                <Calendar size={12} className="text-blue-500 mr-1" />
                1 Year Member
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Friend request modal
const FriendRequestModal = ({
  selectedUser,
  setShowFriendRequest
}) => {
  const [message, setMessage] = useState("Hey, let's play together sometime!");
  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowFriendRequest(false)}
    >
      <motion.div 
        className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-md"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Send Friend Request</h2>
        <div className="flex items-center space-x-3 mb-4">
          <img 
            src={selectedUser?.avatar} 
            alt={selectedUser?.name}
            className="w-12 h-12 rounded-full" 
          />
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{selectedUser?.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{selectedUser?.rank} • Level {selectedUser?.level}</div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 dark:text-gray-300 mb-2 text-sm">Add a message (optional)</label>
          <textarea 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none h-24 text-sm"
            placeholder="Write a personal message..."
          ></textarea>
        </div>
        <div className="flex space-x-3">
          <button 
            className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg py-2 px-4 flex-1 transition-colors"
            onClick={() => setShowFriendRequest(false)}
          >
            Cancel
          </button>
          <button 
            className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg py-2 px-4 flex-1 transition-colors"
            onClick={() => {
              // Handle send friend request
              setShowFriendRequest(false);
            }}
          >
            Send Request
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Invite to group modal
const InviteToGroupModal = ({
  selectedUser,
  setShowInviteToGroup,
  myGroups
}) => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowInviteToGroup(false)}
    >
      <motion.div 
        className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-md"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Invite to Group</h2>
        <div className="flex items-center space-x-3 mb-4">
          <img 
            src={selectedUser?.avatar} 
            alt={selectedUser?.name}
            className="w-12 h-12 rounded-full" 
          />
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{selectedUser?.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Currently playing: {selectedUser?.game}</div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 dark:text-gray-300 mb-2 text-sm">Select a group</label>
          <div className="space-y-2">
            {myGroups.map(group => (
              <div 
                key={group.id}
                className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                  selectedGroup === group.id ? 'border-blue-500 bg-blue-100 dark:bg-blue-950 bg-opacity-40' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
                onClick={() => setSelectedGroup(group.id)}
              >
                <div className="font-medium text-gray-900 dark:text-white">{group.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{group.members} members</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex space-x-3">
          <button 
            className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg py-2 px-4 flex-1 transition-colors"
            onClick={() => setShowInviteToGroup(false)}
          >
            Cancel
          </button>
          <button 
            className={`bg-blue-600 hover:bg-blue-500 text-white rounded-lg py-2 px-4 flex-1 transition-colors ${
              !selectedGroup ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={!selectedGroup}
            onClick={() => {
              // Handle invite to group
              setShowInviteToGroup(false);
            }}
          >
            Send Invite
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const OnlineUsers = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [showFriendRequest, setShowFriendRequest] = useState(false);
  const [showInviteToGroup, setShowInviteToGroup] = useState(false);

  // Mock users data
  const users = [
    { 
      id: 1, 
      name: 'GamingLegend', 
      avatar: '/api/placeholder/50/50', 
      status: 'online', 
      game: 'Fortnite', 
      level: 87,
      rank: 'Platinum',
      isFriend: true,
      lastActive: 'Now',
      stats: {
        wins: 342,
        matches: 1024,
        kd: 2.8
      }
    },
    { 
      id: 2, 
      name: 'ProSniper', 
      avatar: '/api/placeholder/50/50', 
      status: 'online', 
      game: 'Call of Duty', 
      level: 65,
      rank: 'Diamond',
      isFriend: false,
      lastActive: 'Now',
      stats: {
        wins: 201,
        matches: 587,
        kd: 3.2
      }
    },
    { 
      id: 3, 
      name: 'StrategyMaster', 
      avatar: '/api/placeholder/50/50', 
      status: 'away', 
      game: 'League of Legends', 
      level: 120,
      rank: 'Diamond',
      isFriend: true,
      lastActive: '5m ago',
      stats: {
        wins: 503,
        matches: 982,
        kd: null
      }
    },
    { 
      id: 4, 
      name: 'SpeedRunner', 
      avatar: '/api/placeholder/50/50', 
      status: 'online', 
      game: 'Minecraft', 
      level: 42,
      rank: 'Gold',
      isFriend: false,
      lastActive: 'Now',
      stats: {
        wins: 87,
        matches: 152,
        kd: null
      }
    },
    { 
      id: 5, 
      name: 'CasualGamer99', 
      avatar: '/api/placeholder/50/50', 
      status: 'online', 
      game: 'Apex Legends', 
      level: 34,
      rank: 'Silver',
      isFriend: true,
      lastActive: 'Now',
      stats: {
        wins: 46,
        matches: 312,
        kd: 1.4
      }
    },
    { 
      id: 6, 
      name: 'StreamerPro', 
      avatar: '/api/placeholder/50/50', 
      status: 'busy', 
      game: 'Fortnite', 
      level: 156,
      rank: 'Master',
      isFriend: false,
      lastActive: '20m ago',
      stats: {
        wins: 1203,
        matches: 2451,
        kd: 4.7
      }
    },
    { 
      id: 7, 
      name: 'RPGWizard', 
      avatar: '/api/placeholder/50/50', 
      status: 'online', 
      game: 'World of Warcraft', 
      level: 92,
      rank: 'Elite',
      isFriend: true,
      lastActive: 'Now',
      stats: {
        wins: null,
        matches: null,
        kd: null
      }
    },
    { 
      id: 8, 
      name: 'TacticalPlayer', 
      avatar: '/api/placeholder/50/50', 
      status: 'online', 
      game: 'Rainbow Six Siege', 
      level: 78,
      rank: 'Platinum',
      isFriend: false,
      lastActive: 'Now',
      stats: {
        wins: 315,
        matches: 742,
        kd: 2.1
      }
    }
  ];

  // Mock groups for invites
  const myGroups = [
    { id: 1, name: 'Apex Legends Squad', members: 12 },
    { id: 2, name: 'Weekend Warriors', members: 8 },
    { id: 3, name: 'Competitive Team', members: 5 }
  ];

  // Filter users based on active filter
  const filteredUsers = users.filter(user => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'friends') return user.isFriend;
    if (activeFilter === 'online') return user.status === 'online';
    return true;
  });

  return (
    <div className="pb-20">
      {/* Filters */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Players</h2>
        <div className="flex items-center space-x-2">
          <button 
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              activeFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
            }`}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          <button 
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              activeFilter === 'online' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
            }`}
            onClick={() => setActiveFilter('online')}
          >
            Online
          </button>
          <button 
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              activeFilter === 'friends' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
            }`}
            onClick={() => setActiveFilter('friends')}
          >
            Friends
          </button>
          <button className="p-1 bg-gray-100 dark:bg-gray-800 rounded-full">
            <Filter size={18} className="text-gray-400" />
          </button>
        </div>
      </div>
      {/* Online users list */}
      <motion.div 
        className="space-y-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredUsers.map(user => (
          <motion.div 
            key={user.id}
            className="bg-white dark:bg-gray-900 rounded-xl p-3 flex items-center justify-between border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            variants={itemVariants}
            onClick={() => {
              setSelectedUser(user);
              setShowProfileCard(true);
            }}
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-12 h-12 rounded-full" 
                />
                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(user.status)}`}></div>
              </div>
              <div>
                <div className="font-medium flex items-center text-gray-900 dark:text-white">
                  {user.name}
                  {user.isFriend && (
                    <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-950 text-blue-600 px-1.5 py-0.5 rounded">
                      Friend
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <span className="mr-2">{user.game}</span>
                  <span className={`px-1.5 py-0.5 rounded text-xs ${getRankColor(user.rank)}`}>{user.rank}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-xs text-gray-400">{user.lastActive}</div>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
          </motion.div>
        ))}
      </motion.div>
      {/* Empty state */}
      {filteredUsers.length === 0 && (
        <div className="text-center py-10">
          <div className="text-gray-500 dark:text-gray-400 mb-2">No players found</div>
          <button 
            className="text-blue-600 hover:text-blue-500"
            onClick={() => setActiveFilter('all')}
          >
            Clear filters
          </button>
        </div>
      )}
      {/* Modals */}
      {showProfileCard && (
        <ProfileCard
          user={selectedUser}
          setShowProfileCard={setShowProfileCard}
          setShowFriendRequest={setShowFriendRequest}
          setShowInviteToGroup={setShowInviteToGroup}
        />
      )}
      {showFriendRequest && (
        <FriendRequestModal
          selectedUser={selectedUser}
          setShowFriendRequest={setShowFriendRequest}
        />
      )}
      {showInviteToGroup && (
        <InviteToGroupModal
          selectedUser={selectedUser}
          setShowInviteToGroup={setShowInviteToGroup}
          myGroups={myGroups}
        />
      )}
    </div>
  );
};

export default OnlineUsers;