# Forensics CTF – Czechitas

Jednoduchá CTF aplikace pro workshopy forenzní analýzy. Účastnice zadají nick a odpovídají na otázky ze Splunku a Volatility. Za každou správnou odpověď získají body, za použití nápovědy přijdou o polovinu bodů za danou otázku. Každá otázka má 3 pokusy.

## Jak spustit

Otevři `index.html` přímo v prohlížeči, nebo použij lokální server:

```bash
npx serve .
```

## Jak přidat / upravit otázku

Edituj soubor `js/questions.js`. Každá otázka vypadá takto:

```js
{
  id: 'splunk_4',           // unikátní ID (řetězec)
  text: 'Text otázky…',    // zobrazený text
  answerBase64: 'xxx==',    // správná odpověď zakódovaná v base64
  formatHint: 'např. 1234', // ukázka formátu odpovědi
  hintText: 'Text nápovědy…',
  points: 10,               // max bodů; nápověda odečte points/2
}
```

### Jak vygenerovat base64 pro odpověď

Otevři konzoli prohlížeče (F12) a napiš:

```js
btoa("správná odpověď")
```

Zkopíruj výsledek do pole `answerBase64`.

> **Poznámka:** Base64 není šifrování — slouží jen k tomu, aby odpovědi nebyly okamžitě viditelné. Pro potřeby workshopu je to dostačující.

## Nasazení na GitHub Pages

1. Jdi do **Settings → Pages** v repozitáři
2. Zvol **Branch: main**, složku **/ (root)**
3. Ulož — aplikace bude dostupná na `https://<tvůj-nick>.github.io/forensics-ctf/`

## Testy

```bash
npm install
npm test
```

Testy pokrývají veškerou herní logiku (`js/game.js`) a validaci konfigurace otázek (`js/questions.js`).

## Struktura projektu

```
index.html          – SPA, všechny views
css/style.css       – Czechitas theme
js/
  questions.js      – konfigurace otázek (edituj zde)
  game.js           – čistá herní logika (bez DOM)
  main.js           – DOM logika, stav v sessionStorage
tests/
  game.test.js      – unit testy herní logiky
  questions.test.js – validace konfigurace otázek
```
