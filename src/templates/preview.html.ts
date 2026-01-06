import { DeviceFrameOptions } from '../index';
import { DEVICE_SPECS } from '../utils/device-specs';

export function getPreviewHTML(options: Required<DeviceFrameOptions>): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DeviceFrame Pro - Ultimate Device Emulator</title>
    <style>
        * { 
            margin: 0; 
            padding: 0; 
            box-sizing: border-box; 
        }
        
        :root {
            --primary: #667eea;
            --primary-dark: #5568d3;
            --secondary: #764ba2;
            --bg-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            --card-bg: rgba(255, 255, 255, 0.98);
            --text-primary: #1a1a1a;
            --text-secondary: #666;
            --border-radius: 16px;
            --shadow-sm: 0 2px 8px rgba(0,0,0,0.08);
            --shadow-md: 0 8px 24px rgba(0,0,0,0.12);
            --shadow-lg: 0 16px 48px rgba(0,0,0,0.16);
            --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
                         'Helvetica Neue', Arial, sans-serif;
            background: var(--bg-gradient);
            min-height: 100vh;
            padding: 20px;
            overflow-x: hidden;
        }
        
        /* Header Section */
        .main-header {
            background: var(--card-bg);
            padding: 30px;
            border-radius: var(--border-radius);
            margin-bottom: 25px;
            box-shadow: var(--shadow-lg);
            backdrop-filter: blur(10px);
            animation: slideDown 0.5s ease;
        }
        
        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .header-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 20px;
            margin-bottom: 25px;
        }
        
        .logo-section {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .logo-icon {
            width: 50px;
            height: 50px;
            background: var(--bg-gradient);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            animation: rotate 3s linear infinite;
        }
        
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        .logo-text h1 {
            color: var(--text-primary);
            font-size: 32px;
            font-weight: 800;
            letter-spacing: -0.5px;
        }
        
        .logo-text p {
            color: var(--text-secondary);
            font-size: 14px;
            margin-top: 2px;
        }
        
        .header-badges {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }
        
        .badge {
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        
        .badge-primary {
            background: var(--bg-gradient);
            color: white;
        }
        
        .badge-success {
            background: #d4edda;
            color: #155724;
        }
        
        .badge-info {
            background: #d1ecf1;
            color: #0c5460;
        }
        
        .status-dot {
            width: 8px;
            height: 8px;
            background: #28a745;
            border-radius: 50%;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.2); }
        }
        
        /* Controls Section */
        .controls-section {
            display: grid;
            grid-template-columns: 1fr auto auto auto;
            gap: 12px;
            margin-bottom: 20px;
        }
        
        .url-input-wrapper {
            position: relative;
        }
        
        .url-input {
            width: 100%;
            padding: 14px 50px 14px 20px;
            border: 2px solid #e0e0e0;
            border-radius: 12px;
            font-size: 14px;
            font-family: 'SF Mono', Monaco, 'Courier New', monospace;
            transition: var(--transition);
            background: white;
        }
        
        .url-input:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        }
        
        .url-icon {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--text-secondary);
            font-size: 18px;
        }
        
        .btn {
            padding: 14px 24px;
            background: var(--bg-gradient);
            color: white;
            border: none;
            border-radius: 12px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            transition: var(--transition);
            display: inline-flex;
            align-items: center;
            gap: 8px;
            white-space: nowrap;
            box-shadow: var(--shadow-sm);
        }
        
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-md);
        }
        
        .btn:active {
            transform: translateY(0);
        }
        
        .btn-secondary {
            background: white;
            color: var(--primary);
            border: 2px solid var(--primary);
        }
        
        .btn-secondary:hover {
            background: var(--primary);
            color: white;
        }
        
        /* Filters */
        .filter-section {
            padding-top: 20px;
            border-top: 2px solid #f0f0f0;
        }
        
        .filter-label {
            font-size: 14px;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 12px;
            display: block;
        }
        
        .filter-buttons {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }
        
        .filter-btn {
            padding: 10px 18px;
            background: #f8f9fa;
            border: 2px solid transparent;
            border-radius: 10px;
            cursor: pointer;
            font-size: 13px;
            font-weight: 500;
            transition: var(--transition);
            display: flex;
            align-items: center;
            gap: 6px;
        }
        
        .filter-btn:hover {
            background: #e9ecef;
            border-color: var(--primary);
        }
        
        .filter-btn.active {
            background: var(--bg-gradient);
            color: white;
            border-color: transparent;
            transform: scale(1.05);
        }
        
        /* QR Section */
        .qr-section {
            background: var(--card-bg);
            padding: 30px;
            border-radius: var(--border-radius);
            margin-bottom: 25px;
            text-align: center;
            box-shadow: var(--shadow-md);
            display: none;
            animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .qr-section h3 {
            color: var(--text-primary);
            font-size: 20px;
            margin-bottom: 15px;
        }
        
        .qr-code-container {
            margin: 20px auto;
            max-width: 300px;
            padding: 20px;
            background: white;
            border-radius: 12px;
            box-shadow: var(--shadow-sm);
        }
        
        .qr-code-container img {
            width: 100%;
            height: auto;
            border-radius: 8px;
        }
        
        /* Devices Grid */
        .devices-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
            gap: 30px;
            animation: fadeIn 0.5s ease;
        }
        
        .device-card {
            background: var(--card-bg);
            border-radius: var(--border-radius);
            padding: 25px;
            box-shadow: var(--shadow-md);
            transition: var(--transition);
            position: relative;
            overflow: hidden;
        }
        
        .device-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: var(--bg-gradient);
            transform: scaleX(0);
            transition: transform 0.3s ease;
        }
        
        .device-card:hover {
            transform: translateY(-8px);
            box-shadow: var(--shadow-lg);
        }
        
        .device-card:hover::before {
            transform: scaleX(1);
        }
        
        .device-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 2px solid #f0f0f0;
        }
        
        .device-info {
            flex: 1;
        }
        
        .device-name {
            font-size: 18px;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 6px;
        }
        
        .device-specs {
            font-size: 12px;
            color: var(--text-secondary);
            font-family: 'SF Mono', Monaco, monospace;
            display: flex;
            flex-direction: column;
            gap: 3px;
        }
        
        .device-os-badge {
            padding: 6px 14px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .ios-badge {
            background: linear-gradient(135deg, #007aff, #5ac8fa);
            color: white;
        }
        
        .android-badge {
            background: linear-gradient(135deg, #3ddc84, #00c853);
            color: white;
        }
        
        .desktop-badge {
            background: linear-gradient(135deg, #9c27b0, #e91e63);
            color: white;
        }
        
        .device-actions {
            display: flex;
            gap: 8px;
            margin-bottom: 15px;
        }
        
        .action-btn {
            padding: 6px 12px;
            background: #f8f9fa;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 12px;
            transition: var(--transition);
            display: flex;
            align-items: center;
            gap: 4px;
        }
        
        .action-btn:hover {
            background: var(--primary);
            color: white;
        }
        
        /* Device Frame - The Magic Part */
        .device-frame {
            position: relative;
            margin: 0 auto;
            perspective: 1000px;
        }
        
        .device-bezel {
            position: relative;
            background: linear-gradient(145deg, #2c2c2c, #1a1a1a);
            border-radius: 40px;
            padding: 14px;
            box-shadow: 
                0 20px 60px rgba(0,0,0,0.4),
                inset 0 0 0 1px rgba(255,255,255,0.1),
                inset 0 1px 0 rgba(255,255,255,0.2);
            transition: var(--transition);
        }
        
        .device-card:hover .device-bezel {
            transform: rotateY(5deg) rotateX(2deg);
        }
        
        /* iOS Device Frame */
        .ios-device .device-bezel {
            border-radius: 50px;
            background: linear-gradient(145deg, #1d1d1f, #000000);
        }
        
        /* Notch for iPhone */
        .device-notch {
            position: absolute;
            top: 14px;
            left: 50%;
            transform: translateX(-50%);
            width: 150px;
            height: 30px;
            background: #000;
            border-radius: 0 0 20px 20px;
            z-index: 10;
            box-shadow: 
                inset 0 -2px 4px rgba(255,255,255,0.1),
                0 2px 8px rgba(0,0,0,0.5);
        }
        
        .notch-speaker {
            position: absolute;
            top: 8px;
            left: 50%;
            transform: translateX(-50%);
            width: 50px;
            height: 4px;
            background: #1a1a1a;
            border-radius: 2px;
        }
        
        .notch-camera {
            position: absolute;
            top: 6px;
            right: 20px;
            width: 8px;
            height: 8px;
            background: radial-gradient(circle, #1a3a5a, #000);
            border-radius: 50%;
            box-shadow: 0 0 4px rgba(0, 150, 255, 0.3);
        }
        
        /* Home Indicator (iOS) */
        .home-indicator {
            position: absolute;
            bottom: 8px;
            left: 50%;
            transform: translateX(-50%);
            width: 120px;
            height: 4px;
            background: rgba(255,255,255,0.3);
            border-radius: 2px;
            z-index: 10;
        }
        
        /* Status Bar */
        .status-bar {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 44px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            font-size: 12px;
            font-weight: 600;
            color: #000;
            z-index: 5;
            background: rgba(255,255,255,0.95);
            backdrop-filter: blur(10px);
        }
        
        .status-time {
            font-weight: 700;
        }
        
        .status-icons {
            display: flex;
            gap: 4px;
            align-items: center;
        }
        
        /* Device Screen */
        .device-screen-container {
            position: relative;
            background: #fff;
            border-radius: 36px;
            overflow: hidden;
            box-shadow: inset 0 0 0 1px rgba(0,0,0,0.1);
        }
        
        .device-screen {
            width: 100%;
            height: 100%;
            border: none;
            display: block;
            background: white;
        }
        
        /* Loading State */
        .loading-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255,255,255,0.95);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 100;
            transition: opacity 0.3s ease;
            border-radius: 36px;
        }
        
        .loading-overlay.hidden {
            opacity: 0;
            pointer-events: none;
        }
        
        .spinner {
            width: 50px;
            height: 50px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid var(--primary);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .loading-text {
            margin-top: 15px;
            color: var(--text-secondary);
            font-size: 14px;
            font-weight: 500;
        }
        
        /* Performance Monitor */
        .performance-panel {
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--card-bg);
            padding: 15px;
            border-radius: 12px;
            box-shadow: var(--shadow-lg);
            font-size: 12px;
            z-index: 1000;
            display: ${options.performance ? 'block' : 'none'};
        }
        
        .perf-metric {
            display: flex;
            justify-content: space-between;
            gap: 20px;
            margin: 5px 0;
        }
        
        .perf-label {
            color: var(--text-secondary);
        }
        
        .perf-value {
            font-weight: 700;
            color: var(--primary);
            font-family: 'SF Mono', Monaco, monospace;
        }
        
        /* Responsive Design */
        @media (max-width: 1200px) {
            .devices-grid {
                grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            }
        }
        
        @media (max-width: 768px) {
            body {
                padding: 10px;
            }
            
            .main-header {
                padding: 20px;
            }
            
            .logo-text h1 {
                font-size: 24px;
            }
            
            .controls-section {
                grid-template-columns: 1fr;
            }
            
            .devices-grid {
                grid-template-columns: 1fr;
                gap: 20px;
            }
            
            .device-card {
                padding: 20px;
            }
        }
        
        /* Keyboard Shortcuts Help */
        .shortcuts-help {
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: var(--card-bg);
            padding: 15px 20px;
            border-radius: 12px;
            box-shadow: var(--shadow-md);
            font-size: 12px;
            opacity: 0.9;
            transition: var(--transition);
        }
        
        .shortcuts-help:hover {
            opacity: 1;
        }
        
        .shortcut-item {
            display: flex;
            align-items: center;
            gap: 10px;
            margin: 5px 0;
        }
        
        .shortcut-key {
            background: #f8f9fa;
            padding: 4px 8px;
            border-radius: 4px;
            font-weight: 700;
            font-family: 'SF Mono', Monaco, monospace;
            border: 1px solid #dee2e6;
        }
    </style>
</head>
<body>
    <!-- Main Header -->
    <div class="main-header">
        <div class="header-top">
            <div class="logo-section">
                <div class="logo-icon">📱</div>
                <div class="logo-text">
                    <h1>DeviceFrame Pro</h1>
                    <p>Ultimate Device Emulator</p>
                </div>
            </div>
            <div class="header-badges">
                <div class="badge badge-primary">
                    ${options.framework.toUpperCase()}
                </div>
                <div class="badge badge-success">
                    <span class="status-dot"></span>
                    Live
                </div>
                ${options.performance ? '<div class="badge badge-info">⚡ Performance</div>' : ''}
            </div>
        </div>
        
        <div class="controls-section">
            <div class="url-input-wrapper">
                <input 
                    type="text" 
                    id="targetUrl" 
                    class="url-input"
                    value="${options.targetUrl}"
                    placeholder="http://localhost:3000"
                >
                <span class="url-icon">🔗</span>
            </div>
            <button class="btn" onclick="updateUrl()">
                🔄 Update
            </button>
            <button class="btn btn-secondary" onclick="reloadAll()">
                ♻️ Reload All
            </button>
            <button class="btn btn-secondary" onclick="toggleQR()">
                📱 QR Code
            </button>
        </div>
        
        <div class="filter-section">
            <label class="filter-label">Filter Devices</label>
            <div class="filter-buttons">
                <button class="filter-btn active" onclick="filterDevices('all')">
                    🌐 All Devices
                </button>
                <button class="filter-btn" onclick="filterDevices('mobile')">
                    📱 Mobile
                </button>
                <button class="filter-btn" onclick="filterDevices('tablet')">
                    📱 Tablet
                </button>
                <button class="filter-btn" onclick="filterDevices('desktop')">
                    💻 Desktop
                </button>
                <button class="filter-btn" onclick="filterDevices('iOS')">
                    🍎 iOS
                </button>
                <button class="filter-btn" onclick="filterDevices('Android')">
                    🤖 Android
                </button>
            </div>
        </div>
    </div>
    
    <!-- QR Code Section -->
    <div id="qrSection" class="qr-section">
        <h3>📲 Test on Real Device</h3>
        <p style="color: #666; margin-bottom: 10px;">
            Scan this QR code with your phone to test on actual hardware
        </p>
        <div class="qr-code-container">
            <div id="qrCode"></div>
        </div>
        <p style="color: #666; font-size: 13px;">
            URL: <code style="background: #f8f9fa; padding: 4px 8px; border-radius: 4px;">${options.targetUrl}</code>
        </p>
    </div>
    
    <!-- Devices Grid -->
    <div id="devicesGrid" class="devices-grid"></div>
    
    <!-- Performance Panel -->
    <div class="performance-panel">
        <div style="font-weight: 700; margin-bottom: 10px; color: var(--text-primary);">
            ⚡ Performance
        </div>
        <div class="perf-metric">
            <span class="perf-label">FPS:</span>
            <span class="perf-value" id="fps">60</span>
        </div>
        <div class="perf-metric">
            <span class="perf-label">Memory:</span>
            <span class="perf-value" id="memory">--</span>
        </div>
        <div class="perf-metric">
            <span class="perf-label">Load Time:</span>
            <span class="perf-value" id="loadTime">--</span>
        </div>
    </div>
    
    <!-- Keyboard Shortcuts -->
    <div class="shortcuts-help">
        <div style="font-weight: 700; margin-bottom: 8px;">⌨️ Shortcuts</div>
        <div class="shortcut-item">
            <span class="shortcut-key">R</span>
            <span>Reload All</span>
        </div>
        <div class="shortcut-item">
            <span class="shortcut-key">Q</span>
            <span>QR Code</span>
        </div>
        <div class="shortcut-item">
            <span class="shortcut-key">S</span>
            <span>Screenshots</span>
        </div>
    </div>
    
    <script>
        let devices = [];
        let currentFilter = 'all';
        let ws = null;
        let performanceMetrics = { fps: 0, memory: 0, loadTime: 0 };
        
        // Initialize
        async function init() {
            try {
                const config = await fetch('/api/config').then(r => r.json());
                devices = config.devices;
                renderDevices();
                setupWebSocket();
                setupKeyboardShortcuts();
                
                if (config.performance) {
                    startPerformanceMonitoring();
                }
            } catch (err) {
                console.error('Initialization error:', err);
                alert('Failed to connect to DeviceFrame Pro server. Make sure it\'s running.');
            }
        }
        
        // WebSocket Connection
        function setupWebSocket() {
            ws = new WebSocket(`ws://${location.host}`);
            
            ws.onopen = () => {
                console.log('✓ Connected to DeviceFrame Pro');
            };
            
            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                handleWebSocketMessage(data);
            };
            
            ws.onerror = (error) => {
                console.error('WebSocket error:', error);
            };
            
            ws.onclose = () => {
                console.log('Disconnected. Reconnecting in 3s...');
                setTimeout(setupWebSocket, 3000);
            };
        }
        
        function handleWebSocketMessage(data) {
            switch (data.type) {
                case 'reload-all':
                    reloadAll();
                    break;
                case 'config-update':
                    document.getElementById('targetUrl').value = data.config.targetUrl;
                    reloadAll();
                    break;
            }
        }
        
        // Render Devices
        function renderDevices() {
            const grid = document.getElementById('devicesGrid');
            const filtered = currentFilter === 'all' 
                ? devices 
                : devices.filter(d => d.type === currentFilter || d.os === currentFilter);
            
            grid.innerHTML = filtered.map(device => {
                const hasNotch = device.frameStyle.notch;
                const hasHomeIndicator = device.frameStyle.homeIndicator;
                const screenHeight = device.height - (hasHomeIndicator ? 30 : 0);
                
                return `
                <div class="device-card ${device.os.toLowerCase()}-device" 
                     data-type="${device.type}" 
                     data-os="${device.os}">
                    <div class="device-header">
                        <div class="device-info">
                            <div class="device-name">${device.name}</div>
                            <div class="device-specs">
                                <span>📐 ${device.width} × ${device.height}px</span>
                                <span>🔍 ${device.pixelRatio}x pixel ratio</span>
                                <span>📱 ${device.type}</span>
                            </div>
                        </div>
                        <span class="device-os-badge ${device.os.toLowerCase()}-badge">
                            ${device.os}
                        </span>
                    </div>
                    
                    <div class="device-actions">
                        <button class="action-btn" onclick="screenshotDevice('${device.id}')">
                            📸 Screenshot
                        </button>
                        <button class="action-btn" onclick="reloadDevice('${device.id}')">
                            ♻️ Reload
                        </button>
                    </div>
                    
                    <div class="device-frame" id="frame-${device.id}">
                        <div class="device-bezel" style="
                            border-radius: ${device.frameStyle.borderRadius}px;
                            background: ${device.frameStyle.frameColor};
                            padding: ${device.frameStyle.frameWidth}px;
                        ">
                            ${hasNotch ? `
                            <div class="device-notch">
                                <div class="notch-speaker"></div>
                                <div class="notch-camera"></div>
                            </div>
                            ` : ''}
                            
                            <div class="device-screen-container" style="
                                border-radius: ${device.frameStyle.borderRadius - device.frameStyle.frameWidth}px;
                                height: ${screenHeight}px;
                            ">
                                <div class="status-bar" style="height: ${device.frameStyle.statusBarHeight}px;">
                                    <span class="status-time">${getCurrentTime()}</span>
                                    <div class="status-icons">
                                        ${device.os === 'iOS' ? '📶 📡 🔋' : '📶 📳 🔋'}
                                    </div>
                                </div>
                                
                                <iframe 
                                    class="device-screen"
                                    src="${document.getElementById('targetUrl').value}"
                                    id="iframe-${device.id}"
                                    style="height: ${screenHeight - device.frameStyle.statusBarHeight}px;"
                                    onload="hideLoading('${device.id}')"
                                ></iframe>
                                
                                <div class="loading-overlay" id="loading-${device.id}">
                                    <div class="spinner"></div>
                                    <div class="loading-text">Loading ${device.name}...</div>
                                </div>
                            </div>
                            
                            ${hasHomeIndicator ? '<div class="home-indicator"></div>' : ''}
                        </div>
                    </div>
                </div>
                `;
            }).join('');
            
            // Update status bar time every second
            setInterval(updateStatusBarTime, 1000);
        }
        
        function getCurrentTime() {
            const now = new Date();
            return now.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
            });
        }
        
        function updateStatusBarTime() {
            const time = getCurrentTime();
            document.querySelectorAll('.status-time').forEach(el => {
                el.textContent = time;
            });
        }
        
        function hideLoading(deviceId) {
            const loader = document.getElementById('loading-' + deviceId);
            if (loader) {
                setTimeout(() => loader.classList.add('hidden'), 500);
            }
        }
        
        // Filter Devices
        function filterDevices(type) {
            currentFilter = type;
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
            renderDevices();
        }
        
        // Update URL
        async function updateUrl() {
            const url = document.getElementById('targetUrl').value;
            try {
                await fetch('/api/config', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ targetUrl: url })
                });
                reloadAll();
            } catch (err) {
                console.error('Failed to update URL:', err);
                alert('Failed to update URL');
            }
        }
        
        // Reload Functions
        function reloadAll() {
            devices.forEach(device => reloadDevice(device.id));
        }
        
        function reloadDevice(deviceId) {
            const iframe = document.getElementById('iframe-' + deviceId);
            const loader = document.getElementById('loading-' + deviceId);
            
            if (loader) loader.classList.remove('hidden');
            if (iframe) {
                iframe.src = iframe.src;
            }
        }
        
        // Rotate Device
        function rotateDevice(deviceId) {
            const frame = document.getElementById('frame-' + deviceId);
            const currentRotation = frame.style.transform || 'rotate(0deg)';
            const isRotated = currentRotation.includes('90deg');
            
            frame.style.transform = isRotated ? 'rotate(0deg)' : 'rotate(90deg)';
            frame.style.transition = 'transform 0.5s ease';
        }
        
        // Screenshot Device
        async function screenshotDevice(deviceId) {
            try {
                const response = await fetch(`/api/screenshot/${deviceId}`, {
                    method: 'POST'
                });
                const data = await response.json();
                
                if (data.success) {
                    showNotification(`📸 Screenshot saved: ${data.filename}`);
                }
            } catch (err) {
                console.error('Screenshot failed:', err);
                showNotification('❌ Screenshot failed', 'error');
            }
        }
        
        // QR Code
        async function toggleQR() {
            const section = document.getElementById('qrSection');
            const qrCode = document.getElementById('qrCode');
            
            if (section.style.display === 'none' || !section.style.display) {
                try {
                    const response = await fetch('/api/qrcode');
                    const data = await response.json();
                    qrCode.innerHTML = `<img src="${data.qrCode}" alt="QR Code" style="width: 100%; border-radius: 8px;">`;
                    section.style.display = 'block';
                } catch (err) {
                    console.error('QR code generation failed:', err);
                }
            } else {
                section.style.display = 'none';
            }
        }
        
        // Keyboard Shortcuts
        function setupKeyboardShortcuts() {
            document.addEventListener('keydown', (e) => {
                // Ignore if typing in input
                if (e.target.tagName === 'INPUT') return;
                
                switch(e.key.toLowerCase()) {
                    case 'r':
                        reloadAll();
                        showNotification('♻️ Reloading all devices...');
                        break;
                    case 'q':
                        toggleQR();
                        break;
                    case 's':
                        screenshotAll();
                        break;
                }
            });
        }
        
        async function screenshotAll() {
            showNotification('📸 Taking screenshots of all devices...');
            for (const device of devices) {
                await screenshotDevice(device.id);
                await new Promise(resolve => setTimeout(resolve, 200));
            }
            showNotification('✅ All screenshots captured!');
        }
        
        // Performance Monitoring
        function startPerformanceMonitoring() {
            let frameCount = 0;
            let lastTime = performance.now();
            
            function measureFPS() {
                frameCount++;
                const currentTime = performance.now();
                
                if (currentTime >= lastTime + 1000) {
                    const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                    document.getElementById('fps').textContent = fps;
                    frameCount = 0;
                    lastTime = currentTime;
                }
                
                requestAnimationFrame(measureFPS);
            }
            
            measureFPS();
            
            // Memory usage
            setInterval(() => {
                if (performance.memory) {
                    const used = (performance.memory.usedJSHeapSize / 1048576).toFixed(1);
                    document.getElementById('memory').textContent = `${used} MB`;
                }
            }, 2000);
            
            // Measure load time for each iframe
            devices.forEach(device => {
                const iframe = document.getElementById('iframe-' + device.id);
                if (iframe) {
                    const startTime = performance.now();
                    iframe.addEventListener('load', () => {
                        const loadTime = (performance.now() - startTime).toFixed(0);
                        console.log(`${device.name} loaded in ${loadTime}ms`);
                    });
                }
            });
        }
        
        // Notification System
        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: ${type === 'error' ? '#dc3545' : '#667eea'};
                color: white;
                padding: 15px 25px;
                border-radius: 12px;
                box-shadow: 0 8px 24px rgba(0,0,0,0.2);
                z-index: 10000;
                font-weight: 600;
                animation: slideDown 0.3s ease;
            `;
            notification.textContent = message;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }
        
        // Initialize on load
        init();
    </script>
</body>
</html>`;
}