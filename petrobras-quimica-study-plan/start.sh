#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "🚀 Iniciando Petrobras Study Tracker (Vite + Express)..."
echo "📁 Raiz do projeto: $ROOT_DIR"

cd "$ROOT_DIR" || exit 1

if [ ! -d node_modules ]; then
  echo "📦 Instalando dependencias..."
  npm install
fi

if [ ! -d dist ]; then
  echo "🔨 Buildando aplicação Vite..."
  npm run build
fi

if command -v lsof &>/dev/null; then
  PID=$(lsof -ti:3000)
  if [ -n "$PID" ]; then
    echo "🔒 Encerrando processo na porta 3000 (PID: $PID)..."
    kill -9 $PID 2>/dev/null
  fi
fi

node server.js
