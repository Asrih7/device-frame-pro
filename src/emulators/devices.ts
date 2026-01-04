export interface Device {
  id: string;
  name: string;
  width: number;
  height: number;
  userAgent?: string;
  type: 'mobile' | 'tablet' | 'desktop';
  platform: 'ios' | 'android' | 'windows' | 'mac' | 'web';
}

export const devices: Device[] = [
  // iOS
  { id: 'iphone-14', name: 'iPhone 14', width: 390, height: 844, type: 'mobile', platform: 'ios' },
  { id: 'iphone-14-plus', name: 'iPhone 14 Plus', width: 428, height: 926, type: 'mobile', platform: 'ios' },
  { id: 'iphone-13-mini', name: 'iPhone 13 Mini', width: 375, height: 812, type: 'mobile', platform: 'ios' },
  { id: 'iphone-se', name: 'iPhone SE', width: 375, height: 667, type: 'mobile', platform: 'ios' },
  { id: 'ipad-pro', name: 'iPad Pro', width: 1024, height: 1366, type: 'tablet', platform: 'ios' },
  { id: 'ipad-mini', name: 'iPad Mini', width: 768, height: 1024, type: 'tablet', platform: 'ios' },

  // Android
  { id: 'pixel-7', name: 'Google Pixel 7', width: 412, height: 915, type: 'mobile', platform: 'android' },
  { id: 'pixel-6', name: 'Google Pixel 6', width: 412, height: 915, type: 'mobile', platform: 'android' },
  { id: 'samsung-s23', name: 'Samsung Galaxy S23', width: 393, height: 852, type: 'mobile', platform: 'android' },
  { id: 'samsung-s22', name: 'Samsung Galaxy S22', width: 412, height: 892, type: 'mobile', platform: 'android' },
  { id: 'samsung-tab', name: 'Samsung Galaxy Tab S8', width: 800, height: 1280, type: 'tablet', platform: 'android' },

  // Desktop & Laptops
  { id: 'desktop-1920', name: 'Desktop 1920×1080', width: 1920, height: 1080, type: 'desktop', platform: 'web' },
  { id: 'laptop-1366', name: 'Laptop 1366×768', width: 1366, height: 768, type: 'desktop', platform: 'web' },
  { id: 'laptop-1440', name: 'Laptop 1440×900', width: 1440, height: 900, type: 'desktop', platform: 'web' },

  // Small devices & legacy
  { id: 'iphone-8', name: 'iPhone 8', width: 375, height: 667, type: 'mobile', platform: 'ios' },
  { id: 'iphone-8-plus', name: 'iPhone 8 Plus', width: 414, height: 736, type: 'mobile', platform: 'ios' },
  { id: 'pixel-4a', name: 'Pixel 4a', width: 360, height: 780, type: 'mobile', platform: 'android' },

  // Tablet landscape presets
  { id: 'ipad-landscape', name: 'iPad Landscape', width: 1365, height: 1024, type: 'tablet', platform: 'ios' },
  { id: 'galaxy-tab-land', name: 'Galaxy Tab Landscape', width: 1280, height: 800, type: 'tablet', platform: 'android' },

  // Other common sizes
  { id: 'surface-pro', name: 'Surface Pro', width: 912, height: 1368, type: 'tablet', platform: 'windows' },
  { id: 'macbook-13', name: 'MacBook 13"', width: 1280, height: 800, type: 'desktop', platform: 'mac' },

  // Responsive/testing
  { id: 'small-phone', name: 'Small Phone 320×568', width: 320, height: 568, type: 'mobile', platform: 'web' },
  { id: 'phablet', name: 'Phablet 412×915', width: 412, height: 915, type: 'mobile', platform: 'web' },

  // Add a variety of other widths to get more coverage
  { id: 'wider', name: 'Wider 1024×768', width: 1024, height: 768, type: 'desktop', platform: 'web' },
  { id: 'narrow', name: 'Narrow 412×800', width: 412, height: 800, type: 'mobile', platform: 'web' },

  // Custom placeholder
  { id: 'custom', name: 'Custom', width: 375, height: 667, type: 'mobile', platform: 'web' }
];
