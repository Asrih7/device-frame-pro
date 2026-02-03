# 🚀 DeviceFrame Pro

The ultimate realistic device emulator with native-like frames for all frontend frameworks.

## ✨ Features

- 📱 **12+ Realistic Device Frames** with accurate bezels, notches, and home indicators
- 🎨 **Native-Like UI** - iOS, Android, tablet
- ⚡ **High Performance** - Optimized rendering with GPU acceleration
- 🔄 **Live Reload** - Auto-sync across all devices
- 🌐 **Universal Support** - React, Vue, Angular, Next.js, Nuxt, Svelte, Ionic
- 📊 **Performance Monitoring** - FPS, Memory, Load times

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
deviceframe
```

## 📱 Supported Devices

### iOS
- iPhone 14 Pro / Pro Max (with Dynamic Island)
- iPhone SE
- iPad Pro 12.9"
- iPad Air

### Android
- Samsung Galaxy S23 / S23 Ultra
- Google Pixel 7 / 7 Pro
- Samsung Galaxy Tab S8

### Desktop
- 1920×1080 Desktop
- MacBook Pro 16"

## 🛠️ CLI Options

```
deviceframe [options]

Options:
  -p, --port <number>      Preview server port (default: 4300)
  -t, --target <url>       Target app URL (auto-detected)
  -f, --framework <name>   Framework type
  --qr                     Generate QR code
  --perf                   Enable performance monitoring
  --screenshots            Enable screenshot capture
  -d, --devices <list>     Filter specific devices
  --no-open               Don't auto-open browser
```

## 📖 Examples

### Basic Usage
```
deviceframe
```

### With Performance Monitoring
```
deviceframe --perf --qr
```

### Specific Devices Only
```
deviceframe --devices iphone-14-pro,ipad-pro-12,galaxy-s23
```

### Custom Port & Target
```
deviceframe --port 5000 --target http://localhost:8080
```

## ⌨️ Keyboard Shortcuts

- **R** - Reload all devices
- **Q** - Toggle QR code
- **S** - Take screenshots of all devices

## 🎯 Framework Examples

### React
```bash
npm start
deviceframe
```

### Vue
```bash
npm run serve
deviceframe --framework vue
```

### Angular
```bash
ng serve
deviceframe --framework angular
```

### Next.js
```bash
npm run dev
deviceframe --framework nextjs
```

## 📸 Screenshots

All screenshots are saved to: `./screenshots/`

## 🤝 Contributing

Contributions welcome! Please open an issue or PR.

## 📄 License

MIT © 2026

## 🌟 Star on GitHub

If you find this useful, please star the repo!