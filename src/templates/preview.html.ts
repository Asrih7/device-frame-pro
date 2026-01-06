import { DeviceFrameOptions } from "..";
import { DEVICE_SPECS } from '../utils/device-specs';

export function getPreviewHTML(options: Required<DeviceFrameOptions>): string {
  const devices = (options.devices && options.devices.length > 0) ? DEVICE_SPECS.filter(d => options.devices.includes(d.id)) : DEVICE_SPECS;

  const initial = {
    targetUrl: options.targetUrl,
    devices,
    framework: options.framework,
    performance: options.performance,
    screenshots: options.screenshots,
    networkThrottle: options.networkThrottle
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>DeviceFrame Pro - Emulator</title>
  <link rel="stylesheet" href="/styles/main.css" />
  <style>
    /* minimal fallback styles */
    body { margin:0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial; background: #f3f6fb; }
    .container{ display:flex; height:100vh; }
    .sidebar{ width:320px; padding:20px; background:#fff; box-shadow:2px 0 12px rgba(0,0,0,0.05); overflow:auto }
    .main-content{ flex:1; padding:20px; display:flex; flex-direction:column }
    .preview-area{ display:grid; grid-template-columns: repeat(2,1fr); gap:16px; align-content:flex-start; overflow:auto }
    .device-list{ margin-top:8px }
    .status-bar{ margin-top:auto; display:flex; gap:12px; align-items:center }
  </style>
</head>
<body>
  <div class="container">
    <aside class="sidebar">
      <h2>Device Library</h2>
      <p class="subtitle">Select devices to add to preview</p>
      <div id="device-list" class="device-list"></div>

      <div style="margin-top:20px">
        <label for="target-url">Target URL</label>
        <input id="target-url" class="url-input" value="${options.targetUrl}" style="width:100%" />
        <div style="margin-top:8px">
          <button id="apply-target">Apply</button>
          <button id="open-qr">QR</button>
        </div>
      </div>
    </aside>

    <main class="main-content">
      <div id="preview-area" class="preview-area"></div>
      <div class="status-bar">
        <div><span id="device-count">0 devices</span></div>
        <div style="margin-left:auto">DeviceFrame Pro</div>
      </div>
    </main>
  </div>

  <script>
    // initial config injected for client script
    window.__DEVICEFRAME_INITIAL = ${JSON.stringify(initial)};
  </script>

  <script defer src="/bundle.js"></script>
</body>
</html>`;
}
