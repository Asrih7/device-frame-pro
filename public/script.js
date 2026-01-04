const devices = [
  { id: 'iphone-14', name: 'iPhone 14', width: 390, height: 844 },
  { id: 'pixel-7', name: 'Pixel 7', width: 412, height: 915 },
  { id: 'ipad-pro', name: 'iPad Pro', width: 1024, height: 1366 },
  { id: 'desktop', name: 'Desktop 1920x1080', width: 1920, height: 1080 }
];

const deviceListEl = document.getElementById('device-list');
const previewArea = document.getElementById('preview-area');
const deviceCount = document.getElementById('device-count');
const targetInput = document.getElementById('target-url');
const applyTargetBtn = document.getElementById('apply-target');

let selectedDevices = [];

function renderDeviceList() {
  deviceListEl.innerHTML = '';
  devices.forEach(d => {
    const el = document.createElement('div');
    el.className = 'device-card';
    el.innerHTML = `<div><strong>${d.name}</strong><div style="font-size:12px;color:#666">${d.width} × ${d.height}</div></div><div><button data-id="${d.id}">Add</button></div>`;

    el.querySelector('button').addEventListener('click', () => addDevice(d));
    deviceListEl.appendChild(el);
  });
}

function addDevice(device) {
  if (selectedDevices.find(d => d.id === device.id)) return;
  selectedDevices.push(device);
  createDeviceFrame(device);
  updateDeviceCount();
}

function createDeviceFrame(device) {
  const frame = document.createElement('div');
  frame.className = 'device-frame';
  frame.dataset.deviceId = device.id;

  const target = getTargetUrl();
  const proxyUrl = `/proxy?target=${encodeURIComponent(target)}`; // default to root

  frame.innerHTML = `
    <div class="device-header">
      <div>${device.name}</div>
      <div><button class="remove">Remove</button></div>
    </div>
    <div class="device-screen">
      <iframe src="${proxyUrl}" title="${device.name}"></iframe>
    </div>
  `;

  frame.querySelector('.remove').addEventListener('click', () => removeDevice(device.id));
  previewArea.appendChild(frame);
}

function removeDevice(id) {
  selectedDevices = selectedDevices.filter(d => d.id !== id);
  const el = previewArea.querySelector(`[data-device-id="${id}"]`);
  if (el) el.remove();
  updateDeviceCount();
}

function clearAll() {
  selectedDevices = [];
  previewArea.innerHTML = '';
  updateDeviceCount();
}

function refreshAll() {
  previewArea.querySelectorAll('iframe').forEach(f => (f.src = f.src));
}

function updateDeviceCount() {
  deviceCount.textContent = `${selectedDevices.length} device(s)`;
}

function getTargetUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('target') || targetInput.value || 'http://localhost:3000';
}

applyTargetBtn.addEventListener('click', () => {
  // refresh all frames to point to new target
  const t = getTargetUrl();
  previewArea.querySelectorAll('iframe').forEach(iframe => {
    iframe.src = `/proxy?target=${encodeURIComponent(t)}`;
  });
});

// toolbar buttons
document.getElementById('clear-all').addEventListener('click', clearAll);
document.getElementById('refresh-all').addEventListener('click', refreshAll);

// init
renderDeviceList();
updateDeviceCount();

// Support adding device via query param ?add=iphone-14
(function addFromQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  const add = urlParams.get('add');
  if (add) {
    const d = devices.find(x => x.id === add);
    if (d) addDevice(d);
  }
})();
