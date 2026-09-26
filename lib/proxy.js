/**
 * Optional HTTPS_PROXY tunnel for companion HTTP (same idea as dsh-wsl-im/lib/proxy.js).
 * Does not hard-depend on https-proxy-agent — falls back to global fetch.
 */

import http from "node:http";
import https from "node:https";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

export function resolveProxyUrl(env = process.env) {
  return String(
    env.HTTPS_PROXY || env.https_proxy || env.HTTP_PROXY || env.http_proxy || "",
  ).trim();
}

export function proxyLabel(env = process.env) {
  return resolveProxyUrl(env) ? "via-proxy" : "direct";
}

function resolveAgent(env = process.env) {
  const proxy = resolveProxyUrl(env);
  if (!proxy) return undefined;
  try {
    const { HttpsProxyAgent } = require("https-proxy-agent");
    return new HttpsProxyAgent(proxy);
  } catch {
    return undefined;
  }
}

function flatHeaders(h) {
  const out = {};
  if (!h) return out;
  if (h instanceof Headers) {
    h.forEach((v, k) => {
      out[k] = v;
    });
    return out;
  }
  for (const [k, v] of Object.entries(h)) {
    if (v != null) out[k] = String(v);
  }
  return out;
}

export async function proxiedFetch(input, init = {}, env = process.env) {
  const agent = resolveAgent(env);
  if (!agent) return fetch(input, init);

  const url = String(input);
  const method = String(init.method || "GET").toUpperCase();
  const headers = flatHeaders(init.headers);
  const body =
    init.body === undefined || init.body === null
      ? undefined
      : Buffer.isBuffer(init.body)
        ? init.body
        : typeof init.body === "string"
          ? Buffer.from(init.body)
          : Buffer.from(String(init.body));
  if (body && !headers["content-length"] && !headers["Content-Length"]) {
    headers["Content-Length"] = String(body.length);
  }
  const signal = init.signal;
  if (signal?.aborted) {
    throw signal.reason instanceof Error ? signal.reason : new Error("aborted");
  }

  return new Promise((resolve, reject) => {
    let settled = false;
    const fail = (err) => {
      if (!settled) {
        settled = true;
        reject(err);
      }
    };
    const ok = (v) => {
      if (!settled) {
        settled = true;
        resolve(v);
      }
    };
    const onAbort = () => fail(signal?.reason instanceof Error ? signal.reason : new Error("aborted"));
    signal?.addEventListener?.("abort", onAbort, { once: true });

    let u;
    try {
      u = new URL(url);
    } catch (e) {
      signal?.removeEventListener?.("abort", onAbort);
      fail(e);
      return;
    }
    const lib = u.protocol === "http:" ? http : https;
    const req = lib.request(
      {
        protocol: u.protocol,
        hostname: u.hostname,
        port: u.port || (u.protocol === "http:" ? 80 : 443),
        path: `${u.pathname}${u.search}`,
        method,
        headers,
        agent,
      },
      (res) => {
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => {
          signal?.removeEventListener?.("abort", onAbort);
          const buf = Buffer.concat(chunks);
          ok(
            new Response(buf, {
              status: res.statusCode || 0,
              statusText: res.statusMessage || "",
              headers: res.headers,
            }),
          );
        });
      },
    );
    req.on("error", (e) => {
      signal?.removeEventListener?.("abort", onAbort);
      fail(e);
    });
    if (body) req.write(body);
    req.end();
  });
}
