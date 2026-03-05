# Mem0 Core Memory Operations Coverage (v2 target)

## Goal
Ensure foxmemory `/v2` covers Mem0 core memory operations contract before plugin-v2 cutover.

## Core operations
- [x] Add memory
- [x] Search memories
- [x] List memories
- [x] Get memory by id
- [x] Delete memory by id
- [x] Update memory

## Contract notes
- Keep `/v1` frozen for existing clients.
- Use `/v2` as plugin-v2 target contract.
- Preserve scope behavior (`session`, `long-term`, `all`) via `run_id`/`user_id` mapping.
- Keep rollback path to v1 plugin in config.

## Next implementation checks
- [ ] Wire plugin-v2 adapter to `/v2` routes only
- [ ] Smoke tool surface (`memory_store/search/list/get/forget`) against v2
- [ ] Validate scope parity with run_id + user_id test matrix
