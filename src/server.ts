import express, { Express } from 'express';
import { WebSocketServer, WebSocket } from 'ws';
import { Server } from 'http';
import compression from 'compression';
import cors from 'cors';
import open from 'open';
import QRCode from 'qrcode';
import fs from 'fs/promises';
import path from 'path';
import { DeviceFrameOptions } from './index';
import { getPreviewHTML } from './templates/preview.html';
import { DEVICE_SPECS, getDevicesByType, getDeviceById } from './utils/device-specs';

// Declare types for puppeteer
type Browser = any;
type Page = any;

// Try to import puppeteer dynamically
let puppeteer: any = null;
let puppeteerAvailable = false;

try {
  const puppeteerModule = require('puppeteer');
  puppeteer = puppeteerModule;
  puppeteerAvailable = true;
  console.log('✅ Puppeteer loaded successfully');
} catch (error: any) {
  console.warn('⚠️ Puppeteer not available. Screenshot functionality will be disabled.');
  console.warn('To enable screenshots, install puppeteer: npm install puppeteer');
  puppeteerAvailable = false;
}

export class DeviceFrameServer {
  private app: Express;
  private server: Server | null = null;
  private wss: WebSocketServer | null = null;
  private options: Required<DeviceFrameOptions>;
  private connections: Set<WebSocket> = new Set();
  private browser: Browser | null = null;
  private screenshotDir: string = './screenshots';

  constructor(options: DeviceFrameOptions = {}) {
    // ✅ FIX: Enable screenshots by default if puppeteer is available
    const screenshotsEnabled = options.screenshots !== undefined 
      ? options.screenshots && puppeteerAvailable 
      : puppeteerAvailable; // Changed from false to puppeteerAvailable
    
    this.options = {
      port: options.port || 4300,
      targetUrl: options.targetUrl || 'http://localhost:3000',
      autoOpen: options.autoOpen !== false,
      framework: options.framework || 'auto',
      devices: options.devices || [],
      qrCode: options.qrCode || false,
      performance: options.performance || false,
      screenshots: screenshotsEnabled, // ✅ Now enabled by default
      networkThrottle: options.networkThrottle || 'none'
    };

    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
    this.initializeScreenshotDir();
  }

  private async initializeScreenshotDir() {
    if (this.options.screenshots) {
      try {
        await fs.mkdir(this.screenshotDir, { recursive: true });
        console.log(`📸 Screenshot directory created at: ${this.screenshotDir}`);
      } catch (err) {
        console.error('Failed to create screenshot directory:', err);
      }
    }
  }

  private setupMiddleware() {
    this.app.use(compression());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('public'));
    
    // Serve screenshots directory
    this.app.use('/screenshots', express.static(this.screenshotDir));
    
    // Security headers
    this.app.use((req, res, next) => {
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('X-Frame-Options', 'SAMEORIGIN');
      res.setHeader('X-XSS-Protection', '1; mode=block');
      next();
    });
  }

  private setupRoutes() {
    // Main preview page
    this.app.get('/', (req, res) => {
      res.send(getPreviewHTML(this.options));
    });

    // API: Configuration
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
        puppeteerAvailable,
        networkThrottle: this.options.networkThrottle
      });
    });

    // API: Update configuration
    this.app.post('/api/config', (req, res) => {
      if (req.body.targetUrl) {
        this.options.targetUrl = req.body.targetUrl;
      }
      res.json({ success: true });
      this.broadcast({ type: 'config-update', config: this.options });
    });

    // API: QR Code
    this.app.get('/api/qrcode', async (req, res) => {
      try {
        const url = this.options.targetUrl;
        const qr = await QRCode.toDataURL(url, {
          width: 300,
          margin: 2,
          color: {
            dark: '#667eea',
            light: '#ffffff'
          }
        });
        res.json({ qrCode: qr, url });
      } catch (err) {
        res.status(500).json({ error: 'Failed to generate QR code' });
      }
    });

    // API: Screenshot - Handle puppeteer not available
    this.app.post('/api/screenshot/:deviceId', async (req, res) => {
      const { deviceId } = req.params;
      const { fullPage = false, quality = 90 } = req.body;
      
      if (!this.options.screenshots) {
        return res.status(400).json({ 
          success: false, 
          error: 'Screenshots are not enabled. Set screenshots: true in options.' 
        });
      }

      if (!puppeteerAvailable) {
        return res.status(503).json({ 
          success: false, 
          error: 'Puppeteer is not available. Install it with: npm install puppeteer',
          installCommand: 'npm install puppeteer'
        });
      }

      try {
        const device = getDeviceById(deviceId);
        if (!device) {
          return res.status(404).json({ 
            success: false, 
            error: `Device ${deviceId} not found` 
          });
        }

        const result = await this.captureScreenshot(device, fullPage, quality);
        
        res.json({
          success: true,
          message: `Screenshot captured for ${device.name}`,
          filename: result.filename,
          path: result.path,
          url: `/screenshots/${result.filename}`,
          size: result.size,
          dimensions: {
            width: device.width,
            height: device.height
          }
        });
      } catch (err: any) {
        console.error('Screenshot error:', err);
        res.status(500).json({ 
          success: false, 
          error: err.message || 'Failed to capture screenshot' 
        });
      }
    });

    // API: Bulk screenshots - capture all devices
    this.app.post('/api/screenshot/bulk', async (req, res) => {
      const { deviceIds = [], fullPage = false, quality = 90 } = req.body;
      
      if (!this.options.screenshots) {
        return res.status(400).json({ 
          success: false, 
          error: 'Screenshots are not enabled' 
        });
      }

      if (!puppeteerAvailable) {
        return res.status(503).json({ 
          success: false, 
          error: 'Puppeteer is not available. Install it with: npm install puppeteer',
          installCommand: 'npm install puppeteer'
        });
      }

      try {
        const devices = deviceIds.length > 0
          ? deviceIds.map((id: string) => getDeviceById(id)).filter(Boolean)
          : DEVICE_SPECS;

        const results = await Promise.all(
          devices.map((device:any) => 
            this.captureScreenshot(device!, fullPage, quality)
              .catch(err => ({ error: err.message, deviceId: device!.id }))
          )
        );

        const successful = results.filter(r => !('error' in r));
        const failed = results.filter(r => 'error' in r);

        res.json({
          success: true,
          total: devices.length,
          successful: successful.length,
          failed: failed.length,
          results: successful,
          errors: failed
        });
      } catch (err: any) {
        res.status(500).json({ 
          success: false, 
          error: err.message 
        });
      }
    });

    // API: Download screenshot
    this.app.get('/api/screenshot/download/:filename', async (req, res) => {
      const { filename } = req.params;
      const filePath = path.join(this.screenshotDir, filename);
      
      try {
        await fs.access(filePath);
        res.download(filePath, filename);
      } catch (err) {
        res.status(404).json({ 
          success: false, 
          error: 'Screenshot not found' 
        });
      }
    });

    // API: List screenshots
    this.app.get('/api/screenshots', async (req, res) => {
      try {
        const files = await fs.readdir(this.screenshotDir);
        const screenshots = await Promise.all(
          files
            .filter(f => f.endsWith('.png'))
            .map(async (file) => {
              const filePath = path.join(this.screenshotDir, file);
              const stats = await fs.stat(filePath);
              return {
                filename: file,
                url: `/screenshots/${file}`,
                size: stats.size,
                created: stats.birthtime,
                modified: stats.mtime
              };
            })
        );
        
        res.json({ 
          success: true, 
          screenshots: screenshots.sort((a, b) => 
            b.created.getTime() - a.created.getTime()
          )
        });
      } catch (err: any) {
        res.status(500).json({ 
          success: false, 
          error: err.message 
        });
      }
    });

    // API: Delete screenshot
    this.app.delete('/api/screenshot/:filename', async (req, res) => {
      const { filename } = req.params;
      const filePath = path.join(this.screenshotDir, filename);
      
      try {
        await fs.unlink(filePath);
        res.json({ 
          success: true, 
          message: `Screenshot ${filename} deleted` 
        });
      } catch (err: any) {
        res.status(404).json({ 
          success: false, 
          error: 'Screenshot not found' 
        });
      }
    });

    // API: Performance metrics
    this.app.get('/api/metrics', (req, res) => {
      res.json({
        activeConnections: this.connections.size,
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        puppeteerAvailable
      });
    });

    // Health check
    this.app.get('/health', (req, res) => {
      res.json({ 
        status: 'ok',
        version: '1.0.0',
        framework: this.options.framework,
        screenshots: this.options.screenshots,
        puppeteerAvailable,
        browser: this.browser ? 'connected' : 'disconnected'
      });
    });
  }

  /**
   * Capture screenshot of a device using Puppeteer
   */
  private async captureScreenshot(
    device: any, 
    fullPage: boolean = false, 
    quality: number = 90
  ): Promise<{ filename: string; path: string; size: number }> {
    if (!puppeteerAvailable || !puppeteer) {
      throw new Error('Puppeteer is not available. Install it with: npm install puppeteer');
    }

    // Initialize browser if not already running
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: 'new',
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--disable-gpu'
        ]
      });
    }

    const page = await this.browser.newPage();

    try {
      // Set viewport to device dimensions
      await page.setViewport({
        width: device.width,
        height: device.height,
        deviceScaleFactor: device.pixelRatio,
        isMobile: device.type === 'mobile',
        hasTouch: device.type === 'mobile' || device.type === 'tablet'
      });

      // Set user agent
      if (device.userAgent) {
        await page.setUserAgent(device.userAgent);
      }

      // Apply network throttling if configured
      if (this.options.networkThrottle !== 'none') {
        const client = await page.target().createCDPSession();
        await client.send('Network.emulateNetworkConditions', 
          this.getNetworkConditions(this.options.networkThrottle)
        );
      }

      // Navigate to target URL
      await page.goto(this.options.targetUrl, {
        waitUntil: 'networkidle2',
        timeout: 30000
      });

      // Wait a bit for any animations or lazy-loaded content
      await page.waitForTimeout(1000);

      // Generate filename
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `${device.id}-${timestamp}.png`;
      const filepath = path.join(this.screenshotDir, filename);

      // Capture screenshot
      await page.screenshot({
        path: filepath,
        fullPage,
        type: 'png'
      });

      // Get file size
      const stats = await fs.stat(filepath);

      return {
        filename,
        path: filepath,
        size: stats.size
      };
    } finally {
      await page.close();
    }
  }

  /**
   * Get network throttling conditions
   */
  private getNetworkConditions(throttle: string) {
    const conditions: Record<string, any> = {
      'slow3g': {
        offline: false,
        downloadThroughput: (50 * 1024) / 8,
        uploadThroughput: (50 * 1024) / 8,
        latency: 2000
      },
      'fast3g': {
        offline: false,
        downloadThroughput: (1.6 * 1024 * 1024) / 8,
        uploadThroughput: (750 * 1024) / 8,
        latency: 562.5
      },
      '4g': {
        offline: false,
        downloadThroughput: (4 * 1024 * 1024) / 8,
        uploadThroughput: (3 * 1024 * 1024) / 8,
        latency: 20
      },
      'none': {
        offline: false,
        downloadThroughput: -1,
        uploadThroughput: -1,
        latency: 0
      }
    };

    return conditions[throttle] || conditions.none;
  }

  private broadcast(message: any) {
    const data = JSON.stringify(message);
    this.connections.forEach(ws => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(data);
      }
    });
  }

  async start(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.server = this.app.listen(this.options.port, () => {
          // Setup WebSocket
          this.wss = new WebSocketServer({ 
            server: this.server!,
            perMessageDeflate: true
          });
          
          this.wss.on('connection', (ws: WebSocket) => {
            this.connections.add(ws);
            
            ws.send(JSON.stringify({
              type: 'connected',
              config: this.options,
              puppeteerAvailable
            }));
            
            ws.on('close', () => {
              this.connections.delete(ws);
            });
            
            ws.on('message', (data: string) => {
              try {
                const message = JSON.parse(data.toString());
                this.handleWebSocketMessage(ws, message);
              } catch (err) {
                console.error('WebSocket message error:', err);
              }
            });
          });

          console.log(`\n🚀 DeviceFrame Pro Server Started!`);
          console.log(`📱 Preview: http://localhost:${this.options.port}`);
          console.log(`🎯 Target: ${this.options.targetUrl}`);
          console.log(`📸 Screenshots: ${this.options.screenshots ? 'Enabled ✅' : 'Disabled ❌'}`);
          if (!puppeteerAvailable && this.options.screenshots) {
            console.log(`⚠️  Screenshots require puppeteer: npm install puppeteer`);
          }
          console.log(`🌐 Framework: ${this.options.framework}\n`);

          if (this.options.autoOpen) {
            open(`http://localhost:${this.options.port}`);
          }

          resolve();
        });

        this.server.on('error', reject);
      } catch (err) {
        reject(err);
      }
    });
  }

  private handleWebSocketMessage(ws: WebSocket, message: any) {
    switch (message.type) {
      case 'reload':
        this.broadcast({ type: 'reload-all' });
        break;
      case 'screenshot':
        // Handle screenshot request via WebSocket
        if (message.deviceId && puppeteerAvailable) {
          this.captureScreenshot(
            getDeviceById(message.deviceId), 
            message.fullPage, 
            message.quality
          ).then(result => {
            ws.send(JSON.stringify({
              type: 'screenshot-complete',
              result
            }));
          }).catch(err => {
            ws.send(JSON.stringify({
              type: 'screenshot-error',
              error: err.message
            }));
          });
        } else if (!puppeteerAvailable) {
          ws.send(JSON.stringify({
            type: 'screenshot-error',
            error: 'Puppeteer not available. Install with: npm install puppeteer'
          }));
        }
        break;
      case 'performance':
        // Send performance data
        ws.send(JSON.stringify({
          type: 'performance-metrics',
          metrics: {
            activeConnections: this.connections.size,
            uptime: process.uptime(),
            memory: process.memoryUsage(),
            puppeteerAvailable
          }
        }));
        break;
    }
  }

  async stop() {
    console.log('\n🛑 Shutting down DeviceFrame Pro Server...');
    
    // Close WebSocket connections
    this.connections.forEach(ws => ws.close());
    this.connections.clear();
    
    // Close WebSocket server
    if (this.wss) {
      this.wss.close();
    }
    
    // Close HTTP server
    if (this.server) {
      this.server.close();
    }
    
    // Close Puppeteer browser
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
    
    console.log('✅ Server stopped successfully\n');
  }
}