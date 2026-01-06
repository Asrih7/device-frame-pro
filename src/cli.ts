#!/usr/bin/env node
import { Command } from 'commander';
import { DeviceFrameServer } from './server';
import { detectFramework, detectDevServer } from './detector';
import chalk from 'chalk';
import figlet from 'figlet';

const program = new Command();

async function displayBanner() {
  console.log(
    chalk.cyan(
      figlet.textSync('DeviceFrame Pro', {
        font: 'Standard',
        horizontalLayout: 'default'
      })
    )
  );
  console.log(chalk.gray('  Ultimate Device Emulator for Modern Developers\n'));
}

async function main() {
  await displayBanner();
  
  program
    .name('deviceframe')
    .description('🚀 Professional device emulator with realistic frames')
    .version('1.0.0')
    .option('-p, --port <number>', 'Preview server port', '4300')
    .option('-t, --target <url>', 'Target app URL (auto-detected)')
    .option('-f, --framework <name>', 'Framework: react|vue|angular|nextjs|nuxt|svelte|ionic')
    .option('--no-open', 'Do not auto-open browser')
    .option('--qr', 'Generate QR code for mobile testing')
    .option('--perf', 'Enable performance monitoring')
    .option('--screenshots', 'Enable screenshot capture')
    .option('-d, --devices <list>', 'Device IDs (comma-separated)')
    .option('--throttle <type>', 'Network throttling: slow3g|fast3g|4g', 'none')
    .action(async (options) => {
      try {
        let targetUrl = options.target;
        let frameworkInfo = options.framework;

        if (!frameworkInfo) {
          console.log(chalk.yellow('🔍 Auto-detecting framework...'));
          const detected = await detectFramework(process.cwd());
          frameworkInfo = detected.name;
          console.log(chalk.green(`✓ Detected: ${detected.name.toUpperCase()}${detected.version ? ' v' + detected.version : ''}`));
          
          if (!targetUrl) {
            targetUrl = await detectDevServer(detected);
            console.log(chalk.green(`✓ Dev server: ${targetUrl}\n`));
          }
        }

        if (!targetUrl) {
          targetUrl = 'http://localhost:3000';
        }

        const devicesList = options.devices ? options.devices.split(',') : undefined;

        const server = new DeviceFrameServer({
          port: parseInt(options.port),
          targetUrl,
          autoOpen: options.open,
          framework: frameworkInfo,
          devices: devicesList,
          qrCode: options.qr,
          performance: options.perf,
          screenshots: options.screenshots,
          networkThrottle: options.throttle
        });

        await server.start();
        
        console.log(chalk.green.bold('\n✓ DeviceFrame Pro is running!\n'));
        console.log(chalk.cyan('📱 Preview URL:  ') + chalk.white.bold(`http://localhost:${options.port}`));
        console.log(chalk.cyan('🎯 Target App:   ') + chalk.white.bold(targetUrl));
        console.log(chalk.cyan('⚡ Framework:    ') + chalk.white.bold(frameworkInfo.toUpperCase()));
        
        if (options.perf) {
          console.log(chalk.cyan('📊 Performance:  ') + chalk.white.bold('ENABLED'));
        }
        
        if (options.screenshots) {
          console.log(chalk.cyan('📸 Screenshots:  ') + chalk.white.bold('ENABLED'));
        }
        
        console.log(chalk.gray('\n\nKeyboard Shortcuts:'));
        console.log(chalk.gray('  R - Reload all devices'));
        console.log(chalk.gray('  S - Take screenshots'));
        console.log(chalk.gray('  Q - Generate QR code'));
        console.log(chalk.gray('  Ctrl+C - Stop server\n'));
        
      } catch (err: any) {
        console.error(chalk.red('\n❌ Error:'), err.message);
        process.exit(1);
      }
    });

  program.parse();
}

main();