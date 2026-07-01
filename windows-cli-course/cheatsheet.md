# Шпаргалка Windows CLI

> **Головна мета — не вивчити всі команди Windows, а навчитися швидко знаходити потрібну команду, розуміти її ризик і застосовувати її в реальному сценарії.**

Короткі команди в один рядок. Деталі — в уроках.

---

## Windows Terminal

| Команда | Пояснення |
|---------|-----------|
| Вкладка PowerShell | Сучасна оболонка за замовчуванням |
| Вкладка CMD | Класичний Command Prompt |
| Вкладка Ubuntu (WSL) | Linux всередині Windows |
| `Ctrl+Shift+T` | Нова вкладка |
| `Ctrl+Shift+D` | Розділити панель |

---

## PowerShell basics

| Команда | Пояснення |
|---------|-----------|
| `$PSVersionTable` | Версія PowerShell |
| `pwd` / `Get-Location` | Поточна папка |
| `cd path` / `Set-Location` | Перейти в папку |
| `ls` / `Get-ChildItem` | Список файлів |
| `cls` / `Clear-Host` | Очистити екран |
| `Get-Command name` | Чи є команда в PATH |
| `Get-Help command` | Довідка по команді |
| `Get-Alias ls` | Показати, на що вказує alias |
| `history` / `Get-History` | Історія команд |

---

## CMD basics

| Команда | Пояснення |
|---------|-----------|
| `ver` | Версія Windows |
| `cd` | Поточна папка / перехід |
| `dir` | Список файлів |
| `type file` | Показати файл |
| `copy a b` | Копіювати |
| `move a b` | Перемістити |
| `del file` | Видалити файл |
| `where git` | Знайти exe в PATH |
| `help command` | Довідка CMD |

---

## Navigation

| Команда | Пояснення |
|---------|-----------|
| `pwd` | Де я зараз (PS) |
| `cd folder` | Увійти в папку |
| `cd ..` | На рівень вище |
| `cd ~` | Домашня папка (PS) |
| `cd %USERPROFILE%` | Домашня папка (CMD) |
| `ls` / `dir` | Вміст папки |

---

## Files

| Команда | Пояснення |
|---------|-----------|
| `mkdir name` | Створити папку |
| `New-Item file.txt` | Створити файл |
| `Copy-Item a b` / `copy a b` | Копіювати |
| `Move-Item a b` / `move a b` | Перемістити |
| `Rename-Item a b` | Перейменувати |
| `Get-Content file` / `type file` | Прочитати |
| `Set-Content file "text"` | Записати (замінити) |
| `Add-Content file "line"` | Дописати рядок |
| `Remove-Item file` / `del file` | Видалити файл |
| `Remove-Item dir -Recurse` | Видалити папку з вмістом ⚠️ |

---

## Search

| Команда | Пояснення |
|---------|-----------|
| `Get-ChildItem -Recurse` | Усі файли в підпапках |
| `Get-ChildItem -Filter "*.md"` | Фільтр за розширенням |
| `Select-String "text" -Path .\* -Recurse` | grep по файлах |
| `dir /s *.md` | Рекурсивний dir (CMD) |
| `findstr "text" *.md` | grep в CMD |
| `Where-Object {$_.Length -gt 1MB}` | Фільтр за розміром |

---

## Network

| Команда | Пояснення |
|---------|-----------|
| `ipconfig` | IP, mask, gateway |
| `ipconfig /all` | Детальна мережева інфо |
| `Get-NetIPConfiguration` | IP-конфіг (PS) |
| `ping host` | ICMP-тест звʼязку |
| `tracert host` | Трасування маршруту |
| `nslookup host` | DNS-запит |
| `Resolve-DnsName host` | DNS (PS) |
| `Test-NetConnection host -Port 443` | Тест TCP-порту |
| `netstat -ano` | Порти і PID |

---

## SSH

| Команда | Пояснення |
|---------|-----------|
| `Get-Command ssh` | Перевірити SSH-клієнт |
| `Test-NetConnection host -Port 22` | Чи відкритий SSH |
| `ssh user@host` | Підключення |
| `scp file user@host:` | Копіювати файл на сервер |
| `scp user@host:file .` | Скачати файл з сервера |
| `exit` | Вийти з SSH-сесії |

**Перед SSH:** IP → мережа → ping → порт 22 → user → SSH увімкнений

---

## Git

| Команда | Пояснення |
|---------|-----------|
| `git --version` | Версія Git |
| `git clone url` | Клонувати репо |
| `git status` | Стан змін |
| `git diff` | Різниця |
| `git add .` | Додати в stage |
| `git commit -m "msg"` | Зафіксувати |
| `git push` | Відправити на remote |
| `git pull` | Підтягнути з remote |
| `git log --oneline` | Історія |
| `git branch` | Гілки |
| `git restore file` | Скасувати зміни файлу |
| `gh auth status` | Статус GitHub CLI |

---

## Python/Node

| Команда | Пояснення |
|---------|-----------|
| `python --version` | Версія Python |
| `py -3` | Python Launcher (Windows) |
| `pip --version` | Версія pip |
| `pip install package` | Python-пакет |
| `node --version` | Версія Node.js |
| `npm --version` | Версія npm |
| `npm install` | Пакети з package.json |
| `npx tool` | Запуск без глобального install |

---

## Package managers

| Команда | Пояснення |
|---------|-----------|
| `winget search name` | Пошук програми |
| `winget install Package.Id` | Встановити програму |
| `winget upgrade` | Оновити пакети |
| `winget list` | Що встановлено через winget |
| `choco search name` | Пошук (Chocolatey) |
| `choco install name` | Встановити (Chocolatey) |

⚠️ Не змішуй winget + choco + Store + .exe для однієї програми

---

## Processes

| Команда | Пояснення |
|---------|-----------|
| `Get-Process` | Список процесів |
| `Get-Process -Name chrome` | Процес за іменем |
| `tasklist` | Процеси (CMD) |
| `Stop-Process -Name app` | Завершити ⚠️ |
| `taskkill /IM app.exe` | Завершити (CMD) ⚠️ |
| `taskkill /F /PID 1234` | Примусово ⚠️⚠️ |

---

## Services

| Команда | Пояснення |
|---------|-----------|
| `Get-Service` | Усі сервіси |
| `Get-Service ssh-agent` | Конкретний сервіс |
| `Start-Service name` | Запустити |
| `Stop-Service name` | Зупинити ⚠️ |
| `Restart-Service name` | Перезапустити |

---

## Ports

| Команда | Пояснення |
|---------|-----------|
| `Get-NetTCPConnection -State Listen` | Хто слухає порти |
| `netstat -ano \| findstr :3000` | Хто на порту 3000 |
| `Get-Process -Id <PID>` | Процес за PID |

---

## WSL

| Команда | Пояснення |
|---------|-----------|
| `wsl --status` | Статус WSL |
| `wsl -l -v` | Список дистрибутивів |
| `wsl` | Увійти в Linux |
| `wsl -d Ubuntu` | Конкретний distro |
| `wsl --shutdown` | Зупинити WSL |
| `wsl ls -la` | Команда без входу в shell |
| `pwd` / `ls` / `grep` / `find` | Bash всередині WSL |
| `sudo apt update` | Оновити пакети (Ubuntu) |
| `sudo apt install pkg` | Встановити пакет |
| `/mnt/c/Users/...` | Windows-диск C: у WSL |

⚠️ PowerShell і WSL — різні шляхи і права

---

## Danger Zone

| Команда | Пояснення |
|---------|-----------|
| `Remove-Item -Recurse -Force` | Видалити все без запиту ⚠️⚠️ |
| `del /s /q` | CMD рекурсивне видалення ⚠️⚠️ |
| `rmdir /s /q` | CMD видалити папку ⚠️⚠️ |
| `Stop-Process -Force` | Вбити процес ⚠️ |
| `taskkill /F` | Примусово завершити ⚠️ |
| `Stop-Service` | Зупинити службу ⚠️ |
| `Set-ExecutionPolicy Unrestricted` | Небезпечна політика скриптів ⚠️ |
| `iwr URL \| iex` | Завантажити і виконати ⚠️⚠️ |
| `irm URL \| iex` | Те саме ⚠️⚠️ |
| `format` / `diskpart` | Диски ⚠️⚠️ |
| `bcdedit` / `reg delete` | Система ⚠️⚠️ |

**Перед небезпечною командою:** `pwd` → прочитай → подумай → Enter

---

## Help

| Команда | Пояснення |
|---------|-----------|
| `Get-Help command` | Довідка PowerShell |
| `Get-Help command -Examples` | Приклади |
| `command -?` | Коротка довідка |
| `help command` | Довідка CMD |
| `Get-Command *keyword*` | Знайти cmdlet |
| `man command` | У WSL — man-сторінки |
| `tldr command` | У WSL — короткі приклади |

---

## Alias-и PowerShell (швидка таблиця)

| Alias | Cmdlet |
|-------|--------|
| `ls`, `dir` | `Get-ChildItem` |
| `cd` | `Set-Location` |
| `pwd` | `Get-Location` |
| `cat` | `Get-Content` |
| `cp` | `Copy-Item` |
| `mv` | `Move-Item` |
| `rm` | `Remove-Item` |
| `cls` | `Clear-Host` |
| `iwr` | `Invoke-WebRequest` |
| `irm` | `Invoke-RestMethod` |
| `iex` | `Invoke-Expression` |
