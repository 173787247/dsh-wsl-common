# Changelog

## 0.2.1

- Add `lib/proxy.js` (`proxiedFetch` / `proxyLabel`); companion HTTP uses it when `HTTPS_PROXY` is set
  (optional `https-proxy-agent` peer; otherwise global fetch).

## 0.2.0

- Add `lib/companion_client.js` (Companion protocol v1 client: `listDevices` / `resolveDevice` / `health` / `invoke`).
- Export `./companion_client.js` from package.json for `dsh-mac-companion` / `dsh-device-bridge`.

## 0.1.0

- Initial: `wsl-host.js`, `wsl.js`.
