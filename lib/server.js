#!/usr/bin/env node

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const cors = require('cors');

const DEFAULT_PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const DEFAULT_TARGET = process.env.TARGET || 'http://localhost:3000';

function startServer(options = {}) {
  const port = options.port || DEFAULT_PORT;
  const defaultTarget = options.target || DEFAULT_TARGET;

  const app = express();
  app.use(cors());

  // Serve UI
  app.use(express.static(path.join(__dirname, '..', 'public')));

  // Simple ping
  app.get('/__ping', (req, res) => res.json({ ok: true }));

  // Proxy: use query param 'target' if present, otherwise fall back to configured defaultTarget
  // Example: /proxy/path?target=http%3A%2F%2Flocalhost%3A3000
  app.use('/proxy', (req, res, next) => {
    const targetFromQuery = req.query && req.query.target;
    const target = targetFromQuery || defaultTarget;

    // Create and run a proxy for this request (dynamic target)
    const proxy = createProxyMiddleware({
      target,
      changeOrigin: true,
      ws: true,
      logLevel: 'warn',
      pathRewrite: (pathToRewrite, req) => pathToRewrite.replace(/^\/proxy/, '')
    });

    return proxy(req, res, next);
  });

  const server = app.listen(port, () => {
    console.log(`🚀 Emulator UI running at http://localhost:${port}`);
    console.log(`🔗 Default proxy target: ${defaultTarget}`);
  });

  return server;
}

// If this file is invoked directly (node lib/server.js) start server with defaults
if (require.main === module) {
  startServer();
}

module.exports = { startServer };
