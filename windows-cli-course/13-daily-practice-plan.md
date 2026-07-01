# Урок 13 — Daily practice plan

> **Головна мета — не вивчити всі команди Windows, а навчитися швидко знаходити потрібну команду, розуміти її ризик і застосовувати її в реальному сценарії.**

## Пояснення

14-денний план: **20–30 хвилин на день**, максимум **5–7 команд**, **3 вправи**, **1 контрольне питання**.

Маршрут: **PowerShell → Git → SSH → WSL** — від відкриття Terminal до реальної інженерної роботи.

---

## День 1: Windows Terminal, PowerShell, навігація

**Команди:** `pwd`, `ls`, `cd`, `whoami`, `Get-Command`, `$PSVersionTable`

**Вправи:**
1. Відкрий Windows Terminal → PowerShell. Запиши версію PS.
2. Перейди в `Documents` і назад через `cd ..`
3. Перевір: `Get-Command git`, `Get-Command ssh`

**Контрольне питання:** Чим Windows Terminal відрізняється від PowerShell?

---

## День 2: Створення файлів і папок

**Команди:** `mkdir`, `New-Item`, `Copy-Item`, `Move-Item`, `Set-Content`

**Вправи:**
1. Створи `cli-day2` з підпапкою `notes`
2. Створи `notes\idea.txt` з текстом «Day 2 practice»
3. Скопіюй у `notes\backup.txt`, перейменуй `idea.txt` → `main.txt`

**Контрольне питання:** Чим `Copy-Item` відрізняється від `Move-Item`?

---

## День 3: Читання, видалення, пошук

**Команди:** `Remove-Item`, `Get-Content`, `Set-Content`, `Select-String`

**Вправи:**
1. Прочитай `main.txt` через `Get-Content`
2. Додай рядок «TODO: review» через `Add-Content`
3. Знайди TODO: `Select-String "TODO" notes\*`

**Контрольне питання:** Чому `Remove-Item -Recurse -Force` небезпечніша за `Remove-Item file.txt`?

---

## День 4: Alias-и і довідка

**Команди:** `Get-Help`, `Get-Alias`, `Get-ChildItem`, `Get-History`, `cls`

**Вправи:**
1. `Get-Alias ls` — яка повна команда?
2. `Get-Help Copy-Item -Examples`
3. Повтори вправу Дня 2, але тільки через alias-и (`ls`, `cp`, `cat`)

**Контрольне питання:** Навіщо знати повні назви cmdlet-ів, якщо є alias-и?

---

## День 5: CMD — читання чужих інструкцій

**Команди:** `dir`, `type`, `copy`, `del`, `where`, `echo %PATH%`

**Вправи:**
1. Відкрий вкладку CMD. Виконай `dir` і `cd %USERPROFILE%`
2. Повтори День 2 в CMD (`mkdir`, `echo > file`, `type`)
3. Порівняй з PowerShell-версією

**Контрольне питання:** Який PowerShell-аналог `where git`?

---

## День 6: Мережа — IP, ping, DNS

**Команди:** `ipconfig`, `Get-NetIPConfiguration`, `ping`, `nslookup`, `Test-NetConnection`

**Вправи:**
1. Знайди свій IPv4 і gateway
2. `ping 8.8.8.8 -n 4`
3. `Test-NetConnection google.com -Port 443`

**Контрольне питання:** Чим `ping` відрізняється від `Test-NetConnection -Port 22`?

---

## День 7: SSH — підготовка і підключення

**Команди:** `Get-Command ssh`, `Test-NetConnection -Port 22`, `ssh`, `scp`

**Вправи:**
1. Пройди 6-пунктний чекліст перед SSH (з Уроку 7)
2. `Test-NetConnection <mikrotik-or-pi-ip> -Port 22`
3. Підключись: `ssh user@host`, виконай одну команду, `exit`

**Контрольне питання:** Що перевірити, якщо `ssh` дає `Connection timed out`?

---

## День 8: Git — clone, status, diff

**Команди:** `git clone`, `git status`, `git log --oneline`, `git diff`, `git branch`

**Вправи:**
1. Клонуй публічний репо в `C:\Projects` або `~/Projects`
2. `git status` і `git log --oneline -5`
3. Відкрий файл, зміни одну лінію, `git diff`

**Контрольне питання:** Що показує `git status` vs `git diff`?

---

## День 9: Git — commit і push

**Команди:** `git add .`, `git commit -m`, `git push`, `git pull`, `git restore`

**Вправи:**
1. У тестовому репо (своєму fork): зміни README
2. `git add .` → `git commit -m "practice day 9"` → `git push`
3. На іншій машині/гілці: `git pull`

**Контрольне питання:** У якому порядку йдуть `add`, `commit`, `push`?

---

## День 10: Python, Node, winget

**Команди:** `python --version`, `py -3`, `node --version`, `npm --version`, `winget search`, `winget list`

**Вправи:**
1. Аудит: `where python`, `where node` — скільки exe?
2. `winget search Git` (без install, якщо вже є)
3. `py -3 -c "print('ok')"` і `node -e "console.log('ok')"`

**Контрольне питання:** Чому не варто змішувати winget, choco і Store-версії?

---

## День 11: Процеси, сервіси, порти

**Команди:** `Get-Process`, `Get-Service`, `Get-NetTCPConnection`, `netstat -ano`, `tasklist`

**Вправи:**
1. Відкрий Notepad → знайди через `Get-Process notepad`
2. `Get-Service | Where-Object {$_.Status -eq "Running"}` — перші 5
3. `Get-NetTCPConnection -State Listen` — які порти слухають?

**Контрольне питання:** Як знайти, який процес займає порт 3000?

---

## День 12: WSL — Linux всередині Windows

**Команди:** `wsl --status`, `wsl -l -v`, `wsl`, `ls`, `grep`, `sudo apt update`

**Вправи:**
1. `wsl --list --verbose`
2. У WSL: `pwd`, `mkdir ~/wsl-practice`, `echo test > file.txt`, `cat file.txt`
3. Перейди в `/mnt/c/Users/` — побач різницю шляхів

**Контрольне питання:** Чому проєкти краще тримати в `~/`, а не на `/mnt/c/`?

---

## День 13: WSL + Git + SSH разом

**Команди:** `wsl`, `git`, `ssh`, `curl`, `cd ~/projects`

**Вправи:**
1. У WSL клонуй репо в `~/projects`
2. `git status` всередині WSL
3. `ssh user@host` з WSL (або `Test-NetConnection` з PowerShell перед цим)

**Контрольне питання:** Чим відрізняється `ssh` з PowerShell і з WSL?

---

## День 14: Небезпечні команди + підсумок

**Команди:** `Get-ExecutionPolicy`, `pwd` перед `Remove-Item`, `Get-Help`, огляд [cheatsheet.md](cheatsheet.md)

**Вправи:**
1. `Get-ExecutionPolicy -List` — яка політика?
2. Симулюй безпечне видалення: `pwd` → `ls` → `Remove-Item` **без** `-Force`
3. Пройди весь мінімальний набір команд з [README.md](README.md) — відміть, що знаєш напамʼять

**Контрольне питання:** Що небезпечніше: `irm https://unknown.site/script.ps1 | iex` чи `winget install Git.Git`? Чому?

---

## Після 14 днів

- Тримай [cheatsheet.md](cheatsheet.md) під рукою
- Повторюй слабкі місця (мережа, SSH, WSL)
- У реальних задачах: **PowerShell для Windows**, **WSL для Linux-workflow**, **Git/SSH скрізь**

**Головна мета — не вивчити всі команди Windows, а навчитися швидко знаходити потрібну команду, розуміти її ризик і застосовувати її в реальному сценарії.**
