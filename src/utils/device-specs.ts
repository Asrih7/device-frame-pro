export interface DeviceSpec {
  id: string;
  name: string;
  width: number;
  height: number;
  pixelRatio: number;
  type: 'mobile' | 'tablet' | 'desktop';
  os: 'iOS' | 'Android' | 'Desktop';
  frameStyle: {
    borderRadius: number;
    notch?: boolean;
    homeIndicator?: boolean;
    statusBarHeight: number;
    frameWidth: number;
    frameColor: string;
  };
  userAgent: string;
}

export const DEVICE_SPECS: DeviceSpec[] = [
  // iOS
  {
    id: 'iphone-14-pro',
    name: 'iPhone 14 Pro',
    width: 393,
    height: 852,
    pixelRatio: 3,
    type: 'mobile',
    os: 'iOS',
    frameStyle: {
      borderRadius: 55,
      notch: true,
      homeIndicator: true,
      statusBarHeight: 54,
      frameWidth: 14,
      frameColor: '#1d1d1f'
    },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15'
  },
  {
    id: 'iphone-14-pro-max',
    name: 'iPhone 14 Pro Max',
    width: 430,
    height: 932,
    pixelRatio: 3,
    type: 'mobile',
    os: 'iOS',
    frameStyle: {
      borderRadius: 55,
      notch: true,
      homeIndicator: true,
      statusBarHeight: 54,
      frameWidth: 14,
      frameColor: '#1d1d1f'
    },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15'
  },
  {
    id: 'iphone-se',
    name: 'iPhone SE',
    width: 375,
    height: 667,
    pixelRatio: 2,
    type: 'mobile',
    os: 'iOS',
    frameStyle: {
      borderRadius: 12,
      notch: false,
      homeIndicator: false,
      statusBarHeight: 20,
      frameWidth: 10,
      frameColor: '#1d1d1f'
    },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15'
  },
  {
    id: 'ipad-pro-12',
    name: 'iPad Pro 12.9"',
    width: 1024,
    height: 1366,
    pixelRatio: 2,
    type: 'tablet',
    os: 'iOS',
    frameStyle: {
      borderRadius: 18,
      notch: false,
      homeIndicator: true,
      statusBarHeight: 24,
      frameWidth: 16,
      frameColor: '#5e5e5e'
    },
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15'
  },
  {
    id: 'ipad-air',
    name: 'iPad Air',
    width: 820,
    height: 1180,
    pixelRatio: 2,
    type: 'tablet',
    os: 'iOS',
    frameStyle: {
      borderRadius: 18,
      notch: false,
      homeIndicator: true,
      statusBarHeight: 24,
      frameWidth: 14,
      frameColor: '#5e5e5e'
    },
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15'
  },

  // Android
  {
    id: 'galaxy-s23',
    name: 'Samsung Galaxy S23',
    width: 360,
    height: 780,
    pixelRatio: 3,
    type: 'mobile',
    os: 'Android',
    frameStyle: {
      borderRadius: 48,
      notch: true,
      homeIndicator: false,
      statusBarHeight: 36,
      frameWidth: 12,
      frameColor: '#2c2c2c'
    },
    userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-S911B) AppleWebKit/537.36'
  },
  {
    id: 'galaxy-s23-ultra',
    name: 'Galaxy S23 Ultra',
    width: 384,
    height: 854,
    pixelRatio: 3.5,
    type: 'mobile',
    os: 'Android',
    frameStyle: {
      borderRadius: 48,
      notch: true,
      homeIndicator: false,
      statusBarHeight: 36,
      frameWidth: 12,
      frameColor: '#1a1a1a'
    },
    userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-S918B) AppleWebKit/537.36'
  },
  {
    id: 'pixel-7',
    name: 'Google Pixel 7',
    width: 412,
    height: 915,
    pixelRatio: 2.625,
    type: 'mobile',
    os: 'Android',
    frameStyle: {
      borderRadius: 40,
      notch: true,
      homeIndicator: false,
      statusBarHeight: 32,
      frameWidth: 10,
      frameColor: '#3c4043'
    },
    userAgent: 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36'
  },
  {
    id: 'pixel-7-pro',
    name: 'Google Pixel 7 Pro',
    width: 412,
    height: 892,
    pixelRatio: 3.5,
    type: 'mobile',
    os: 'Android',
    frameStyle: {
      borderRadius: 44,
      notch: true,
      homeIndicator: false,
      statusBarHeight: 32,
      frameWidth: 10,
      frameColor: '#3c4043'
    },
    userAgent: 'Mozilla/5.0 (Linux; Android 13; Pixel 7 Pro) AppleWebKit/537.36'
  },
  {
    id: 'galaxy-tab-s8',
    name: 'Samsung Galaxy Tab S8',
    width: 800,
    height: 1280,
    pixelRatio: 2,
    type: 'tablet',
    os: 'Android',
    frameStyle: {
      borderRadius: 16,
      notch: false,
      homeIndicator: false,
      statusBarHeight: 28,
      frameWidth: 14,
      frameColor: '#2c2c2c'
    },
    userAgent: 'Mozilla/5.0 (Linux; Android 12; SM-X706B) AppleWebKit/537.36'
  },

  // Desktop
  {
    id: 'desktop-1080p',
    name: 'Desktop 1920×1080',
    width: 1920,
    height: 1080,
    pixelRatio: 1,
    type: 'desktop',
    os: 'Desktop',
    frameStyle: {
      borderRadius: 8,
      notch: false,
      homeIndicator: false,
      statusBarHeight: 0,
      frameWidth: 8,
      frameColor: '#e0e0e0'
    },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  },
  {
    id: 'macbook-pro',
    name: 'MacBook Pro 16"',
    width: 1728,
    height: 1117,
    pixelRatio: 2,
    type: 'desktop',
    os: 'Desktop',
    frameStyle: {
      borderRadius: 12,
      notch: true,
      homeIndicator: false,
      statusBarHeight: 32,
      frameWidth: 10,
      frameColor: '#4a4a4a'
    },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  }
];

export function getDeviceById(id: string): DeviceSpec | undefined {
  return DEVICE_SPECS.find(d => d.id === id);
}

export function getDevicesByType(type: string): DeviceSpec[] {
  if (type === 'all') return DEVICE_SPECS;
  return DEVICE_SPECS.filter(d => d.type === type || d.os === type);
}
