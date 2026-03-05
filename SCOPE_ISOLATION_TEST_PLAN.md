# Scope Isolation Test Plan (plugin-v2)

## Goal
Prove strict separation for:
- session memory (`run_id`)
- long-term memory (`user_id`)
- merged `all`

## Cases
1. Write session marker only, verify:
   - found in `scope=session`
   - not found in `scope=long-term`
2. Write long-term marker only, verify:
   - found in `scope=long-term`
   - not found in `scope=session`
3. Write one marker in each lane, verify:
   - both appear in `scope=all`
   - dedupe stable when identical text appears in both lanes

## Pass Criteria
- zero cross-lane leakage for cases 1 and 2
- deterministic merged output in case 3
