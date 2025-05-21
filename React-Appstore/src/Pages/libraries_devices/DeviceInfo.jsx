/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getFullSystemInfo } from '../../utils/OsDetection';
import { Monitor, Smartphone, Tablet, Globe, Cpu, Wifi, HardDrive, CheckCircle } from 'lucide-react';

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center py-1 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
    <span className="font-medium text-gray-700 dark:text-gray-300">{label}</span>
    <span className="text-gray-600 dark:text-gray-400 text-right break-all">{value}</span>
  </div>
);

const CapabilityBadge = ({ label, enabled }) => (
  <span className={`inline-block px-2 py-1 mr-2 mb-2 rounded text-xs font-semibold 
    ${enabled ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}>
    {enabled ? <CheckCircle className="inline w-3 h-3 mr-1" /> : <Cpu className="inline w-3 h-3 mr-1" />}
    {label}
  </span>
);

const DeviceIcon = ({ type }) => {
  if (type === 'Mobile' || type === 'iPhone') return <Smartphone className="w-8 h-8" />;
  if (type === 'Tablet' || type === 'iPad') return <Tablet className="w-8 h-8" />;
  if (type === 'Desktop' || type === 'Mac' || type === 'PC') return <Monitor className="w-8 h-8" />;
  return <Cpu className="w-8 h-8" />;
};

const DeviceInfo = () => {
  const [systemInfo, setSystemInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const info = await getFullSystemInfo();
      setSystemInfo(info);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-2">
      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
              className="mb-4 text-blue-500 dark:text-blue-400"
            >
              <Cpu className="w-12 h-12" />
            </motion.div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Gathering Device Info...</h2>
            <p className="text-gray-500 dark:text-gray-400">Please wait while we analyze your device.</p>
          </motion.div>
        ) : (
          <motion.div
            key="info"
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -20 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 md:p-10"
          >
            <div className="flex flex-col md:flex-row items-center mb-6">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                className="mb-4 md:mb-0 md:mr-6"
              >
                <DeviceIcon type={systemInfo.deviceType} />
              </motion.div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">
                  {systemInfo.name} {systemInfo.version}
                </h2>
                <div className="flex items-center justify-center md:justify-start text-gray-500 dark:text-gray-400 text-sm">
                  <Globe className="w-4 h-4 mr-1" />
                  {systemInfo.browserName} {systemInfo.browserVersion}
                  <span className="mx-2">|</span>
                  <span>{systemInfo.deviceType}</span>
                </div>
                <div className="mt-1 text-xs text-blue-600 dark:text-blue-300">
                  Recommended App Version: <span className="font-semibold">{systemInfo.recommendedAppVersion}</span>
                </div>
              </div>
            </div>

            {/* Screen Info */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-4"
            >
              <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Screen</h3>
              <div className="grid grid-cols-2 gap-2">
                <InfoRow label="Resolution" value={`${systemInfo.screen.width} x ${systemInfo.screen.height}`} />
                <InfoRow label="Pixel Ratio" value={systemInfo.screen.pixelRatio} />
                <InfoRow label="Color Depth" value={systemInfo.screen.colorDepth} />
                <InfoRow label="Orientation" value={systemInfo.screen.orientation} />
              </div>
            </motion.div>

            {/* Network Info */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mb-4"
            >
              <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2 flex items-center">
                <Wifi className="w-4 h-4 mr-1" /> Network
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <InfoRow label="Online" value={systemInfo.network.online ? 'Yes' : 'No'} />
                <InfoRow label="Type" value={systemInfo.network.type} />
                <InfoRow label="Effective Type" value={systemInfo.network.effectiveType} />
                <InfoRow label="Downlink" value={systemInfo.network.downlinkSpeed} />
                <InfoRow label="RTT" value={systemInfo.network.rtt} />
                <InfoRow label="Save Data" value={systemInfo.network.saveData ? 'Yes' : 'No'} />
              </div>
            </motion.div>

            {/* Capabilities */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4"
            >
              <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Capabilities</h3>
              <div className="flex flex-wrap">
                <CapabilityBadge label="Touch" enabled={systemInfo.capabilities.touchScreen} />
                <CapabilityBadge label="Cookies" enabled={systemInfo.capabilities.cookiesEnabled} />
                <CapabilityBadge label="LocalStorage" enabled={systemInfo.capabilities.localStorage} />
                <CapabilityBadge label="SessionStorage" enabled={systemInfo.capabilities.sessionStorage} />
                <CapabilityBadge label="Service Worker" enabled={systemInfo.capabilities.serviceWorker} />
                <CapabilityBadge label="WebGL" enabled={systemInfo.capabilities.webGL} />
                <CapabilityBadge label="WebP" enabled={systemInfo.capabilities.webP} />
              </div>
            </motion.div>

            {/* Audio/Video Support */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mb-4"
            >
              <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Media Support</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="font-medium text-xs text-gray-600 dark:text-gray-400 mb-1">Audio</div>
                  {Object.entries(systemInfo.capabilities.audio).map(([fmt, val]) => (
                    <CapabilityBadge key={fmt} label={fmt.toUpperCase()} enabled={!!val} />
                  ))}
                </div>
                <div>
                  <div className="font-medium text-xs text-gray-600 dark:text-gray-400 mb-1">Video</div>
                  {Object.entries(systemInfo.capabilities.video).map(([fmt, val]) => (
                    <CapabilityBadge key={fmt} label={fmt.toUpperCase()} enabled={!!val} />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Raw JSON (advanced users) */}
            <motion.details
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 bg-gray-50 dark:bg-gray-900 rounded p-2"
            >
              <summary className="cursor-pointer font-semibold text-blue-600 dark:text-blue-300">Show Raw Device Info (Advanced)</summary>
              <pre className="text-xs text-gray-700 dark:text-gray-200 mt-2 overflow-x-auto">
                {JSON.stringify(systemInfo, null, 2)}
              </pre>
            </motion.details>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DeviceInfo;
