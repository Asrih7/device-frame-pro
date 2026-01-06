import express, { Express } from 'express';
import { WebSocketServer, WebSocket } from 'ws';
import { Server } from 'http';
import compression from 'compression';
import cors from 'cors';
import open from 'open';
import QRCode from 'qrcode';
import { DeviceFrameOptions } from '.';
import { getPreviewHTML } from './templates/preview.html';
import { DEVICE_SPECS } from './utils/device-specs';

export class DeviceFrameServer {
  private app: Express;
  private server: Server | null = null;
  private wss: WebSocketServer | null = null;
  private options: Required<DeviceFrameOptions>;
  private connections: Set<WebSocket> = new Set();

  constructor(options: DeviceFrameOptions = {}) {
    this.options = {
      port: options.port || 4300,
      targetUrl: options.targetUrl || 'http://localhost:3000',
      autoOpen: options.autoOpen !== false,
      framework: options.framework || 'auto',
      devices: options.devices || [],
      qrCode: options.qrCode || false,
      performance: options.performance || false,
      screenshots: options.screenshots || false,
      networkThrottle: options.networkThrottle || 'none'
    };

    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
  }

  private setupMiddleware() {
    this.app.use(compression());
    this.app.use(cors());
    this.app.use(express.json());

    // Serve built client assets (dist/client when compiled)
    const clientRoot = require('path').join(__dirname, 'client');
    this.app.use(express.static(clientRoot));

    // Add proxy support so iframe `/proxy?target=` works (overrides default target when provided)
    try {
      // require dynamically so dev environments without the package don't crash at import time
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { createProxyMiddleware } = require('http-proxy-middleware');

      this.app.use('/proxy', (req, res, next) => {
        const target = (req.query && (req.query.target as string)) || this.options.targetUrl;
        const proxy = createProxyMiddleware({
          target,
          changeOrigin: true,
          ws: true,
          logLevel: 'warn',
          pathRewrite: (pathToRewrite: string) => pathToRewrite.replace(/^\/proxy/, '')
        });
        return proxy(req, res, next);
      });
    } catch (err) {
      // If http-proxy-middleware is not installed, provide a graceful message
      console.warn('http-proxy-middleware not available; /proxy endpoint will not work. Install it to enable proxying.');
    }

    // Security headers
    this.app.use((req, res, next) => {
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('X-Frame-Options', 'SAMEORIGIN');
      res.setHeader('X-XSS-Protection', '1; mode=block');
      next();
    });
  }

  private setupRoutes() {
    this.app.get('/', (req, res) => {
      res.send(getPreviewHTML(this.options));
    });

    this.app.get('/api/config', (req, res) => {
      const devices = this.options.devices.length > 0
        ? DEVICE_SPECS.filter(d => this.options.devices.includes(d.id))
        : DEVICE_SPECS;
      res.json({
        targetUrl: this.options.targetUrl,
        framework: this.options.framework,
        devices,
        performance: this.options.performance,
        screenshots: this.options.screenshots,
        networkThrottle: this.options.networkThrottle
      });
    });

    this.app.post('/api/config', (req, res) => {
      if (req.body.targetUrl) {
        this.options.targetUrl = req.body.targetUrl;
      }
      res.json({ success: true });
      this.broadcast({ type: 'config-update', config: this.options });
    });

    this.app.get('/api/qrcode', async (req, res) => {
      try {
        const url = this.options.targetUrl;
        const qr = await QRCode.toDataURL(url, { width: 300, margin: 2, color: { dark: '#667eea', light: '#ffffff' } });
        res.json({ qrCode: qr, url });
      } catch (err) {
        res.status(500).json({ error: 'Failed to generate QR code' });
      }
    });

    this.app.post('/api/screenshot/:deviceId', (req, res) => {
      const { deviceId } = req.params;
      res.json({ success: true, message: `Screenshot captured for ${deviceId}`, filename: `${deviceId}-${Date.now()}.png` });
    });

    this.app.get('/api/metrics', (req, res) => {
      res.json({ activeConnections: this.connections.size, uptime: process.uptime(), memory: process.memoryUsage() });
    });

    this.app.get('/health', (req, res) => {
      res.json({ status: 'ok', version: '1.0.0', framework: this.options.framework });
    });
  }

  private broadcast(message: any) {
    const data = JSON.stringify(message);
    this.connections.forEach(ws => { if (ws.readyState === WebSocket.OPEN) ws.send(data); });
  }

  async start(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.server = this.app.listen(this.options.port, () => {
          this.wss = new WebSocketServer({ server: this.server!, perMessageDeflate: true });

          this.wss.on('connection', (ws: WebSocket) => {
            this.connections.add(ws);
            ws.send(JSON.stringify({ type: 'connected', config: this.options }));
            ws.on('close', () => this.connections.delete(ws));
            ws.on('message', (data: string) => {
              try { const message = JSON.parse(data.toString()); this.handleWebSocketMessage(ws, message); } catch (err) { console.error('WebSocket message error:', err); }
            });
          });

          if (this.options.autoOpen) open(`http://localhost:${this.options.port}`);
          resolve();
        });

        this.server.on('error', reject);
      } catch (err) { reject(err); }
    });
  }

  private handleWebSocketMessage(ws: WebSocket, message: any) {
    switch (message.type) {
      case 'reload': this.broadcast({ type: 'reload-all' }); break;
      case 'screenshot': break;
      case 'performance': break;
    }
  }

  stop() {
    this.connections.forEach(ws => ws.close());
    this.connections.clear();
    if (this.wss) this.wss.close();
    if (this.server) this.server.close();
  }
}

export default DeviceFrameServer;