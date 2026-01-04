import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import cors from 'cors';
import http from 'http';
import { WebSocketServer } from 'ws';

export interface ServerOptions {
  port: number;
  targetUrl: string;
}

export async function startServer(options: ServerOptions) {
  const port = options.port || 3000;
  const defaultTarget = options.targetUrl || 'http://localhost:3000';

  const app = express();
  app.use(cors());

  // Serve static files from built client (dist/client)
  app.use(express.static(path.join(__dirname, '..', 'client')));

  // Simple healthcheck
  app.get('/__ping', (req, res) => res.json({ ok: true }));

  // Dynamic proxy that uses ?target= to override default target
  app.use('/proxy', (req, res, next) => {
    const targetFromQuery = (req.query && (req.query.target as string)) || undefined;
    const target = targetFromQuery || defaultTarget;

    const proxy = createProxyMiddleware({
      target,
      changeOrigin: true,
      ws: true,
      logLevel: 'warn',
      pathRewrite: (pathToRewrite: string) => pathToRewrite.replace(/^\/proxy/, '')
    });

    return proxy(req, res, next);
  });

  const server = http.createServer(app);

  const wss = new WebSocketServer({ noServer: true });

  server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket as any, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  });

  wss.on('connection', (ws) => {
    console.log('Client connected via WebSocket');

    ws.on('message', (message) => {
      console.log('Received:', message.toString());
    });

    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });

  server.listen(port, () => {
    console.log(`🚀 Emulator UI running at http://localhost:${port}`);
    console.log(`🔗 Default proxy target: ${defaultTarget}`);
  });

  return server;
}

// If run directly (node dist/server/index.js) start server with defaults
if (require.main === module) {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  startServer({ port: parseInt(process.env.PORT || '3000', 10), targetUrl: process.env.TARGET || 'http://localhost:3000' });
}
