param(
  [string]$Hostname = $(if ($env:DEPLOY_HOST) { $env:DEPLOY_HOST } else { "163.176.163.213" }),
  [string]$User = $(if ($env:DEPLOY_USER) { $env:DEPLOY_USER } else { "ubuntu" }),
  [string]$Key = $(if ($env:DEPLOY_KEY) { $env:DEPLOY_KEY } else { "$env:USERPROFILE\.ssh\saur_oracle" }),
  [string]$RemotePath = "/opt/petrobras",
  [switch]$Build,
  [switch]$SkipRestart
)

$ErrorActionPreference = "Stop"

if ($Build) {
  Write-Host "npm run build..." -ForegroundColor Cyan
  Push-Location $PSScriptRoot
  npm run build 2>&1 | ForEach-Object { Write-Host $_ }
  Pop-Location
}

Write-Host "Sincronizando dist/ + server.js + planos..." -ForegroundColor Cyan
$SrcDist = Join-Path $PSScriptRoot "dist"

# Sincroniza a build do Vite
& rsync -avz --delete -e "ssh -i $Key" "$SrcDist/" "${User}@${Hostname}:${RemotePath}/dist/"
if ($LASTEXITCODE -ne 0) { throw "rsync dist/ falhou" }

# Sincroniza server.js
& scp -i "$Key" -q "$PSScriptRoot/server.js" "${User}@${Hostname}:${RemotePath}/server.js"
if ($LASTEXITCODE -ne 0) { throw "scp server.js falhou" }

# Sincroniza planos/
& rsync -avz --delete -e "ssh -i $Key" "$PSScriptRoot/petrobras-quimica-study-plan/planos/" "${User}@${Hostname}:${RemotePath}/planos/"
if ($LASTEXITCODE -ne 0) { throw "rsync planos/ falhou" }

if (-not $SkipRestart) {
  Write-Host "Reiniciando servico..." -ForegroundColor Cyan
  ssh -i "$Key" "${User}@${Hostname}" "sudo systemctl restart petrobras.service"
  if ($LASTEXITCODE -ne 0) { throw "restart falhou" }
  Start-Sleep 2
  Write-Host "Deploy concluido!" -ForegroundColor Green
} else {
  Write-Host "Arquivos sincronizados (servico nao reiniciado)" -ForegroundColor Yellow
}
