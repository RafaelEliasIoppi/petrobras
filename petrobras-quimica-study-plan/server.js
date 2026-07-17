const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Caminho para a pasta de build do projeto Vite
const frontendDistPath = path.join(__dirname, '..', 'dist');

// Verifica se a pasta 'dist' existe
if (!fs.existsSync(frontendDistPath)) {
  console.error("\nERRO: A pasta 'dist' do frontend não foi encontrada.");
  console.error("Execute 'npm run build' na pasta raiz do projeto frontend antes de iniciar o servidor de produção.\n");
}

// 1. Servir os arquivos estáticos da pasta 'dist'
app.use(express.static(frontendDistPath));

// 2. API para buscar a lista de planos
app.get('/api/planos', (req, res) => {
  const planosDir = path.join(__dirname, 'planos');
  fs.readdir(planosDir, (err, files) => {
    if (err) return res.status(500).send('Erro ao ler planos.');
    const planos = files.map(file => ({ id: path.parse(file).name, nome: path.parse(file).name.replace(/-/g, ' '), grupo: 'Cronogramas' }));
    res.json(planos);
  });
});

// 3. API para buscar o conteúdo de um plano específico
app.get('/api/plano/:id', (req, res) => {
  const filePath = path.join(__dirname, 'planos', `${req.params.id}.md`);
  res.sendFile(filePath);
});

// 4. Rota "catch-all" para servir o index.html da SPA
// Usamos uma expressão regular para um "catch-all" mais robusto.
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(frontendDistPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor backend rodando em http://localhost:${port}`);
});