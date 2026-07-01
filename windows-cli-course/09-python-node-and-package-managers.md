# Урок 9 — Python, Node and package managers

> **Головна мета — не вивчити всі команди Windows, а навчитися швидко знаходити потрібну команду, розуміти її ризик і застосовувати її в реальному сценарії.**

## Пояснення

На Windows розробник зазвичай має кілька «менеджерів»:

| Інструмент | Що встановлює | Приклад |
|------------|---------------|---------|
| **winget** | Програми Windows (Git, VS Code, Python) | `winget install Git.Git` |
| **Chocolatey** | Програми Windows (альтернатива winget) | `choco install git` |
| **pip** | Python-пакети | `pip install requests` |
| **npm** | Node.js-пакети | `npm install express` |

**Коли що використовувати:**

- `winget` / `choco` — системні програми (Git, Python, Node, VS Code)
- `pip` — бібліотеки Python для проєкту
- `npm` — пакети Node.js для проєкту

### ⚠️ Застереження: зоопарк версій

Не змішуй бездумно **winget**, **Chocolatey**, ручні інсталятори (.exe) і **Microsoft Store**-версії однієї програми. Результат — кілька `python.exe`, конфлікт PATH і «команда працює в одному терміналі, але не в іншому».

**Правило:** один канал встановлення для системних програм + `pip`/`npm` всередині проєктів (краще з venv).

## Команди

| Команда | Що робить | Оболонка | Коли використовувати | Приклад | Типовий результат | Типові помилки | Ризик |
|---------|-----------|----------|----------------------|---------|-------------------|----------------|-------|
| `python --version` | Версія Python | PS/CMD | Перевірка Python | `python --version` | `Python 3.12.x` | `not found` — Store stub | Низький |
| `py --version` | Python Launcher | PS/CMD | Кілька версій Python | `py --version` | Версія за замовчуванням | — | Низький |
| `py -3 --version` | Python 3 явно | PS/CMD | Вибір версії | `py -3 --version` | `Python 3.x` | — | Низький |
| `pip --version` | Версія pip | PS/CMD | Перевірка pip | `pip --version` | pip + python path | — | Низький |
| `node --version` | Версія Node.js | PS/CMD | Перевірка Node | `node --version` | `v20.x` | not found | Низький |
| `npm --version` | Версія npm | PS/CMD | Перевірка npm | `npm --version` | `10.x` | — | Низький |
| `npx --version` | npx | PS/CMD | Запуск пакетів без install | `npx --version` | версія | — | Низький |
| `winget --version` | Версія winget | PS/CMD | Чи є winget | `winget --version` | `v1.x` | Старий Windows | Низький |
| `winget search <pkg>` | Пошук пакета | PS/CMD | Знайти ID пакета | `winget search Git` | Список пакетів | — | Низький |
| `winget install <id>` | Встановити | PS/CMD | Інсталяція програми | `winget install Git.Git` | Successfully installed | Потрібен admin | Середній |
| `winget upgrade` | Оновити пакети | PS/CMD | Оновлення софту | `winget upgrade` | Список доступних | — | Середній |
| `winget list` | Встановлені через winget | PS/CMD | Аудит софту | `winget list` | Таблиця | — | Низький |
| `choco --version` | Версія Chocolatey | PS/CMD | Якщо використовуєш choco | `choco --version` | версія | not installed | Низький |
| `choco search git` | Пошук у choco | PS/CMD | Альтернатива winget search | `choco search git` | Список | — | Низький |
| `choco install git` | Встановити через choco | PS/CMD | Якщо обрано choco | `choco install git -y` | installed | admin | Середній |
| `choco upgrade all` | Оновити все choco | PS/CMD | Масове оновлення | `choco upgrade all -y` | оновлення | **зоопарк** з winget | Середній |

## Приклади

```powershell
python --version
py -3
node --version
npm --version
winget search Git
winget install Git.Git
winget install Microsoft.VisualStudioCode
```

Chocolatey (якщо встановлений):

```powershell
choco --version
choco search git
choco install git
```

## Практичне завдання

1. Аудит середовища:

```powershell
Get-Command python, py, pip, node, npm, winget -ErrorAction SilentlyContinue
python --version
node --version
winget --version
```

2. Пошук без встановлення:

```powershell
winget search Python
winget search "Visual Studio Code"
```

3. Запусти Python REPL: `py -3` → `print("Hello Windows")` → `exit()`

4. (Опційно) У Node: `node -e "console.log('Hello Node')"`

5. Запиши: скільки різних `python`/`node` знайшов через `where python` і `where node` — якщо більше одного, це сигнал «зоопарку».

## Чекліст засвоєння

- [ ] Розумію різницю winget/choco (програми) vs pip/npm (пакети проєкту)
- [ ] Знаю застереження про зоопарк версій
- [ ] Вмію перевірити Python через `py -3` і Node через `node --version`
- [ ] Вмію шукати пакети: `winget search`
- [ ] Обрав **один** канал для системних інсталяцій (winget **або** choco)
