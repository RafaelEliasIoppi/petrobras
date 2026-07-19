$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$VitePort = 5173 # Porta padrão do Vite

Write-Host "== Iniciando Aplicação Vite (Petrobras Study Tracker) ==" -ForegroundColor Cyan

# Mata processo na porta do Vite, se houver
$pids = Get-NetTCPConnection -LocalPort $VitePort -ErrorAction SilentlyContinue |
  Select-Object -ExpandProperty OwningProcess -Unique
foreach ($processId in $pids) {
  Write-Host "Encerrando processo na porta $VitePort (PID: $processId)..." -ForegroundColor Yellow
  Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
}
Start-Sleep -Milliseconds 200

# Instala dependências se a pasta node_modules não existir
if (-not (Test-Path (Join-Path $Root "node_modules"))) {
  Write-Host "Instalando dependências do projeto Vite..." -ForegroundColor Yellow
  Push-Location $Root
  npm install
  Pop-Location
}

# Navega para o diretório raiz e inicia o servidor de desenvolvimento Vite
Write-Host "Iniciando servidor de desenvolvimento Vite..." -ForegroundColor Green
Write-Host "Pressione CTRL+C para parar o servidor." -ForegroundColor Gray
Set-Location $Root
npm run dev
