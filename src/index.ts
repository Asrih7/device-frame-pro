import DeviceFrameServer from './server';
import { DEVICE_SPECS, DeviceSpec, getDeviceById, getDevicesByType } from './utils/device-specs';

export interface DeviceFrameOptions {
  port?: number;
  targetUrl?: string;
  autoOpen?: boolean;
  framework?: string;
  devices?: string[];
  qrCode?: boolean;
  performance?: boolean;
  screenshots?: boolean;
  networkThrottle?: 'none' | 'slow3g' | 'fast3g' | '4g';
}

export async function startDeviceFrame(options: DeviceFrameOptions = {}) {
  const server = new DeviceFrameServer(options);
  await server.start();
  return server;
}

export { DeviceFrameServer, DEVICE_SPECS, DeviceSpec, getDeviceById, getDevicesByType };
