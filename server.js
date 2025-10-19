// server.js
import express from "express";
import fetch from "node-fetch";
import { load } from "cheerio"; // <- fixed ESM import
import rateLimit from "express-rate-limit";
import { URL } from "url";
import dns from "dns/promises";

const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiter
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60
});
app.use(limiter);

// Block private IPs
function isPrivateIP(ip) {
  if (!ip) return false;
  return (
    ip.startsWith("10.") ||
    ip.startsWith("192.168.") ||
    (ip.startsWith("172.") && (() => {
      const second = parseInt(ip.split(".")[1], 10);
      return second >= 16 && second <= 31;
    })())
  );
}

async function resolveHostIsPrivate(hostname) {
  try {
    const addrs = await dns.lookup(hostname, { all: true });
    for (const a of addrs) {
      if (isPrivateIP(a.address)) return true;
    }
    return false;
  } catch {
    return true;
  }
}

// Proxy endpoint
app.get("/proxy", async (req, res) => {
  const raw = req.query.u;
  if (!raw) return res.status(400).send("missing url");

  let target;
  try {
    const decoded = decodeURIComponent(raw);
    target = new URL(decoded);
    if (!["http:", "https:"].includes(target.protocol)) {
      return res.status(400).send("only http/https allowed");
    }
  } catch {
    return res.status(400).send("invalid url");
  }

  if (await resolveHostIsPrivate(target.hostname)) {
    return res.status(403).send("private IPs blocked");
  }

  try {
    const upstreamResp = await fetch(target.toString(), {
      headers: { "User-Agent": req.get("User-Agent") || "ProxyBot/1.0" },
      redirect: "follow"
    });

    const contentType = upstreamResp.headers.get("content-type") || "";

    if (contentType.includes("text/html")) {
      const text = await upstreamResp.text();
      const $ = load(text); // <- use load() from cheerio

      function proxifyAttr(i, attrValue) {
        if (!attrValue) return attrValue;
        try {
          const abs = new URL(attrValue, target).toString();
          return `/proxy?u=${encodeURIComponent(abs)}`;
        } catch {
          return attrValue;
        }
      }

      $("a[href]").each((i, el) => { $(el).attr("href", proxifyAttr(i, $(el).attr("href"))); });
      $("link[href]").each((i, el) => { $(el).attr("href", proxifyAttr(i, $(el).attr("href"))); });
      $("img[src]").each((i, el) => { $(el).attr("src", proxifyAttr(i, $(el).attr("src"))); });
      $("script[src]").each((i, el) => { $(el).attr("src", proxifyAttr(i, $(el).attr("src"))); });
      $("form[action]").each((i, el) => { $(el).attr("action", proxifyAttr(i, $(el).attr("action"))); });

      res.type("html").send($.html());
      return;
    }

    const buffer = await upstreamResp.arrayBuffer();
    res.type(contentType).send(Buffer.from(buffer));
  } catch (err) {
    console.error(err);
    res.status(502).send("upstream error");
  }
});

// Serve static frontend
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Proxy server listening on ${PORT}`);
});
