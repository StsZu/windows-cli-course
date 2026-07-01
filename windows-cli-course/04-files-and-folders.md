# Урок 4 — Files and folders

> **Головна мета — не вивчити всі команди Windows, а навчитися швидко знаходити потрібну команду, розуміти її ризик і застосовувати її в реальному сценарії.**

## Пояснення

Робота з файлами і папками — щоденна задача. У PowerShell усі операції будуються на cmdlet-ах з префіксами `Get-`, `Set-`, `New-`, `Copy-`, `Move-`, `Remove-`, `Rename-`.

### Різниця між варіантами видалення

```powershell
Remove-Item file.txt              # один файл — низький ризик
Remove-Item folder                # папка: запитає підтвердження, якщо не порожня
Remove-Item folder -Recurse       # папка з усім вмістом — середній ризик
Remove-Item folder -Recurse -Force # без підтвердження, примусово — ВИСОКИЙ РИЗИК
```

**`Remove-Item -Recurse -Force`** — найнебезпечніша комбінація для файлів. Видаляє рекурсивно без запитань. Перед запуском завжди перевір `pwd` і шлях.

## Команди

| Команда | Що робить | Оболонка | Коли використовувати | Приклад | Типовий результат | Типові помилки | Ризик |
|---------|-----------|----------|----------------------|---------|-------------------|----------------|-------|
| `pwd` / `Get-Location` | Поточна папка | PS | Перед видаленням/копіюванням | `pwd` | `C:\Projects` | — | Низький |
| `ls` / `Get-ChildItem` | Список файлів | PS | Перегляд вмісту | `ls` | Таблиця файлів | — | Низький |
| `cd` / `Set-Location` | Перейти | PS | Навігація | `cd C:\Projects` | Prompt змінюється | `Cannot find path` | Низький |
| `cd ..` | На рівень вище | PS | Повернутися | `cd ..` | Батьківська папка | — | Низький |
| `cd ~` | Домашня папка | PS | Швидко в профіль | `cd ~` | `C:\Users\You` | — | Низький |
| `mkdir` | Створити папку | PS | Нова директорія | `mkdir demo` | Directory created | — | Низький |
| `New-Item` | Створити файл/папку | PS | Точний контроль типу | `New-Item README.md` | File created | — | Низький |
| `Copy-Item` | Копіювати | PS | Резервна копія | `Copy-Item a.txt b.txt` | Копія створена | — | Низький |
| `Move-Item` | Перемістити | PS | Реорганізація | `Move-Item a.txt sub\a.txt` | Переміщено | — | Низький |
| `Rename-Item` | Перейменувати | PS | Зміна імені | `Rename-Item a.md b.md` | Перейменовано | `already exists` | Низький |
| `Get-Content` | Прочитати | PS | Перегляд файлу | `Get-Content README.md` | Текст | `cannot find` | Низький |
| `Set-Content` | Записати (замінити) | PS | Створити/перезаписати | `Set-Content f.txt "# Title"` | Файл записано | — | Низький |
| `Add-Content` | Дописати | PS | Логи, нотатки | `Add-Content log.txt "line"` | Рядок додано | — | Низький |
| `Remove-Item file` | Видалити файл | PS | Один файл | `Remove-Item temp.txt` | Видалено | — | Низький |
| `Remove-Item -Recurse` | Видалити папку з вмістом | PS | Очистити проєкт | `Remove-Item demo -Recurse` | Папка видалена | Запит confirm | Середній |
| `Remove-Item -Recurse -Force` | Примусове рекурсивне видалення | PS | Тільки коли впевнений | `Remove-Item old -Recurse -Force` | Видалено без запиту | Видалить НЕ ТЕ | **Високий** |

## Приклад робочого сценарію

```powershell
mkdir C:\Projects
cd C:\Projects
mkdir demo
cd demo
New-Item README.md
Set-Content README.md "# Demo project"
Get-Content README.md
Rename-Item README.md NOTES.md
ls
cd ..
```

## Практичне завдання

1. Створи структуру:

```powershell
cd ~
mkdir cli-files-lab
cd cli-files-lab
mkdir src, docs, backup
New-Item src\main.txt
Set-Content src\main.txt "version 1"
Copy-Item src\main.txt backup\main-backup.txt
Move-Item docs -Destination archive-docs -ErrorAction SilentlyContinue; mkdir docs
Rename-Item src\main.txt src\app.txt
Get-Content backup\main-backup.txt
```

2. Перевір `pwd` і `ls -Recurse` (або `Get-ChildItem -Recurse`).
3. Видали **тільки** папку `backup` через `Remove-Item backup -Recurse` (без `-Force` спочатку).
4. Прибери лабораторію: `cd ..` → `Remove-Item cli-files-lab -Recurse`.

## Чекліст засвоєння

- [ ] Завжди перевіряю `pwd` перед `Remove-Item`
- [ ] Розумію різницю між `-Recurse` і `-Recurse -Force`
- [ ] Вмію створити файл через `New-Item` і записати через `Set-Content`
- [ ] Вмію копіювати і перейменовувати без втрати даних
- [ ] Ніколи не запускаю `Remove-Item -Recurse -Force` без перевірки шляху
