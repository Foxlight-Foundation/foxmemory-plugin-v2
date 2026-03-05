# Core Memory Operations Coverage (Mem0 API parity) — v2 lane

Date: 2026-03-05

## Intent
Ensure foxmemory `/v2` covers Mem0 core memory operations for plugin-v2 cutover without breaking `/v1`.

## Core operations
- Add memories: ✅ `POST /v2/memories`
- Search memories: ✅ `POST /v2/memories/search`
- List memories: ✅ `GET /v2/memories` and `POST /v2/memories/list`
- Get memory by id: ✅ `GET /v2/memories/:id`
- Update memory: ✅ `PUT /v2/memories/:id`
- Delete memory: ✅ `DELETE /v2/memories/:id`

## Notes
- `/v1` remains compatibility lane; plugin-v2 targets `/v2`.
- Keep compatibility semantics explicit: scope mapping via `user_id` (long-term) and `run_id` (session).
- Non-existent delete now returns `404` in `/v2` (normalized API behavior).

## Remaining plugin-side focus
- tighten strict scope-isolation behavior in plugin-v2 provider routing (`session` vs `long-term` vs `all`),
- stabilize timeout/retry behavior for capture lane under transient latency.
