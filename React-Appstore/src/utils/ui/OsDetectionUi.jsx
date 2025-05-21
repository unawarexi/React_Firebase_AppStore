/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getFullSystemInfo } from '../OsDetection';
import { Loader2, CheckCircle, Cpu, Monitor, HardDrive, Globe, Smartphone, Tablet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useResponsive from '../../hooks/responsive/useResponsive';

const OsDetectionUI = ({ redirectTo }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [detectionState, setDetectionState] = useState('detecting'); // 'detecting', 'configuring', 'complete'
  const [systemInfo, setSystemInfo] = useState(null);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const {isMobile, isTablet, isDesktop} = useResponsive();

  useEffect(() => {
    const detectSystem = async () => {
      // Simulate detection steps for better UX
      const totalSteps = 5;
      
      // Step 1: Start detection
      setProgress(20);
      await simulateProgress(700);
      
      // Step 2: Get system info
      setProgress(40);
      const info = await getFullSystemInfo();
      setSystemInfo(info);
      await simulateProgress(500);
      
      // Step 3: Analyzing capabilities
      setProgress(60);
      await simulateProgress(600);
      
      // Step 4: Configuration
      setDetectionState('configuring');
      setProgress(80);
      await simulateProgress(800);
      
      // Step 5: Complete
      setProgress(100);
      setDetectionState('complete');
      await simulateProgress(1000);
      
      // Auto hide after completion
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    };
    
    detectSystem();
  }, []);
  
  // Redirect after detection is complete and UI is hidden
  useEffect(() => {
    if (!isVisible && detectionState === 'complete' && redirectTo) {
      navigate(redirectTo, { replace: true });
    }
  }, [isVisible, detectionState, redirectTo, navigate]);

  const simulateProgress = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
  
  const getDeviceIcon = () => {
    if (!systemInfo) return <Cpu className="w-6 h-6" />;
    
    if (systemInfo.isMobile) {
      return <Smartphone className="w-6 h-6" />;
    } else if (systemInfo.isTablet) {
      return <Tablet className="w-6 h-6" />;
    } else {
      return <Monitor className="w-6 h-6" />;
    }
  };
  
  const getStatusMessage = () => {
    if (detectionState === 'detecting') {
      return 'Detecting System';
    } else if (detectionState === 'configuring') {
      return `Configuring AppStore for ${systemInfo?.name || 'Your Device'}`;
    } else {
      return 'System Configured';
    }
  };
  
  const getDetailMessage = () => {
    if (!systemInfo) return 'Please wait while we analyze your device...';
    
    if (detectionState === 'detecting') {
      return `Analyzing ${systemInfo.name} ${systemInfo.version}`;
    } else if (detectionState === 'configuring') {
      return `Optimizing for ${systemInfo.deviceType} with ${systemInfo.browserName} ${systemInfo.browserVersion}`;
    } else {
      return `Ready for ${systemInfo.name} ${systemInfo.version} (${systemInfo.deviceType})`;
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className={
            isMobile
              ? "fixed inset-0 flex items-center justify-center z-50"
              : "fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
          }
        >
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-80 md:w-96"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            {/* Progress bar */}
            <motion.div 
              className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4"
            >
              <motion.div 
                className="h-full bg-blue-500 dark:bg-blue-400 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              />
            </motion.div>
            
            {/* Animation indicator */}
            <div className="flex justify-center mb-3">
              <motion.div
                animate={{ 
                  rotate: detectionState === 'complete' ? 0 : 360,
                  scale: detectionState === 'complete' ? [1, 1.2, 1] : 1
                }}
                transition={{
                  rotate: { 
                    repeat: detectionState === 'complete' ? 0 : Infinity, 
                    duration: 1.5,
                    ease: "linear"
                  },
                  scale: { 
                    duration: 0.5, 
                    times: [0, 0.5, 1]
                  }
                }}
                className="text-blue-500 dark:text-blue-400"
              >
                {detectionState === 'complete' ? (
                  <CheckCircle className="w-12 h-12" />
                ) : (
                  <Loader2 className="w-12 h-12" />
                )}
              </motion.div>
            </div>
            
            {/* Status message */}
            <motion.h3 
              className="text-lg font-semibold text-center text-gray-800 dark:text-gray-100 mb-2"
              key={detectionState}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {getStatusMessage()}
            </motion.h3>
            
            {/* OS Details */}
            <motion.div 
              className="mt-4 bg-gray-50 dark:bg-gray-700 p-3 rounded-md"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center">
                <div className="mr-3 text-gray-600 dark:text-gray-300">
                  {getDeviceIcon()}
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {getDetailMessage()}
                  </p>
                  {systemInfo && detectionState === 'complete' && (
                    <motion.p 
                      className="text-xs text-gray-500 dark:text-gray-400 mt-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      App version: {systemInfo.recommendedAppVersion}
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.div>
            
            {/* Browser info */}
            {systemInfo && (
              <motion.div 
                className="mt-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center">
                  <Globe className="w-3 h-3 mr-1" />
                  <span>
                    {systemInfo.browserName} {systemInfo.browserVersion}
                  </span>
                </div>
                <span>
                  {systemInfo.capabilities?.touchScreen ? 'Touch Enabled' : 'Desktop'}
                </span>
              </motion.div>
            )}
            
            {/* Dismiss button */}
            <motion.button
              className="mt-4 w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-medium transition-colors duration-200"
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsVisible(false)}
            >
              {detectionState === 'complete' ? 'Continue to AppStore' : 'Dismiss'}
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Component that can be used directly in your app
export default OsDetectionUI;

// A component that will show automatically when your app is loaded
export const AutoOsDetection = () => {
  // This will automatically mount the detection UI when imported
  return <OsDetectionUI />;
};

// Usage example component
export const AppWithOsDetection = ({ children }) => {
  const [showDetection, setShowDetection] = useState(true);
  const [systemInfo, setSystemInfo] = useState(null);

  useEffect(() => {
    const loadSystemInfo = async () => {
      try {
        const info = await getFullSystemInfo();
        setSystemInfo(info);
        // Automatically hide the detection UI after loading
        setTimeout(() => {
          setShowDetection(false);
        }, 5000);
      } catch (error) {
        console.error("Error detecting system:", error);
        setShowDetection(false);
      }
    };

    loadSystemInfo();
  }, []);

  return (
    <>
      {showDetection && <OsDetectionUI />}
      {/* Pass system info to children if needed */}
      {React.Children.map(children, child => 
        React.cloneElement(child, { systemInfo })
      )}
    </>
  );
};