# DeviceFrame Pro (packaged as `device-emulator-tool`)

DeviceFrame Pro is a realistic, high-performance multi-device emulator packaged under **device-emulator-tool** to keep backward compatibility.

## Quick start

1. Install as a dev dependency in your project:

```bash
npm install --save-dev device-emulator-tool
```

2. Start your app (e.g., `npm run dev` or `npm start`).

3. Run the emulator (global or npx):

```bash
npx device-emulator --target http://localhost:3000 --port 4300
# or after installing globally:
# device-emulator --target http://localhost:3000 --port 4300
```

The server will open a browser showing a modern UI with realistic device frames. Use the controls to add devices, update the target URL, generate QR codes, and capture screenshots.

## Developer workflow

- Build (compile TypeScript and copy assets):

```bash
npm run build
```

- Development (watch TypeScript):

```bash
npm run dev
```

- Start the built server:

```bash
npm start
```

## CLI options

- `-p, --port`  : Preview server port (default: 4300)
- `-t, --target`: Target app URL (auto-detected if omitted)
- `--no-open`   : Do not auto-open the browser
- `--qr`        : Generate QR code
- `--perf`      : Enable performance monitoring
- `--screenshots`: Enable screenshots (placeholder implementation)
- `-d, --devices`: Comma-separated device IDs to show by default

## Project layout (key files)

- `src/cli.ts` - CLI implementation (TypeScript)
- `src/server.ts` - Express server + WebSocket + APIs
- `src/templates/preview.html.ts` - HTML UI template
- `src/utils/device-specs.ts` - Device definitions

## Notes

This replacement provides a modern TypeScript implementation named DeviceFrame Pro while preserving the npm package name `device-emulator-tool` and the `device-emulator` CLI command.

If you want me to continue, next I will run `npm install` and `npm run build`, fix any build issues, then commit & push the `feature/deviceframe-pro` branch and open a PR for review.

