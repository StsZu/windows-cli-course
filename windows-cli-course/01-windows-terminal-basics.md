# Урок 1 — Windows Terminal basics

> **Головна мета — не вивчити всі команди Windows, а навчитися швидко знаходити потрібну команду, розуміти її ризик і застосовувати її в реальному сценарії.**

## Пояснення

**Windows Terminal** — це програма-вікно (емулятор терміналу). Вона не виконує команди сама — вона запускає **shell** (оболонку).

**Shell** — інтерпретатор команд. У Windows є кілька:

| Shell | Що це | Коли використовувати |
|-------|-------|----------------------|
| **PowerShell** | Сучасна основна оболонка | Нова робота, скрипти, адміністрування |
| **CMD** | Класична оболонка з DOS-епохи | Старі інструкції, batch-файли |
| **WSL** | Linux всередині Windows | Linux-команди, apt, bash-скрипти |
| **Git Bash** | Unix-like shell від Git for Windows | Git-операції в Unix-стилі |

### Базові поняття

- **Prompt** — рядок запрошення (`PS C:\Users\You>` або `C:\Users\You>`). Показує, де ти і в якому shell.
- **Command** — назва дії (`ls`, `ping`, `git`).
- **Argument** — параметр команди (`Documents`, `8.8.8.8`).
- **Option/flag** — модифікатор (`-Recurse`, `/s`).
- **Environment variable** — змінна середовища (`$env:Path` у PowerShell, `%PATH%` у CMD).
- **PATH** — список папок, де Windows шукає виконувані файли. Якщо `git` не в PATH — команда не знайдеться.

### Як зрозуміти, де ти зараз

```powershell
pwd   # PowerShell — покаже поточну папку
```

У CMD `cd` без аргументів теж показує поточну папку.

### Як перевірити, чи команда доступна

```powershell
Get-Command git
Get-Command ssh
Get-Command python
```

Якщо команда знайдена — побачиш шлях до `.exe`. Якщо ні — треба встановити програму або додати її в PATH.

## Команди PowerShell

| Команда | Що робить | Оболонка | Коли використовувати | Приклад | Типовий результат | Типові помилки | Ризик |
|---------|-----------|----------|----------------------|---------|-------------------|----------------|-------|
| `$PSVersionTable` | Версія PowerShell | PS | Перевірити, яка версія встановлена | `$PSVersionTable` | Таблиця з PSVersion 5.x або 7.x | — | Низький |
| `Get-Host` | Інформація про host | PS | Діагностика середовища | `Get-Host` | Name: ConsoleHost | — | Низький |
| `whoami` | Поточний користувач | PS/CMD | Дізнатися, під ким працюєш | `whoami` | `DESKTOP\username` | — | Низький |
| `hostname` | Імʼя компʼютера | PS/CMD | Ідентифікація машини в мережі | `hostname` | `DESKTOP-ABC123` | — | Низький |
| `pwd` | Поточна папка (alias) | PS | Швидко подивитися, де ти | `pwd` | `Path: C:\Users\You` | — | Низький |
| `Get-Location` | Поточна папка (cmdlet) | PS | Те саме, повна назва | `Get-Location` | `Path: C:\Users\You` | — | Низький |
| `Get-Command` | Знайти команду | PS | Перевірити, чи встановлена програма | `Get-Command git` | CommandType, Name, Source | `not recognized` — не в PATH | Низький |
| `Get-Help` | Довідка по команді | PS | Зрозуміти синтаксис | `Get-Help Get-ChildItem` | Опис, приклади | Потрібен `-Online` для повної | Низький |
| `echo $env:Path` | Показати PATH | PS | Діагностика «команда не знайдена» | `echo $env:Path` | Довгий рядок шляхів | — | Низький |
| `$env:Path -split ';'` | PATH як список | PS | Зручно читати PATH | `$env:Path -split ';'` | Список папок по рядках | — | Низький |

## Команди CMD

| Команда | Що робить | Оболонка | Коли використовувати | Приклад | Типовий результат | Типові помилки | Ризик |
|---------|-----------|----------|----------------------|---------|-------------------|----------------|-------|
| `ver` | Версія Windows | CMD | Перевірити ОС | `ver` | `Microsoft Windows [Version 10.0.xxxxx]` | — | Низький |
| `whoami` | Поточний користувач | CMD | Те саме, що в PS | `whoami` | `desktop\username` | — | Низький |
| `hostname` | Імʼя ПК | CMD | Ідентифікація | `hostname` | `DESKTOP-ABC123` | — | Низький |
| `cd` | Поточна папка / перехід | CMD | Навігація | `cd` | `C:\Users\You` | `The system cannot find the path` | Низький |
| `where` | Знайти виконуваний файл | CMD | Аналог `Get-Command` | `where git` | `C:\Program Files\Git\cmd\git.exe` | INFO: Could not find files | Низький |
| `help` | Довідка CMD | CMD | Список команд CMD | `help` | Список команд | — | Низький |
| `echo %PATH%` | Показати PATH | CMD | Діагностика PATH | `echo %PATH%` | Рядок шляхів | — | Низький |

## Практичне завдання

1. Відкрий **Windows Terminal** → вкладка **PowerShell**.
2. Виконай:

```powershell
$PSVersionTable
pwd
whoami
hostname
Get-Command git
Get-Command ssh
Get-Command python
echo $env:Path
```

3. Відкрий нову вкладку **Command Prompt** (CMD) і виконай:

```cmd
ver
cd
where git
echo %PATH%
```

4. Запиши: яка версія PowerShell, чи є `git`, `ssh`, `python` у PATH.

## Чекліст засвоєння

- [ ] Розумію різницю між Windows Terminal і shell
- [ ] Можу відрізнити PowerShell prompt (`PS C:\...>`) від CMD (`C:\...>`)
- [ ] Знаю, що таке PATH і навіщо він потрібен
- [ ] Вмію перевірити наявність команди через `Get-Command` або `where`
- [ ] Знаю, що WSL — окреме Linux-середовище, не PowerShell
