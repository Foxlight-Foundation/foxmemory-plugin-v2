# V2 Rollout Principles

1. Keep `/v1` behavior frozen for existing clients.
2. Ship `/v2` with explicit compatibility contract and normalized envelopes.
3. Treat plugin-v2 as an opt-in client of `/v2` only.
4. Use scope semantics explicitly (`session`, `long-term`, `all`) with deterministic mapping.
5. Require smoke evidence before cutover and keep instant rollback to v1.
6. Apply tolerant-reader parsing on v2 client responses: accept additive fields, require only stable core fields for behavior.

Rationale: compatibility-first service evolution (consumer impact minimized) with deliberate migration gates.
