# foxmemory-plugin-v2 Implementation Backlog

## Objective
Port upstream `openclaw-mem0` semantics while swapping backend calls to foxmemory `/v2` API.

## Milestone A — Provider Adapter (required)
- [ ] Add `FoxmemoryClient` wrapper with normalized response parsing (`ok/data/error`)
- [ ] Implement `add(messages, scope, options)` -> `POST /v2/memories`
- [ ] Implement `search(query, scope, topK, threshold, options)` -> `POST /v2/memories/search`
- [ ] Implement `getAll(scope, pageSize)` -> `GET /v2/memories`
- [ ] Implement `get(memoryId)` -> `GET /v2/memories/:id`
- [ ] Implement `delete(memoryId)` -> `DELETE /v2/memories/:id`

## Milestone B — Scope Parity
- [ ] Preserve `session | long-term | all` behavior exactly as upstream
- [ ] Map `session` -> `run_id`, `long-term` -> `user_id`, `all` -> merged query strategy
- [ ] Add deterministic merge/dedupe for `all` reads

## Milestone C — Config + Validation Parity
- [ ] Preserve upstream config keys, defaults, and allowlist validation
- [ ] Keep defaults for custom instructions/categories
- [ ] Keep strict unknown-key rejection in plugin options

## Milestone D — Cutover Safety
- [ ] Smoke test tool calls (`memory_search/store/list/get/forget`) against `/v2`
- [ ] Add rollback note (switch plugin id/config back to v1 lane)
- [ ] Capture known-good config snapshot
