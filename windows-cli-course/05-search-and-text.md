# Урок 5 — Search and text

> **Головна мета — не вивчити всі команди Windows, а навчитися швидко знаходити потрібну команду, розуміти її ризик і застосовувати її в реальному сценарії.**

## Пояснення

Пошук файлів і тексту — щоденна інженерна задача. PowerShell працює з **обʼєктами** (файли, рядки — це обʼєкти з властивостями), а не лише з текстом як CMD. Це дає потужні пайплайни: `Get-ChildItem | Where-Object | Select-String`.

CMD-аналоги простіші, але менш гнучкі — корисні, коли потрапиш у чужу CMD-інструкцію.

## Команди PowerShell

| Команда | Що робить | Оболонка | Коли використовувати | Приклад | Типовий результат | Типові помилки | Ризик |
|---------|-----------|----------|----------------------|---------|-------------------|----------------|-------|
| `Get-ChildItem` | Список файлів | PS | Базовий перегляд | `ls` | Файли в папці | — | Низький |
| `Get-ChildItem -Recurse` | Рекурсивний список | PS | Знайти файли в підпапках | `Get-ChildItem -Recurse` | Усі файли дерева | Повільно на великих дисках | Низький |
| `Get-ChildItem -Filter` | Фільтр за маскою | PS | Тільки `.md`, `.py` | `Get-ChildItem -Recurse -Filter "*.md"` | Список .md файлів | — | Низький |
| `Select-String` | Пошук тексту (grep) | PS | Знайти TODO, error | `Select-String "TODO" -Path .\* -Recurse` | Рядки з збігами | — | Низький |
| `Where-Object` | Фільтр обʼєктів | PS | Файли > 1MB, старі | `ls \| Where-Object {$_.Length -gt 1MB}` | Відфільтрований список | Синтаксис `$_` | Низький |
| `Measure-Object` | Підрахунок | PS | Кількість рядків/файлів | `Get-Content f.txt \| Measure-Object -Line` | Lines: 42 | — | Низький |
| `Sort-Object` | Сортування | PS | За датою, розміром | `ls \| Sort-Object Length -Descending` | Відсортований список | — | Низький |
| `Get-Content` | Читати файл | PS | Перегляд вмісту | `Get-Content .\README.md` | Текст | — | Низький |
| `Set-Content` | Записати файл | PS | Створити/замінити | `Set-Content out.txt "result"` | Файл записано | — | Низький |
| `Add-Content` | Дописати | PS | Додати рядок | `Add-Content log.txt "new"` | Рядок додано | — | Низький |

## Команди CMD (аналоги)

| Команда | Що робить | Оболонка | Коли використовувати | Приклад | Типовий результат | Типові помилки | Ризик |
|---------|-----------|----------|----------------------|---------|-------------------|----------------|-------|
| `dir /s` | Рекурсивний список | CMD | Пошук файлів у підпапках | `dir /s *.md` | Список .md | Повільно | Низький |
| `findstr` | Пошук тексту | CMD | grep-аналог | `findstr "TODO" *.md` | Рядки з TODO | — | Низький |
| `type` | Показати файл | CMD | Читання | `type README.md` | Вміст | — | Низький |

## Приклади

```powershell
Get-ChildItem -Recurse -Filter "*.md"
Select-String "TODO" -Path .\* -Recurse
Get-Content .\README.md
Get-Content .\README.md | Measure-Object -Line
```

CMD:

```cmd
dir /s *.md
findstr "TODO" *.md
type README.md
```

## Практичне завдання

1. У папці проєкту (або `Documents`):

```powershell
Get-ChildItem -Recurse -Filter "*.txt" | Select-Object FullName, Length
Select-String "error" -Path .\* -Recurse -ErrorAction SilentlyContinue
Get-Content .\README.md -ErrorAction SilentlyContinue | Measure-Object -Line
```

2. Створи тестові файли:

```powershell
mkdir search-lab
cd search-lab
Set-Content a.txt "TODO: fix bug"
Set-Content b.txt "done"
Set-Content sub\c.txt "TODO: review"
mkdir sub
Move-Item sub\c.txt sub\ -ErrorAction SilentlyContinue
```

3. Знайди всі `TODO`:

```powershell
Select-String "TODO" -Path .\* -Recurse
```

4. Підрахуй рядки: `(Get-Content a.txt | Measure-Object -Line).Lines`

## Чекліст засвоєння

- [ ] Вмію шукати файли за розширенням: `-Filter "*.md"`
- [ ] Вмію шукати текст через `Select-String` (аналог `grep`)
- [ ] Розумію, що PowerShell повертає обʼєкти, які можна фільтрувати
- [ ] Знаю CMD-аналоги: `dir /s`, `findstr`
- [ ] Можу порахувати рядки через `Measure-Object -Line`
