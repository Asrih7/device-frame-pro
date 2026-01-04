#!/usr/bin/env node

import { Command } from 'commander';
import open from 'open';
import { startServer } from '../server/index';
import chalk from 'chalk';

const program = new Command();

program
  .name('device-emulator')
  .description('Multi-device emulator for testing web applications')
  .version('1.0.0');

program
  .command('start')
  .description('Start the device emulator server')
  .option('-p, --port <number>', 'Port for the emulator server', '3000')
  .option('-t, --target <url>', 'Target application URL', 'http://localhost:8080')
  .option('-o, --open', 'Open browser automatically', 'true')
  .action(async (options: any) => {
    console.log(chalk.cyan('🚀 Starting Device Emulator...'));

    const port = parseInt(options.port, 10);
    const target = options.target;

    const server = await startServer({ port, targetUrl: target });

    const emulatorUrl = `http://localhost:${port}`;

    console.log(chalk.green(`✅ Emulator server running at ${emulatorUrl}`));
    console.log(chalk.yellow(`🔗 Proxying to: ${target}`));

    if (options.open === 'true' || options.open === true) {
      await open(`${emulatorUrl}?target=${encodeURIComponent(target)}`);
    }
  });

program.parse(process.argv);
