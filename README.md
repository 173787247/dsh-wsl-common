# dsh-wsl-common

Shared WSL/Windows helpers for [dsh-wsl-*](https://github.com/173787247?q=dsh-wsl) plugins.

- `lib/wsl-host.js` — `runPowerShell`, `runCmd`, `windowsBin`, `detectWsl`, `distroName`
- `lib/wsl.js` — prompt helpers (`windowsPathRule`, `resolveWindowsUser`, …) and `readWslNetworkingMode`

Plugins vend a copy under their own `lib/` folder. Refresh from this repo:

```sh
node dsh-wsl-kit/scripts/sync-wsl-common.mjs
```

This package is **not** a dsh plugin and is **not** listed in awesome-dsh-plugins.

## Where it sits

Shared library, not a chat plugin. Other plugins vendor a copy of these helpers; the kit install set does not load this package.

```mermaid
flowchart LR
  plugins["other dsh-wsl plugins"] --> lib["dsh-wsl-common"] --> host["WSL and Windows helpers"]
```

Suite diagram and version snapshot: [dsh-wsl-kit](https://github.com/173787247/dsh-wsl-kit#how-the-pieces-fit). This plugin is **0.1.0** (library, not in install.sh). Do not copy that matrix into this README.

