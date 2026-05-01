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
        text: 'What IP address performed the null-session reconnaissance and later brute-force attack?',
        answerBase64: 'MTAuMC4zLjU=', // 10.0.3.5
        formatHint: 'IPv4 address',
        hintText: 'In the 2025-03-20 timeline, follow the same source IP through the null-session events and the brute-force burst.',
        points: 10,
      },
      {
        id: 'splunk_2',
        text: 'Which local account was successfully compromised after the password attack?',
        answerBase64: 'dmFncmFudA==', // vagrant
        formatHint: 'username, one word',
        hintText: 'Find the first successful 4624 event that happens right after the 1,008 failed logons.',
        points: 10,
      },
      {
        id: 'splunk_3',
        text: 'Which Event ID in Windows Security logs represents a failed logon?',
        answerBase64: 'NDYyNQ==', // 4625
        formatHint: 'number, e.g. 4624',
        hintText: 'Check the Appendix Event ID reference or the brute-force rows in the timeline.',
        points: 10,
      },
      {
        id: 'splunk_4',
        text: 'How many failed logon attempts hit the compromised account before the successful login?',
        answerBase64: 'MTAwOA==', // 1008
        formatHint: 'number',
        hintText: 'The brute-force row in the timeline gives the exact total of failed 4625 events.',
        points: 10,
      },
      {
        id: 'splunk_5',
        text: 'Which authentication protocol was used in the successful compromise logon?',
        answerBase64: 'TlRMTSB2Mg==', // NTLM v2
        formatHint: 'protocol name',
        hintText: 'Use the successful compromise row in the timeline. The protocol is written right after Logon Type 3.',
        points: 10,
      },
      {
        id: 'splunk_6',
        text: 'What LogonType was recorded for the successful network logon by the attacker?',
        answerBase64: 'Mw==', // 3
        formatHint: 'number',
        hintText: 'The successful 4624 row already says the logon type in parentheses.',
        points: 10,
      },
      {
        id: 'splunk_7',
        text: 'At what UTC time did the successful compromise logon occur?',
        answerBase64: 'MTI6Mzk6NDYuNzM0', // 12:39:46.734
        formatHint: 'HH:MM:SS.mmm',
        hintText: 'Use the exact timestamp from the successful compromise row, not just the date or rounded second.',
        points: 10,
      },
      {
        id: 'splunk_8',
        text: 'Which Event ID shows that a new Windows service was installed?',
        answerBase64: 'NzA0NQ==', // 7045
        formatHint: 'number',
        hintText: 'The Appendix lists the Event ID for "New service installed," and the post-compromise timeline uses it several times.',
        points: 10,
      },
      {
        id: 'splunk_9',
        text: 'What was the name of the first malicious service installed right after the compromise?',
        answerBase64: 'RFdCc3JOVVJFY01VQVBtQQ==', // DWBsrNUREcMUAPmA
        formatHint: 'service name',
        hintText: 'Under Post-Compromise Activity, pick the first row from the Malicious Services table.',
        points: 10,
      },
      {
        id: 'splunk_10',
        text: 'What was the name of the auto-start service that gave the attacker persistence?',
        answerBase64: 'Z0tJbFlZUUVOVU9M', // gKIlYYQENUOL
        formatHint: 'service name',
        hintText: 'In the Malicious Services table, choose the only service whose Start Type is auto-start.',
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
        text: 'What is the name of the malicious executable that was still running in memory at capture time?',
        answerBase64: 'VWlmTHRRcVguZXhl', // UifLtQqX.exe
        formatHint: 'filename.exe',
        hintText: 'In Memory Analysis, start with the "Confirmed Active Backdoor" section and look for the running executable name.',
        points: 10,
      },
      {
        id: 'vol_2',
        text: 'Which Windows service name launched that persistent backdoor?',
        answerBase64: 'Z0tJbFlZUUVOVU9M', // gKIlYYQENUOL
        formatHint: 'service name',
        hintText: 'Use the same "Confirmed Active Backdoor" table and read the Service name field.',
        points: 10,
      },
      {
        id: 'vol_3',
        text: 'Under which account was the backdoor process running?',
        answerBase64: 'TG9jYWwgU3lzdGVt', // Local System
        formatHint: 'two words',
        hintText: 'The report says the process had the highest Windows privilege level and names the account explicitly.',
        points: 10,
      },
      {
        id: 'vol_4',
        text: 'What was the PID of the parent UifLtQqX.exe process?',
        answerBase64: 'MjA4MA==', // 2080
        formatHint: 'number',
        hintText: 'In the "Confirmed Active Backdoor" table, use the value shown next to PID (parent).',
        points: 10,
      },
      {
        id: 'vol_5',
        text: 'What was the PID of the active child beacon process at the time of memory capture?',
        answerBase64: 'NTM5Ng==', // 5396
        formatHint: 'number',
        hintText: 'Use the child PID tied to the ESTABLISHED connection in the Live C2 Session table.',
        points: 10,
      },
      {
        id: 'vol_6',
        text: 'Which remote IP address was the live beacon connected to at capture time?',
        answerBase64: 'MTAuMC4zLjU=', // 10.0.3.5
        formatHint: 'IPv4 address',
        hintText: 'In the ESTABLISHED connection, use the destination side of 10.0.3.4:49390 -> ??.',
        points: 10,
      },
      {
        id: 'vol_7',
        text: 'Which remote TCP port was used by the live C2 connection?',
        answerBase64: 'NDQ0NA==', // 4444
        formatHint: 'port number',
        hintText: 'Use the destination port from the same ESTABLISHED connection; the report notes it is Metasploit\'s default listener.',
        points: 10,
      },
      {
        id: 'vol_8',
        text: 'Which malware framework did the memory evidence identify?',
        answerBase64: 'TWV0ZXJwcmV0ZXI=', // Meterpreter
        formatHint: 'one word',
        hintText: 'The YARA rule name includes "meterpreter_reverse_tcp_shellcode". Use the payload name, not the full rule.',
        points: 10,
      },
      {
        id: 'vol_9',
        text: 'What suspicious file was executed from the vagrant user\'s Downloads folder shortly before the dump?',
        answerBase64: 'd2luZG93c191cGRhdGUuZXhl', // windows_update.exe
        formatHint: 'filename.exe',
        hintText: 'Look for the shimcache entry at 11:30:18 UTC in the "New Indicator" section.',
        points: 10,
      },
      {
        id: 'vol_10',
        text: 'What binary path was configured for the persistent service backdoor?',
        answerBase64: 'QzpcV2luZG93c1xURU1QXFVpZkx0UXFYLmV4ZSBER0h0', // C:\Windows\TEMP\UifLtQqX.exe DGHt
        formatHint: 'full Windows path',
        hintText: 'Copy the Binary path exactly from the "Confirmed Active Backdoor" table, including the extra argument after the EXE name.',
        points: 10,
      },
    ],
  },
];
