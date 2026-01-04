import { devices as deviceList, Device } from '../../emulators/devices';

class DeviceEmulator {
  private selectedDevices: Device[] = [];
  // track per-device rotation (degrees)
  private rotations: Map<string, number> = new Map();
  private iframes: Map<string, HTMLIFrameElement> = new Map();

  constructor() {
    this.initializeUI();
    this.loadDevices();
    this.setupEventListeners();
  }

  private initializeUI() {
    this.createToolbar();
    this.createDeviceGrid();
  }

  private createDeviceGrid() {
    // sidebar list is rendered in loadDevices
  }

  private loadDevices() {
    const deviceListEl = document.getElementById('device-list');
    if (!deviceListEl) return;

    deviceList.forEach(device => {
      const deviceCard = this.createDeviceCard(device);
      deviceListEl.appendChild(deviceCard);
    });
  }

  private createDeviceCard(device: Device): HTMLElement {
    const card = document.createElement('div');
    card.className = 'device-card';
    card.dataset.deviceId = device.id;

    card.innerHTML = `
      <div>
        <strong>${device.name}</strong>
        <div style="font-size:12px;color:#666">${device.width} × ${device.height}</div>
      </div>
      <div><button class="add-btn">+ Add</button></div>
    `;

    card.querySelector('.add-btn')?.addEventListener('click', () => this.addDeviceToPreview(device));

    return card;
  }

  private addDeviceToPreview(device: Device) {
    if (this.selectedDevices.some(d => d.id === device.id)) return;
    this.selectedDevices.push({ ...device });
    this.createDeviceFrame(device);
    this.updatePreviewLayout();
  }

  private createDeviceFrame(device: Device) {
    const previewArea = document.getElementById('preview-area');
    if (!previewArea) return;

    const frameContainer = document.createElement('div');
    frameContainer.className = 'device-frame';
    frameContainer.dataset.deviceId = device.id;

    frameContainer.innerHTML = `
      <div class="device-header">
        <h3>${device.name}</h3>
        <div class="device-actions">
          <button class="rotate-btn" title="Rotate"><i class="fas fa-sync-alt"></i></button>
          <button class="refresh-btn" title="Refresh"><i class="fas fa-redo"></i></button>
          <button class="close-btn" title="Remove"><i class="fas fa-times"></i></button>
        </div>
      </div>
      <div class="device-screen">
        <div class="screen-toolbar">
          <span class="url-display">${this.getTargetUrl()}</span>
          <button class="fullscreen-btn">Fullscreen</button>
        </div>
        <iframe src="${this.getProxyUrl()}" width="${device.width}" height="${device.height}" sandbox="allow-same-origin allow-scripts allow-popups allow-forms" loading="lazy"></iframe>
      </div>
    `;

    const iframe = frameContainer.querySelector('iframe');
    if (iframe) this.iframes.set(device.id, iframe as HTMLIFrameElement);

    frameContainer.querySelector('.close-btn')?.addEventListener('click', () => this.removeDevice(device.id));
    frameContainer.querySelector('.refresh-btn')?.addEventListener('click', () => this.refreshDevice(device.id));
    frameContainer.querySelector('.rotate-btn')?.addEventListener('click', () => this.rotateDevice(device.id));

    previewArea.appendChild(frameContainer);
  }

  private removeDevice(deviceId: string) {
    this.selectedDevices = this.selectedDevices.filter(d => d.id !== deviceId);
    this.iframes.delete(deviceId);
    const frame = document.querySelector(`[data-device-id="${deviceId}"]`);
    frame?.remove();
    this.updatePreviewLayout();
  }

  private refreshDevice(deviceId: string) {
    const iframe = this.iframes.get(deviceId);
    if (iframe) iframe.src = iframe.src;
  }

  private rotateDevice(deviceId: string) {
    const frame = document.querySelector(`[data-device-id="${deviceId}"] .device-screen`);
    if (!frame) return;
    const prev = this.rotations.get(deviceId) || 0;
    const next = (prev + 90) % 360;
    this.rotations.set(deviceId, next);
    (frame as HTMLElement).style.transform = `rotate(${next}deg)`;
  }

  private getTargetUrl(): string {
    const params = new URLSearchParams(window.location.search);
    return params.get('target') || (document.getElementById('target-url') as HTMLInputElement)?.value || 'http://localhost:8080';
  }

  private getProxyUrl(): string {
    const targetUrl = this.getTargetUrl();
    return `/proxy?target=${encodeURIComponent(targetUrl)}`;
  }

  private updatePreviewLayout() {
    const previewArea = document.getElementById('preview-area');
    if (!previewArea) return;
    const columns = Math.min(this.selectedDevices.length || 1, 4);
    (previewArea as HTMLElement).style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

    const deviceCount = document.getElementById('device-count');
    if (deviceCount) deviceCount.textContent = `${this.selectedDevices.length} devices`;
  }

  private createToolbar() {
    const toolbar = document.createElement('div');
    toolbar.className = 'toolbar';

    toolbar.innerHTML = `
      <div class="toolbar-group">
        <button id="clear-all" class="btn btn-danger"><i class="fas fa-trash"></i> Clear All</button>
        <button id="refresh-all" class="btn btn-secondary"><i class="fas fa-redo-alt"></i> Refresh All</button>
      </div>
      <div class="toolbar-group">
        <select id="device-preset"><option value="">Select Preset...</option><option value="mobile">Mobile Set</option><option value="tablet">Tablet Set</option><option value="responsive">Responsive Set</option></select>
      </div>
      <div class="toolbar-group">
        <label><input type="checkbox" id="throttle-network"> Throttle Network</label>
        <label><input type="checkbox" id="show-grid"> Show Grid</label></div>
    `;

    const previewArea = document.getElementById('preview-area');
    if (previewArea && previewArea.parentNode) {
      previewArea.parentNode.insertBefore(toolbar, previewArea);
    }

    document.getElementById('clear-all')?.addEventListener('click', () => this.clearAllDevices());
    document.getElementById('refresh-all')?.addEventListener('click', () => this.refreshAllDevices());
  }

  private clearAllDevices() {
    this.selectedDevices = [];
    this.iframes.clear();
    const previewArea = document.getElementById('preview-area');
    if (previewArea) previewArea.innerHTML = '';
    this.updatePreviewLayout();
  }

  private refreshAllDevices() {
    this.iframes.forEach(iframe => { iframe.src = iframe.src; });
  }

  private setupEventListeners() {
    window.addEventListener('resize', () => this.updatePreviewLayout());

    // Apply target change
    document.getElementById('apply-target')?.addEventListener('click', () => {
      const t = this.getTargetUrl();
      document.querySelectorAll('#preview-area iframe').forEach((iframe) => {
        (iframe as HTMLIFrameElement).src = `/proxy?target=${encodeURIComponent(t)}`;
      });
    });
  }
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  // ensure Font Awesome CSS is loaded via CDN
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
  document.head.appendChild(link);

  new DeviceEmulator();
});
