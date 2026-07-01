const GOAL = "Головна мета — не вивчити всі команди Windows, а навчитися швидко знаходити потрібну команду, розуміти її ризик і застосовувати її в реальному сценарії.";

const UK_HINTS = {
  "$PSVersionTable": "Версія PowerShell — перевір, що працюєш у PS 5 або 7.",
  "Get-Host": "Інформація про поточну оболонку (Name, Version).",
  "whoami": "Поточний користувач Windows.",
  "hostname": "Ім'я комп'ютера в мережі (DESKTOP-…).",
  "pwd": "Alias для Get-Location — поточна папка.",
  "Get-Location": "Повний шлях до поточної директорії.",
  "Get-Command git": "Чи встановлена команда git і де вона.",
  "Get-Command ssh": "Перевірка наявності OpenSSH client у Windows.",
  "Get-Command python": "Шлях до Python у $env:Path.",
  "echo $env:Path": "Список папок пошуку програм (PATH).",
  "$env:Path -split ';'": "PATH по одному шляху на рядок.",
  "Get-Help Get-ChildItem": "Довідка PowerShell для команди (cmdlet).",
  "ver": "Версія Windows (CMD).",
  "where git": "Де знаходиться git.exe (CMD).",
  "echo %PATH%": "PATH у CMD-синтаксисі.",
  "ls": "Alias → Get-ChildItem — список файлів.",
  "cd cli-test": "Alias → Set-Location — перехід у папку.",
  "mkdir cli-test": "Створює папку cli-test.",
  "New-Item notes.txt": "Створює новий файл або папку.",
  "Set-Content notes.txt \"Hello\"": "Записує текст у файл.",
  "Get-Content notes.txt": "Читає вміст файлу (alias: cat).",
  "Clear-Host": "Очищує екран (alias: cls).",
  "Get-History": "Історія команд PowerShell.",
  "dir": "CMD: список файлів (аналог ls).",
  "copy notes.txt backup.txt": "CMD: копіювання файлу.",
  "type notes.txt": "CMD: показати вміст файлу.",
  "del notes.txt": "CMD: видалити файл.",
  "tasklist": "CMD: список процесів.",
  "Copy-Item file.txt backup.txt": "Копіює файл або папку.",
  "Move-Item old.txt new.txt": "Переміщує/перейменовує.",
  "Remove-Item file.txt": "Видаляє файл.",
  "Remove-Item folder -Recurse -Force": "⚠ ВИСОКИЙ РИЗИК: рекурсивне примусове видалення!",
  "Rename-Item README.md NOTES.md": "Перейменовує файл.",
  "Get-ChildItem -Recurse -Filter \"*.md\"": "Рекурсивний пошук .md файлів.",
  "Select-String \"TODO\" -Path .\\* -Recurse": "Пошук тексту у файлах (аналог grep).",
  "findstr \"TODO\" *.md": "CMD: пошук тексту у файлах.",
  "ipconfig": "IP-адреса, gateway, DNS (PS і CMD).",
  "Get-NetIPConfiguration": "Детальна мережева конфігурація PowerShell.",
  "ping 8.8.8.8": "Перевірка доступності хоста.",
  "Test-NetConnection google.com -Port 443": "Перевірка TCP-порту (тут 443).",
  "Test-NetConnection 10.0.0.254 -Port 22": "Чи відкритий SSH на MikroTik (порт 22).",
  "tracert 8.8.8.8": "Маршрут пакетів до хоста.",
  "nslookup google.com": "DNS-запит.",
  "ssh Stas@10.0.0.254": "SSH до MikroTik роутера.",
  "ssh stanislav@raspberrypi.local": "SSH до Raspberry Pi.",
  "scp .\\backup.rsc Stas@10.0.0.254:": "Копіює файл на віддалений сервер.",
  "git status": "Стан Git-репозиторію.",
  "git clone https://github.com/user/project.git": "Клонує проєкт на диск.",
  "git pull": "Підтягує зміни з GitHub.",
  "gh auth status": "Статус GitHub CLI.",
  "python --version": "Версія Python на Windows.",
  "node --version": "Версія Node.js.",
  "winget search Git": "Пошук пакету в Windows Package Manager.",
  "winget install Git.Git": "Встановлює Git через winget.",
  "choco install git": "Встановлює через Chocolatey (якщо є).",
  "Get-Process": "Список запущених процесів.",
  "Stop-Process -Name notepad": "⚠ Завершує процес за іменем.",
  "Get-Service": "Список Windows-сервісів.",
  "Get-NetTCPConnection -State Listen": "Порти, що слухають з'єднання.",
  "netstat -ano": "CMD: мережеві з'єднання + PID.",
  "wsl --status": "Статус WSL на Windows.",
  "wsl --list --verbose": "Список дистрибутивів WSL.",
  "wsl": "Запускає default Linux (Ubuntu) у WSL.",
  "wsl -d Ubuntu": "Запуск конкретного дистрибутиву.",
  "iwr https://example.com/install.ps1 | iex": "⚠ Завантажує і виконує скрипт з інтернету!",
  "Set-ExecutionPolicy RemoteSigned": "⚠ Змінює політику виконання PS-скриптів."
};

const MODULES = {
  terminal: {
    id: "terminal", title: "1. Windows Terminal",
    intro: "Terminal vs shell, PowerShell, CMD, WSL, PATH.",
    commands: [
      "$PSVersionTable", "Get-Host", "whoami", "hostname", "pwd", "Get-Location",
      "Get-Command git", "Get-Command ssh", "Get-Command python",
      "echo $env:Path", "$env:Path -split ';'", "Get-Help Get-ChildItem",
      "ver", "where git", "echo %PATH%"
    ]
  },
  powershell: {
    id: "powershell", title: "2. PowerShell basics",
    intro: "Cmdlets, alias-и: ls→Get-ChildItem, cd→Set-Location.",
    commands: [
      "pwd", "ls", "cd cli-test", "mkdir cli-test",
      "New-Item notes.txt", "Set-Content notes.txt \"Hello\"",
      "Get-Content notes.txt", "Clear-Host", "Get-History"
    ]
  },
  cmd: {
    id: "cmd", title: "3. CMD basics",
    intro: "Класична CMD — dir, copy, del, tasklist.",
    commands: [
      "dir", "copy notes.txt backup.txt", "type notes.txt",
      "del notes.txt", "tasklist", "ipconfig", "ping 8.8.8.8"
    ]
  },
  files: {
    id: "files", title: "4. Файли та папки",
    intro: "New-Item, Copy-Item, Remove-Item — робота з проєктами.",
    commands: [
      "pwd", "ls", "mkdir cli-test", "New-Item notes.txt",
      "Copy-Item file.txt backup.txt", "Move-Item old.txt new.txt",
      "Get-Content notes.txt", "Set-Content notes.txt \"Hello\"",
      "Rename-Item README.md NOTES.md",
      "Remove-Item file.txt", "Remove-Item folder -Recurse -Force"
    ]
  },
  search: {
    id: "search", title: "5. Пошук і текст",
    intro: "Select-String (grep), рекурсивний Get-ChildItem.",
    commands: [
      "Get-ChildItem -Recurse -Filter \"*.md\"",
      "Select-String \"TODO\" -Path .\\* -Recurse",
      "findstr \"TODO\" *.md"
    ]
  },
  network: {
    id: "network", title: "6. Мережева діагностика",
    intro: "IP, gateway, ping, Test-NetConnection, DNS.",
    commands: [
      "ipconfig", "Get-NetIPConfiguration",
      "ping 8.8.8.8", "tracert 8.8.8.8", "nslookup google.com",
      "Test-NetConnection google.com -Port 443",
      "Test-NetConnection 10.0.0.254 -Port 22"
    ]
  },
  ssh: {
    id: "ssh", title: "7. SSH і віддалений доступ",
    intro: "SSH/SCP до MikroTik, Raspberry Pi, серверів.",
    commands: [
      "Get-Command ssh", "Test-NetConnection 10.0.0.254 -Port 22",
      "ssh Stas@10.0.0.254", "ssh stanislav@raspberrypi.local",
      "scp .\\backup.rsc Stas@10.0.0.254:"
    ]
  },
  git: {
    id: "git", title: "8. Git і GitHub",
    intro: "clone, status, pull, diff, gh CLI.",
    commands: [
      "git status", "git clone https://github.com/user/project.git",
      "git pull", "gh auth status"
    ]
  },
  packages: {
    id: "packages", title: "9. Python, Node, winget",
    intro: "python, node, npm, winget, choco — не змішуй «зоопарк версій».",
    commands: [
      "python --version", "node --version",
      "winget search Git", "winget install Git.Git", "choco install git"
    ]
  },
  processes: {
    id: "processes", title: "10. Процеси, сервіси, порти",
    intro: "Get-Process, Get-Service, Get-NetTCPConnection.",
    commands: [
      "Get-Process", "Stop-Process -Name notepad",
      "Get-Service", "Get-NetTCPConnection -State Listen", "netstat -ano"
    ]
  },
  wsl: {
    id: "wsl", title: "11. WSL Linux",
    intro: "Linux всередині Windows — apt, ssh, інші шляхи.",
    commands: [
      "wsl --status", "wsl --list --verbose", "wsl", "wsl -d Ubuntu"
    ]
  },
  danger: {
    id: "danger", title: "12. Небезпечні команди",
    intro: "Remove-Item -Force, iwr|iex, Set-ExecutionPolicy.",
    commands: [
      "Remove-Item folder -Recurse -Force",
      "iwr https://example.com/install.ps1 | iex",
      "Set-ExecutionPolicy RemoteSigned"
    ]
  },
  practice: {
    id: "practice", title: "13. Щоденна практика",
    intro: "14-денний план: Terminal → Git → SSH → WSL.",
    commands: [
      "pwd", "ls", "git status", "ssh Stas@10.0.0.254",
      "winget search Git", "wsl --status", "Get-Process"
    ]
  }
};

const SIM = {
  user: "Stas", host: "DESKTOP-WIN", shell: "PowerShell",
  cwd: "C:\\Users\\Stas\\Projects",
  ip: "192.168.1.100", gateway: "192.168.1.1",
  mode: "ps",
  files: { "notes.txt": "Hello from PowerShell\n", "README.md": "# Demo\n" },
  dirs: ["cli-test", "demo"],
  wslActive: false
};

const state = {
  currentModule: "terminal",
  history: [], histIdx: -1,
  triedByModule: Object.fromEntries(Object.keys(MODULES).map(k => [k, new Set()])),
  selectedScenario: null,
  testMode: { active: false, queue: [], index: 0, correct: 0, wrong: 0 }
};

const SCENARIOS = Object.values(MODULES).map((m, i) => ({
  id: i + 1, moduleId: m.id, title: m.title, desc: m.intro, commands: m.commands.length
}));
state.selectedScenario = SCENARIOS[0];

const livePanel = document.getElementById("livePanel");
const outputStatus = document.getElementById("outputStatus");
const cmdInput = document.getElementById("cmdInput");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const cmdChecklist = document.getElementById("cmdChecklist");
const moduleBadge = document.getElementById("moduleBadge");
const moduleNav = document.getElementById("moduleNav");
const termTitle = document.getElementById("termTitle");
const promptLabel = document.getElementById("promptLabel");
let viewChunks = [];

function esc(s) { return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
function getModule() { return MODULES[state.currentModule]; }
function getCurrentCommands() { return getModule().commands; }
function getTried() { return state.triedByModule[state.currentModule]; }

function beginView(cmd) {
  viewChunks = [];
  if (cmd != null) viewChunks.push(`<div class="line-user">${esc(promptLabel.textContent)} ${esc(cmd)}</div>`);
}
function ukHint(t) { return `<div class="line-uk-hint">${esc(t)}</div>`; }
function printResult(title, body, type = "ok", hint = null) {
  const cls = type === "warn" ? "result-box warn" : type === "purple" ? "result-box purple" : type === "danger" ? "result-box danger" : "result-box";
  viewChunks.push(`<div class="${cls}"><div class="result-title">${esc(title)}</div>${body}${hint ? ukHint(hint) : ""}</div>`);
}
function flushView(s) {
  livePanel.innerHTML = viewChunks.join("");
  livePanel.scrollTop = livePanel.scrollHeight;
  if (s) outputStatus.textContent = s;
}

function updatePrompt() {
  if (SIM.wslActive) {
    promptLabel.textContent = "stas@DESKTOP-WIN:/home/stas/projects$";
    termTitle.textContent = "Windows Terminal — WSL Ubuntu — stas@DESKTOP-WIN";
    return;
  }
  if (SIM.mode === "cmd") {
    promptLabel.textContent = `${SIM.cwd}>`;
    termTitle.textContent = "Windows Terminal — CMD — Stas@DESKTOP";
    return;
  }
  promptLabel.textContent = `PS ${SIM.cwd}>`;
  termTitle.textContent = "Windows Terminal — PowerShell 7 — Stas@DESKTOP";
}

function findListedCommand(cmd, commands) {
  if (commands.includes(cmd)) return cmd;
  return commands.find(x => {
    if (cmd === x) return true;
    const b = x.split(" ")[0];
    return cmd === b || cmd.startsWith(b + " ") || (x.includes("|") && cmd.includes("|"));
  }) || null;
}

function isInCurrentModule(cmd) { return !!findListedCommand(cmd, getCurrentCommands()); }
function findModuleForCommand(cmd) {
  for (const mod of Object.values(MODULES)) {
    if (findListedCommand(cmd, mod.commands)) return mod.id;
  }
  return null;
}
function getHint(cmd, listed) { return UK_HINTS[listed] || UK_HINTS[cmd] || null; }

function markTried(cmd) {
  const norm = findListedCommand(cmd, getCurrentCommands());
  if (norm) { getTried().add(norm); updateProgress(); updateModuleNav(); }
}

function updateProgress() {
  const cmds = getCurrentCommands();
  const n = getTried().size;
  moduleBadge.textContent = getModule().title;
  progressBar.style.width = cmds.length ? `${(n / cmds.length) * 100}%` : "0%";
  progressText.textContent = `${n} / ${cmds.length} команд`;
  cmdChecklist.querySelectorAll("li").forEach(li => {
    li.classList.toggle("done", getTried().has(li.dataset.cmd));
  });
  updatePrompt();
}

function updateModuleNav() {
  moduleNav.innerHTML = Object.values(MODULES).map(mod => {
    const t = state.triedByModule[mod.id];
    const pct = mod.commands.length ? Math.round((t.size / mod.commands.length) * 100) : 0;
    const act = mod.id === state.currentModule ? " active" : "";
    return `<button type="button" class="btn${act}" data-module="${mod.id}">${esc(mod.title)} · ${t.size}/${mod.commands.length} (${pct}%)</button>`;
  }).join("");
  moduleNav.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => switchModule(btn.dataset.module));
  });
}

function buildChecklist() {
  cmdChecklist.innerHTML = getCurrentCommands().map(c =>
    `<li data-cmd="${esc(c)}" title="Клік — виконати"><code>${esc(c)}</code></li>`
  ).join("");
  cmdChecklist.querySelectorAll("li").forEach(li => {
    li.addEventListener("click", () => { execute(li.dataset.cmd); cmdInput.value = ""; cmdInput.focus(); });
  });
  updateProgress();
  updateModuleNav();
}

function switchModule(id, showWelcome = true) {
  if (!MODULES[id]) return;
  state.currentModule = id;
  if (id === "cmd") { SIM.mode = "cmd"; } else if (id !== "wsl") { SIM.mode = "ps"; SIM.wslActive = false; }
  buildChecklist();
  updatePrompt();
  if (!showWelcome) return;
  beginView(null);
  const m = getModule();
  printResult(`Розділ: ${m.title}`, `
    <span class="line-muted">${esc(m.intro)}</span><br>
    <span class="line-hl">Команд:</span> ${m.commands.length}
  `, "purple", GOAL);
  flushView(`PS · ${m.title}`);
}

function resetState() {
  SIM.cwd = "C:\\Users\\Stas\\Projects";
  SIM.mode = "ps"; SIM.wslActive = false;
  SIM.files = { "notes.txt": "Hello from PowerShell\n", "README.md": "# Demo\n" };
  SIM.dirs = ["cli-test", "demo"];
  updatePrompt();
}

function welcome() {
  beginView(null);
  print(`<span class="line-muted">Windows CLI Trainer — PowerShell / CMD / WSL (емуляція)</span>`);
  printResult("Почни з Windows Terminal", `
    <span class="line-cmd">$PSVersionTable</span> · <span class="line-cmd">pwd</span> · <span class="line-cmd">Get-Command ssh</span><br>
    <span class="line-muted">13 розділів · winget · MikroTik SSH</span>
  `, "ok", GOAL);
  flushView("PS · Windows CLI емулятор");
}

function handleCommand(cmd) {
  const lower = cmd.toLowerCase().trim();
  const listed = findListedCommand(cmd, getCurrentCommands()) || cmd;
  const hint = getHint(cmd, listed);
  const owner = findModuleForCommand(cmd);

  if (!isInCurrentModule(cmd) && owner && owner !== state.currentModule) {
    print(`<span class="line-warn">⚠ «${esc(cmd)}» — у «${esc(MODULES[owner].title)}»</span>`);
  }

  if (lower === "$psversiontable") {
    printResult(cmd, `<span class="line-ok">PSVersion 7.4.2<br>PSEdition Core</span>`, "ok", hint);
    return true;
  }
  if (lower === "get-host") {
    printResult(cmd, `<span class="line-ok">Name: ConsoleHost<br>Version: 7.4.2</span>`, "ok", hint);
    return true;
  }
  if (lower === "whoami" || lower === "hostname") {
    const v = lower === "whoami" ? `${SIM.user}\\Desktop` : SIM.host;
    printResult(cmd, `<span class="line-ok">${esc(v)}</span>`, "ok", hint);
    return true;
  }
  if (lower === "pwd" || lower === "get-location") {
    printResult(cmd, `<span class="line-ok">${esc(SIM.cwd)}</span><br><span class="line-muted">(Get-Location)</span>`, "ok", hint);
    return true;
  }
  if (lower.startsWith("get-command ")) {
    const tool = cmd.split(" ").pop();
    printResult(cmd, `<span class="line-ok">C:\\Program Files\\Git\\cmd\\${esc(tool)}.exe</span>`, "ok", hint);
    return true;
  }
  if (lower === "echo $env:path") {
    printResult(cmd, `<span class="line-ok">C:\\Windows\\System32;C:\\Program Files\\Git\\cmd;…</span>`, "ok", hint);
    return true;
  }
  if (lower.includes("$env:path") && lower.includes("split")) {
    printResult(cmd, `<span class="line-ok">C:\\Windows\\System32<br>C:\\Program Files\\Git\\cmd</span>`, "ok", hint);
    return true;
  }
  if (lower.startsWith("get-help ")) {
    printResult(cmd, `<span class="line-muted">NAME Get-ChildItem — Gets items (emulated). Press Q to exit.</span>`, "ok", hint);
    return true;
  }
  if (lower === "ver") {
    printResult(cmd, `<span class="line-ok">Microsoft Windows [Version 10.0.22631.3880]</span>`, "ok", hint);
    return true;
  }
  if (lower.startsWith("where ")) {
    printResult(cmd, `<span class="line-ok">C:\\Program Files\\Git\\cmd\\git.exe</span>`, "ok", hint);
    return true;
  }
  if (lower === "echo %path%") {
    printResult(cmd, `<span class="line-ok">C:\\Windows\\System32;C:\\Program Files\\Git\\cmd</span>`, "ok", hint);
    return true;
  }

  if (lower === "clear-host" || lower === "cls") { welcome(); return true; }
  if (lower === "get-history" || lower === "history") {
    const lines = state.history.length ? state.history.map((h,i) => `${i+1} ${esc(h)}`).join("<br>") : "(empty)";
    printResult(cmd, `<span class="line-ok">${lines}</span>`, "ok", hint);
    return true;
  }
  if (lower === "ls" || lower === "dir" || lower.startsWith("get-childitem")) {
    const names = [...SIM.dirs, ...Object.keys(SIM.files)];
    printResult(cmd, `<span class="line-ok">${names.join("  ")}</span>`, "ok", hint);
    return true;
  }
  if (lower.startsWith("cd ") || lower === "cd cli-test") {
    const t = cmd.slice(3).trim() || "cli-test";
    SIM.cwd = t.includes(":") ? t : `${SIM.cwd}\\${t}`;
    updatePrompt();
    printResult(cmd, `<span class="line-ok">→ ${esc(SIM.cwd)}</span>`, "ok", hint);
    return true;
  }
  if (lower.startsWith("mkdir ") || lower.startsWith("new-item ")) {
    const d = cmd.includes("mkdir") ? cmd.slice(6).trim() : cmd.split(" ").pop();
    if (d && !SIM.dirs.includes(d)) SIM.dirs.push(d.replace(/\.txt$/,"") || d);
    if (d && d.endsWith(".txt")) SIM.files[d] = "";
    printResult(cmd, `<span class="line-ok">✓ Created ${esc(d)}</span>`, "ok", hint);
    return true;
  }
  if (lower.startsWith("set-content ") || lower.startsWith("get-content ") || lower === "type notes.txt") {
    const f = "notes.txt";
    if (lower.startsWith("set-content")) SIM.files[f] = "Hello\n";
    printResult(cmd, `<span class="line-ok">${esc(SIM.files[f] || "Hello")}</span>`, "ok", hint);
    return true;
  }
  if (lower.startsWith("copy-item ") || lower.startsWith("copy ") || lower.startsWith("move-item ") ||
      lower.startsWith("rename-item ")) {
    printResult(cmd, `<span class="line-ok">✓ Done</span>`, "ok", hint);
    return true;
  }
  if (lower.startsWith("remove-item ") && lower.includes("-recurse")) {
    printResult(cmd, `<span class="line-err">⚠ ЕМУЛЯЦІЯ: папку видалено БЕЗ підтвердження. У Windows — незворотно!</span>`, "danger", hint);
    return true;
  }
  if (lower.startsWith("remove-item ") || lower.startsWith("del ")) {
    printResult(cmd, `<span class="line-ok">✓ Removed</span>`, "ok", hint);
    return true;
  }

  if (lower.includes("get-childitem") && lower.includes("recurse")) {
    printResult(cmd, `<span class="line-ok">.\\README.md<br>.\\docs\\guide.md</span>`, "ok", hint);
    return true;
  }
  if (lower.startsWith("select-string") || lower.startsWith("findstr")) {
    printResult(cmd, `<span class="line-ok">README.md:3:TODO: fix</span>`, "ok", hint);
    return true;
  }

  if (lower === "ipconfig" || lower === "get-netipconfiguration") {
    printResult(cmd, `<span class="line-ok">IPv4: ${SIM.ip}<br>Gateway: ${SIM.gateway}<br>DNS: 8.8.8.8</span>`, "ok", hint);
    return true;
  }
  if (lower.startsWith("ping ") || lower.startsWith("tracert ") || lower.startsWith("nslookup ")) {
    printResult(cmd, `<span class="line-ok">Reply from host: bytes=32 time=3ms TTL=118</span>`, "ok", hint);
    return true;
  }
  if (lower.startsWith("test-netconnection")) {
    const ok = lower.includes("443") || lower.includes("22");
    const host = lower.includes("10.0.0.254") ? "10.0.0.254" : "google.com";
    const port = lower.includes("22") ? "22" : "443";
    printResult(cmd, `<span class="line-ok">TcpTestSucceeded : ${ok}<br>RemoteAddress: ${host}:${port}</span>`, "ok", hint);
    return true;
  }

  if (lower.startsWith("ssh ")) {
    const target = lower.includes("raspberry") ? "raspberrypi.local" : "10.0.0.254";
    printResult(cmd, `<span class="line-ok">Connected to ${esc(target)}<br><span class="line-hl">RouterOS/Linux shell (emulated)</span></span>`, "ok", hint);
    return true;
  }
  if (lower.startsWith("scp ")) {
    printResult(cmd, `<span class="line-ok">backup.rsc 100% 12KB</span>`, "ok", hint);
    return true;
  }

  if (lower.startsWith("git ") || lower === "gh auth status") {
    let out = "✓";
    if (lower === "git status") out = "On branch main\nnothing to commit";
    else if (lower.includes("clone")) out = "Cloning into 'project'... done";
    else if (lower === "git pull") out = "Already up to date.";
    else if (lower === "gh auth status") out = "✓ Logged in to github.com as StsZu";
    printResult(cmd, `<span class="line-ok">${esc(out)}</span>`, "ok", hint);
    return true;
  }

  if (lower.includes("--version") || lower.startsWith("winget ") || lower.startsWith("choco ")) {
    let out = "✓";
    if (lower === "python --version") out = "Python 3.12.4";
    else if (lower === "node --version") out = "v22.3.0";
    else if (lower.includes("search")) out = "Git.Git  Git for Windows";
    else if (lower.includes("install")) out = "Successfully installed";
    printResult(cmd, `<span class="line-ok">${out}</span>`, lower.includes("install") ? "warn" : "ok", hint);
    return true;
  }

  if (lower === "get-process" || lower === "tasklist") {
    printResult(cmd, `<span class="line-ok">powershell  1234<br>chrome  5678<br>System  4</span>`, "ok", hint);
    return true;
  }
  if (lower.startsWith("stop-process") || lower.startsWith("taskkill")) {
    printResult(cmd, `<span class="line-warn">⚠ Process terminated</span>`, "warn", hint);
    return true;
  }
  if (lower === "get-service") {
    printResult(cmd, `<span class="line-ok">Running: ssh-agent, wuauserv, WinRM</span>`, "ok", hint);
    return true;
  }
  if (lower.includes("get-nettcpconnection") || lower === "netstat -ano") {
    printResult(cmd, `<span class="line-ok">TCP 0.0.0.0:22 LISTENING 1234<br>TCP 0.0.0.0:443 LISTENING 5678</span>`, "ok", hint);
    return true;
  }

  if (lower.startsWith("wsl")) {
    if (lower === "wsl --status") {
      printResult(cmd, `<span class="line-ok">Default Distribution: Ubuntu<br>Default Version: 2</span>`, "ok", hint);
    } else if (lower.includes("--list")) {
      printResult(cmd, `<span class="line-ok">* Ubuntu  Running  2</span>`, "ok", hint);
    } else {
      SIM.wslActive = true;
      updatePrompt();
      printResult(cmd, `<span class="line-ok">Welcome to Ubuntu 22.04 LTS (WSL2)</span><br><span class="line-muted">/home/stas/projects — Linux paths!</span>`, "ok", hint);
    }
    return true;
  }

  if (lower.includes("iwr") && lower.includes("iex")) {
    printResult(cmd, `<span class="line-err">⚠ Script from internet executed! (iwr | iex = curl | bash)</span>`, "danger", hint);
    return true;
  }
  if (lower.startsWith("set-executionpolicy")) {
    printResult(cmd, `<span class="line-warn">⚠ ExecutionPolicy changed. Do not set Unrestricted blindly.</span>`, "danger", hint);
    return true;
  }

  if (owner) {
    printResult("Інший розділ", `<span class="line-muted">«${esc(cmd)}» → ${esc(MODULES[owner].title)}</span>`, "warn");
  } else {
    printResult("Невідома команда", `<span class="line-muted">«${esc(cmd)}» — Get-Command або Get-Help</span>`, "warn");
  }
  return false;
}

function execute(raw) {
  const cmd = raw.trim();
  if (!cmd) return;
  if (state.testMode.active) { handleTestAnswer(cmd); return; }
  state.history.push(cmd);
  state.histIdx = state.history.length;
  beginView(cmd);
  const ok = handleCommand(cmd);
  flushView(`PS · ${getModule().title} · ${cmd}`);
  if (ok !== false) markTried(cmd);
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

function buildTestQueue() {
  const seen = new Set(), items = [];
  for (const mod of Object.values(MODULES)) {
    for (const c of mod.commands) {
      if (!seen.has(c) && UK_HINTS[c]) { seen.add(c); items.push({ cmd: c, hint: UK_HINTS[c] }); }
    }
  }
  return shuffleArray(items);
}

function updateTestButton() {
  const btn = document.getElementById("btnTest");
  btn.textContent = state.testMode.active ? "Зупинити тест" : "Режим тестування";
  btn.classList.toggle("active", state.testMode.active);
}

function showTestQuestion() {
  const tm = state.testMode;
  const q = tm.queue[tm.index];
  if (!q) { finishTestMode(); return; }
  beginView(null);
  printResult(`Тест ${tm.index + 1}/${tm.queue.length}`, `<span class="line-muted">Команда: <em>${esc(q.hint)}</em>?</span>`, "purple");
  flushView(`Тест · ${tm.index + 1}/${tm.queue.length}`);
}

function startTestMode() { state.testMode = { active: true, queue: buildTestQueue(), index: 0, correct: 0, wrong: 0 }; updateTestButton(); showTestQuestion(); }
function stopTestMode() { state.testMode.active = false; updateTestButton(); welcome(); }
function finishTestMode() {
  beginView(null);
  printResult("Тест завершено", `<span class="line-ok">✓ ${state.testMode.correct}</span> · <span class="line-warn">✗ ${state.testMode.wrong}</span>`, "ok");
  flushView("Тест завершено");
  state.testMode.active = false;
  updateTestButton();
}

function handleTestAnswer(cmd) {
  const tm = state.testMode;
  const q = tm.queue[tm.index];
  beginView(cmd);
  const match = findListedCommand(cmd, [q.cmd]) === q.cmd || cmd.trim() === q.cmd;
  if (match) { tm.correct++; printResult("✓", `<span class="line-ok">${esc(q.cmd)}</span>`, "ok", q.hint); }
  else { tm.wrong++; printResult("✗", `<span class="line-err">Очікувалось: ${esc(q.cmd)}</span>`, "warn", q.hint); }
  flushView(`Тест · ${tm.correct}✓`);
  tm.index++;
  setTimeout(() => { if (state.testMode.active) showTestQuestion(); }, 1100);
}

function openScenarioModal() {
  const list = document.getElementById("scenarioList");
  list.innerHTML = SCENARIOS.map(s => `
    <div class="scenario-item${s.moduleId === state.selectedScenario.moduleId ? " selected" : ""}" data-id="${s.id}">
      <strong>${esc(s.title)}</strong><small>${esc(s.desc)}</small>
    </div>`).join("");
  list.querySelectorAll(".scenario-item").forEach(el => {
    el.addEventListener("click", () => {
      list.querySelectorAll(".scenario-item").forEach(x => x.classList.remove("selected"));
      el.classList.add("selected");
      state.selectedScenario = SCENARIOS.find(s => s.id === +el.dataset.id);
    });
  });
  document.getElementById("scenarioModal").classList.add("open");
}

function closeScenarioModal() { document.getElementById("scenarioModal").classList.remove("open"); }

document.getElementById("cmdForm").addEventListener("submit", e => { e.preventDefault(); execute(cmdInput.value); cmdInput.value = ""; });
cmdInput.addEventListener("keydown", e => {
  if (e.key === "ArrowUp") { e.preventDefault(); if (state.histIdx > 0) { state.histIdx--; cmdInput.value = state.history[state.histIdx] || ""; } }
  else if (e.key === "ArrowDown") { e.preventDefault(); if (state.histIdx < state.history.length - 1) { state.histIdx++; cmdInput.value = state.history[state.histIdx] || ""; } else { state.histIdx = state.history.length; cmdInput.value = ""; } }
  else if (e.key === "Tab") { e.preventDefault(); const val = cmdInput.value.trim(); const m = getCurrentCommands().find(c => c.startsWith(val) && c !== val); if (m) cmdInput.value = m; }
});
document.getElementById("btnTest").addEventListener("click", () => state.testMode.active ? stopTestMode() : startTestMode());
document.getElementById("btnScenario").addEventListener("click", openScenarioModal);
document.getElementById("btnReset").addEventListener("click", () => { resetState(); welcome(); });
document.getElementById("scenarioConfirm").addEventListener("click", () => { if (state.selectedScenario) switchModule(state.selectedScenario.moduleId); closeScenarioModal(); });
document.getElementById("scenarioCancel").addEventListener("click", closeScenarioModal);
document.getElementById("scenarioModal").addEventListener("click", e => { if (e.target.id === "scenarioModal") closeScenarioModal(); });
document.addEventListener("keydown", e => {
  if (!document.getElementById("scenarioModal").classList.contains("open")) return;
  if (e.key === "Escape") closeScenarioModal();
  if (e.key === "Enter") { switchModule(state.selectedScenario.moduleId); closeScenarioModal(); }
});

buildChecklist();
updatePrompt();
welcome();
