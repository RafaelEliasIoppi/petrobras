<#
.SYNOPSIS
    Inicia o ambiente de desenvolvimento completo (Backend e Frontend).
.DESCRIPTION
    Este script orquestra o início dos dois servidores necessários para o desenvolvimento:
    1. O servidor de backend (Express.js) que serve a API.
    2. O servidor de desenvolvimento do frontend (Vite).
#>

# --- Função para liberar portas ---
function Stop-ProcessOnPort {
    param (
        [int]$Port
    )
    try {
        $process = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue | Select-Object -First 1 -ExpandProperty OwningProcess
        if ($null -ne $process) {
            Write-Host "Porta $Port está em uso pelo processo ID $process. Tentando liberar..." -ForegroundColor Yellow
            Stop-Process -Id $process -Force -ErrorAction SilentlyContinue
            Write-Host "Porta $Port liberada." -ForegroundColor Green
        }
    } catch {
        Write-Warning "Não foi possível verificar ou liberar a porta $Port. Pode ser necessário fechar o processo manualmente."
    }
}

Stop-ProcessOnPort -Port 3000 # Porta do Backend Express
Stop-ProcessOnPort -Port 5173 # Porta padrão do Frontend Vite

# O backend agora será iniciado pelo Vite Dev Server através do proxy
# Não precisamos mais iniciar o backend separadamente em modo de desenvolvimento

Write-Host ""
Write-Host "--- Iniciando Servidor de Frontend (Vite) ---" -ForegroundColor Cyan

if (-not (Test-Path (Join-Path $PSScriptRoot "node_modules"))) {
    Write-Host "Instalando dependências do frontend (npm install)..." -ForegroundColor Yellow
    # Usa --prefix para garantir que o npm rode no diretório correto
    npm install --prefix $PSScriptRoot
}

# Garante que estamos no diretório correto do frontend antes de rodar o dev server
Set-Location -Path $PSScriptRoot

Write-Host "Frontend estará disponível em http://localhost:5173 (ou outra porta indicada pelo Vite)."
Write-Host "Pressione CTRL+C para parar o servidor."
npm run dev --prefix $PSScriptRoot