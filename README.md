# Multi Device Emulator

A framework-agnostic device emulator you can add to any web project to preview your running app in multiple device frames (iOS, Android, tablets, desktops).

## Quick start

1. Install as a dev dependency in your project:

```bash
npm install --save-dev device-emulator-tool
```

2. Start your app (e.g., `npm run dev` or `npm start`).

3. Run the emulator (global or npx):

```bash
npx device-emulator start --target http://localhost:3000 --port 4000
# or after installing globally:
# device-emulator start --target http://localhost:3000 --port 4000
```

This opens `http://localhost:4000` and shows a UI where you can add multiple device previews that are proxied to your app (via `/proxy`).

## Developer workflow

- Build (client + server):

```bash
npm run build
```

- Development (runs webpack watch + tsc watch):

```bash
npm run dev
```

- Start the built server:

```bash
npm start
```

## CLI options

- `--port, -p`  : Emulator server port (default: 3000)
- `--target, -t`: Target app URL (default: http://localhost:8080)
- `--open, -o`  : Open browser automatically (default: true)

## Project layout (key files)

- `src/cli` - CLI implementation (TypeScript)
- `src/server` - Express server + proxy, WebSocket hooks
- `src/client` - Client UI (HTML/CSS/TS) built with Webpack
- `src/emulators/devices.ts` - Device presets

## Notes & next steps

This upgrade converts the project to TypeScript, adds a client build via Webpack and improves the UI and device presets. Consider adding features like network throttling, screenshots, console forwarding, and test integration (Cypress/Jest) for a production-ready tool.

