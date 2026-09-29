# CLAUDE.md

## Project overview

Browser-based forensics CTF quiz (Splunk & Volatility scenarios) for a
Czechitas workshop. Static site, no backend — deployed as-is to GitHub Pages.

## Answer checking

Correct answers live in `js/questions.js` as `answerBase64` (base64-encoded,
not encrypted — this only stops a casual "view source" spoiler, not a
determined participant). `js/game.js`'s `checkAnswer` compares input against
the decoded answer, case-insensitive and **ignoring all whitespace**, not
just leading/trailing — e.g. `NTLM v2`, `NTLMv2`, and `ntlm  v2` all match.
This was a deliberate fix (see git history / issue about the `splunk_5`
question): the stricter trim-only comparison rejected the far more common
no-space spelling of a valid answer. Keep this behavior if you touch
`checkAnswer` — a stricter comparison will silently break otherwise-correct
answers for future questions too.

## Tests

`npm test` runs the Vitest suite in `tests/` (`game.test.js`,
`questions.test.js`) — pure logic tests, no DOM/browser needed beyond jsdom.
`.github/workflows/test.yml` runs this on every push and PR; it did not exist
until the suite had already caught a real answer-checking bug that shipped
to production first. Add a test alongside any change to `checkAnswer`,
scoring, or session/attempt tracking in `game.js`.

## GitHub Actions conventions

All actions pinned to commit SHA with a version comment. `step-security/harden-runner` runs first in every job (`egress-policy: audit`).
