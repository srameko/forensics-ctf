/**
 * CTF question configuration.
 * To add a question: add an object to the questions array of the relevant module.
 * To generate answerBase64: open browser console and type btoa("your answer")
 *
 * Question fields:
 *   id          – unique string identifier
 *   text        – question text shown to the participant
 *   answerBase64 – btoa(correct answer), case-insensitive comparison
 *   formatHint  – example of the expected answer format, e.g. "např. EventID"
 *   hintText    – hint text shown when participant requests a hint
 *   points      – maximum points for this question; hint costs points/2
 */

export const MODULES = [
  {
    id: 'splunk',
    title: 'Splunk',
    questions: [
      {
        id: 'splunk_1',
        text: 'Jaké EventID odpovídá neúspěšnému přihlášení ve Windows Event Logu?',
        answerBase64: 'NDYyNQ==', // 4625
        formatHint: 'např. 1234',
        hintText: 'Hledej v kategorii "Logon" – jde o failed logon event.',
        points: 10,
      },
      {
        id: 'splunk_2',
        text: 'Kolik unikátních zdrojových IP adres se pokusilo přihlásit jako uživatel "admin" během incidentu?',
        answerBase64: 'MQ==', // 1
        formatHint: 'např. 5',
        hintText: 'Použij příkaz `stats dc(src_ip) by user` a filtruj na user="admin".',
        points: 10,
      },
      {
        id: 'splunk_3',
        text: 'Jaké uživatelské jméno bylo použito při úspěšném přihlášení po sérii neúspěšných pokusů (EventID 4625 → 4624)?',
        answerBase64: 'QWRtaW5pc3RyYXRvcg==', // Administrator
        formatHint: 'např. john.doe',
        hintText: 'Seřaď události podle času a hledej přechod z EventID 4625 na 4624 u stejné IP.',
        points: 10,
      },
      {
        id: 'splunk_4',
        text: 'What is EventId 4625?',
        answerBase64: 'QW4gYWNjb3VudCBmYWlsZWQgdG8gbG9nIG9u', // An account failed to log on
        formatHint: 'např. An account ...',
        hintText: 'https://www.ultimatewindowssecurity.com/securitylog/encyclopedia/event.aspx?eventID=4625',
        points: 10,
      },
    ],
  },
  {
    id: 'volatility',
    title: 'Volatility',
    questions: [
      {
        id: 'vol_1',
        text: 'Jaký je profil operačního systému analyzovaného memory dumpu? (výstup příkazu imageinfo)',
        answerBase64: 'V2luWFBTUDJ4ODY=', // WinXPSP2x86
        formatHint: 'např. WinXPSP3x86',
        hintText: 'Spusť `volatility -f dump.mem imageinfo` a podívej se na pole "Suggested Profile(s)".',
        points: 10,
      },
      {
        id: 'vol_2',
        text: 'Jaký podezřelý proces byl spuštěn útočníkem? (název .exe souboru)',
        answerBase64: 'c3ZjaG9zdC5leGU=', // svchost.exe
        formatHint: 'např. malware.exe',
        hintText: 'Použij `volatility pslist` nebo `pstree` a hledej procesy s neobvyklým rodičem nebo cestou.',
        points: 10,
      },
      {
        id: 'vol_3',
        text: 'Jaká IP adresa se nacházela v síťových připojeních podezřelého procesu?',
        answerBase64: 'MTkyLjE2OC4xLjEwNQ==', // 192.168.1.105
        formatHint: 'např. 10.0.0.1',
        hintText: 'Spusť `volatility -f dump.mem --profile=<profil> connections` nebo `netscan`.',
        points: 10,
      },
    ],
  },
];
