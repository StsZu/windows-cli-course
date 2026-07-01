# Урок 6 — Network diagnostics

> **Головна мета — не вивчити всі команди Windows, а навчитися швидко знаходити потрібну команду, розуміти її ризик і застосовувати її в реальному сценарії.**

## Пояснення

Мережева діагностика на Windows — комбінація PowerShell cmdlet-ів і класичних утиліт, які працюють і в CMD. Типові сценарії:

1. Знайти IP-адресу Windows-компʼютера
2. Знайти gateway (шлюз)
3. Перевірити інтернет
4. Перевірити DNS
5. Перевірити, чи відкритий порт (SSH, HTTP)
6. Підготуватися до SSH на MikroTik або Raspberry Pi

## Команди PowerShell

| Команда | Що робить | Оболонка | Коли використовувати | Приклад | Типовий результат | Типові помилки | Ризик |
|---------|-----------|----------|----------------------|---------|-------------------|----------------|-------|
| `Get-NetIPConfiguration` | Повна IP-конфігурація | PS | Детальна діагностика | `Get-NetIPConfiguration` | Interface, IP, Gateway, DNS | Потрібні права | Низький |
| `Get-NetAdapter` | Мережеві адаптери | PS | Wi-Fi/Ethernet статус | `Get-NetAdapter` | Status: Up/Down | — | Низький |
| `Get-NetRoute` | Таблиця маршрутів | PS | Куди йде трафік | `Get-NetRoute` | Destination, NextHop | — | Низький |
| `Test-NetConnection` | Тест хоста/порту | PS | Ping + порт | `Test-NetConnection google.com -Port 443` | TcpTestSucceeded: True | Firewall block | Низький |
| `Resolve-DnsName` | DNS-запит | PS | Перевірка DNS | `Resolve-DnsName google.com` | IP-адреси | `DNS name does not exist` | Низький |
| `Get-DnsClientServerAddress` | DNS-сервери | PS | Які DNS налаштовані | `Get-DnsClientServerAddress` | ServerAddresses | — | Низький |

## Класичні команди (PS і CMD)

| Команда | Що робить | Оболонка | Коли використовувати | Приклад | Типовий результат | Типові помилки | Ризик |
|---------|-----------|----------|----------------------|---------|-------------------|----------------|-------|
| `ipconfig` | IP, mask, gateway | PS/CMD | Швидкий огляд мережі | `ipconfig` | IPv4 Address, Gateway | — | Низький |
| `ipconfig /all` | Детальна інформація | PS/CMD | MAC, DHCP, DNS | `ipconfig /all` | Повний вивід | — | Низький |
| `ping` | ICMP-тест | PS/CMD | Чи відповідає хост | `ping 8.8.8.8` | Reply from... | `timed out` | Низький |
| `tracert` | Трасування | PS/CMD | Де обривається маршрут | `tracert 8.8.8.8` | Список hop-ів | — | Низький |
| `nslookup` | DNS (класичний) | PS/CMD | Перевірка DNS | `nslookup google.com` | Address: x.x.x.x | `can't find` | Низький |
| `netstat` | Зʼєднання і порти | PS/CMD | Хто слухає порти | `netstat -ano` | LISTENING, PID | — | Низький |

## Приклади сценаріїв

```powershell
# Мій IP
ipconfig

# Детальніше
Get-NetIPConfiguration

# Інтернет працює?
ping 8.8.8.8
ping google.com

# DNS
nslookup google.com
Resolve-DnsName google.com

# Чи відкритий HTTPS?
Test-NetConnection google.com -Port 443

# Чи доступний SSH на MikroTik/Raspberry Pi?
Test-NetConnection 10.0.0.254 -Port 22
```

## Практичне завдання

1. Дізнайся свій IP:

```powershell
ipconfig | findstr IPv4
# або
(Get-NetIPConfiguration).IPv4Address.IPAddress
```

2. Перевір інтернет: `ping 8.8.8.8 -n 4`

3. Перевір DNS: `nslookup github.com`

4. Якщо є пристрій у локальній мережі (роутер, Pi, MikroTik):
   - `ping <IP>`
   - `Test-NetConnection <IP> -Port 22`

5. Запиши: твій IP, gateway, чи відкривається порт 22 на цільовому пристрої.

## Чекліст засвоєння

- [ ] Вмію знайти свій IP через `ipconfig`
- [ ] Розумію різницю між `ping` (ICMP) і `Test-NetConnection -Port` (TCP)
- [ ] Вмію перевірити DNS: `nslookup` або `Resolve-DnsName`
- [ ] Можу перевірити порт 22 перед SSH
- [ ] Знаю, що `ping` може бути заблокований firewall, але порт 22 — окремий тест
