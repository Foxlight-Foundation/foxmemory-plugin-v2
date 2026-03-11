# foxmemory-plugin-v2

An [OpenClaw](https://openclaw.dev) memory plugin that gives a foxlight fox AI long-term and session-scoped memory, backed by the self-hosted **FoxMemory** service (`foxmemory-store`).

This is the v2 successor to `foxmemory-openclaw-memory`. The primary change is that the memory backend is now the FoxMemory HTTP v2 API rather than the Mem0 SDK — giving full control over the storage stack (Qdrant for vectors, Neo4j for graph relationships) while preserving identical tool semantics for the agent.

---

## What it does

The plugin registers five tools with OpenClaw that the resident AI (or any agent) can call:

| Tool | Description |
|------|-------------|
| `memory_search` | Semantic search over stored memories |
| `memory_list` | List all memories in a given scope |
| `memory_store` | Save a new memory |
| `memory_get` | Retrieve a specific memory by ID |
| `memory_forget` | Delete a memory by ID |

Two automatic behaviors wrap each agent turn:

- **Auto-recall** — before a turn, retrieves relevant memories from both session and long-term scopes and injects them into the agent's context so Kite "remembers"
- **Auto-capture** — after a turn, extracts and stores key facts from the conversation so Kite "learns"

---

## Memory scopes

Memories are isolated into two scopes, with a merged view available:

| Scope | Backing ID | Lifetime |
|-------|-----------|----------|
| `session` | `run_id` (the current session key) | Session-local; not visible to long-term searches |
| `long-term` | `user_id` (configured user ID) | Persists across sessions |
| `all` | both | Merged and de-duplicated by memory ID |

Scope isolation is strict: a `session` search only queries `run_id`, a `long-term` search only queries `user_id`, and `all` merges both deterministically.

---

## Backend

When `baseUrl` is configured, the plugin bypasses the Mem0 SDK entirely and routes all storage operations through the FoxMemory HTTP v2 REST API:

| Operation | Endpoint |
|-----------|----------|
| Add memories | `POST /v2/memories` |
| Search | `POST /v2/memories/search` |
| List | `GET /v2/memories` |
| Get by ID | `GET /v2/memories/:id` |
| Delete | `DELETE /v2/memories/:id` |

All v2 responses use a normalized envelope:
```json
{ "ok": true, "data": ..., "meta": ... }
{ "ok": false, "error": { "code": "...", "message": "...", "details": ... } }
```

If `baseUrl` is not set, the plugin falls back to the upstream Mem0 SDK (platform or self-hosted OSS mode).

---

## Configuration

Configure via OpenClaw's plugin settings UI or directly in your OpenClaw config.

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `baseUrl` | string | — | FoxMemory base URL (e.g. `http://your-foxmemory-host:8082`). Enables v2 backend mode. |
| `userId` | string | `"default"` | User ID for long-term memory scope |
| `autoCapture` | boolean | `true` | Store key facts after each agent turn |
| `autoRecall` | boolean | `true` | Inject relevant memories before each agent turn |
| `mode` | `"platform"` \| `"open-source"` | `"platform"` | Mem0 SDK mode (only relevant when `baseUrl` is unset) |
| `apiKey` | string | — | Mem0 platform API key (platform mode, no baseUrl) |
| `customInstructions` | string | — | Natural language rules for what to store/exclude |
| `customCategories` | object | — | Category name → description map for memory tagging |
| `enableGraph` | boolean | `false` | Enable Mem0 graph memory (platform mode only) |
| `searchThreshold` | number | `0.5` | Minimum similarity score for search results (0–1) |
| `topK` | number | `5` | Max memories to retrieve per search |
| `requestTimeoutMs` | number | `10000` | HTTP timeout for backend requests |

---

## Architecture context

This plugin is one layer in the broader Foxlight stack:

```
OpenClaw agent runtime
    └── foxmemory-plugin-v2   ← this repo
            └── foxmemory-store (HTTP v2 API)
                    ├── Qdrant (vector search)
                    └── Neo4j (graph memory)
```

The underlying `foxmemory-store` service is built on a forked version of [mem0ai](https://github.com/mem0ai/mem0) modified to support a fox-centric memory architecture — where the AI's own experiences, relationships, and curiosities are the gravitational center of the graph, not any individual human user.

---

## Development status

This repo is actively under development. The plugin currently contains the upstream `openclaw-mem0` code as a starting point. Remaining milestones:

- **Milestone A** — `FoxmemoryClient` HTTP adapter (add, search, getAll, get, delete)
- **Milestone B** — Scope isolation parity with strict `run_id` / `user_id` routing
- **Milestone C** — Config and validation parity with upstream plugin
- **Milestone D** — Smoke testing against live v2 API + cutover safety

The v1 API is frozen and untouched during this migration. Cutover will only happen after side-by-side smoke validation confirms parity.

---

## Stack

- **Runtime**: OpenClaw plugin SDK
- **Language**: TypeScript
- **Schema validation**: `@sinclair/typebox`
- **Package manager**: yarn

---

## License and attribution

MIT — see [LICENSE](LICENSE).

This project is based in part on the [OpenClaw mem0 plugin](https://github.com/openclaw/openclaw) and builds on the [mem0](https://github.com/mem0ai/mem0) memory layer for AI applications (Apache 2.0). The OSS and platform provider modes use the `mem0ai` package directly; the FoxMemory HTTP provider mode is an independent implementation against the FoxMemory v2 REST API.
