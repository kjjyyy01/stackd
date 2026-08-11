# Triage Labels

The skills speak in terms of five canonical triage roles. This file maps those roles to the actual label strings used in this repo's issue tracker.

| Label in mattpocock/skills | Label in our tracker | Meaning                                  |
| -------------------------- | -------------------- | ---------------------------------------- |
| `needs-triage`             | `needs-triage`       | Maintainer needs to evaluate this issue  |
| `needs-info`               | `needs-info`         | Waiting on reporter for more information |
| `ready-for-agent`          | `ready-for-agent`    | Fully specified, ready for an AFK agent  |
| `ready-for-human`          | `ready-for-human`    | Requires human implementation            |
| `wontfix`                  | `wontfix`            | Will not be actioned                     |

When a skill mentions a role (e.g. "apply the AFK-ready triage label"), use the corresponding label string from this table.

## 카테고리 라벨 (triage와 별개 축)

이 repo는 위 **상태(triage) 라벨**과 별개로 **분류(카테고리) 라벨**을 병용한다 (출처: `/Users/jongyeon/kjy/labels.json`). 이슈·PR에는 상태 라벨 1개 + 카테고리 라벨을 함께 붙일 수 있다.

`김종연`(담당자1) / `BugFix` / `Chore` / `Docs` / `Feature` / `Refactor` / `Style` / `Merge` / `Perf`

카테고리 라벨은 triage 역할에 매핑하지 않는다 — 두 축은 대체 관계가 아니다.
