# Урок 10 — Processes, services and ports

> **Головна мета — не вивчити всі команди Windows, а навчитися швидко знаходити потрібну команду, розуміти її ризик і застосовувати її в реальному сценарії.**

## Пояснення

Діагностика Windows = три рівні:

1. **Процеси** — запущені програми (Chrome, python.exe, node.exe)
2. **Сервіси** — фонові служби Windows (Spooler, ssh-agent, wslservice)
3. **Порти** — хто слухає 3000, 8080, 22 (dev-сервер, SSH)

Типові сценарії: зависла програма, порт зайнятий, сервіс не стартує.

## Команди PowerShell

| Команда | Що робить | Оболонка | Коли використовувати | Приклад | Типовий результат | Типові помилки | Ризик |
|---------|-----------|----------|----------------------|---------|-------------------|----------------|-------|
| `Get-Process` | Список процесів | PS | Хто працює | `Get-Process` | Таблиця PID, CPU | — | Низький |
| `Get-Process \| Where-Object` | Фільтр процесів | PS | Знайти chrome, python | `Get-Process \| Where-Object {$_.ProcessName -like "*chrome*"}` | Відфільтровані | — | Низький |
| `Stop-Process` | Завершити процес | PS | Закрити зависле | `Stop-Process -Name notepad` | Процес завершено | `Cannot find` | **Високий** |
| `Stop-Process -Force` | Примусово завершити | PS | Не реагує на close | `Stop-Process -Id 1234 -Force` | Killed | Вб'є системний | **Високий** |
| `Get-Service` | Список сервісів | PS | Стан служб | `Get-Service` | Status: Running/Stopped | — | Низький |
| `Get-Service \| Where-Object` | Фільтр сервісів | PS | Тільки running | `Get-Service \| Where-Object {$_.Status -eq "Running"}` | Running only | — | Низький |
| `Start-Service` | Запустити сервіс | PS | Увімкнути службу | `Start-Service ssh-agent` | Started | Access denied | Середній |
| `Stop-Service` | Зупинити сервіс | PS | Діагностика | `Stop-Service spooler` | Stopped | **системний збій** | **Високий** |
| `Restart-Service` | Перезапустити | PS | Після зміни конфігу | `Restart-Service wslservice` | Restarted | admin | Середній |
| `Get-NetTCPConnection` | TCP-зʼєднання | PS | Хто слухає порт | `Get-NetTCPConnection -State Listen` | LocalPort, OwningProcess | admin | Низький |

## Команди CMD

| Команда | Що робить | Оболонка | Коли використовувати | Приклад | Типовий результат | Типові помилки | Ризик |
|---------|-----------|----------|----------------------|---------|-------------------|----------------|-------|
| `tasklist` | Процеси | CMD/PS | Список PID | `tasklist` | Image Name, PID | — | Низький |
| `taskkill` | Завершити | CMD | Закрити по імені/PID | `taskkill /IM notepad.exe` | SUCCESS | `not found` | **Високий** |
| `taskkill /F` | Примусово | CMD | Завислий процес | `taskkill /F /PID 1234` | Killed | **небезпечно** | **Високий** |
| `netstat -ano` | Порти + PID | CMD/PS | Порт зайнятий? | `netstat -ano \| findstr :3000` | LISTENING 1234 | — | Низький |

## Приклади

```powershell
Get-Process
Get-Process | Where-Object {$_.ProcessName -like "*chrome*"}
Stop-Process -Name notepad

Get-Service
Get-Service | Where-Object {$_.Status -eq "Running"}

Get-NetTCPConnection -State Listen
netstat -ano | findstr :3000
```

Знайти процес за портом:

```powershell
Get-NetTCPConnection -LocalPort 3000 | Select-Object OwningProcess
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess
```

## Практичне завдання

1. Відкрий Notepad. Знайди процес:

```powershell
Get-Process notepad
tasklist | findstr notepad
```

2. Закрий безпечно: закрий вікно вручну АБО `Stop-Process -Name notepad`

3. Подивись сервіси:

```powershell
Get-Service | Where-Object {$_.Status -eq "Running"} | Select-Object -First 10
```

4. Хто слухає порти:

```powershell
Get-NetTCPConnection -State Listen | Select-Object LocalAddress, LocalPort, OwningProcess -First 15
```

5. (Якщо запускаєш dev-сервер) знайди, хто зайняв порт 3000 або 8080.

## Чекліст засвоєння

- [ ] Вмію знайти процес: `Get-Process` / `tasklist`
- [ ] Розумію, що `Stop-Process -Force` і `taskkill /F` — високий ризик
- [ ] Вмію переглянути сервіси: `Get-Service`
- [ ] Вмію знайти порт: `Get-NetTCPConnection` або `netstat -ano`
- [ ] Не зупиняю випадкові системні сервіси через `Stop-Service`
