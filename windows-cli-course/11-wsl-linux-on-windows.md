# Урок 11 — WSL Linux on Windows

> **Головна мета — не вивчити всі команди Windows, а навчитися швидко знаходити потрібну команду, розуміти її ризик і застосовувати її в реальному сценарії.**

## Пояснення

**WSL** (Windows Subsystem for Linux) — справжнє Linux-середовище всередині Windows. Це не емулятор — ядро Linux (WSL2) у віртуальній машині з інтеграцією у файлову систему Windows.

**Коли краще WSL:**

- звичні Linux-команди (`grep`, `find`, `apt`);
- bash-скрипти з Mac/Raspberry Pi;
- збірка проєктів, які очікують Linux;
- `ssh`, `curl`, `git` у Unix-стилі.

**Коли краще PowerShell:** адміністрування Windows, `.ps1` скрипти, Windows-специфічні cmdlet-и.

### ⚠️ Попередження про шляхи

```text
PowerShell і WSL — це різні середовища. Шляхи, команди і права доступу можуть відрізнятися.
```

| Середовище | Приклад шляху |
|------------|---------------|
| Windows | `C:\Users\User\Projects` |
| WSL (Linux home) | `/home/user/projects` |
| Windows диск у WSL | `/mnt/c/Users/User/Projects` |

**Правило:** проєкти для Linux-інструментів тримай у WSL (`~/projects`), не на `/mnt/c/` — повільніше і проблеми з правами.

## Команди Windows (керування WSL)

| Команда | Що робить | Оболонка | Коли використовувати | Приклад | Типовий результат | Типові помилки | Ризик |
|---------|-----------|----------|----------------------|---------|-------------------|----------------|-------|
| `wsl --status` | Статус WSL | PS/CMD | Чи встановлений WSL2 | `wsl --status` | Default Version: 2 | WSL not installed | Низький |
| `wsl --list --verbose` | Список дистрибутивів | PS/CMD | Які Linux встановлені | `wsl -l -v` | Ubuntu Running 2 | — | Низький |
| `wsl` | Увійти в default Linux | PS/CMD | Швидкий вхід | `wsl` | Linux prompt | — | Низький |
| `wsl -d Ubuntu` | Конкретний дистрибутив | PS/CMD | Вибір Ubuntu/Debian | `wsl -d Ubuntu` | Ubuntu shell | distro not found | Низький |
| `wsl --shutdown` | Зупинити всі WSL VM | PS/CMD | Звільнити RAM | `wsl --shutdown` | — | — | Низький |
| `wsl <command>` | Одна команда в WSL | PS/CMD | Без входу в shell | `wsl ls -la` | Вивід Linux | — | Низький |

## Команди всередині WSL (bash)

| Команда | Що робить | Оболонка | Коли використовувати | Приклад | Типовий результат | Типові помилки | Ризик |
|---------|-----------|----------|----------------------|---------|-------------------|----------------|-------|
| `pwd` | Поточна папка | WSL | Навігація | `pwd` | `/home/user` | — | Низький |
| `ls -la` | Список файлів | WSL | Перегляд з правами | `ls -la` | drwx... | — | Низький |
| `cd` | Перейти | WSL | Навігація | `cd ~/projects` | — | — | Низький |
| `cp` / `mv` / `rm` | Файлові операції | WSL | Як на Linux | `cp a b` | — | `rm -rf` високий ризик | Середній |
| `cat` / `less` | Читати файл | WSL | Перегляд | `cat file.txt` | текст | — | Низький |
| `grep` | Пошук тексту | WSL | grep як на Mac | `grep TODO *.md` | збіги | — | Низький |
| `find` | Пошук файлів | WSL | Знайти за іменем | `find . -name "*.py"` | шляхи | — | Низький |
| `ssh` / `scp` | Віддалений доступ | WSL | Як на Linux | `ssh user@host` | shell | — | Низький |
| `curl` | HTTP-запити | WSL | API, завантаження | `curl -I https://example.com` | headers | — | Низький |
| `git` | Git | WSL | Репозиторії в Linux | `git status` | status | — | Низький |
| `sudo apt update` | Оновити індекс пакетів | WSL | Після встановлення Ubuntu | `sudo apt update` | Reading package lists | — | Низький |
| `sudo apt install` | Встановити пакет | WSL | curl, build-essential | `sudo apt install -y curl` | installed | — | Середній |

## Сценарії

```powershell
# З Windows — відкрити Ubuntu
wsl -d Ubuntu

# Всередині WSL
cd ~
mkdir projects && cd projects
git clone https://github.com/user/repo.git
ssh user@10.0.0.50
sudo apt update && sudo apt install -y git curl
```

Доступ до Windows-файлів з WSL:

```bash
cd /mnt/c/Users/YourName/Documents
ls -la
```

## Практичне завдання

1. Перевір WSL з PowerShell:

```powershell
wsl --status
wsl --list --verbose
```

2. Увійди в WSL: `wsl` або `wsl -d Ubuntu`

3. Всередині WSL:

```bash
pwd
ls -la
cd ~
mkdir wsl-lab
cd wsl-lab
echo "Hello WSL" > test.txt
cat test.txt
grep Hello test.txt
```

4. Перевір шлях до Windows:

```bash
ls /mnt/c/Users/
```

5. Вийди: `exit`. (Опційно) `wsl --shutdown`

## Чекліст засвоєння

- [ ] Розумію різницю PowerShell vs WSL
- [ ] Знаю попередження про шляхи: `C:\...` vs `/home/...` vs `/mnt/c/...`
- [ ] Вмію запустити WSL: `wsl`, `wsl -d Ubuntu`
- [ ] Вмію базові bash-команди: `ls`, `cd`, `grep`, `apt`
- [ ] Тримаю Linux-проєкти в `~/`, а не на `/mnt/c/` для продуктивності
