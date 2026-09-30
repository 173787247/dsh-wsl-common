# dsh-wsl-common

Shared WSL/Windows helpers for [dsh-wsl-*](https://github.com/173787247?q=dsh-wsl) plugins.

- `lib/wsl-host.js` — `runPowerShell`, `runCmd`, `windowsBin`, `detectWsl`, `distroName`
- `lib/wsl.js` — prompt helpers (`windowsPathRule`, `resolveWindowsUser`, …) and `readWslNetworkingMode`
- `lib/companion_client.js` — Companion protocol v1 HTTP client (`listDevices` / `health` / `invoke`)

Plugins may vend a copy of `wsl-host.js` / `wsl.js` under their own `lib/` folder:

```sh
node dsh-wsl-kit/scripts/sync-wsl-common.mjs
```

Companion plugins should depend on this package and import:

```js
import { health, invoke } from "dsh-wsl-common/companion_client.js";
```

This package is **not** a dsh plugin and is **not** listed in awesome-dsh-plugins.

## Where it sits

Shared library, not a chat plugin. Other plugins vendor a copy of these helpers; the kit install set does not load this package.

```mermaid
flowchart LR
  plugins["other dsh-wsl plugins"] --> lib["dsh-wsl-common"] --> host["WSL and Windows helpers"]
```

Suite diagram and version snapshot: [dsh-wsl-kit](https://github.com/173787247/dsh-wsl-kit#how-the-pieces-fit). This library is **0.2.0** (not in install.sh). Do not copy that matrix into this README.

