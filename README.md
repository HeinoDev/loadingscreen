# Heino loadingscreen

FiveM loadingscreen for HeinoDev. The UI is Svelte, built with Bun into `web/build`.

## Config

Edit `web/public/config.js`:

- `serverName`: shown as typed
- `brand`: `"logo"` or `"name"`, only one is shown

Images: `web/public/hero/01.webp` to `05.webp`.

## Build

```bash
cd web
bun install
bun run build
```

Commit `web/build` after every build.
