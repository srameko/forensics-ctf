/**
 * CTF question configuration.
 * To add a question: add an object to the questions array of the relevant module.
 * To generate answerBase64: open browser console and type btoa("your answer")
 *
 * Question fields:
 *   id          – unique string identifier
 *   text        – question text shown to the participant
 *   answerBase64 – btoa(correct answer), case-insensitive comparison
 *   formatHint  – example of the expected answer format, e.g. "e.g. EventID"
 *   hintText    – hint text shown when participant requests a hint
 *   points      – maximum points for this question; hint costs points/2
 */

export const MODULES = [
  {
    id: 'theory',
    title: 'Theory',
    questions: [
      {
        id: 'theory_1',
        text: 'An attacker uses PowerShell to execute malicious commands on a compromised host. What is the MITRE ATT&CK technique ID for this?',
        answerBase64: 'VDEwNTkuMDAx', // T1059.001
        formatHint: 'T####.###',
        hintText: 'Look under "Command and Scripting Interpreter" on attack.mitre.org',
        points: 10,
      },
      {
        id: 'theory_2',
        text: 'How many vertices does the Diamond Model of Intrusion Analysis have?',
        answerBase64: 'NA==', // 4
        formatHint: 'number',
        hintText: 'Think: Adversary, Capability, Infrastructure, Victim',
        points: 10,
      },
      {
        id: 'theory_3',
        text: 'How do you defang the IP address 8.8.8.8?',
        answerBase64: 'OFsuXThbLl04Wy5dOA==', // 8[.]8[.]8[.]8
        formatHint: '. => [.]',
        hintText: 'Replace each dot with [.]',
        points: 10,
      },
      {
        id: 'theory_4',
        text: 'Which framework maps attacker techniques and tactics (used to categorize each step of an attack)?',
        answerBase64: 'TUlUUkUgQVRUJkNL', // MITRE ATT&CK
        formatHint: 'Two words, e.g. NAME FRAMEWORK',
        hintText: 'It is maintained by MITRE — the name includes the word ATT&CK.',
        points: 10,
      },
      {
        id: 'theory_5',
        text: 'What is the defanged form of the URL https://evil.com?',
        answerBase64: 'aHh4cHNbOi8vXWV2aWxbLl1jb20=', // hxxps[://]evil[.]com
        formatHint: 'https:// => hxxps[://], . => [.]',
        hintText: 'Replace "https" with "hxxps", replace "://" with "[://]", replace each dot with "[.]"',
        points: 10,
      },
      {
        id: 'theory_6',
        text: 'You collected a suspicious binary from a compromised system. Which Linux command computes its SHA-256 checksum?',
        answerBase64: 'c2hhMjU2c3Vt', // sha256sum
        formatHint: 'one word, all lowercase',
        hintText: 'Similar commands exist for MD5 (md5sum) and SHA-1 (sha1sum) — same pattern.',
        points: 10,
      },
    ],
  },
  {
    id: 'splunk',
    title: 'Splunk',
    questions: [
    {
        id: 'splunk_1',
        text: 'What EventID corresponds to a failed login in the Windows Event Log?',
        answerBase64: 'NDYyNQ==', // 4625
        formatHint: 'e.g. 1234',
        hintText: 'Look in the "Logon" category – it is a failed logon event.',
        points: 10,
      },
      {
        id: 'splunk_2',
        text: 'How many unique source IP addresses attempted to log in as the user "admin" during the incident?',
        answerBase64: 'MQ==', // 1
        formatHint: 'number, [0-9]',
        hintText: 'Take a look on Events with EventId 4625',
        points: 10,
      },
      {
        id: 'splunk_3',
        text: 'What username was used in the successful login following a series of failed attempts (EventID 4625 → 4624)?',
        answerBase64: 'dmFncmFudA==', // vagrant
        formatHint: 'username, one word',
        hintText: 'Take a look on Events EventId 4625 and 4624, filter by src_ip and username',
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
        hintText: 'Look for the first successful login (EventID 4624) following the brute force attempts.',
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
        text: 'What is Major/Minor version (of the OS)?',
        answerBase64: 'MTUuNzYwMQ==', // 15.7601
        formatHint: '[0-9]{2}\.[0-9]{4}',
        hintText: 'windows.info',
        points: 10,
      },
      {
        id: 'vol_2',
        text: 'What is PPID (Parent Process ID) of the suspicious process?',
        answerBase64: 'MjA4MA==', // 2080
        formatHint: '[0-9]+',
        hintText: 'windows.pslist',
        points: 10,
      },
      {
        id: 'vol_3',
        text: 'What is the SHA256 hash of the suspicious process?',
        answerBase64: 'NDgxZmI3MTM1Y2M2OWI2NzQzNGY4ZWEzMzM3ZTE1YTVjNDg1Y2ZlYmQ2Mzc1YWM1YTY4ZTE5YzExNzE2OTVlYw==', // 481fb7135cc69b67434f8ea3337e15a5c48fbe6c375ac5a68e19c1171695ec
        formatHint: 'SHA256 hash, 64 hex characters',
        hintText: 'windows.dumpfiles',
        points: 10,
      },
      {
        id: 'vol_4',
        text: 'What port number is adversary using for C2 (Command & Control)?',
        answerBase64: 'NDQ0NA==', // 4444
        formatHint: '[0-9]{5}',
        hintText: 'windows.netscan',
        points: 10,
      },
      {
        id: 'vol_5',
        text: 'What threat category is associated with the suspicious process?',
        answerBase64: 'dHJvbWFu', // trojan
        formatHint: 'Use your CTI/OSINT skills',
        hintText: 'virustotal',
        points: 10,
      },
      {
        id: 'vol_6',
        text: 'What (hacking)tool was used by the adversary?',
        answerBase64: 'TWV0YXNwbG9pdA==', // Metasploit
        formatHint: 'Take a look on AV signatures, answer is one word',
        hintText: 'It is part of Kali Linux, one of the most popular frameworks for pentesting/red teaming',
        points: 10,
      },
    ],
  },
];
