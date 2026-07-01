# Практичний курс Windows CLI

**[← Повернутися до головної сторінки курсу](../index.html)**

Практичний курс для інженерів, які працюють з Mac, Linux, Raspberry Pi, MikroTik і GitHub і хочуть впевнено виконувати ті самі задачі у Windows.

> **Головна мета — не вивчити всі команди Windows, а навчитися швидко знаходити потрібну команду, розуміти її ризик і застосовувати її в реальному сценарії.**

## Що таке Windows CLI

Windows — не один shell, а кілька оболонок у одному вікні:

```text
Windows Terminal — програма-вікно для запуску shell-ів
PowerShell       — сучасна основна оболонка Windows
CMD              — стара класична оболонка Windows
WSL              — Linux-середовище всередині Windows
Git Bash         — Unix-like shell, часто встановлюється разом з Git for Windows
```

## Уроки курсу

| № | Урок | Файл | Що вивчиш |
|---|------|------|-----------|
| 1 | Windows Terminal basics | [01-windows-terminal-basics.md](01-windows-terminal-basics.md) | Terminal vs shell, PowerShell, CMD, WSL, PATH |
| 2 | PowerShell basics | [02-powershell-basics.md](02-powershell-basics.md) | Cmdlets, alias-и, базові операції |
| 3 | CMD basics | [03-cmd-basics.md](03-cmd-basics.md) | Класичні CMD-команди, відповідники PowerShell |
| 4 | Files and folders | [04-files-and-folders.md](04-files-and-folders.md) | Створення, копіювання, видалення файлів |
| 5 | Search and text | [05-search-and-text.md](05-search-and-text.md) | Пошук файлів і тексту |
| 6 | Network diagnostics | [06-network-diagnostics.md](06-network-diagnostics.md) | IP, DNS, ping, порти |
| 7 | SSH and remote access | [07-ssh-and-remote-access.md](07-ssh-and-remote-access.md) | SSH до MikroTik, Raspberry Pi, серверів |
| 8 | Git and GitHub | [08-git-and-github.md](08-git-and-github.md) | Clone, commit, push, GitHub CLI |
| 9 | Python, Node, package managers | [09-python-node-and-package-managers.md](09-python-node-and-package-managers.md) | Python, Node, winget, Chocolatey |
| 10 | Processes, services, ports | [10-processes-services-and-ports.md](10-processes-services-and-ports.md) | Процеси, сервіси, відкриті порти |
| 11 | WSL Linux on Windows | [11-wsl-linux-on-windows.md](11-wsl-linux-on-windows.md) | Linux-команди всередині Windows |
| 12 | Dangerous commands | [12-dangerous-commands.md](12-dangerous-commands.md) | Небезпечні команди і як їх уникати |
| 13 | Daily practice plan | [13-daily-practice-plan.md](13-daily-practice-plan.md) | 14-денний план практики |
| — | Шпаргалка | [cheatsheet.md](cheatsheet.md) | Усі команди в одному місці |

## Як відкрити курс

**Notepad:**

```powershell
cd windows-cli-course
notepad README.md
```

**VS Code:**

```powershell
cd windows-cli-course
code .
```

**У Terminal:**

```powershell
Get-Content README.md
```

## Таблиця відповідників Mac/Linux ↔ PowerShell ↔ CMD

| Завдання | Mac/Linux | PowerShell | CMD |
|----------|-----------|------------|-----|
| Поточна папка | `pwd` | `pwd` / `Get-Location` | `cd` |
| Список файлів | `ls -la` | `ls` / `Get-ChildItem` | `dir` |
| Перейти в папку | `cd folder` | `cd folder` / `Set-Location folder` | `cd folder` |
| Створити папку | `mkdir folder` | `mkdir folder` | `mkdir folder` |
| Створити файл | `touch file.txt` | `New-Item file.txt` | `echo. > file.txt` |
| Копіювати | `cp a b` | `Copy-Item a b` | `copy a b` |
| Перемістити | `mv a b` | `Move-Item a b` | `move a b` |
| Видалити файл | `rm file` | `Remove-Item file` | `del file` |
| Показати файл | `cat file` | `Get-Content file` | `type file` |
| Знайти текст | `grep text file` | `Select-String text file` | `findstr text file` |
| IP-адреса | `ifconfig` / `ip addr` | `Get-NetIPConfiguration` | `ipconfig` |
| Ping | `ping 8.8.8.8` | `ping 8.8.8.8` | `ping 8.8.8.8` |
| SSH | `ssh user@host` | `ssh user@host` | `ssh user@host` |
| Git status | `git status` | `git status` | `git status` |

## Мінімальний набір команд (вивчи напамʼять)

Це 40–50 команд, які покривають 90% реальних задач:

```powershell
# Навігація і файли
pwd, ls, cd, mkdir, New-Item, Copy-Item, Move-Item, Remove-Item
Get-Content, Set-Content, Select-String

# Довідка
Get-Command, Get-Help

# Мережа
ipconfig, Get-NetIPConfiguration, ping, tracert, nslookup, Test-NetConnection

# Віддалений доступ
ssh, scp

# Git
git status, git add ., git commit -m "message", git push, git pull

# Розробка
python --version, node --version, npm --version

# Пакети
winget search, winget install

# Діагностика
Get-Process, Get-Service, Get-NetTCPConnection

# WSL
wsl, wsl --status
```

## Рекомендований порядок вивчення

1. Уроки 1–4 — база (Terminal, PowerShell, CMD, файли)
2. Уроки 5–7 — пошук, мережа, SSH
3. Уроки 8–10 — Git, Python/Node, процеси
4. Уроки 11–13 — WSL, безпека, щоденна практика
5. [cheatsheet.md](cheatsheet.md) — тримай під рукою
