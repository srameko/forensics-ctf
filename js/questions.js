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
        formatHint: 'Six words',
        hintText: 'https://www.ultimatewindowssecurity.com/securitylog/encyclopedia/event.aspx?eventID=4625',
        points: 10,
      },
      {
        id: 'splunk_5',
        text: 'When was the host compromised?',
        answerBase64: 'MjAyNS0wMy0yMA==', // 2025-03-20
        formatHint: 'YYYY-MM-DD',
        hintText: '',
        points: 10,
      },
      {
        id: 'splunk_6',
        text: 'How do we call the attack, when passwords (of a user) are being guessed?',
        answerBase64: 'RGljdGlvbmFyeSBhdHRhY2s=', // Dictionary attack
        formatHint: 'Two words',
        hintText: 'Adversary is using known words in a list...',
        points: 10,
      },
      {
        id: 'splunk_7',
        text: 'What LogonType is associated with vagrant user?',
        answerBase64: 'Mg==', // 2
        formatHint: 'Number, ie. 8',
        hintText: 'Take a look into PayloadData2 field',
        points: 10,
      },
      {
        id: 'splunk_8',
        text: 'What IP Address was used by the attacker?',
        answerBase64: 'MTAuMC4zLjU=', // 10.0.3.5
        formatHint: 'IPv4 address',
        hintText: 'Investigate EventId 4624 events',
        points: 10,
      },
      {
        id: 'splunk_9',
        text: 'What name is the executable dropped by the adversary?',
        answerBase64: 'VWlmTHRRcVguZXhl', // UifLqQvX.exe
        formatHint: '[a-zA-Z0-9]+\.exe',
        hintText: 'Look for the persistence mechanism used by the adversary',
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
      {
        id: 'vol_4',
        text: 'What is Major/Minor version (of the OS)?',
        answerBase64: 'MTUuNzYwMQ==', // 15.7601
        formatHint: '[0-9]{2}\.[0-9]{4}',
        hintText: 'windows.info',
        points: 10,
      },
      {
        id: 'vol_5',
        text: 'What is PPID (Parent Process ID) of the suspicious process?',
        answerBase64: 'MjA4MA==', // 2080
        formatHint: '[0-9]+',
        hintText: 'windows.pslist',
        points: 10,
      },
      {
        id: 'vol_6',
        text: 'What is the command line of the suspicious process?',
        answerBase64: 'c2VydmljZSAtYQ==', // service -a
        formatHint: '[a-zA-Z0-9\\-\\_]+',
        hintText: 'windows.pslist',
        points: 10,
      },
      {
        id: 'vol_7',
        text: 'What is the SHA256 hash of the suspicious process?',
        answerBase64: 'NDgxZmI3MTM1Y2M2OWI2NzQzNGY4ZWEzMzM3ZTE1YTVjNDg1Y2ZlYmQ2Mzc1YWM1YTY4ZTE5YzExNzE2OTVlYw==', // 481fb7135cc69b67434f8ea3337e15a5c48fbe6c375ac5a68e19c1171695ec
        formatHint: 'SHA256 hash, 64 hex characters',
        hintText: 'windows.dumpfiles',
        points: 10,
      },
      {
        id: 'vol_8',
        text: 'What port number is adversary using for C2 (Command & Control)?',
        answerBase64: 'NDQ0NA==', // 4444
        formatHint: '[0-9]{5}',
        hintText: 'windows.netscan',
        points: 10,
      },
      {
        id: 'vol_9',
        text: 'What threat category is associated with the suspicious process?',
        answerBase64: 'dHJvbWFu', // trojan
        formatHint: 'Use your CTI/OSINT skills',
        hintText: 'virustotal',
        points: 10,
      },
      {
        id: 'vol_10',
        text: 'What (hacking)tool was used by the adversary?',
        answerBase64: '', // Metasploit
        formatHint: 'Take a look on AV signatures, answer is one word',
        hintText: 'It is part of Kali Linux, one of the most popular frameworks for pentesting/red teaming',
        points: 10,
      },
    ],
  },
];
