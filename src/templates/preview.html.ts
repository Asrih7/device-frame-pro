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
      /* Minimal styles copied from the earlier template for brevity */
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial; margin:0; padding:20px; background: linear-gradient(135deg,#667eea,#764ba2);} 
      .devices-grid { display:grid; grid-template-columns: repeat(auto-fill,minmax(350px,1fr)); gap:20px; }
      .device-card { background:white; border-radius:12px; padding:16px; box-shadow:0 6px 18px rgba(0,0,0,0.12);} 
      .device-bezel{ background:#111; border-radius:20px; padding:12px; color:white; }
      .device-screen{ width:100%; height:400px; border:none; display:block; }
    </style>
</head>
<body>
  <h1>DeviceFrame Pro</h1>
  <div>
    <input id="targetUrl" value="${options.targetUrl}" style="width:70%" />
    <button onclick="updateUrl()">Update</button>
    <button onclick="reloadAll()">Reload All</button>
  </div>
  <div id="devicesGrid" class="devices-grid"></div>

  <script>
    async function init(){
      const res = await fetch('/api/config');
      const cfg = await res.json();
      const grid = document.getElementById('devicesGrid');
      grid.innerHTML = cfg.devices.map(d => `
        <div class="device-card">
          <div class="device-bezel">
            <div style="font-weight:700">${'${d.name}'}</div>
            <iframe class="device-screen" src="${cfg.targetUrl}" ></iframe>
          </div>
        </div>
      `).join('');
    }
    function updateUrl(){fetch('/api/config',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({targetUrl:document.getElementById('targetUrl').value})}).then(()=>location.reload());}
    function reloadAll(){ document.querySelectorAll('iframe').forEach(f=>{f.src=f.src}); }
    init();
  </script>
</body>
</html>`;
}
