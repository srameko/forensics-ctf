# Forensics CTF – Czechitas

A simple CTF application for forensics analysis workshops. Participants enter a nickname and answer questions about Splunk and Volatility. Each correct answer earns points, using a hint deducts half the points for that question. Each question has 3 attempts.

## How to run

Open `index.html` directly in your browser, or use a local server:

```bash
npx serve .
```

## How to add / edit a question

Edit the file `js/questions.js`. Each question looks like this:

```js
{
  id: 'splunk_4',           // unique ID (string)
  text: 'Question text…',   // displayed text
  answerBase64: 'xxx==',    // correct answer encoded in base64
  formatHint: 'e.g. 1234',  // example answer format
  hintText: 'Hint text…',
  points: 10,               // max points; hint deducts points/2
}
```

### How to generate base64 for the answer

Open the browser console (F12) and type:

```js
btoa("correct answer")
```

Copy the result into the `answerBase64` field.

> **Note:** Base64 is not encryption — it only hides answers from being immediately visible. For workshop purposes, this is sufficient.

## Deploying to GitHub Pages

1. Go to **Settings → Pages** in your repository
2. Select **Branch: main**, folder **/ (root)**
3. Save — the app will be available at `https://<your-username>.github.io/forensics-ctf/`


## Tests

```bash
npm install
npm test
```

The tests cover all game logic (`js/game.js`) and question configuration validation (`js/questions.js`).

## Project structure

```
index.html          – SPA, all views
css/style.css       – Czechitas theme
js/
  questions.js      – question configuration (edit here)
  game.js           – pure game logic (no DOM)
  main.js           – DOM logic, state in sessionStorage
tests/
  game.test.js      – unit tests for game logic
  questions.test.js – question configuration validation
```
