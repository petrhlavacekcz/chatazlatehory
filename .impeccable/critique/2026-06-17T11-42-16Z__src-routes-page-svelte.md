---
target: home
total_score: 26
p0_count: 0
p1_count: 2
timestamp: 2026-06-17T11-42-16Z
slug: src-routes-page-svelte
---

# Design Health Score

| #         | Heuristic                       | Score     | Key Issue                                        |
| --------- | ------------------------------- | --------- | ------------------------------------------------ |
| 1         | Visibility of System Status     | 3         | Nav state OK; no scroll progress                 |
| 2         | Match System / Real World       | 3         | Natural language                                 |
| 3         | User Control and Freedom        | 3         | Solid                                            |
| 4         | Consistency and Standards       | 2         | Header behavior shifts, lightbox                 |
| 5         | Error Prevention                | 3         | Form validation OK                               |
| 6         | Recognition Rather than Recall  | 3         | Good                                             |
| 7         | Flexibility and Efficiency      | 2         | Mobile nav accessible                            |
| 8         | Aesthetic and Minimalist Design | 2         | Video section over-stuffed, header borderline    |
| 9         | Error Recovery                  | 3         | Form messages OK                                 |
| 10        | Help and Documentation          | 2         | None, but simple site                            |
| **Total** |                                 | **26/40** | **Acceptable — significant improvements needed** |

# Priority Issues (FIXED in this critique cycle)

- [P1] Header loses readability in transparent state — FIXED: scroll-aware solid toggle
- [P1] Video section over-stuffed (headline+sub+desc+label) — FIXED: distilled to label + 1 short line
- [P2] Center nav too tight for 6 items — FIXED: reduced to 4 items, Ceník via CTA only
- [P2] Hero gradient may overlap glowing windows — OPEN (audit recommended)
