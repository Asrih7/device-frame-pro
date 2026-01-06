#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import figlet from 'figlet';
import { detectFramework, detectDevServer } from './detector';
import DeviceFrameServer from './server';

const program = new Command();

async function displayBanner() {
  console.log(chalk.cyan(figlet.textSync('DeviceFrame', { font: 'Standard' })));
  console.log(chalk.gray('  Device Emulator - DeviceFrame Pro\n'));
}

async function main() {
  await displayBanner();
  program
    .name('device-emulator')
    .description('DeviceFrame Pro - realistic device emulator')
    .version('1.0.0')
    .option('-p, --port <number>', 'Preview server port', '4300')
    .option('-t, --target <url>', 'Target app URL (auto-detected)')
    .option('-f, --framework <name>', 'Framework')
    .option('--no-open', 'Do not auto-open browser')
    .option('--qr', 'Generate QR code for mobile testing')
    .option('--perf', 'Enable performance monitoring')
    .option('--screenshots', 'Enable screenshot capture')
    .option('-d, --devices <list>', 'Device IDs (comma-separated)')
    .option('--throttle <type>', 'Network throttling: slow3g|fast3g|4g', 'none')
    .action(async (options: any) => {
      try {
        let targetUrl = options.target;
        let frameworkInfo = options.framework;

        if (!frameworkInfo) {
          console.log(chalk.yellow('Detecting framework...'));
          const detected = await detectFramework(process.cwd());
          frameworkInfo = detected.name;
          console.log(chalk.green(`Detected: ${detected.name}${detected.version ? ' v'+detected.version : ''}`));
          if (!targetUrl) {
            targetUrl = await detectDevServer(detected);
          }
        }

        if (!targetUrl) targetUrl = 'http://localhost:3000';
        const devicesList = options.devices ? options.devices.split(',') : undefined;

        const server = new DeviceFrameServer({ port: parseInt(options.port), targetUrl, autoOpen: options.open, framework: frameworkInfo, devices: devicesList, qrCode: options.qr, performance: options.perf, screenshots: options.screenshots, networkThrottle: options.throttle });

        await server.start();
        console.log(chalk.green.bold('\n✓ DeviceFrame Pro is running!'));
        console.log(chalk.cyan('Preview URL: ')+chalk.white.bold(`http://localhost:${options.port}`));
      } catch (err: any) {
        console.error(chalk.red('Error:'), err && err.message);
        process.exit(1);
      }
    });

  program.parse(process.argv);
}

main();
