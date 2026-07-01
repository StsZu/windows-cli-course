# Урок 2 — PowerShell basics

> **Головна мета — не вивчити всі команди Windows, а навчитися швидко знаходити потрібну команду, розуміти її ризик і застосовувати її в реальному сценарії.**

## Пояснення

**PowerShell** — головна сучасна CLI-оболонка Windows. Команди PowerShell називаються **cmdlets** (формат `Verb-Noun`: `Get-ChildItem`, `Set-Location`).

Багато коротких команд — це **alias-и** (псевдоніми), які PowerShell підтримує для зручності користувачів Mac/Linux:

| Alias | Cmdlet (повна назва) | Аналог Mac/Linux |
|-------|----------------------|------------------|
| `ls` | `Get-ChildItem` | `ls` |
| `cd` | `Set-Location` | `cd` |
| `pwd` | `Get-Location` | `pwd` |
| `cat` | `Get-Content` | `cat` |
| `rm` | `Remove-Item` | `rm` |
| `cp` | `Copy-Item` | `cp` |
| `mv` | `Move-Item` | `mv` |
| `mkdir` | `New-Item -ItemType Directory` | `mkdir` |
| `cls` | `Clear-Host` | `clear` |
| `history` | `Get-History` | `history` |
| `dir` | `Get-ChildItem` | `ls` |

**Чому краще знати повні назви:** alias-и не завжди працюють у скриптах, у CMD їх немає, а `Get-Help Get-ChildItem` дає повну довідку.

## Команди

| Команда | Що робить | Оболонка | Коли використовувати | Приклад | Типовий результат | Типові помилки | Ризик |
|---------|-----------|----------|----------------------|---------|-------------------|----------------|-------|
| `Get-Location` / `pwd` | Поточна папка | PS | Перед будь-якою операцією з файлами | `pwd` | `C:\Users\You` | — | Низький |
| `Set-Location` / `cd` | Перейти в папку | PS | Навігація | `cd Documents` | Prompt змінюється | `Cannot find path` | Низький |
| `Get-ChildItem` / `ls` | Список файлів | PS | Перегляд вмісту папки | `ls` | Таблиця файлів | — | Низький |
| `New-Item` / `mkdir` | Створити файл/папку | PS | Створення структури | `mkdir cli-test` | Directory created | — | Низький |
| `Copy-Item` / `cp` | Копіювати | PS | Резервна копія, дублювання | `cp notes.txt backup.txt` | Файл скопійовано | `already exists` | Низький |
| `Move-Item` / `mv` | Перемістити/перейменувати | PS | Реорганізація файлів | `mv old.txt new.txt` | Файл переміщено | — | Низький |
| `Remove-Item` / `rm` | Видалити | PS | Прибрати непотрібне | `rm temp.txt` | Файл видалено | `confirm` для папки | Середній |
| `Get-Content` / `cat` | Прочитати файл | PS | Перегляд вмісту | `cat notes.txt` | Текст файлу | `cannot find path` | Низький |
| `Set-Content` | Записати в файл (перезапис) | PS | Створити/замінити вміст | `Set-Content f.txt "hi"` | Файл створено/замінено | — | Низький |
| `Add-Content` | Додати рядок у файл | PS | Дописати лог | `Add-Content log.txt "entry"` | Рядок додано | — | Низький |
| `Clear-Host` / `cls` | Очистити екран | PS | Прибрати зайвий вивід | `cls` | Чистий екран | — | Низький |
| `Get-History` / `history` | Історія команд | PS | Знайти раніше введену команду | `history` | Список команд | — | Низький |
| `Get-Command` | Знайти cmdlet | PS | Дослідити доступні команди | `Get-Command *Item` | Список cmdlet-ів | — | Низький |
| `Get-Help` | Довідка | PS | Вивчити синтаксис | `Get-Help Remove-Item` | SYNOPSIS, EXAMPLES | — | Низький |

## Практичне завдання

Виконай послідовно в PowerShell:

```powershell
mkdir cli-test
cd cli-test
New-Item notes.txt
Set-Content notes.txt "Hello from PowerShell"
Get-Content notes.txt
ls
cd ..
```

Додатково:

1. Перевір alias: `Get-Alias ls` — побачиш, що це `Get-ChildItem`.
2. Спробуй повну назву: `Get-ChildItem cli-test`.
3. Видали тестову папку: `Remove-Item cli-test -Recurse` (обережно — це видалить усе всередині).

## Чекліст засвоєння

- [ ] Розумію різницю між alias (`ls`) і cmdlet (`Get-ChildItem`)
- [ ] Вмію створити папку, файл і записати текст
- [ ] Вмію прочитати файл через `Get-Content`
- [ ] Знаю, як отримати довідку: `Get-Help <команда>`
- [ ] Можу виконати базову навігацію: `pwd`, `cd`, `ls`
