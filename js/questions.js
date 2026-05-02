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
 *   solution    – optional query/solution text revealed after correct answer
 *                 or after max failed attempts
 *   explanation – brief why-the-answer-is-correct note shown with solution
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
        explanation: 'PowerShell is a sub-technique of Command and Scripting Interpreter in ATT&CK, and that sub-technique ID is T1059.001.',
        points: 10,
      },
      {
        id: 'theory_2',
        text: 'How many vertices does the Diamond Model of Intrusion Analysis have?',
        answerBase64: 'NA==', // 4
        formatHint: 'number',
        hintText: 'Think: Adversary, Capability, Infrastructure, Victim',
        explanation: 'The Diamond Model is defined by four core vertices: Adversary, Capability, Infrastructure, and Victim.',
        points: 10,
      },
      {
        id: 'theory_3',
        text: 'How do you defang the IP address 8.8.8.8?',
        answerBase64: 'OFsuXThbLl04Wy5dOA==', // 8[.]8[.]8[.]8
        formatHint: '. => [.]',
        hintText: 'Replace each dot with [.]',
        explanation: 'Defanging an IP replaces each dot with [.] so the value is readable but not treated as an active indicator.',
        points: 10,
      },
      {
        id: 'theory_4',
        text: 'Which framework maps attacker techniques and tactics (used to categorize each step of an attack)?',
        answerBase64: 'TUlUUkUgQVRUJkNL', // MITRE ATT&CK
        formatHint: 'Two words, e.g. NAME FRAMEWORK',
        hintText: 'It is maintained by MITRE — the name includes the word ATT&CK.',
        explanation: 'MITRE ATT&CK is the framework used to map adversary behavior into tactics and techniques.',
        points: 10,
      },
      {
        id: 'theory_5',
        text: 'What is the defanged form of the URL https://evil.com?',
        answerBase64: 'aHh4cHNbOi8vXWV2aWxbLl1jb20=', // hxxps[://]evil[.]com
        formatHint: 'https:// => hxxps[://], . => [.]',
        hintText: 'Replace "https" with "hxxps", replace "://" with "[://]", replace each dot with "[.]"',
        explanation: 'Proper URL defanging keeps the IOC readable while preventing accidental clicks by changing protocol and dots.',
        points: 10,
      },
      {
        id: 'theory_6',
        text: 'You collected a suspicious binary from a compromised system. Which Linux command computes its SHA-256 checksum?',
        answerBase64: 'c2hhMjU2c3Vt', // sha256sum
        formatHint: 'one word, all lowercase',
        hintText: 'Similar commands exist for MD5 (md5sum) and SHA-1 (sha1sum) — same pattern.',
        explanation: 'The standard Linux utility for SHA-256 hashing is sha256sum, which outputs a reproducible file digest.',
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
        explanation: 'The same source IP appears in both anonymous reconnaissance and subsequent 4625 brute-force activity, linking both phases to one host.',
        solution: `index=* Channel=Security EventId=4625 PayloadData2="LogonType 3" TimeCreated="2025-03-20*"\n| rex field=RemoteHost "\\((?P<src_ip>[^)]+)\\)"\n| stats count BY src_ip\n\nTop source IP: 10.0.3.5`,
        points: 10,
      },
      {
        id: 'splunk_2',
        text: 'Which local account was successfully compromised after the password attack?',
        answerBase64: 'dmFncmFudA==', // vagrant
        formatHint: 'username, one word',
        hintText: 'Find the first successful 4624 event that happens right after the 1,008 failed logons.',
        explanation: 'The first successful network logon after the failure burst targets the local account vagrant, identifying the compromised user.',
        solution: `index=* Channel=Security EventId=4624 PayloadData2="LogonType 3" RemoteHost="*10.0.3.5*" NOT PayloadData1="*ANONYMOUS LOGON*"\n| sort TimeCreated\n| head 1\n| table TimeCreated PayloadData1\n\nCompromised account: vagrant`,
        points: 10,
      },
      {
        id: 'splunk_3',
        text: 'Which Event ID in Windows Security logs represents a failed logon?',
        answerBase64: 'NDYyNQ==', // 4625
        formatHint: 'number, e.g. 4624',
        hintText: 'Check the Appendix Event ID reference or the brute-force rows in the timeline.',
        explanation: 'In Windows Security auditing, Event ID 4625 is specifically generated for failed logon attempts.',
        solution: `index=* Channel=Security Keywords="Audit failure" MapDescription="Failed logon"\n| stats count BY EventId\n\nFailed logon Event ID: 4625`,
        points: 10,
      },
      {
        id: 'splunk_4',
        text: 'How many failed logon attempts hit the compromised account before the successful login?',
        answerBase64: 'MTAwOA==', // 1008
        formatHint: 'number',
        hintText: 'The brute-force row in the timeline gives the exact total of failed 4625 events.',
        explanation: 'Counting attacker-sourced 4625 events for vagrant before the first success yields exactly 1008 failed attempts.',
        solution: `index=* Channel=Security EventId=4625 PayloadData2="LogonType 3" RemoteHost="*10.0.3.5*" PayloadData1="*vagrant*" TimeCreated="2025-03-20*"\n| stats count AS total_failures\n\nTotal failed attempts: 1008`,
        points: 10,
      },
      {
        id: 'splunk_5',
        text: 'Which authentication protocol was used in the successful compromise logon?',
        answerBase64: 'TlRMTSB2Mg==', // NTLM v2
        formatHint: 'protocol name',
        hintText: 'Use the successful compromise row in the timeline. The protocol is written right after Logon Type 3.',
        explanation: 'The successful 4624 event payload includes LmPackageName showing NTLM V2, which identifies the auth protocol version used.',
        solution: `index=* Channel=Security EventId=4624 PayloadData2="LogonType 3" RemoteHost="*10.0.3.5*" PayloadData1="*vagrant*"\n| rex field=Payload "LmPackageName[^}]+?\"#text\":\"(?P<LmPackage>[^\"]+)\""\n| sort TimeCreated\n| head 1\n| table TimeCreated LmPackage\n\nAuth protocol: NTLM V2`,
        points: 10,
      },
      {
        id: 'splunk_6',
        text: 'What LogonType was recorded for the successful network logon by the attacker?',
        answerBase64: 'Mw==', // 3
        formatHint: 'number',
        hintText: 'The successful 4624 row already says the logon type in parentheses.',
        explanation: 'The compromise event is a network logon, and Windows records network logons as LogonType 3.',
        solution: `index=* Channel=Security EventId=4624 RemoteHost="*10.0.3.5*" PayloadData1="*vagrant*"\n| sort TimeCreated\n| head 1\n| table TimeCreated PayloadData2\n\nLogonType: 3`,
        points: 10,
      },
      {
        id: 'splunk_7',
        text: 'At what UTC time did the successful compromise logon occur?',
        answerBase64: 'MTI6Mzk6NDYuNzM0', // 12:39:46.734
        formatHint: 'HH:MM:SS.mmm',
        hintText: 'Use the exact timestamp from the successful compromise row, not just the date or rounded second.',
        explanation: 'The first successful attacker 4624 record has TimeCreated at 12:39:46.734 UTC, which marks initial compromise success.',
        solution: `index=* Channel=Security EventId=4624 PayloadData2="LogonType 3" RemoteHost="*10.0.3.5*" PayloadData1="Target: VAGRANT-2008R2\\vagrant"\n| sort TimeCreated\n| head 1\n| table TimeCreated RecordNumber\n\nUTC time: 12:39:46.734`,
        points: 10,
      },
      {
        id: 'splunk_8',
        text: 'Which Event ID shows that a new Windows service was installed?',
        answerBase64: 'NzA0NQ==', // 7045
        formatHint: 'number',
        hintText: 'The Appendix lists the Event ID for "New service installed," and the post-compromise timeline uses it several times.',
        explanation: 'Windows logs new service installations in System channel as Event ID 7045 from Service Control Manager.',
        solution: `index=* Channel=System MapDescription="A new service was installed in the system"\n| stats count BY EventId Provider\n\nService install Event ID: 7045`,
        points: 10,
      },
      {
        id: 'splunk_9',
        text: 'What was the name of the first malicious service installed right after the compromise?',
        answerBase64: 'RFdCc3JOVVJFY01VQVBtQQ==', // DWBsrNUREcMUAPmA
        formatHint: 'service name',
        hintText: 'Under Post-Compromise Activity, pick the first row from the Malicious Services table.',
        explanation: 'Sorting 7045 events after compromise shows DWBsrNUREcMUAPmA as the earliest malicious service created.',
        solution: `index=* Channel=System EventId=7045 (TimeCreated="2025-03-20T12:39:4*" OR TimeCreated="2025-03-20T12:4*")\n| sort TimeCreated\n| head 1\n| table TimeCreated PayloadData1\n\nFirst malicious service: DWBsrNUREcMUAPmA`,
        points: 10,
      },
      {
        id: 'splunk_10',
        text: 'What was the name of the auto-start service that gave the attacker persistence?',
        answerBase64: 'Z0tJbFlZUUVOVU9M', // gKIlYYQENUOL
        formatHint: 'service name',
        hintText: 'In the Malicious Services table, choose the only service whose Start Type is auto-start.',
        explanation: 'Only gKIlYYQENUOL is configured as auto start, so it persists through reboot and provides persistence.',
        solution: `index=* Channel=System EventId=7045 PayloadData2="StartType: auto start" PayloadData3="Account: LocalSystem" TimeCreated="2025-03-20*"\n| table TimeCreated PayloadData1 PayloadData2\n\nPersistence service: gKIlYYQENUOL`,
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
        explanation: 'The process list at capture time shows UifLtQqX.exe active in memory, confirming it as the running malicious executable.',
        solution: `vol -f VAGRANT-2008R2-20250321-113332.dmp windows.pslist\n\nLook for suspicious process name in active list: UifLtQqX.exe`,
        points: 10,
      },
      {
        id: 'vol_2',
        text: 'Which Windows service name launched that persistent backdoor?',
        answerBase64: 'Z0tJbFlZUUVOVU9M', // gKIlYYQENUOL
        formatHint: 'service name',
        hintText: 'Use the same "Confirmed Active Backdoor" table and read the Service name field.',
        explanation: 'Service metadata links the malicious binary to the display name gKIlYYQENUOL, identifying the launcher service.',
        solution: `vol -f VAGRANT-2008R2-20250321-113332.dmp windows.svcscan\n\nService display name tied to backdoor binary: gKIlYYQENUOL`,
        points: 10,
      },
      {
        id: 'vol_3',
        text: 'Under which account was the backdoor process running?',
        answerBase64: 'TG9jYWwgU3lzdGVt', // Local System
        formatHint: 'two words',
        hintText: 'The report says the process had the highest Windows privilege level and names the account explicitly.',
        explanation: 'The service context indicates the backdoor runs under Local System, which is the highest local Windows privilege context.',
        solution: `vol -f VAGRANT-2008R2-20250321-113332.dmp windows.svcscan\n\nCheck service security context/account: Local System`,
        points: 10,
      },
      {
        id: 'vol_4',
        text: 'What was the PID of the parent UifLtQqX.exe process?',
        answerBase64: 'MjA4MA==', // 2080
        formatHint: 'number',
        hintText: 'In the "Confirmed Active Backdoor" table, use the value shown next to PID (parent).',
        explanation: 'Process tree correlation shows the parent backdoor process as PID 2080, from which child beacon processes were spawned.',
        solution: `vol -f VAGRANT-2008R2-20250321-113332.dmp windows.pslist\nvol -f VAGRANT-2008R2-20250321-113332.dmp windows.pstree\n\nParent PID for UifLtQqX.exe: 2080`,
        points: 10,
      },
      {
        id: 'vol_5',
        text: 'What was the PID of the active child beacon process at the time of memory capture?',
        answerBase64: 'NTM5Ng==', // 5396
        formatHint: 'number',
        hintText: 'Use the child PID tied to the ESTABLISHED connection in the Live C2 Session table.',
        explanation: 'The active ESTABLISHED C2 socket maps to PID 5396, making it the live beacon process at capture time.',
        solution: `vol -f VAGRANT-2008R2-20250321-113332.dmp windows.netscan\n\nPID with ESTABLISHED C2 session to attacker: 5396`,
        points: 10,
      },
      {
        id: 'vol_6',
        text: 'Which remote IP address was the live beacon connected to at capture time?',
        answerBase64: 'MTAuMC4zLjU=', // 10.0.3.5
        formatHint: 'IPv4 address',
        hintText: 'In the ESTABLISHED connection, use the destination side of 10.0.3.4:49390 -> ??.',
        explanation: 'The live socket shows local host 10.0.3.4 communicating with remote endpoint 10.0.3.5, identifying attacker infrastructure.',
        solution: `vol -f VAGRANT-2008R2-20250321-113332.dmp windows.netscan\n\nFrom 10.0.3.4:49390 ESTABLISHED -> remote 10.0.3.5:4444`,
        points: 10,
      },
      {
        id: 'vol_7',
        text: 'Which remote TCP port was used by the live C2 connection?',
        answerBase64: 'NDQ0NA==', // 4444
        formatHint: 'port number',
        hintText: 'Use the destination port from the same ESTABLISHED connection; the report notes it is Metasploit\'s default listener.',
        explanation: 'Netscan reports the remote side as :4444, which is the C2 listener port used by the active beacon session.',
        solution: `vol -f VAGRANT-2008R2-20250321-113332.dmp windows.netscan\n\nRemote C2 port in ESTABLISHED session: 4444`,
        points: 10,
      },
      {
        id: 'vol_8',
        text: 'Which malware framework did the memory evidence identify?',
        answerBase64: 'TWV0ZXJwcmV0ZXI=', // Meterpreter
        formatHint: 'one word',
        hintText: 'The YARA rule name includes "meterpreter_reverse_tcp_shellcode". Use the payload name, not the full rule.',
        explanation: 'Malfind plus YARA signature meterpreter_reverse_tcp_shellcode indicates the payload framework is Meterpreter.',
        solution: `vol -f VAGRANT-2008R2-20250321-113332.dmp windows.malfind\n\nYARA hit: meterpreter_reverse_tcp_shellcode -> framework: Meterpreter`,
        points: 10,
      },
      {
        id: 'vol_9',
        text: 'What suspicious file was executed from the vagrant user\'s Downloads folder shortly before the dump?',
        answerBase64: 'd2luZG93c191cGRhdGUuZXhl', // windows_update.exe
        formatHint: 'filename.exe',
        hintText: 'Look for the shimcache entry at 11:30:18 UTC in the "New Indicator" section.',
        explanation: 'Shimcache shows windows_update.exe executed from Downloads shortly before memory capture, making it a key suspicious execution artifact.',
        solution: `vol -f VAGRANT-2008R2-20250321-113332.dmp windows.shimcachemem\n\nExecuted file under Downloads: windows_update.exe`,
        points: 10,
      },
      {
        id: 'vol_10',
        text: 'What binary path was configured for the persistent service backdoor?',
        answerBase64: 'QzpcV2luZG93c1xURU1QXFVpZkx0UXFYLmV4ZSBER0h0', // C:\Windows\TEMP\UifLtQqX.exe DGHt
        formatHint: 'full Windows path',
        hintText: 'Copy the Binary path exactly from the "Confirmed Active Backdoor" table, including the extra argument after the EXE name.',
        explanation: 'Svcscan service configuration records the exact executable and argument used for persistence: C:\\Windows\\TEMP\\UifLtQqX.exe DGHt.',
        solution: `vol -f VAGRANT-2008R2-20250321-113332.dmp windows.svcscan\n\nPersistent service binary path: C:\\Windows\\TEMP\\UifLtQqX.exe DGHt`,
        points: 10,
      },
    ],
  },
];
