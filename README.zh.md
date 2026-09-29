# dsh-wsl-common

[dsh-wsl-*](https://github.com/173787247?q=dsh-wsl) 插件共用的 WSL/Windows 工具库。

- `lib/wsl-host.js` — PowerShell/cmd 调用、`detectWsl` 等
- `lib/wsl.js` — system prompt 用的路径规则、`readWslNetworkingMode`（mirrored/NAT）
- `lib/companion_client.js` — Companion 协议 v1 HTTP 客户端

`wsl-host` / `wsl` 可在各插件 `lib/` 里 vend；Companion 插件建议依赖本包：

```js
import { health, invoke } from "dsh-wsl-common/companion_client.js";
```

```sh
node dsh-wsl-kit/scripts/sync-wsl-common.mjs
```

**不是** dsh 插件，**不进** awesome-dsh-plugins。

## 在套件里的位置

共用库，不是聊天插件。其它插件在自己的 lib/ 里 vend 一份；install.sh 不会加载本包。

```mermaid
flowchart LR
  plugins["其它 dsh-wsl 插件"] --> lib["dsh-wsl-common"] --> host["WSL / Windows 工具"]
```

整套关系图和版本快照：[dsh-wsl-kit 中文说明](https://github.com/173787247/dsh-wsl-kit/blob/master/README.zh.md)。本库是 **0.2.0**（不在 install.sh）。不要把那份总表抄进本 README。

