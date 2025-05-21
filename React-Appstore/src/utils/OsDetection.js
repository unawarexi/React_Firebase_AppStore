export const detectOperatingSystem = () => {
    // Detect OS and device type
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    let osInfo = {
      name: "Unknown OS",
      version: "Unknown Version",
      deviceType: "Unknown Device",
      isDesktop: false,
      isMobile: false,
      isTablet: false,
      browserName: "Unknown Browser",
      browserVersion: "Unknown Version",
    };
    osInfo = detectBrowser(userAgent, osInfo);
    // Detect browser name and version
    const isMobileDevice = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

    if (isMobileDevice) {
      osInfo.isMobile = true;
      if (/tablet|ipad|playbook|silk/i.test(userAgent.toLowerCase()) || 
          (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1 && !window.MSStream)) {
        osInfo.isTablet = true;
        osInfo.deviceType = "Tablet";
      } else {
        osInfo.deviceType = "Mobile";
      }
    } else {
      osInfo.isDesktop = true;
      osInfo.deviceType = "Desktop";
    }
    // Map macOS version to marketing name
    if (/iP(hone|od|ad)/i.test(userAgent)) {
      osInfo.name = "iOS";
      const match = userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/);
      if (match) {
        const version = [match[1], match[2], match[3] || '0'].join('.');
        osInfo.version = version;
        if (/iPhone/i.test(userAgent)) {
          osInfo = detectIphoneModel(userAgent, osInfo);
        }
        if (/iPad/i.test(userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
          osInfo = detectIpadModel(userAgent, osInfo);
        }
      }
    }
    else if (/Mac OS X/i.test(userAgent)) {
      osInfo.name = "macOS";
      const match = userAgent.match(/Mac OS X (\d+)[._](\d+)[._]?(\d+)?/);
      if (match) {
        const version = [match[1], match[2], match[3] || '0'].join('.');
        osInfo.version = version;
        osInfo = detectMacOSVersion(version, osInfo);
      }
    }
    else if (/Windows/i.test(userAgent)) {
      osInfo.name = "Windows";
      if (/Windows NT 10.0/i.test(userAgent)) {
        osInfo.version = "10/11";
        if (userAgent.indexOf('Windows NT 10.0') !== -1) {
          if (
            /Edge\/|Edg\//i.test(userAgent) || 
            (osInfo.browserName === "Chrome" && parseInt(osInfo.browserVersion) >= 90) || 
            (osInfo.browserName === "Firefox" && parseInt(osInfo.browserVersion) >= 88)
          ) {
            const buildNumber = userAgent.match(/build\/(\d+)/i);
            if (buildNumber && parseInt(buildNumber[1]) >= 22000) {
              osInfo.version = "11";
            } else {
              osInfo.version = "10";
            }
          }
        }
      }
      else if (/Windows NT 6.3/i.test(userAgent)) osInfo.version = "8.1";
      else if (/Windows NT 6.2/i.test(userAgent)) osInfo.version = "8";
      else if (/Windows NT 6.1/i.test(userAgent)) osInfo.version = "7";
      else if (/Windows NT 6.0/i.test(userAgent)) osInfo.version = "Vista";
      else if (/Windows NT 5.1/i.test(userAgent)) osInfo.version = "XP";
      else if (/Windows NT 5.0/i.test(userAgent)) osInfo.version = "2000";
      else osInfo.version = "Unknown Windows Version";
    }
    else if (/Android/i.test(userAgent)) {
      osInfo.name = "Android";
      const match = userAgent.match(/Android (\d+)\.(\d+)\.?(\d+)?/);
      if (match) {
        const version = [match[1], match[2], match[3] || '0'].join('.');
        osInfo.version = version;
        osInfo = detectAndroidVersion(version, osInfo);
      }
      const deviceMatch = userAgent.match(/; ([^;]+) Build\//i);
      if (deviceMatch) {
        osInfo.deviceType = deviceMatch[1].trim();
      }
    }
    else if (/Linux/i.test(userAgent) && !/Android/i.test(userAgent)) {
      osInfo.name = "Linux";
      if (/Ubuntu/i.test(userAgent)) osInfo.version = "Ubuntu";
      else if (/Fedora/i.test(userAgent)) osInfo.version = "Fedora";
      else if (/Debian/i.test(userAgent)) osInfo.version = "Debian";
      else if (/SUSE/i.test(userAgent)) osInfo.version = "SUSE";
      else if (/Red Hat/i.test(userAgent)) osInfo.version = "Red Hat";
      else if (/Mint/i.test(userAgent)) osInfo.version = "Mint";
      else osInfo.version = "Unknown Distro";
    }
    else if (/CrOS/i.test(userAgent)) {
      osInfo.name = "Chrome OS";
      const match = userAgent.match(/CrOS [^ ]+ (\d+)\.(\d+)\.?(\d+)?/);
      if (match) {
        osInfo.version = [match[1], match[2], match[3] || '0'].join('.');
      }
    }
    return osInfo;
  };

// Detect browser name and version
const detectBrowser = (userAgent, osInfo) => {
    if (/Edg/i.test(userAgent)) {
      osInfo.browserName = "Edge";
      const match = userAgent.match(/Edg\/(\d+)\.(\d+)\.(\d+)\.(\d+)/);
      if (match) {
        osInfo.browserVersion = match[1];
      }
    }
    else if (/Chrome/i.test(userAgent) && !/Chromium/i.test(userAgent)) {
      osInfo.browserName = "Chrome";
      const match = userAgent.match(/Chrome\/(\d+)\.(\d+)\.(\d+)\.(\d+)/);
      if (match) {
        osInfo.browserVersion = match[1];
      }
    }
    else if (/Firefox/i.test(userAgent)) {
      osInfo.browserName = "Firefox";
      const match = userAgent.match(/Firefox\/(\d+)\.(\d+)/);
      if (match) {
        osInfo.browserVersion = match[1];
      }
    }
    else if (/Safari/i.test(userAgent) && !/Chrome/i.test(userAgent)) {
      osInfo.browserName = "Safari";
      const match = userAgent.match(/Version\/(\d+)\.(\d+)\.?(\d+)?/);
      if (match) {
        osInfo.browserVersion = match[1];
      }
    }
    else if (/OPR|Opera/i.test(userAgent)) {
      osInfo.browserName = "Opera";
      const match = userAgent.match(/(?:OPR|Opera)\/(\d+)\.(\d+)/);
      if (match) {
        osInfo.browserVersion = match[1];
      }
    }
    else if (/MSIE|Trident/i.test(userAgent)) {
      osInfo.browserName = "Internet Explorer";
      const match = userAgent.match(/(?:MSIE |rv:)(\d+)\.(\d+)/);
      if (match) {
        osInfo.browserVersion = match[1];
      }
    }
    return osInfo;
  };

// Map macOS version to marketing name
const detectMacOSVersion = (version, osInfo) => {
    const majorVersion = parseInt(version.split('.')[0]);
    const minorVersion = parseInt(version.split('.')[1]);
    const macOSVersions = {
      "10.15": "Catalina",
      "10.14": "Mojave",
      "10.13": "High Sierra",
      "10.12": "Sierra",
      "10.11": "El Capitan",
      "10.10": "Yosemite",
      "10.9": "Mavericks",
      "10.8": "Mountain Lion",
      "10.7": "Lion",
      "10.6": "Snow Leopard",
      "11": "Big Sur",
      "12": "Monterey",
      "13": "Ventura",
      "14": "Sonoma",
    };
    const versionKey = majorVersion >= 11 ? majorVersion.toString() : `${majorVersion}.${minorVersion}`;
    if (macOSVersions[versionKey]) {
      osInfo.version = `${version} (${macOSVersions[versionKey]})`;
    }
    return osInfo;
  };

// Map Android version to marketing name
const detectAndroidVersion = (version, osInfo) => {
    const majorVersion = parseInt(version.split('.')[0]);
    const androidVersions = {
      "13": "Tiramisu",
      "12": "Snow Cone",
      "11": "Red Velvet Cake",
      "10": "Q",
      "9": "Pie",
      "8": "Oreo",
      "7": "Nougat",
      "6": "Marshmallow",
      "5": "Lollipop",
      "4": "KitKat/Jelly Bean",
      "3": "Honeycomb",
      "2": "Gingerbread/Froyo",
      "1": "Cupcake/Donut/Eclair"
    };
    if (androidVersions[majorVersion.toString()]) {
      osInfo.version = `${version} (${androidVersions[majorVersion.toString()]})`;
    }
    return osInfo;
  };

// Guess iPhone model from screen size
const detectIphoneModel = (userAgent, osInfo) => {
    osInfo.deviceType = "iPhone";
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const screenRatio = Math.max(screenWidth, screenHeight) / Math.min(screenWidth, screenHeight);
    if (Math.max(screenWidth, screenHeight) === 812 && screenRatio.toFixed(3) === "2.165") {
      osInfo.deviceType = "iPhone X/XS/11 Pro";
    } else if (Math.max(screenWidth, screenHeight) === 896) {
      if (window.devicePixelRatio === 3) {
        osInfo.deviceType = "iPhone XS Max/11 Pro Max";
      } else if (window.devicePixelRatio === 2) {
        osInfo.deviceType = "iPhone XR/11";
      }
    } else if (Math.max(screenWidth, screenHeight) === 844) {
      osInfo.deviceType = "iPhone 12/12 Pro/13/13 Pro/14";
    } else if (Math.max(screenWidth, screenHeight) === 926) {
      osInfo.deviceType = "iPhone 12 Pro Max/13 Pro Max";
    } else if (Math.max(screenWidth, screenHeight) === 780) {
      osInfo.deviceType = "iPhone 12 mini/13 mini";
    } else if (Math.max(screenWidth, screenHeight) === 932) {
      osInfo.deviceType = "iPhone 14 Pro Max";
    } else if (Math.max(screenWidth, screenHeight) === 852) {
      osInfo.deviceType = "iPhone 14 Pro";
    }
    const osVersion = parseFloat(osInfo.version);
    if (osVersion >= 16.0) {
      if (osInfo.deviceType === "Unknown Device") {
        osInfo.deviceType = "iPhone 14 or newer";
      }
    }
    return osInfo;
  };

// Guess iPad model from screen size
const detectIpadModel = (userAgent, osInfo) => {
    osInfo.deviceType = "iPad";
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const maxDimension = Math.max(screenWidth, screenHeight);
    if (maxDimension === 1024) {
      osInfo.deviceType = "iPad (9.7-inch)";
    } else if (maxDimension === 1133) {
      osInfo.deviceType = "iPad Air (10.5-inch)";
    } else if (maxDimension === 1112) {
      osInfo.deviceType = "iPad Pro (10.5-inch)";
    } else if (maxDimension === 1080) {
      osInfo.deviceType = "iPad (10.2-inch)";
    } else if (maxDimension === 1180) {
      osInfo.deviceType = "iPad Air (10.9-inch)";
    } else if (maxDimension === 1194) {
      osInfo.deviceType = "iPad Pro (11-inch)";
    } else if (maxDimension === 1366) {
      osInfo.deviceType = "iPad Pro (12.9-inch)";
    }
    return osInfo;
  };

export const supportsWebP = () => {
    return new Promise(resolve => {
      const webP = new Image();
      webP.onload = webP.onerror = function() {
        resolve(webP.height === 2);
      };
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
  };

export const detectAudioSupport = () => {
    const audio = document.createElement('audio');
    return {
      mp3: audio.canPlayType('audio/mpeg').replace(/no/, ''),
      ogg: audio.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, ''),
      wav: audio.canPlayType('audio/wav; codecs="1"').replace(/no/, ''),
      aac: audio.canPlayType('audio/mp4; codecs="mp4a.40.2"').replace(/no/, ''),
      flac: audio.canPlayType('audio/flac').replace(/no/, '')
    };
  };

export const detectVideoSupport = () => {
    const video = document.createElement('video');
    return {
      mp4: video.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/no/, ''),
      webm: video.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/no/, ''),
      ogv: video.canPlayType('video/ogg; codecs="theora"').replace(/no/, ''),
      hls: video.canPlayType('application/vnd.apple.mpegurl').replace(/no/, '')
    };
  };

export const detectNetworkInfo = () => {
    const connection = navigator.connection || 
                       navigator.mozConnection || 
                       navigator.webkitConnection;
    const networkInfo = {
      online: navigator.onLine,
      type: 'unknown',
      effectiveType: 'unknown',
      downlinkSpeed: 'unknown',
      rtt: 'unknown',
      saveData: false
    };
    if (connection) {
      networkInfo.type = connection.type || 'unknown';
      networkInfo.effectiveType = connection.effectiveType || 'unknown';
      networkInfo.downlinkSpeed = connection.downlink ? `${connection.downlink} Mbps` : 'unknown';
      networkInfo.rtt = connection.rtt ? `${connection.rtt} ms` : 'unknown';
      networkInfo.saveData = !!connection.saveData;
    }
    return networkInfo;
  };

// Recommend app version for detected OS
export const getOptimalAppVersion = (osInfo) => {
    const { name, version, isMobile, isTablet } = osInfo;
    if (name === 'iOS') {
      const majorVersion = parseInt(version.split('.')[0]);
      if (majorVersion >= 15) {
        return 'iOS-Latest';
      } else if (majorVersion >= 13) {
        return 'iOS-Compatible';
      } else {
        return 'iOS-Legacy';
      }
    } else if (name === 'Android') {
      const majorVersion = parseInt(version.split('.')[0]);
      if (majorVersion >= 10) {
        return 'Android-Latest';
      } else if (majorVersion >= 7) {
        return 'Android-Compatible';
      } else {
        return 'Android-Legacy';
      }
    } else if (name === 'macOS') {
      return 'Mac-Universal';
    } else if (name === 'Windows') {
      return 'Windows-Universal';
    } else if (name === 'Linux') {
      return 'Linux-Universal';
    } else {
      return 'Universal-Fallback';
    }
  };

// Get all system info and capabilities
export const getFullSystemInfo = async () => {
    const osInfo = detectOperatingSystem();
    const networkInfo = detectNetworkInfo();
    const audioSupport = detectAudioSupport();
    const videoSupport = await detectVideoSupport();
    const webpSupport = await supportsWebP();
    const capabilities = {
      touchScreen: ('ontouchstart' in window) || (navigator.maxTouchPoints > 0),
      cookiesEnabled: navigator.cookieEnabled,
      localStorage: !!window.localStorage,
      sessionStorage: !!window.sessionStorage,
      serviceWorker: 'serviceWorker' in navigator,
      webGL: (() => {
        try {
          const canvas = document.createElement('canvas');
          return !!(window.WebGLRenderingContext && 
            (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch (e) {
          return false;
        }
      })(),
      webP: webpSupport,
      audio: audioSupport,
      video: videoSupport
    };
    return {
      ...osInfo,
      network: networkInfo,
      capabilities,
      screen: {
        width: window.screen.width,
        height: window.screen.height,
        colorDepth: window.screen.colorDepth,
        orientation: window.screen.orientation ? window.screen.orientation.type : 'unknown',
        pixelRatio: window.devicePixelRatio || 1
      },
      recommendedAppVersion: getOptimalAppVersion(osInfo)
    };
  };

export default {
    detectOperatingSystem,
    getFullSystemInfo,
    getOptimalAppVersion,
    detectNetworkInfo
  };