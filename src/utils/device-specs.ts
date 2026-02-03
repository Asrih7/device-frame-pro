import { DeviceFrameOptions } from '../index';

export interface DeviceSpec {
  id: string;
  name: string;
  width: number;
  height: number;
  pixelRatio: number;
  type: 'mobile' | 'tablet';
  os: 'iOS' | 'Android';
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
  // ========================================
  // iOS DEVICES - iPhones (Latest to Oldest)
  // ========================================
  
  // iPhone 15 Series (2023)
  {
    id: 'iphone-15-pro-max',
    name: 'iPhone 15 Pro Max',
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
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
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
    id: 'iphone-15-plus',
    name: 'iPhone 15 Plus',
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
    id: 'iphone-15',
    name: 'iPhone 15',
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
  
  // iPhone 14 Series (2022)
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
    id: 'iphone-13',
    name: 'iPhone 13',
    width: 390,
    height: 844,
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
    id: 'iphone-12',
    name: 'iPhone 12',
    width: 390,
    height: 844,
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
    id: 'iphone-se-2022',
    name: 'iPhone SE (2022)',
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
  
  // ========================================
  // iOS DEVICES - iPads
  // ========================================
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
    id: 'ipad-pro-11',
    name: 'iPad Pro 11"',
    width: 834,
    height: 1194,
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
  {
    id: 'ipad-mini',
    name: 'iPad Mini',
    width: 768,
    height: 1024,
    pixelRatio: 2,
    type: 'tablet',
    os: 'iOS',
    frameStyle: {
      borderRadius: 18,
      notch: false,
      homeIndicator: true,
      statusBarHeight: 24,
      frameWidth: 12,
      frameColor: '#5e5e5e'
    },
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15'
  },
  
  // ========================================
  // ANDROID DEVICES - Samsung Galaxy S Series
  // ========================================
  {
    id: 'galaxy-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra',
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
    userAgent: 'Mozilla/5.0 (Linux; Android 14; SM-S928B) AppleWebKit/537.36'
  },
  {
    id: 'galaxy-s24-plus',
    name: 'Samsung Galaxy S24+',
    width: 384,
    height: 854,
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
    userAgent: 'Mozilla/5.0 (Linux; Android 14; SM-S926B) AppleWebKit/537.36'
  },
  {
    id: 'galaxy-s24',
    name: 'Samsung Galaxy S24',
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
    userAgent: 'Mozilla/5.0 (Linux; Android 14; SM-S921B) AppleWebKit/537.36'
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
    id: 'galaxy-s22-ultra',
    name: 'Samsung Galaxy S22 Ultra',
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
    userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-S908B) AppleWebKit/537.36'
  },
  {
    id: 'galaxy-s21-ultra',
    name: 'Samsung Galaxy S21 Ultra',
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
    userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-G998B) AppleWebKit/537.36'
  },
  
  // Samsung Galaxy A Series
  {
    id: 'galaxy-a54',
    name: 'Samsung Galaxy A54',
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
    userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-A546B) AppleWebKit/537.36'
  },
  {
    id: 'galaxy-a34',
    name: 'Samsung Galaxy A34',
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
    userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-A346B) AppleWebKit/537.36'
  },
  {
    id: 'galaxy-a24',
    name: 'Samsung Galaxy A24',
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
    userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-A245F) AppleWebKit/537.36'
  },
  {
    id: 'galaxy-a14',
    name: 'Samsung Galaxy A14',
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
    userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-A145F) AppleWebKit/537.36'
  },
  
  // Samsung Galaxy Z Series (Foldables)
  {
    id: 'galaxy-z-fold-5',
    name: 'Samsung Galaxy Z Fold 5',
    width: 344,
    height: 882,
    pixelRatio: 3.5,
    type: 'mobile',
    os: 'Android',
    frameStyle: {
      borderRadius: 40,
      notch: true,
      homeIndicator: false,
      statusBarHeight: 36,
      frameWidth: 10,
      frameColor: '#1a1a1a'
    },
    userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-F946B) AppleWebKit/537.36'
  },
  {
    id: 'galaxy-z-flip-5',
    name: 'Samsung Galaxy Z Flip 5',
    width: 412,
    height: 876,
    pixelRatio: 3.5,
    type: 'mobile',
    os: 'Android',
    frameStyle: {
      borderRadius: 44,
      notch: true,
      homeIndicator: false,
      statusBarHeight: 36,
      frameWidth: 10,
      frameColor: '#1a1a1a'
    },
    userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-F731B) AppleWebKit/537.36'
  },
  
  // ========================================
  // ANDROID DEVICES - Google Pixel
  // ========================================
  {
    id: 'pixel-8-pro',
    name: 'Google Pixel 8 Pro',
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
    userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 8 Pro) AppleWebKit/537.36'
  },
  {
    id: 'pixel-8',
    name: 'Google Pixel 8',
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
    userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36'
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
    id: 'pixel-6a',
    name: 'Google Pixel 6a',
    width: 393,
    height: 851,
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
    userAgent: 'Mozilla/5.0 (Linux; Android 13; Pixel 6a) AppleWebKit/537.36'
  },
  
  // ========================================
  // ANDROID DEVICES - OnePlus
  // ========================================
  {
    id: 'oneplus-12',
    name: 'OnePlus 12',
    width: 412,
    height: 914,
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
    userAgent: 'Mozilla/5.0 (Linux; Android 14; CPH2583) AppleWebKit/537.36'
  },
  {
    id: 'oneplus-11',
    name: 'OnePlus 11',
    width: 412,
    height: 914,
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
    userAgent: 'Mozilla/5.0 (Linux; Android 13; CPH2447) AppleWebKit/537.36'
  },
  {
    id: 'oneplus-10-pro',
    name: 'OnePlus 10 Pro',
    width: 412,
    height: 914,
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
    userAgent: 'Mozilla/5.0 (Linux; Android 13; NE2213) AppleWebKit/537.36'
  },
  {
    id: 'oneplus-nord-3',
    name: 'OnePlus Nord 3',
    width: 412,
    height: 914,
    pixelRatio: 2.625,
    type: 'mobile',
    os: 'Android',
    frameStyle: {
      borderRadius: 44,
      notch: true,
      homeIndicator: false,
      statusBarHeight: 36,
      frameWidth: 12,
      frameColor: '#2c2c2c'
    },
    userAgent: 'Mozilla/5.0 (Linux; Android 13; CPH2493) AppleWebKit/537.36'
  },
  
  // ========================================
  // ANDROID DEVICES - Xiaomi / Redmi
  // ========================================
  {
    id: 'xiaomi-14-pro',
    name: 'Xiaomi 14 Pro',
    width: 412,
    height: 914,
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
    userAgent: 'Mozilla/5.0 (Linux; Android 14; 23116PN5BC) AppleWebKit/537.36'
  },
  {
    id: 'xiaomi-13-pro',
    name: 'Xiaomi 13 Pro',
    width: 412,
    height: 914,
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
    userAgent: 'Mozilla/5.0 (Linux; Android 13; 2210132C) AppleWebKit/537.36'
  },
  {
    id: 'xiaomi-12',
    name: 'Xiaomi 12',
    width: 412,
    height: 914,
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
    userAgent: 'Mozilla/5.0 (Linux; Android 13; 2201123G) AppleWebKit/537.36'
  },
  {
    id: 'redmi-note-13-pro',
    name: 'Redmi Note 13 Pro',
    width: 412,
    height: 914,
    pixelRatio: 2.625,
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
    userAgent: 'Mozilla/5.0 (Linux; Android 13; 23090RA35G) AppleWebKit/537.36'
  },
  {
    id: 'redmi-note-12-pro',
    name: 'Redmi Note 12 Pro',
    width: 412,
    height: 914,
    pixelRatio: 2.625,
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
    userAgent: 'Mozilla/5.0 (Linux; Android 13; 22101316G) AppleWebKit/537.36'
  },
  {
    id: 'redmi-note-11',
    name: 'Redmi Note 11',
    width: 412,
    height: 914,
    pixelRatio: 2.625,
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
    userAgent: 'Mozilla/5.0 (Linux; Android 11; 2201116SG) AppleWebKit/537.36'
  },
  {
    id: 'poco-x5-pro',
    name: 'POCO X5 Pro',
    width: 412,
    height: 914,
    pixelRatio: 2.625,
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
    userAgent: 'Mozilla/5.0 (Linux; Android 13; 22111317PG) AppleWebKit/537.36'
  },
  
  // ========================================
  // ANDROID DEVICES - Huawei
  // ========================================
  {
    id: 'huawei-p60-pro',
    name: 'Huawei P60 Pro',
    width: 412,
    height: 914,
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
    userAgent: 'Mozilla/5.0 (Linux; Android 13; ALN-L29) AppleWebKit/537.36'
  },
  {
    id: 'huawei-p50-pro',
    name: 'Huawei P50 Pro',
    width: 412,
    height: 914,
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
    userAgent: 'Mozilla/5.0 (Linux; Android 12; JAD-AL50) AppleWebKit/537.36'
  },
  {
    id: 'huawei-mate-50-pro',
    name: 'Huawei Mate 50 Pro',
    width: 412,
    height: 914,
    pixelRatio: 3,
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
    userAgent: 'Mozilla/5.0 (Linux; Android 12; DCO-AL00) AppleWebKit/537.36'
  },
  {
    id: 'huawei-nova-11',
    name: 'Huawei Nova 11',
    width: 412,
    height: 914,
    pixelRatio: 2.625,
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
    userAgent: 'Mozilla/5.0 (Linux; Android 13; FOA-LX9) AppleWebKit/537.36'
  },
  
  // ========================================
  // ANDROID DEVICES - Oppo
  // ========================================
  {
    id: 'oppo-find-x6-pro',
    name: 'Oppo Find X6 Pro',
    width: 412,
    height: 914,
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
    userAgent: 'Mozilla/5.0 (Linux; Android 13; PGEM10) AppleWebKit/537.36'
  },
  {
    id: 'oppo-reno-10-pro',
    name: 'Oppo Reno 10 Pro',
    width: 412,
    height: 914,
    pixelRatio: 2.625,
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
    userAgent: 'Mozilla/5.0 (Linux; Android 13; CPH2531) AppleWebKit/537.36'
  },
  {
    id: 'oppo-a98',
    name: 'Oppo A98',
    width: 412,
    height: 914,
    pixelRatio: 2.625,
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
    userAgent: 'Mozilla/5.0 (Linux; Android 13; CPH2481) AppleWebKit/537.36'
  },
  
  // ========================================
  // ANDROID DEVICES - Vivo
  // ========================================
  {
    id: 'vivo-x90-pro',
    name: 'Vivo X90 Pro',
    width: 412,
    height: 914,
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
    userAgent: 'Mozilla/5.0 (Linux; Android 13; V2227A) AppleWebKit/537.36'
  },
  {
    id: 'vivo-v29',
    name: 'Vivo V29',
    width: 412,
    height: 914,
    pixelRatio: 2.625,
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
    userAgent: 'Mozilla/5.0 (Linux; Android 13; V2250) AppleWebKit/537.36'
  },
  {
    id: 'vivo-y100',
    name: 'Vivo Y100',
    width: 412,
    height: 914,
    pixelRatio: 2.625,
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
    userAgent: 'Mozilla/5.0 (Linux; Android 13; V2250) AppleWebKit/537.36'
  },
  
  // ========================================
  // ANDROID DEVICES - Realme
  // ========================================
  {
    id: 'realme-11-pro-plus',
    name: 'Realme 11 Pro+',
    width: 412,
    height: 914,
    pixelRatio: 2.625,
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
    userAgent: 'Mozilla/5.0 (Linux; Android 13; RMX3771) AppleWebKit/537.36'
  },
  {
    id: 'realme-10-pro',
    name: 'Realme 10 Pro',
    width: 412,
    height: 914,
    pixelRatio: 2.625,
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
    userAgent: 'Mozilla/5.0 (Linux; Android 13; RMX3663) AppleWebKit/537.36'
  },
  
  // ========================================
  // ANDROID TABLETS
  // ========================================
  {
    id: 'galaxy-tab-s9-ultra',
    name: 'Samsung Galaxy Tab S9 Ultra',
    width: 1848,
    height: 2960,
    pixelRatio: 2,
    type: 'tablet',
    os: 'Android',
    frameStyle: {
      borderRadius: 20,
      notch: false,
      homeIndicator: false,
      statusBarHeight: 32,
      frameWidth: 16,
      frameColor: '#2c2c2c'
    },
    userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-X916B) AppleWebKit/537.36'
  },
  {
    id: 'galaxy-tab-s9',
    name: 'Samsung Galaxy Tab S9',
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
    userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-X716B) AppleWebKit/537.36'
  },
  {
    id: 'xiaomi-pad-6',
    name: 'Xiaomi Pad 6',
    width: 1800,
    height: 2880,
    pixelRatio: 2,
    type: 'tablet',
    os: 'Android',
    frameStyle: {
      borderRadius: 18,
      notch: false,
      homeIndicator: false,
      statusBarHeight: 30,
      frameWidth: 15,
      frameColor: '#3c4043'
    },
    userAgent: 'Mozilla/5.0 (Linux; Android 13; 23043RP34C) AppleWebKit/537.36'
  },
  {
    id: 'huawei-matepad-pro',
    name: 'Huawei MatePad Pro',
    width: 1600,
    height: 2560,
    pixelRatio: 2,
    type: 'tablet',
    os: 'Android',
    frameStyle: {
      borderRadius: 18,
      notch: false,
      homeIndicator: false,
      statusBarHeight: 30,
      frameWidth: 15,
      frameColor: '#2c2c2c'
    },
    userAgent: 'Mozilla/5.0 (Linux; Android 12; MRR-W29) AppleWebKit/537.36'
  }
];

export function getDeviceById(id: string): DeviceSpec | undefined {
  return DEVICE_SPECS.find(d => d.id === id);
}

export function getDevicesByType(type: string): DeviceSpec[] {
  if (type === 'all') return DEVICE_SPECS;
  return DEVICE_SPECS.filter(d => d.type === type || d.os === type);
}