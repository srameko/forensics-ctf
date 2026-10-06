# CLAUDE.md

## Project overview

Browser-based forensics CTF quiz (Splunk & Volatility scenarios) for a
Czechitas workshop. Static site, no backend — deployed as-is to GitHub Pages.

## Answer checking

Correct answers live in `js/questions.js` as `answerBase64` (base64-encoded,
not encrypted — this only stops a casual "view source" spoiler, not a
determined participant). `js/game.js`'s `checkAnswer` compares input against the decoded answer, case-insensitive, with leading/trailing whitespace trimmed and runs of inner whitespace collapsed to one space. Spacing is otherwise significant: some answers (e.g. `vol_10`, an executable path plus its argument) must be copied exactly, so the same path with its space dropped must not match. The one exception: when the correct answer is `NTLM v2`, the no-space `NTLMv2` (the far more common spelling) is accepted too. Handle a new spelling variant as an explicit alias for that one answer, not by loosening the comparison for everything.

## Tests

`npm test` runs the Vitest suite in `tests/` (`game.test.js`,
`questions.test.js`) — pure logic tests, no DOM/browser needed beyond jsdom.
`.github/workflows/test.yml` runs this on every push and PR. Add a test alongside any change to `checkAnswer`,
scoring, or session/attempt tracking in `game.js`.

## GitHub Actions conventions

All actions pinned to commit SHA with a version comment. `step-security/harden-runner` runs first in every job (`egress-policy: audit`).
