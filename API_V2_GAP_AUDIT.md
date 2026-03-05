# Foxmemory API v2 Gap Audit

Date: 2026-03-04

## Goal
Define a stable `/v2` API contract for `foxmemory-plugin-v2` while freezing `/v1` for backward compatibility.

## Current State (v1)
- Core endpoints exist: add/search/list/get/delete
- Scope is represented implicitly via `user_id` and `run_id`
- Alias endpoints (`/memory.write`, `/memory.search`, `/memory.raw_write`) exist for compatibility
- `/stats` exists (operational endpoint)

## Gaps to close in `/v2`
1. Consistent response envelopes
2. First-class scope semantics (`session|long-term|all` ergonomics)
3. Option-surface parity for upstream-style semantics
4. OpenAPI contract and migration docs
5. Optional first-class delete-by-query endpoint

## Compatibility Strategy
- Keep `/v1` untouched during rollout.
- Build `foxmemory-plugin-v2` against `/v2` only.
- Enable side-by-side plugin install and cutover via config switch.
- Maintain immediate rollback path.
