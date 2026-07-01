# Урок 3 — CMD basics

> **Головна мета — не вивчити всі команди Windows, а навчитися швидко знаходити потрібну команду, розуміти її ризик і застосовувати її в реальному сценарії.**

## Пояснення

**CMD** (Command Prompt) — класична оболонка Windows з 1980-х. Вона досі зустрічається в:

- старих інструкціях і batch-файлах (`.bat`, `.cmd`);
- legacy-софті та корпоративних скриптах;
- деяких інсталяторах.

Для **нової роботи** краще PowerShell — він потужніший і сучасніший. Але CMD треба **розуміти**, щоб читати чужі інструкції і не губитися.

### Приклад сесії CMD

```cmd
dir
cd Documents
mkdir test
echo Hello > notes.txt
type notes.txt
del notes.txt
```

## Таблиця відповідників CMD ↔ PowerShell

| CMD | PowerShell | Що робить |
|-----|------------|-----------|
| `dir` | `Get-ChildItem` / `ls` | Список файлів |
| `cd` | `Set-Location` / `cd` | Навігація |
| `mkdir` | `New-Item -ItemType Directory` / `mkdir` | Створити папку |
| `copy` | `Copy-Item` / `cp` | Копіювати |
| `move` | `Move-Item` / `mv` | Перемістити |
| `del` | `Remove-Item` / `rm` | Видалити файл |
| `rmdir` | `Remove-Item` | Видалити папку |
| `type` | `Get-Content` / `cat` | Показати файл |
| `cls` | `Clear-Host` / `cls` | Очистити екран |
| `echo` | `Write-Output` / `echo` | Вивести текст |
| `where` | `Get-Command` | Знайти команду |
| `help` | `Get-Help` | Довідка |
| `tasklist` | `Get-Process` | Список процесів |
| `taskkill` | `Stop-Process` | Завершити процес |
| `ipconfig` | `Get-NetIPConfiguration` | Мережева конфігурація |
| `ping` | `ping` / `Test-NetConnection` | Перевірка звʼязку |
| `tracert` | `tracert` | Трасування маршруту |
| `nslookup` | `nslookup` / `Resolve-DnsName` | DNS-запит |

## Команди CMD

| Команда | Що робить | Оболонка | Коли використовувати | Приклад | Типовий результат | Типові помилки | Ризик |
|---------|-----------|----------|----------------------|---------|-------------------|----------------|-------|
| `dir` | Список файлів | CMD | Перегляд папки | `dir` | Список файлів і папок | — | Низький |
| `cd` | Навігація / поточна папка | CMD | Перехід між папками | `cd Documents` | Prompt змінюється | `The system cannot find` | Низький |
| `cd ..` | На рівень вище | CMD | Повернутися назад | `cd ..` | Батьківська папка | — | Низький |
| `mkdir` | Створити папку | CMD | Нова директорія | `mkdir test` | Папка створена | `already exists` | Низький |
| `copy` | Копіювати | CMD | Дублювання файлів | `copy a.txt b.txt` | `1 file(s) copied` | `cannot find` | Низький |
| `move` | Перемістити | CMD | Перейменування/переміщення | `move a.txt b.txt` | `1 file(s) moved` | — | Низький |
| `del` | Видалити файл | CMD | Прибрати файл | `del notes.txt` | Файл видалено | — | Середній |
| `rmdir` | Видалити папку | CMD | Порожня папка | `rmdir test` | Папка видалена | `not empty` | Середній |
| `type` | Показати файл | CMD | Читання тексту | `type notes.txt` | Вміст файлу | `cannot find` | Низький |
| `cls` | Очистити екран | CMD | Прибрати вивід | `cls` | Чистий екран | — | Низький |
| `echo` | Вивести текст / записати | CMD | Повідомлення, створення файлу | `echo Hello > notes.txt` | Текст або файл | — | Низький |
| `where` | Знайти exe | CMD | Перевірка PATH | `where git` | Шлях до git.exe | `INFO: Could not find` | Низький |
| `help` | Довідка | CMD | Список команд | `help copy` | Опис команди | — | Низький |
| `ipconfig` | IP-конфігурація | CMD/PS | Діагностика мережі | `ipconfig` | IPv4, gateway, DNS | — | Низький |
| `ping` | Перевірка звʼязку | CMD/PS | Тест мережі | `ping 8.8.8.8` | Reply from... | `Request timed out` | Низький |
| `tracert` | Трасування | CMD/PS | Маршрут до хоста | `tracert google.com` | Список hop-ів | — | Низький |
| `nslookup` | DNS-запит | CMD/PS | Перевірка DNS | `nslookup google.com` | IP-адреса | `can't find` | Низький |
| `tasklist` | Процеси | CMD | Хто працює | `tasklist` | Список PID | — | Низький |
| `taskkill` | Завершити процес | CMD | Закрити завислу програму | `taskkill /IM notepad.exe` | SUCCESS | `not found` | Високий |

## Практичне завдання

1. Відкрий **Command Prompt** у Windows Terminal.
2. Виконай:

```cmd
cd %USERPROFILE%
dir
mkdir cmd-test
cd cmd-test
echo Hello CMD > notes.txt
type notes.txt
copy notes.txt backup.txt
dir
del notes.txt
cd ..
rmdir cmd-test
```

3. Порівняй: ту саму послідовність у PowerShell через `ls`, `Set-Content`, `Copy-Item`.

## Чекліст засвоєння

- [ ] Можу відрізнити CMD prompt від PowerShell
- [ ] Знаю таблицю відповідників CMD ↔ PowerShell
- [ ] Вмію базові операції: `dir`, `cd`, `mkdir`, `copy`, `del`
- [ ] Розумію, коли в інструкції CMD — а коли краще PowerShell
- [ ] Знаю, що `taskkill /F` — небезпечна команда
