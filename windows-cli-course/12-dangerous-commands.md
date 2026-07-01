# Урок 12 — Dangerous commands

> **Головна мета — не вивчити всі команди Windows, а навчитися швидко знаходити потрібну команду, розуміти її ризик і застосовувати її в реальному сценарії.**

## Пояснення

Небезпечні команди — не «заборонені», а **необоротні** або **системні**. Інженер має розуміти ризик перед Enter.

Правило: **pwd → подумай → прочитай `--help` → запускай**.

## Небезпечні команди

| Команда | Чому небезпечна | Коли використовується | Як перевірити перед запуском | Безпечніша альтернатива | Ризик |
|---------|-----------------|----------------------|------------------------------|-------------------------|-------|
| `Remove-Item -Recurse -Force` | Видаляє дерево без запитань | Очистка build/, node_modules | `pwd`, `ls` цільової папки | `Remove-Item` без `-Force`, кошик | **Високий** |
| `del /s /q` | CMD: рекурсивне видалення | Batch-скрипти | Перевір `cd` | Видалити вручну через Explorer | **Високий** |
| `rmdir /s /q` | CMD: видалення папки з усім | Старі скрипти | Шлях без змінних | `Remove-Item` з confirm | **Високий** |
| `Stop-Process -Force` | Вбиває процес без збереження | Зависла програма | `Get-Process` — правильний PID? | Закрити вікно, `-Name` без `-Force` | **Високий** |
| `taskkill /F` | Примусове завершення | Завислий exe | `tasklist` — PID/name | `taskkill` без `/F` | **Високий** |
| `Stop-Service` | Зупиняє системну службу | Діагностика | `Get-Service` — що це за сервіс? | `Restart-Service` замість stop | **Високий** |
| `Set-ExecutionPolicy` | Дозволяє виконання скриптів | PowerShell-скрипти | Чи потрібен `Unrestricted`? | `RemoteSigned` для поточного user | **Високий** |
| `format` | Форматує диск | Рідко, адмін | **Подвійна перевірка диска** | Не форматуй через CLI без backup | **Високий** |
| `diskpart` | Розділи диска | Адміністрування | `list disk` перед `clean` | GUI Disk Management | **Високий** |
| `bcdedit` | Завантаження Windows | Dual-boot, recovery | Backup BCD | Recovery USB | **Високий** |
| `reg delete` | Видалення реєстру | Твікинг, cleanup | Експорт reg backup | `reg export` спочатку | **Високий** |
| `netsh` | Мережева конфігурація | Firewall, Wi-Fi | `netsh ?` — що змінюєш? | GUI, документація | Середній/Високий |
| `New-Item` / `Set-Item` у системних шляхах | Пошкодження Windows | Рідко | Не чіпай `C:\Windows\System32` | Працюй у `C:\Users\` | **Високий** |
| `iwr URL \| iex` | Завантажити і виконати скрипт | Інсталятори з інтернету | **Довіряєш джерелу?** | Завантажити → прочитати → запустити | **Високий** |
| `irm URL \| iex` | Те саме (alias irm/iex) | Chocolatey, dev tools | Перевір URL і автор | Локальний `.ps1` після review | **Високий** |

## iwr | iex та irm | iex — Windows-аналог curl | bash

```powershell
iwr https://example.com/install.ps1 | iex
irm https://example.com/install.ps1 | iex
```

**Що відбувається:**

- `iwr` (Invoke-WebRequest) / `irm` (Invoke-RestMethod) — завантажує скрипт з URL
- `iex` (Invoke-Expression) — **одразу виконує** завантажений текст

Це зручно для офіційних інсталяторів (Chocolatey, scoop), але **небезпечно**, якщо джерело не перевірене — атакуючий може підмінити скрипт.

**Безпечніший підхід:**

```powershell
# 1. Завантажити
iwr https://example.com/install.ps1 -OutFile install.ps1

# 2. Прочитати
Get-Content install.ps1

# 3. Запустити свідомо
.\install.ps1
```

## Set-ExecutionPolicy

Змінює політику виконання PowerShell-скриптів.

```powershell
Get-ExecutionPolicy -List
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

| Політика | Значення |
|----------|----------|
| `Restricted` | Скрипти заблоковані (default) |
| `RemoteSigned` | Локальні ОК, з інтернету — підпис | ← **рекомендовано** |
| `Unrestricted` | Все виконується | **не став без потреби** |
| `Bypass` | Без обмежень | тільки тимчасово |

**Не треба бездумно ставити `Unrestricted`.** Для більшості задач достатньо `RemoteSigned` для `CurrentUser`.

## Практичне завдання

1. Перевір поточну політику:

```powershell
Get-ExecutionPolicy -List
```

2. Симуляція небезпечного шляху (не виконуй видалення!):

```powershell
pwd
# Уяви: Remove-Item C:\Projects\important -Recurse -Force
# Питання: що станеться, якщо замість important — C:\Projects?
```

3. Розбери скрипт з інтернету **без** pipe в iex:

```powershell
# Приклад (офіційний Chocolatey — тільки якщо свідомо встановлюєш choco):
# iwr не запускай сліпо — спочатку -OutFile, потім Get-Content
```

4. Відповідай письмово:
   - Чому `Remove-Item -Recurse -Force` небезпечніша за `del file.txt`?
   - Чому `irm | iex` небезпечніший за `winget install`?

## Чекліст засвоєння

- [ ] Перед видаленням завжди: `pwd` + `ls` цілі
- [ ] Не запускаю `iwr|iex` / `irm|iex` з невідомих URL
- [ ] Знаю, що `Set-ExecutionPolicy Unrestricted` — не default-рішення
- [ ] Не використовую `taskkill /F` / `Stop-Process -Force` без перевірки PID
- [ ] Не чіпаю `diskpart`, `format`, `bcdedit`, `reg delete` без backup і досвіду
