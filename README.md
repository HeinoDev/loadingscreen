# Heino loadingscreen

FiveM loadingscreen for HeinoDev. The UI is Svelte, built with Bun into `web/build`.

## Setup

```bash
cd web
bun install
```

- `bun run dev` builds, rebuilds on every change, and serves the page at http://localhost:3000
- `bun run build` writes a fresh `web/build`

The server loads `web/build`, so run `bun run build` and commit `web/build` after every change.

## Previewing in the browser

Outside FiveM the page runs a mock loading sequence and then shows the join prompt, so you can see every state without a server. Inside FiveM the real events are used instead.

## Layout

- `web/index.html`: page shell
- `web/src/`: Svelte app. `App.svelte` is the layout, `Slideshow.svelte` the background, `Status.svelte` the status line and join prompt, `loader.js` the FiveM events, `app.css` colours and font
- `web/public/`: copied into the build as-is. `config.js` holds the server name and brand, `hero/` the slideshow images (`01.webp` to `05.webp`)
- `web/build.js`: production build. `web/dev.js`: dev server with rebuild

`client.lua` and `fxmanifest.lua` handle the join flow and sit outside the UI.

## Config

Edit `web/public/config.js`, then run `bun run build`:

- `serverName`: any text, shown as typed
- `brand`: `"logo"` shows the logo, `"name"` shows the server name. Only one of them is shown.
