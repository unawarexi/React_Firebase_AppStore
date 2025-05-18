/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { FaApple, FaGooglePlay, FaTwitter, FaInstagram, FaFacebook, FaLinkedin, FaYoutube } from 'react-icons/fa';

// Animation variants for smooth animations
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
  visible: { y: 0, opacity: 1 }
};

// Reusable footer category component
const FooterCategory = ({ title, links }) => {
  return (
    <motion.div 
      className="lg:w-1/5 md:w-1/3 sm:w-1/2 w-full px-3"
      variants={itemVariants}
    >
      <h2 className="title-font font-medium text-gray-900 dark:text-white tracking-wider text-sm mb-3">
        {title}
      </h2>
      <nav className="list-none mb-8">
        {links.map((link, index) => (
          <li key={index}>
            <a className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white text-sm transition-colors duration-200">
              {link}
            </a>
          </li>
        ))}
      </nav>
    </motion.div>
  );
};

// Reusable social icon component
const SocialIcon = ({ Icon, link }) => {
  return (
    <motion.a 
      href={link} 
      className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
    >
      <Icon className="w-5 h-5" />
    </motion.a>
  );
};

// Store badge component (for App Store & Play Store)
const StoreBadge = ({ store, Icon, text }) => {
  return (
    <motion.a 
      className="flex items-center justify-center bg-black dark:bg-gray-900 text-white rounded-lg px-3 py-2 mx-2 mb-2 sm:mb-0"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="mr-2 text-xl" />
      <div className="flex flex-col">
        <span className="text-xs">Get it on</span>
        <span className="text-sm font-semibold">{store}</span>
      </div>
    </motion.a>
  );
};

const Footer = () => {
  // Footer category data - centralized for easy editing
  const categories = [
    {
      title: "PRODUCT",
      links: ["Features", "Pricing", "Documentation", "Updates"]
    },
    {
      title: "COMPANY",
      links: ["About Us", "Careers", "Press", "Contact"]
    },
    {
      title: "RESOURCES",
      links: ["Blog", "Community", "Support", "Tutorials"]
    },
    {
      title: "LEGAL",
      links: ["Privacy Policy", "Terms of Use", "License", "Cookies"]
    }
  ];

  // Social media links
  const socialLinks = [
    { Icon: FaFacebook, link: "#" },
    { Icon: FaTwitter, link: "#" },
    { Icon: FaInstagram, link: "#" },
    { Icon: FaLinkedin, link: "#" },
    { Icon: FaYoutube, link: "#" }
  ];

  return (
    <footer className="text-gray-600 dark:text-gray-300 body-font bg-white dark:bg-gray-900">
      {/* Main footer content */}
      <motion.div 
        className="container px-4 py-16 mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        {/* Download section */}
        <motion.div 
          className="flex flex-col items-center md:items-start mb-12 text-center md:text-left"
          variants={itemVariants}
        >
          <h2 className="text-lg md:text-xl font-bold mb-4 text-gray-900 dark:text-white">Download Our App</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 max-w-lg">
            Experience our app on your mobile device. Download now and enjoy exclusive benefits.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start">
            <StoreBadge store="App Store" Icon={FaApple} />
            <StoreBadge store="Google Play" Icon={FaGooglePlay} />
          </div>
        </motion.div>

        {/* Categories */}
        <div className="flex flex-wrap md:text-left text-center -mb-10 -mx-4">
          {categories.map((category, index) => (
            <FooterCategory key={index} title={category.title} links={category.links} />
          ))}
        </div>
      </motion.div>

      {/* Newsletter section */}
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="container px-4 py-8 mx-auto">
          <motion.div 
            className="flex flex-col md:flex-row items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-col md:flex-row items-center md:items-start w-full md:w-auto mb-6 md:mb-0">
              <div className="relative w-full md:w-64 md:mr-4 mb-4 md:mb-0">
                <label htmlFor="footer-field" className="leading-7 text-sm text-gray-600 dark:text-gray-300">
                  Subscribe to our newsletter
                </label>
                <input 
                  type="email" 
                  id="footer-field" 
                  name="footer-field" 
                  placeholder="Your email"
                  className="w-full bg-gray-100 dark:bg-gray-800 bg-opacity-50 rounded border border-gray-300 dark:border-gray-700 focus:ring-2 focus:bg-transparent focus:ring-indigo-200 focus:border-indigo-500 text-base outline-none text-gray-700 dark:text-gray-200 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
                />
              </div>
              <motion.button 
                className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
            
            {/* Social links */}
            <div className="flex justify-center space-x-4">
              {socialLinks.map((social, index) => (
                <SocialIcon key={index} Icon={social.Icon} link={social.link} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Copyright section */}
      <div className="bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} AppName —
            <a href="#" className="text-gray-600 dark:text-gray-300 ml-1" target="_blank" rel="noopener noreferrer">
              All rights reserved
            </a>
          </p>
          <span className="sm:ml-auto sm:mt-0 mt-2 sm:w-auto w-full sm:text-left text-center text-gray-500 dark:text-gray-400 text-sm">
            Available on iOS and Android
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;