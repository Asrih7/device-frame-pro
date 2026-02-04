import { DeviceFrameOptions } from '../index';
import { DEVICE_SPECS } from '../utils/device-specs';

export function getPreviewHTML(options: Required<DeviceFrameOptions>): string {
  // Include devices directly from DEVICE_SPECS
  const devicesJson = JSON.stringify(DEVICE_SPECS);
  
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
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
            overflow-x: hidden;
        }
        
        /* Main Layout */
        .main-container {
            display: grid;
            grid-template-columns: 300px 1fr;
            gap: 20px;
            max-width: 1600px;
            margin: 0 auto;
        }
        
        /* Sidebar */
        .sidebar {
            background: var(--card-bg);
            border-radius: var(--border-radius);
            padding: 25px;
            box-shadow: var(--shadow-lg);
            backdrop-filter: blur(10px);
            height: fit-content;
            position: sticky;
            top: 20px;
            max-height: calc(100vh - 40px);
            overflow-y: auto;
        }
        
        .logo-section {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 25px;
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
            font-size: 20px;
            font-weight: 800;
            letter-spacing: -0.5px;
        }
        
        .logo-text p {
            color: var(--text-secondary);
            font-size: 13px;
            margin-top: 2px;
        }
        
        /* Status Section */
        .status-section {
            margin-bottom: 25px;
        }
        
        .status-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }
        
        .status-title {
            font-size: 16px;
            font-weight: 700;
            color: var(--text-primary);
        }
        
        .badge-live {
            background: linear-gradient(135deg, #3ddc84, #00c853);
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        
        .status-dot {
            width: 8px;
            height: 8px;
            background: white;
            border-radius: 50%;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.2); }
        }
        
        .status-info {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 12px;
            font-size: 13px;
            color: var(--text-secondary);
            font-family: 'SF Mono', Monaco, 'Courier New', monospace;
        }
        
        .status-info div {
            margin-bottom: 5px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        /* URL Input Section */
        .url-section {
            margin-bottom: 25px;
        }
        
        .section-title {
            font-size: 16px;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .url-input-wrapper {
            position: relative;
        }
        
        .url-input {
            width: 100%;
            padding: 12px 45px 12px 15px;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            font-size: 13px;
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
            font-size: 16px;
        }
        
        .action-buttons {
            display: flex;
            gap: 10px;
            margin-top: 12px;
        }
        
        .btn {
            flex: 1;
            padding: 10px 16px;
            background: var(--bg-gradient);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 13px;
            font-weight: 600;
            transition: var(--transition);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            box-shadow: var(--shadow-sm);
        }
        
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-md);
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
        
        /* Device List Section */
        .device-list-section {
            margin-bottom: 25px;
        }
        
        .device-list-title {
            font-size: 16px;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 15px;
        }
        
        /* Dropdown Styles */
        .device-type-dropdown {
            margin-bottom: 15px;
        }
        
        .dropdown-header {
            padding: 12px 15px;
            background: #f8f9fa;
            border-radius: 10px;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: 600;
            font-size: 14px;
            color: var(--text-primary);
            transition: var(--transition);
        }
        
        .dropdown-header:hover {
            background: #e9ecef;
        }
        
        .dropdown-header.open {
            background: var(--bg-gradient);
            color: white;
        }
        
        .dropdown-icon {
            transition: transform 0.3s ease;
        }
        
        .dropdown-icon.open {
            transform: rotate(180deg);
        }
        
        .dropdown-content {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }
        
        .dropdown-content.open {
            max-height: 1000px;
        }
        
        .device-list {
            background: white;
            border-radius: 10px;
            margin-top: 8px;
            overflow: hidden;
            box-shadow: var(--shadow-sm);
        }
        
        .device-item {
            padding: 12px 15px;
            background: white;
            cursor: pointer;
            transition: var(--transition);
            border-left: 3px solid transparent;
            border-bottom: 1px solid #f0f0f0;
        }
        
        .device-item:hover {
            background: #f8f9fa;
            border-left-color: var(--primary);
        }
        
        .device-item.selected {
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
            border-left-color: var(--primary);
        }
        
        .device-item:last-child {
            border-bottom: none;
        }
        
        .device-item-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .device-item-name {
            font-weight: 600;
            font-size: 14px;
        }
        
        .device-item-specs {
            font-size: 11px;
            color: #666;
            margin-top: 4px;
        }
        
        .device-item.selected .device-item-specs {
            color: var(--primary);
        }
        
        .device-item-os {
            font-size: 11px;
            font-weight: 700;
            padding: 2px 8px;
            border-radius: 4px;
            background: #e9ecef;
        }
        
        .device-item.selected .device-item-os {
            background: var(--bg-gradient);
            color: white;
        }
        
        /* Framework Badge */
        .framework-badge {
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: white;
            padding: 8px 16px;
            border-radius: 8px;
            font-size: 12px;
            font-weight: 700;
            color: var(--text-primary);
            box-shadow: var(--shadow-md);
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        /* Main Content Area */
        .content-area {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        
        /* Preview Container */
        .preview-container {
            background: var(--card-bg);
            border-radius: var(--border-radius);
            padding: 30px;
            box-shadow: var(--shadow-lg);
            backdrop-filter: blur(10px);
            flex: 1;
            display: flex;
            flex-direction: column;
        }
        
        .preview-header {
            margin-bottom: 25px;
        }
        
        .preview-title {
            font-size: 24px;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 8px;
        }
        
        .preview-subtitle {
            color: var(--text-secondary);
            font-size: 14px;
        }
        
        /* Device Frame Container */
        .device-frame-container {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 500px;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            border-radius: 20px;
            padding: 20px;
            position: relative;
            overflow: auto; /* Allow scrolling if needed */
        }
        
        /* Zoom Controls */
        .zoom-controls {
            position: absolute;
            bottom: 20px;
            right: 20px;
            background: white;
            border-radius: 8px;
            padding: 8px;
            box-shadow: var(--shadow-md);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 100;
        }
        
        .zoom-btn {
            width: 32px;
            height: 32px;
            border: none;
            background: var(--bg-gradient);
            color: white;
            border-radius: 6px;
            cursor: pointer;
            font-size: 18px;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: var(--transition);
        }
        
        .zoom-btn:hover {
            transform: scale(1.1);
        }
        
        .zoom-level {
            font-size: 14px;
            font-weight: 600;
            color: var(--text-primary);
            min-width: 60px;
            text-align: center;
        }
        
        .zoom-fit-btn {
            padding: 6px 12px;
            background: white;
            border: 2px solid var(--primary);
            color: var(--primary);
            border-radius: 6px;
            cursor: pointer;
            font-size: 12px;
            font-weight: 600;
            transition: var(--transition);
        }
        
        .zoom-fit-btn:hover {
            background: var(--primary);
            color: white;
        }
        
        .placeholder-text {
            text-align: center;
            color: #666;
        }
        
        .placeholder-icon {
            font-size: 48px;
            margin-bottom: 15px;
        }
        
        .placeholder-title {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 8px;
        }
        
        /* Device Frame */
        .device-frame {
            position: relative;
            margin: 0 auto;
            perspective: 1000px;
            transition: transform 0.5s ease;
        }
        
        .device-frame.active {
            transform: scale(1);
        }
        
        /* Screenshot Button */
        .screenshot-btn {
            position: absolute;
            top: -50px;
            right: 10px;
            background: var(--bg-gradient);
            color: white;
            border: none;
            border-radius: 8px;
            padding: 10px 20px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            box-shadow: var(--shadow-md);
            transition: var(--transition);
            z-index: 1000;
        }
        
        .screenshot-btn:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
        }
        
        .screenshot-btn:active {
            transform: translateY(0);
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
        }
        
        /* iOS Device Frame */
        .ios-device .device-bezel {
            border-radius: 50px;
            background: linear-gradient(145deg, #1d1d1f, #000000);
        }
        
        /* Android Device Frame */
        .android-device .device-bezel {
            border-radius: 40px;
            background: linear-gradient(145deg, #2c2c2c, #1a1a1a);
        }
        
        /* Desktop Device Frame */
        .desktop-device .device-bezel {
            border-radius: 12px;
            background: linear-gradient(145deg, #e0e0e0, #c0c0c0);
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
        
        .desktop-device .device-screen-container {
            border-radius: 8px;
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
        
        .desktop-device .loading-overlay {
            border-radius: 8px;
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
        
        /* Device Size Label */
        .device-size-label {
            position: absolute;
            bottom: -30px;
            left: 0;
            right: 0;
            text-align: center;
            font-family: 'SF Mono', Monaco, monospace;
            font-size: 13px;
            color: var(--text-secondary);
            background: rgba(255, 255, 255, 0.9);
            padding: 8px 16px;
            border-radius: 8px;
            box-shadow: var(--shadow-sm);
        }
        
        /* Responsive Design */
        @media (max-width: 1200px) {
            .main-container {
                grid-template-columns: 1fr;
            }
            
            .sidebar {
                position: static;
            }
        }
        
        @media (max-width: 768px) {
            body {
                padding: 10px;
            }
            
            .preview-container {
                padding: 20px;
            }
            
            .device-frame-container {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <!-- Main Container -->
    <div class="main-container">
        <!-- Sidebar -->
        <div class="sidebar">
            <!-- Logo -->
            <div class="logo-section">
                <div class="logo-icon">📱</div>
                <div class="logo-text">
                    <h1>DeviceFrame Pro</h1>
                    <p>Ultimate Device Emulator</p>
                </div>
            </div>
            
            <!-- Status -->
            <div class="status-section">
                <div class="status-header">
                    <div class="status-title">${options.framework.toUpperCase()}</div>
                    <div class="badge-live">
                        <span class="status-dot"></span>
                        LIVE
                    </div>
                </div>
                <div class="status-info">
                    <div><span style="color: #667eea;">●</span> Server running</div>
                    <div><span style="color: #667eea;">🔗</span> ${options.targetUrl}</div>
                    <div><span style="color: #667eea;">🔄</span> Auto reload enabled</div>
                </div>
            </div>
            
            <!-- URL Input -->
            <div class="url-section">
                <div class="section-title">🔄 Preview URL</div>
                <div class="url-input-wrapper">
                    <input 
                        type="text" 
                        id="targetUrl" 
                        class="url-input"
                        value="${options.targetUrl}"
                        placeholder="http://localhost:4200"
                    >
                    <span class="url-icon">🔗</span>
                </div>
                <div class="action-buttons">
                    <button class="btn" id="updateUrlBtn">
                        Update
                    </button>
                    <button class="btn btn-secondary" id="reloadAllBtn">
                        Reload All
                    </button>
                </div>
            </div>
            
            <!-- Device List -->
            <div class="device-list-section">
                <div class="device-list-title">📱 Devices</div>
                <div id="deviceDropdowns"></div>
            </div>
        </div>
        
        <!-- Main Content -->
        <div class="content-area">
            <!-- Preview Container -->
            <div class="preview-container">
                <div class="preview-header">
                    <div class="preview-title">Preview</div>
                </div>
                
                <!-- Device Frame Container -->
                <div class="device-frame-container" id="deviceFrameContainer">
                    <div class="placeholder-text" id="placeholderPreview">
                        <div class="placeholder-icon">📱</div>
                        <div class="placeholder-title">No Device Selected</div>
                        <div class="preview-subtitle">Select a device from the list to preview it</div>
                    </div>
                    
                    <!-- Device Frame will be inserted here -->
                    <div id="devicePreview" style="display: none;"></div>
                    
                    <!-- Zoom Controls -->
                    <div class="zoom-controls" id="zoomControls" style="display: none;">
                        <button class="zoom-btn" id="zoomOut" title="Zoom Out">−</button>
                        <span class="zoom-level" id="zoomLevel">100%</span>
                        <button class="zoom-btn" id="zoomIn" title="Zoom In">+</button>
                        <button class="zoom-fit-btn" id="zoomFit" title="Fit to Screen">Fit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Framework Badge -->
    <div class="framework-badge">
        <span>⚡</span>
        ${options.framework.toUpperCase()}
    </div>
    
    <script>
        // ✅ FIX 1: Define all functions FIRST before any initialization
        
        const devices = ${devicesJson};
        let selectedDeviceId = null;
        let ws = null;
        let currentZoom = 1.0; // Current zoom level (1.0 = 100%)
        let openDropdowns = {
            mobile: true,  // Open mobile by default
            tablet: false
        };
        
        // ============================================
        // CORE FUNCTIONS - DEFINED FIRST
        // ============================================
        
        function getCurrentTime() {
            const now = new Date();
            return now.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
            });
        }
        
        function setZoom(zoom) {
            currentZoom = Math.max(0.25, Math.min(2.0, zoom)); // Limit between 25% and 200%
            
            const deviceFrame = document.querySelector('.device-frame');
            if (deviceFrame) {
                deviceFrame.style.transform = 'scale(' + currentZoom + ')';
            }
            
            // Update zoom level display
            const zoomLevel = document.getElementById('zoomLevel');
            if (zoomLevel) {
                zoomLevel.textContent = Math.round(currentZoom * 100) + '%';
            }
        }
        
        function zoomIn() {
            setZoom(currentZoom + 0.1);
        }
        
        function zoomOut() {
            setZoom(currentZoom - 0.1);
        }
        
        function zoomToFit() {
            const device = devices.find(d => d.id === selectedDeviceId);
            if (!device) return;
            
            const container = document.getElementById('deviceFrameContainer');
            if (!container) return;
            
            // Get container dimensions
            const containerWidth = container.clientWidth - 100; // padding
            const containerHeight = container.clientHeight - 200; // padding + controls
            
            // Calculate device height (including frame)
            const hasHomeIndicator = device.frameStyle?.homeIndicator || false;
            const deviceHeight = device.height - (hasHomeIndicator ? 30 : 0);
            const frameWidth = (device.frameStyle?.frameWidth || 14) * 2;
            
            const totalDeviceWidth = device.width + frameWidth;
            const totalDeviceHeight = deviceHeight + frameWidth;
            
            // Calculate optimal zoom
            const scaleX = containerWidth / totalDeviceWidth;
            const scaleY = containerHeight / totalDeviceHeight;
            const optimalZoom = Math.min(scaleX, scaleY, 1.0); // Never zoom beyond 100%
            
            setZoom(optimalZoom);
        }
        
        async function takeScreenshot(deviceId) {
            console.log('📸 Taking screenshot for device:', deviceId);
            
            try {
                const response = await fetch('/api/screenshot/' + deviceId, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fullPage: false, quality: 90 })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    showNotification('✅ Screenshot captured!');
                    
                    // Auto-download the screenshot
                    const link = document.createElement('a');
                    link.href = result.url;
                    link.download = result.filename;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    console.log('Screenshot saved:', result.filename);
                } else {
                    showNotification('❌ Screenshot failed: ' + result.error);
                    console.error('Screenshot error:', result.error);
                }
            } catch (error) {
                showNotification('❌ Screenshot failed');
                console.error('Screenshot error:', error);
            }
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
        
        function getTypeIcon(type) {
            switch(type) {
                case 'mobile': return '📱';
                case 'tablet': return '📱';
                case 'desktop': return '💻';
                default: return '📱';
            }
        }
        
        function toggleDropdown(type) {
            console.log('Toggling dropdown:', type);
            openDropdowns[type] = !openDropdowns[type];
            renderDeviceDropdowns();
        }
        
        function selectDevice(deviceId, event) {
            if (event) {
                event.stopPropagation();
            }
            
            console.log('🎯 Selecting device:', deviceId);
            selectedDeviceId = deviceId;
            renderDeviceDropdowns();
            renderDevicePreview(deviceId);
            
            // Hide placeholder, show preview
            const placeholder = document.getElementById('placeholderPreview');
            const preview = document.getElementById('devicePreview');
            if (placeholder) placeholder.style.display = 'none';
            if (preview) preview.style.display = 'block';
        }
        
        function renderDeviceDropdowns() {
            const container = document.getElementById('deviceDropdowns');
            
            if (!container) {
                console.error('❌ Container #deviceDropdowns not found!');
                return;
            }
            
            // Group devices by type
            const devicesByType = {
                mobile: devices.filter(d => d.type === 'mobile'),
                tablet: devices.filter(d => d.type === 'tablet'),
                desktop: devices.filter(d => d.type === 'desktop')
            };
            
            console.log('Device grouping:', {
                mobile: devicesByType.mobile.length,
                tablet: devicesByType.tablet.length,
                desktop: devicesByType.desktop.length
            });
            
            // Create dropdowns for each type
            const dropdownsHTML = Object.entries(devicesByType).map(([type, typeDevices]) => {
                if (typeDevices.length === 0) return '';
                
                const isOpen = openDropdowns[type];
                const icon = getTypeIcon(type);
                const typeName = type.charAt(0).toUpperCase() + type.slice(1);
                const count = typeDevices.length;
                
                const devicesHTML = typeDevices.map(device => {
                    const isSelected = device.id === selectedDeviceId;
                    const osIcon = device.os === 'iOS' ? '🍎' : device.os === 'Android' ? '🤖' : '💻';
                    
                    return '<div class="device-item ' + (isSelected ? 'selected' : '') + '" data-device-id="' + device.id + '">' +
                        '<div class="device-item-info">' +
                            '<div>' +
                                '<div class="device-item-name">' + osIcon + ' ' + device.name + '</div>' +
                                '<div class="device-item-specs">' + device.width + ' × ' + device.height + 'px • ' + device.os + '</div>' +
                            '</div>' +
                            '<span class="device-item-os">' + device.os + '</span>' +
                        '</div>' +
                    '</div>';
                }).join('');
                
                return '<div class="device-type-dropdown">' +
                    '<div class="dropdown-header ' + (isOpen ? 'open' : '') + '" data-dropdown-type="' + type + '">' +
                        '<div>' + icon + ' ' + typeName + ' (' + count + ')</div>' +
                        '<div class="dropdown-icon ' + (isOpen ? 'open' : '') + '">▼</div>' +
                    '</div>' +
                    '<div class="dropdown-content ' + (isOpen ? 'open' : '') + '">' +
                        '<div class="device-list">' + devicesHTML + '</div>' +
                    '</div>' +
                '</div>';
            }).join('');
            
            container.innerHTML = dropdownsHTML;
            
            // Setup event delegation for clicks
            container.querySelectorAll('.dropdown-header').forEach(header => {
                header.addEventListener('click', function() {
                    const type = this.getAttribute('data-dropdown-type');
                    toggleDropdown(type);
                });
            });
            
            container.querySelectorAll('.device-item').forEach(item => {
                item.addEventListener('click', function(event) {
                    event.stopPropagation();
                    const deviceId = this.getAttribute('data-device-id');
                    selectDevice(deviceId);
                });
            });
            
            console.log('✅ Device dropdowns rendered successfully with event listeners');
        }
        
        function renderDevicePreview(deviceId) {
            const device = devices.find(d => d.id === deviceId);
            if (!device) {
                console.error('❌ Device not found:', deviceId);
                return;
            }
            
            console.log('🖼️ Rendering preview for:', device.name);
            
            const hasNotch = device.frameStyle?.notch || false;
            const hasHomeIndicator = device.frameStyle?.homeIndicator || false;
            const screenHeight = device.height - (hasHomeIndicator ? 30 : 0);
            const statusBarHeight = device.frameStyle?.statusBarHeight || 44;
            const notchHTML = hasNotch ? '<div class="device-notch"><div class="notch-speaker"></div><div class="notch-camera"></div></div>' : '';
            const homeIndicatorHTML = hasHomeIndicator ? '<div class="home-indicator"></div>' : '';
            const statusIcons = device.os === 'iOS' ? '📶 📡 🔋' : '📶 📳 🔋';
            // ✅ FIX: Load from current host (DeviceFrame proxy) instead of target URL directly
            // This allows the proxy to handle React's PUBLIC_URL and asset serving correctly
            const url = window.location.origin;
            
            // No scaling here - we'll use CSS transform with zoom controls
            const frameWidth = device.frameStyle?.frameWidth || 14;
                        
            const frameHTML = '<div class="device-frame ' + device.os.toLowerCase() + '-device ' + device.type + '-device active">' +

                '<div class="device-bezel" style="border-radius: ' + (device.frameStyle?.borderRadius || 40) + 'px; background: ' + (device.frameStyle?.frameColor || 'linear-gradient(145deg, #2c2c2c, #1a1a1a)') + '; padding: ' + frameWidth + 'px; width: ' + device.width + 'px; height: ' + (screenHeight + frameWidth * 2) + 'px;">' +
                    notchHTML +
                    '<div class="device-screen-container" style="border-radius: ' + ((device.frameStyle?.borderRadius || 40) - frameWidth) + 'px; height: ' + screenHeight + 'px;">' +
                        '<div class="status-bar" style="height: ' + statusBarHeight + 'px; display: ' + (statusBarHeight > 0 ? 'flex' : 'none') + ';">' +
                            '<span class="status-time">' + getCurrentTime() + '</span>' +
                            '<div class="status-icons">' + statusIcons + '</div>' +
                        '</div>' +
                        '<iframe class="device-screen" src="' + url + '" id="iframe-' + device.id + '" data-device-id="' + device.id + '" style="height: ' + (screenHeight - statusBarHeight) + 'px;"></iframe>' +
                        '<div class="loading-overlay" id="loading-' + device.id + '"><div class="spinner"></div><div class="loading-text">Loading ' + device.name + '...</div></div>' +
                    '</div>' +
                    homeIndicatorHTML +
                '</div>' +
                '<div class="device-size-label">' + device.name + ' • ' + device.width + ' × ' + device.height + 'px • ' + device.os + '</div>' +
            '</div>';
            
            document.getElementById('devicePreview').innerHTML = frameHTML;
            
            // Setup iframe load listener
            const iframe = document.getElementById('iframe-' + device.id);
            if (iframe) {
                iframe.addEventListener('load', function() {
                    hideLoading(device.id);
                });
            }
            
            // Setup screenshot button listener
            const screenshotBtn = document.querySelector('.screenshot-btn[data-device-id="' + device.id + '"]');
            if (screenshotBtn) {
                screenshotBtn.addEventListener('click', function() {
                    takeScreenshot(device.id);
                });
            }
            
            // Show zoom controls
            const zoomControls = document.getElementById('zoomControls');
            if (zoomControls) {
                zoomControls.style.display = 'flex';
            }
            
            // Auto-fit to screen
            setTimeout(() => {
                zoomToFit();
            }, 100);
            
            // Update status bar time every second
            setInterval(updateStatusBarTime, 1000);
        }
        
        async function updateUrl() {
            const url = document.getElementById('targetUrl').value;
            console.log('🔄 Updating URL to:', url);
            
            try {
                // Try to update via API if available
                const response = await fetch('/api/config', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ targetUrl: url })
                });
                
                if (response.ok) {
                    if (selectedDeviceId) {
                        renderDevicePreview(selectedDeviceId);
                    }
                }
            } catch (err) {
                // If API not available, just update locally
                console.log('API not available, updating locally');
                if (selectedDeviceId) {
                    renderDevicePreview(selectedDeviceId);
                }
            }
        }
        
        function reloadAll() {
            console.log('♻️ Reloading all devices');
            if (selectedDeviceId) {
                reloadDevice(selectedDeviceId);
            }
            devices.forEach(device => {
                const iframe = document.getElementById('iframe-' + device.id);
                if (iframe) {
                    iframe.src = iframe.src;
                }
            });
        }
        
        function reloadDevice(deviceId) {
            const iframe = document.getElementById('iframe-' + deviceId);
            const loader = document.getElementById('loading-' + deviceId);
            
            if (loader) loader.classList.remove('hidden');
            if (iframe) {
                iframe.src = iframe.src;
            }
        }
        
        function setupKeyboardShortcuts() {
            document.addEventListener('keydown', (e) => {
                // Ignore if typing in input
                if (e.target.tagName === 'INPUT') return;
                
                switch(e.key.toLowerCase()) {
                    case 'r':
                        if (e.ctrlKey || e.metaKey) {
                            reloadAll();
                            showNotification('♻️ Reloading...');
                        }
                        break;
                    case 'arrowdown':
                        if (selectedDeviceId) {
                            const currentIndex = devices.findIndex(d => d.id === selectedDeviceId);
                            const nextIndex = (currentIndex + 1) % devices.length;
                            selectDevice(devices[nextIndex].id);
                        }
                        break;
                    case 'arrowup':
                        if (selectedDeviceId) {
                            const currentIndex = devices.findIndex(d => d.id === selectedDeviceId);
                            const prevIndex = (currentIndex - 1 + devices.length) % devices.length;
                            selectDevice(devices[prevIndex].id);
                        }
                        break;
                }
            });
        }
        
        function showNotification(message) {
            const notification = document.createElement('div');
            notification.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #667eea; color: white; padding: 12px 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 10000; font-weight: 600; animation: slideIn 0.3s ease;';
            notification.textContent = message;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }, 2000);
        }
        
        function setupWebSocket() {
            try {
                ws = new WebSocket('ws://' + location.host);
                
                ws.onopen = () => {
                    console.log('✓ Connected to DeviceFrame Pro');
                };
                
                ws.onmessage = (event) => {
                    try {
                        const data = JSON.parse(event.data);
                        handleWebSocketMessage(data);
                    } catch (e) {
                        console.error('WebSocket message error:', e);
                    }
                };
                
                ws.onerror = (error) => {
                    console.error('WebSocket error:', error);
                };
                
                ws.onclose = () => {
                    console.log('Disconnected. Reconnecting in 3s...');
                    setTimeout(setupWebSocket, 3000);
                };
            } catch (error) {
                console.log('WebSocket not available, continuing without real-time updates');
            }
        }
        
        function handleWebSocketMessage(data) {
            switch (data.type) {
                case 'reload-all':
                    reloadAll();
                    break;
                case 'config-update':
                    if (data.config && data.config.targetUrl) {
                        document.getElementById('targetUrl').value = data.config.targetUrl;
                        if (selectedDeviceId) {
                            renderDevicePreview(selectedDeviceId);
                        }
                    }
                    break;
            }
        }
        
        function init() {
            console.log('🚀 Initializing DeviceFrame Pro...');
            console.log('📱 Total devices loaded:', devices.length);
            
            // Setup button event listeners
            const updateBtn = document.getElementById('updateUrlBtn');
            const reloadBtn = document.getElementById('reloadAllBtn');
            const zoomInBtn = document.getElementById('zoomIn');
            const zoomOutBtn = document.getElementById('zoomOut');
            const zoomFitBtn = document.getElementById('zoomFit');
            
            if (updateBtn) {
                updateBtn.addEventListener('click', updateUrl);
                console.log('✓ Update button listener attached');
            }
            
            if (reloadBtn) {
                reloadBtn.addEventListener('click', reloadAll);
                console.log('✓ Reload button listener attached');
            }
            
            if (zoomInBtn) {
                zoomInBtn.addEventListener('click', zoomIn);
                console.log('✓ Zoom In button listener attached');
            }
            
            if (zoomOutBtn) {
                zoomOutBtn.addEventListener('click', zoomOut);
                console.log('✓ Zoom Out button listener attached');
            }
            
            if (zoomFitBtn) {
                zoomFitBtn.addEventListener('click', zoomToFit);
                console.log('✓ Zoom Fit button listener attached');
            }
            
            // Render with mobile already open
            renderDeviceDropdowns();
            setupWebSocket();
            setupKeyboardShortcuts();
            
            console.log('✅ Initialization complete');
            
            // Debug: Check if dropdowns were rendered
            setTimeout(() => {
                const container = document.getElementById('deviceDropdowns');
                console.log('Device container innerHTML length:', container ? container.innerHTML.length : 'NOT FOUND');
                console.log('Device container content:', container ? container.innerHTML.substring(0, 200) : 'NOT FOUND');
            }, 100);
        }
        
        // ============================================
        // EXPOSE FUNCTIONS TO WINDOW - AFTER DEFINITION
        // ============================================
        
        window.selectDevice = selectDevice;
        window.toggleDropdown = toggleDropdown;
        window.renderDeviceDropdowns = renderDeviceDropdowns;
        window.reloadAll = reloadAll;
        window.reloadDevice = reloadDevice;
        window.updateUrl = updateUrl;
        window.hideLoading = hideLoading;
        window.getCurrentTime = getCurrentTime;
        window.takeScreenshot = takeScreenshot;
        window.setZoom = setZoom;
        window.zoomIn = zoomIn;
        window.zoomOut = zoomOut;
        window.zoomToFit = zoomToFit;
        
        // ============================================
        // INITIALIZE WHEN DOM IS READY
        // ============================================
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            // DOM already loaded, init immediately
            init();
        }
    </script>
</body>
</html>`;
}