<#
.SYNOPSIS
    Restructures the project to a clean Vite setup within the main Git repository.
.DESCRIPTION
    This script automates the migration of the new Vite project files into the
    'petrobras-quimica-study-plan' directory, which is the root of the Git repository.
    It backs up the old 'site' folder and cleans up the structure.
#>

$ErrorActionPreference = 'Stop'

$basePath = $PSScriptRoot
$sourcePath = $basePath
$destinationPath = Join-Path $basePath "petrobras-quimica-study-plan"

Write-Host "--- Iniciando a Reestruturação do Projeto ---" -ForegroundColor Cyan

# 1. Fazer backup do site antigo
$oldSitePath = Join-Path $destinationPath "site"
if (Test-Path $oldSitePath) {
    Write-Host "Fazendo backup da pasta 'site' antiga para 'site_backup'..." -ForegroundColor Yellow
    Rename-Item -Path $oldSitePath -NewName "site_backup"
}

# 2. Mover todos os arquivos do novo projeto Vite para a pasta do repositório Git
Write-Host "Movendo arquivos do projeto Vite para '$destinationPath'..."
Get-ChildItem -Path $sourcePath -Exclude "petrobras-quimica-study-plan", "organize.ps1" | ForEach-Object {
    Move-Item -Path $_.FullName -Destination $destinationPath -Force
}

Write-Host "Reestruturação concluída com sucesso!" -ForegroundColor Green
Write-Host "Agora, navegue para a pasta 'petrobras-quimica-study-plan' e execute 'git status' para ver as alterações."