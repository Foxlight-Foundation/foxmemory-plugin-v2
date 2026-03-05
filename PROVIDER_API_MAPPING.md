# foxmemory-plugin-v2 provider mapping (upstream semantics -> foxmemory /v2)

Date: 2026-03-04

## Goal
Preserve upstream `openclaw-mem0` plugin semantics while swapping storage provider calls to foxmemory `/v2`.

## Scope mapping
- `scope=session` -> `run_id=ctx.sessionKey`
- `scope=long-term` -> `user_id=<configured user id>`
- `scope=all` -> query both scopes and merge/dedupe by memory id

## Operation mapping
- Add memories (infer lane): `POST /v2/memories`
  - payload includes `messages`, `user_id`/`run_id`, optional upstream-compatible options
- Search memories: `POST /v2/memories/search`
  - payload includes `query`, scope-resolved ids, `top_k`, optional controls
- List memories: `GET /v2/memories`
  - query includes scope-resolved ids and pagination
- Get memory: `GET /v2/memories/:id`
- Delete memory: `DELETE /v2/memories/:id`
- Optional forget-by-query: `POST /v2/memories/forget`

## Response contract target
All `/v2` endpoints should normalize to envelope shape:
- success: `{ ok: true, data, meta? }`
- failure: `{ ok: false, error: { code, message, details? } }`

## Non-goals
- No breaking changes to `/v1` routes during v2 rollout.
- No plugin cutover before side-by-side smoke validation + rollback command confirmation.
