#!/usr/bin/env node

// Backwards-compatible shim for old CLI. New CLI is built from TypeScript to dist/cli.
// This file forwards to the compiled CLI if present.
try {
  require('../dist/cli/index.js');
} catch (err) {
  // If dist not present, fall back to the JS server implementation
  const yargs = require('yargs/yargs');
  const { hideBin } = require('yargs/helpers');
  const open = require('open');
  const { startServer } = require('../lib/server');

  const argv = yargs(hideBin(process.argv))
    .usage('Usage: $0 [options]')
    .option('port', { alias: 'p', type: 'number', default: 3000, describe: 'Emulator server port' })
    .option('target', { alias: 't', type: 'string', default: 'http://localhost:3000', describe: "Target app URL" })
    .option('open', { alias: 'o', type: 'boolean', default: true, describe: 'Open the browser' })
    .help()
    .argv;

  const server = startServer({ port: argv.port, target: argv.target });

  if (argv.open) {
    const url = `http://localhost:${argv.port}?target=${encodeURIComponent(argv.target)}`;
    (async () => {
      try {
        await open(url);
      } catch (err) {
        console.warn('Failed to open browser automatically:', err && err.message);
      }
    })();
  }
}
