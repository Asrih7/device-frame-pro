# 🚀 DeviceFrame Pro

The ultimate realistic device emulator with native-like frames for all frontend frameworks.

## ✨ Features

- 📱 **60+ Realistic Device Frames** - iOS, Android, Tablets with accurate bezels, notches, and home indicators
- 🎨 **Native-Like UI** - Authentic iOS and Android styling
- ⚡ **High Performance** - Optimized rendering with GPU acceleration
- 🔄 **Live Reload** - Auto-sync across all devices
- 🌐 **Universal Support** - Angular, Next.js, Nuxt, Svelte, Ionic, and more
- 🔍 **Chrome DevTools-Style Zoom** - Perfect responsive scaling with zoom controls
- 📸 **Screenshot Capture** - One-click screenshots with auto-download

## 📦 Installation

### Global (Recommended)
```bash
npm install -g deviceframe-pro
```

### Project
```bash
npm install --save-dev deviceframe-pro
```

### NPX (No installation)
```bash
npx deviceframe-pro
```

## 🚀 Quick Start

```bash
# Start your app
npm start

# In another terminal
npx deviceframe-pro
```

## 📱 Supported Devices

### iOS (13 devices)
- iPhone 15 Pro Max / Pro / Plus / Standard
- iPhone 14 Pro Max / Pro
- iPhone 13 / 12
- iPhone SE (2022)
- iPad Pro 12.9" / 11"
- iPad Air
- iPad Mini

### Android (46 devices)

#### Samsung Galaxy
- S24 Ultra / S24+ / S24
- S23 Ultra / S23
- S22 Ultra
- S21 Ultra
- A54 / A34 / A24 / A14 (Budget series)
- Z Fold 5 / Z Flip 5 (Foldables)

#### Google Pixel
- Pixel 8 Pro / Pixel 8
- Pixel 7 Pro / Pixel 7
- Pixel 6a

#### Xiaomi / Redmi / POCO
- Xiaomi 14 Pro / 13 Pro / 12
- Redmi Note 13 Pro / 12 Pro / 11
- POCO X5 Pro

#### OnePlus
- OnePlus 12 / 11 / 10 Pro
- Nord 3

#### Huawei
- P60 Pro / P50 Pro
- Mate 50 Pro
- Nova 11

#### Oppo
- Find X6 Pro
- Reno 10 Pro
- A98

#### Vivo
- X90 Pro
- V29 / Y100

#### Realme
- 11 Pro+ / 10 Pro

### Tablets (8 devices)
- iPad Pro 12.9" / 11"
- iPad Air / Mini
- Samsung Galaxy Tab S9 Ultra / S9
- Xiaomi Pad 6
- Huawei MatePad Pro

**Total: 63+ devices**

## 🛠️ CLI Options

```bash
npx deviceframe-pro [options]

Options:
  -p, --port <number>      Preview server port (default: 4300)
  -t, --target <url>       Target app URL (auto-detected)
  -f, --framework <name>   Framework type
  --qr                     Generate QR code for mobile testing
  --perf                   Enable performance monitoring
  --screenshots            Enable screenshot capture (requires Puppeteer)
  -d, --devices <list>     Filter specific devices
  --no-open               Don't auto-open browser
```

## 📖 Examples

### Basic Usage
```bash
npx deviceframe-pro
```

### With Performance Monitoring
```bash
npx deviceframe-pro --perf --qr
```

### Specific Devices Only
```bash
npx deviceframe-pro --devices iphone-15-pro-max,ipad-pro-12,galaxy-s24-ultra
```

### Custom Port & Target
```bash
npx deviceframe-pro --port 5000 --target http://localhost:8080
```

### Enable Screenshots
```bash
npm install puppeteer
npx deviceframe-pro --screenshots
```

## ⌨️ Keyboard Shortcuts

- **Cmd/Ctrl + R** - Reload all devices
- **Arrow Up/Down** - Navigate between devices
- **+** - Zoom in
- **−** - Zoom out
- **0** - Fit to screen (auto-zoom)

## 🔍 Zoom Controls

DeviceFrame Pro includes Chrome DevTools-style zoom controls:

- **Auto-Fit** - Automatically scales devices to fit your viewport
- **Manual Zoom** - 25% to 200% zoom range
- **Zoom Controls** - Visual controls (bottom-right corner):
  - **−** Zoom out
  - **+** Zoom in
  - **Fit** Auto-fit to screen
  - **Zoom %** Current zoom level

**No scrolling required!** All devices fit perfectly in your viewport.

## 🎯 Framework Examples

### Angular
```bash
ng serve
npx deviceframe-pro --framework angular
```

### Next.js
```bash
npm run dev
npx deviceframe-pro --framework nextjs
```

### Nuxt
```bash
npm run dev
npx deviceframe-pro --framework nuxt
```

### Svelte
```bash
npm run dev
npx deviceframe-pro --framework svelte
```

### Ionic
```bash
ionic serve
npx deviceframe-pro --framework ionic
```

### Generic / Any Framework
```bash
npm start
npx deviceframe-pro
```

## 📸 Screenshot Feature

### Requirements
```bash
npm install puppeteer
```

### Usage
1. Enable screenshots: `npx deviceframe-pro --screenshots`
2. Select any device from the list
3. Click the **📸** button above the device
4. Screenshot automatically downloads

### Screenshot Details
- **Format:** PNG (high quality)
- **Location:** `./screenshots/` directory
- **Naming:** `device-id-timestamp.png`
- **Quality:** 90% (adjustable)
- **Size:** 50KB - 500KB depending on device

## 🌟 Key Features Explained

### Realistic Device Frames
- Accurate screen dimensions and pixel ratios
- Real device bezels and rounded corners
- Notches and Dynamic Islands (iPhone 14/15 Pro)
- Home indicators (iOS)
- Status bars with realistic icons

### Live Preview
- Real-time iframe rendering
- WebSocket-based auto-reload
- Instant URL updates
- Multiple devices simultaneously

### Performance Optimized
- GPU-accelerated rendering
- Efficient iframe management
- Smart zoom calculations
- Container-based responsive scaling

## 🔧 Troubleshooting

### Screenshots not working?
```bash
# Install Puppeteer
npm install puppeteer

# Restart the server
npx deviceframe-pro --screenshots
```

### Device too large/small?
- Use the **Fit** button (bottom-right) to auto-adjust
- Manually zoom with **+** / **−** buttons
- Zoom range: 25% - 200%

### Port already in use?
```bash
npx deviceframe-pro --port 5000
```

### Auto-detection not working?
```bash
npx deviceframe-pro --target http://localhost:3000
```

## 🤝 Contributing

Contributions welcome! Please open an issue or PR.

## 📄 License

MIT © 2026

## 🌟 Star on GitHub

If you find this useful, please star the repo!

---

Made with ❤️ for developers who love pixel-perfect device testing