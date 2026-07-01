# Урок 8 — Git and GitHub

> **Головна мета — не вивчити всі команди Windows, а навчитися швидко знаходити потрібну команду, розуміти її ризик і застосовувати її в реальному сценарії.**

## Пояснення

Git на Windows працює так само, як на Mac/Linux — через **Git for Windows** (включає `git.exe` і опційно Git Bash). Команди однакові в PowerShell, CMD і WSL; різниця лише в шляхах (`C:\Projects` vs `/mnt/c/Projects`).

**GitHub CLI (`gh`)** — офіційний CLI для GitHub: авторизація, перегляд репозиторіїв, PR без браузера.

## Команди

| Команда | Що робить | Оболонка | Коли використовувати | Приклад | Типовий результат | Типові помилки | Ризик |
|---------|-----------|----------|----------------------|---------|-------------------|----------------|-------|
| `git --version` | Версія Git | PS/CMD/WSL | Перевірка встановлення | `git --version` | `git version 2.x` | `not recognized` | Низький |
| `git clone <repo>` | Клонувати репо | PS/CMD/WSL | Початок роботи з проєктом | `git clone https://github.com/user/project.git` | Папка project/ | `Authentication failed` | Низький |
| `git status` | Стан робочої копії | PS/CMD/WSL | Перед commit | `git status` | modified/untracked | `not a git repository` | Низький |
| `git add .` | Додати зміни в stage | PS/CMD/WSL | Підготовка commit | `git add .` | — | — | Низький |
| `git commit -m "msg"` | Зафіксувати зміни | PS/CMD/WSL | Локальний знімок | `git commit -m "fix readme"` | `[main abc123]` | `nothing to commit` | Низький |
| `git push` | Відправити на remote | PS/CMD/WSL | Поділитися з командою | `git push` | `main -> main` | `rejected`, auth | Середній |
| `git pull` | Підтягнути з remote | PS/CMD/WSL | Оновити локальну копію | `git pull` | Fast-forward / merge | `conflict` | Середній |
| `git log --oneline` | Історія commit-ів | PS/CMD/WSL | Що змінювалось | `git log --oneline -10` | Список commit-ів | — | Низький |
| `git branch` | Гілки | PS/CMD/WSL | Поточна/список гілок | `git branch` | `* main` | — | Низький |
| `git diff` | Різниця змін | PS/CMD/WSL | Перед commit | `git diff` | +/- рядки | — | Низький |
| `git restore <file>` | Скасувати зміни файлу | PS/CMD/WSL | Відкотити незбережене | `git restore README.md` | Файл відновлено | — | Середній |
| `gh auth status` | Статус GitHub CLI | PS/CMD | Чи залогінений | `gh auth status` | `Logged in to github.com` | `not logged in` | Низький |
| `gh repo view` | Перегляд репо | PS/CMD | Інфо без браузера | `gh repo view` | README, stats | — | Низький |

## Типовий workflow

```powershell
cd C:\Projects
git clone https://github.com/user/project.git
cd project
git status
git pull
git diff
# ... редагування ...
git add .
git commit -m "Update config"
git push
```

## Практичне завдання

1. Перевір Git:

```powershell
Get-Command git
git --version
```

2. Клонуй публічний репозиторій (або свій):

```powershell
cd ~
mkdir Projects -ErrorAction SilentlyContinue
cd Projects
git clone https://github.com/github/gitignore.git test-repo
cd test-repo
```

3. Виконай:

```powershell
git status
git log --oneline -5
git branch
```

4. (Опційно) Якщо є `gh`:

```powershell
gh auth status
gh repo view --web
```

5. Видали тест: `cd ..` → `Remove-Item test-repo -Recurse`

## Чекліст засвоєння

- [ ] Git працює в PowerShell (`git --version`)
- [ ] Вмію клонувати, перевірити статус, подивитися diff
- [ ] Розумію ланцюжок: `add` → `commit` → `push`
- [ ] Вмію підтягнути зміни: `git pull`
- [ ] Знаю, що `git push --force` — високий ризик (не в цьому уроці, але памʼятай)
