# dsh-wsl-common

[dsh-wsl-*](https://github.com/173787247?q=dsh-wsl) 插件共用的 WSL/Windows 工具库。

- `lib/wsl-host.js` — PowerShell/cmd 调用、`detectWsl` 等
- `lib/wsl.js` — system prompt 用的路径规则、`readWslNetworkingMode`（mirrored/NAT）

各插件在本地 `lib/` 里 vend 一份副本。从本仓同步：

```sh
node dsh-wsl-kit/scripts/sync-wsl-common.mjs
```

**不是** dsh 插件，**不进** awesome-dsh-plugins。
