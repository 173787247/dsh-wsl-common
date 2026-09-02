# dsh-wsl-common

Shared WSL/Windows helpers for [dsh-wsl-*](https://github.com/173787247?q=dsh-wsl) plugins.

- `lib/wsl-host.js` — `runPowerShell`, `runCmd`, `windowsBin`, `detectWsl`, `distroName`
- `lib/wsl.js` — prompt helpers (`windowsPathRule`, `resolveWindowsUser`, …) and `readWslNetworkingMode`

Plugins vend a copy under their own `lib/` folder. Refresh from this repo:

```sh
node dsh-wsl-kit/scripts/sync-wsl-common.mjs
```

This package is **not** a dsh plugin and is **not** listed in awesome-dsh-plugins.
