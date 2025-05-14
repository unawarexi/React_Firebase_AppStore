/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Info, Archive, ShieldOff, Trash2, X } from 'lucide-react';

const menuOptions = [
  { icon: <Phone size={16} />, label: 'Call History' },
  { icon: <Info size={16} />, label: 'Details' },
  { icon: <Archive size={16} />, label: 'Archive' },
  { icon: <ShieldOff size={16} />, label: 'Block' },
  { icon: <Trash2 size={16} />, label: 'Delete Chat', danger: true },
];

const Options = ({ onClose, chat }) => (
  <motion.div
    className="absolute right-0 top-10 bg-white rounded-lg shadow-lg z-50 w-48"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
    tabIndex={-1}
  >
    <div className="flex flex-col py-2">
      {menuOptions.map((opt, idx) => (
        <button
          key={opt.label}
          className={`flex items-center px-4 py-2 text-sm text-left hover:bg-gray-100 transition-colors ${
            opt.danger ? 'text-red-600' : 'text-gray-900'
          }`}
          onClick={() => {
            // Placeholder for option actions
            onClose();
          }}
        >
          <span className="mr-2">{opt.icon}</span>
          {opt.label}
        </button>
      ))}
      <button
        className="flex items-center px-4 py-2 text-sm text-gray-500 hover:bg-gray-100"
        onClick={onClose}
      >
        <X size={16} className="mr-2" /> Close
      </button>
    </div>
  </motion.div>
);

export default Options;
