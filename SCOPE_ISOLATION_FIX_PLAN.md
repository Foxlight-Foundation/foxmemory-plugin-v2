# Scope Isolation Fix Plan (plugin-v2)

## Problem
Session and long-term recalls can leak across scopes in some flows.

## Desired behavior
- `scope=session` => query with `run_id` only
- `scope=long-term` => query with `user_id` only
- `scope=all` => merge session+long-term and de-dup deterministically

## Patch steps
1. Enforce strict id routing in provider methods (`search`, `getAll`, `add` where applicable).
2. Add guard rails that reject ambiguous scope+id combinations.
3. Add smoke tests:
   - write session marker, verify absent from long-term search
   - write long-term marker, verify absent from session search
   - verify scope=all returns both

## Done criteria
- Scope leakage tests pass twice in a row against live R720 API.
- Dashboard scope views align with tool-level scope results.
