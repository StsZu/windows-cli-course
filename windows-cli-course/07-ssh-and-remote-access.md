# Урок 7 — SSH and remote access

> **Головна мета — не вивчити всі команди Windows, а навчитися швидко знаходити потрібну команду, розуміти її ризик і застосовувати її в реальному сценарії.**

## Пояснення

**SSH** (Secure Shell) — зашифроване підключення до віддаленої консолі. На Mac/Linux це стандарт; у Windows 10/11 SSH-клієнт вбудований (OpenSSH Client).

**SCP** — копіювання файлів через SSH (аналог `scp` на Linux).

Типові цілі з Windows:

- **MikroTik** — `ssh admin@192.168.88.1` (RouterOS)
- **Raspberry Pi** — `ssh pi@raspberrypi.local` або `ssh user@10.0.0.50`
- **Linux-сервер** — `ssh deploy@server.example.com`

### Чекліст перед SSH

Перед SSH перевір:

1. Чи правильна IP-адреса або hostname.
2. Чи пристрій у тій самій мережі або доступний через VPN.
3. Чи працює ping.
4. Чи відкритий порт 22.
5. Чи правильний username.
6. Чи SSH увімкнений на віддаленому пристрої.

## Команди

| Команда | Що робить | Оболонка | Коли використовувати | Приклад | Типовий результат | Типові помилки | Ризик |
|---------|-----------|----------|----------------------|---------|-------------------|----------------|-------|
| `Get-Command ssh` | Перевірити SSH-клієнт | PS | Перед першим підключенням | `Get-Command ssh` | `ssh.exe` path | `not recognized` — встановити OpenSSH | Низький |
| `Get-Command scp` | Перевірити SCP | PS | Перед копіюванням файлів | `Get-Command scp` | `scp.exe` path | Не встановлено | Низький |
| `ssh user@host` | Підключення SSH | PS/CMD/WSL | Віддалена консоль | `ssh Stas@10.0.0.254` | Запит пароля / shell | `Connection refused`, `timed out` | Низький |
| `scp file user@host:path` | Копіювати файл | PS/CMD/WSL | Бекап, деплой | `scp .\backup.rsc Stas@10.0.0.254:` | Прогрес копіювання | `Permission denied` | Середній |
| `Test-NetConnection -Port 22` | Тест порту SSH | PS | Діагностика перед ssh | `Test-NetConnection 10.0.0.254 -Port 22` | `TcpTestSucceeded : True` | False — SSH вимкнений/firewall | Низький |

## Приклади

### MikroTik

```powershell
# Перевірка
Test-NetConnection 10.0.0.254 -Port 22
ping 10.0.0.254

# Підключення (типовий user на RouterOS — admin або твій)
ssh Stas@10.0.0.254

# Завантажити backup конфігурації на Windows
scp Stas@10.0.0.254:flash/backup.rsc .\backup.rsc
```

### Raspberry Pi

```powershell
Test-NetConnection raspberrypi.local -Port 22
ssh stanislav@raspberrypi.local
# або за IP
ssh stanislav@10.0.0.50
```

### Загальний сервер

```powershell
ssh deploy@server.example.com
scp .\app.tar.gz deploy@server.example.com:/home/deploy/
```

## Типові помилки і рішення

| Помилка | Причина | Що робити |
|---------|---------|-----------|
| `ssh: command not found` | OpenSSH Client не встановлений | Settings → Apps → Optional Features → OpenSSH Client |
| `Connection timed out` | Немає маршруту, firewall, wrong IP | `ping`, `Test-NetConnection -Port 22` |
| `Connection refused` | SSH не запущений на цілі | Увімкнути SSH на Pi/MikroTik/сервері |
| `Permission denied` | Невірний пароль/ключ | Перевір user, ключ `~/.ssh/id_rsa` |
| `Host key verification failed` | Змінився ключ хоста | Обережно: `ssh-keygen -R host` |

## Практичне завдання

1. Перевір наявність SSH:

```powershell
Get-Command ssh
Get-Command scp
ssh -V
```

2. Обери ціль (MikroTik, Pi або тестовий Linux у WSL/VM) і виконай чекліст:

```powershell
ping <host-ip>
Test-NetConnection <host-ip> -Port 22
ssh <user>@<host-ip>
```

3. Після входу — виконай одну команду (`uname -a` на Linux, `/system resource print` на MikroTik).
4. Вийди: `exit`
5. (Опційно) Скопіюй маленький текстовий файл через `scp`.

## Чекліст засвоєння

- [ ] Пройшов усі 6 пунктів чекліста перед SSH
- [ ] Вмію перевірити порт 22 через `Test-NetConnection`
- [ ] Підключився до MikroTik або Raspberry Pi (або тестового хоста)
- [ ] Розумію різницю між `ssh` (консоль) і `scp` (файли)
- [ ] Знаю, як встановити OpenSSH Client, якщо `Get-Command ssh` не знаходить
