const express = require('express');
const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;
const SITE_DIR = path.join(__dirname, 'site_backup');
const DADOS_DIR = path.join(__dirname, 'dados');
const PLANOS_DIR = __dirname;

if (!fs.existsSync(DADOS_DIR)) {
  fs.mkdirSync(DADOS_DIR, { recursive: true });
}

function sendJSON(res, status, data) {
  const json = JSON.stringify(data, null, 2);
  res.status(status)
     .header('Content-Type', 'application/json; charset=utf-8')
     .header('Access-Control-Allow-Origin', '*')
     .send(json);
}

app.use(compression());
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  next();
});

app.get('/api/arquivos', async (req, res) => {
  try {
    const files = await fsPromises.readdir(DADOS_DIR);
    res.json(files.filter(f => f.endsWith('.json')));
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao ler diretório' });
  }
});

app.get('/api/dados/:nome.json', async (req, res) => {
  const nome = req.params.nome;
  const filePath = path.join(DADOS_DIR, nome + '.json');
  if (!filePath.startsWith(DADOS_DIR)) return res.status(403).json({ erro: 'Acesso negado' });
  try {
    const data = await fsPromises.readFile(filePath, 'utf-8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.json({});
  }
});

app.put('/api/dados/:nome.json', async (req, res) => {
  const nome = req.params.nome;
  const filePath = path.join(DADOS_DIR, nome + '.json');
  if (!filePath.startsWith(DADOS_DIR)) return res.status(403).json({ erro: 'Acesso negado' });
  try {
    await fsPromises.writeFile(filePath, JSON.stringify(req.body, null, 2), 'utf-8');
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao salvar' });
  }
});

app.delete('/api/dados/:nome.json/:chave', async (req, res) => {
  const { nome, chave: chaveEnc } = req.params;
  const chave = decodeURIComponent(chaveEnc);
  const filePath = path.join(DADOS_DIR, nome + '.json');
  if (!filePath.startsWith(DADOS_DIR)) return res.status(403).json({ erro: 'Acesso negado' });
  try {
    const data = await fsPromises.readFile(filePath, 'utf-8');
    const obj = JSON.parse(data);
    if (Array.isArray(obj)) {
      const idx = obj.findIndex(i => i.semana === Number(chave));
      if (idx >= 0) obj.splice(idx, 1);
    } else {
      if (chave.includes('::')) {
        const [p1, p2] = chave.split('::');
        if (obj[p1]?.[p2] !== undefined) delete obj[p1][p2];
      } else {
        delete obj[chave];
      }
    }
    await fsPromises.writeFile(filePath, JSON.stringify(obj, null, 2), 'utf-8');
    res.json({ ok: true });
  } catch (err) {
    if (err.code === 'ENOENT') return res.status(404).json({ erro: 'Arquivo não encontrado' });
    res.status(500).json({ erro: 'Erro ao salvar' });
  }
});

app.get('/api/planos', async (req, res) => {
  try {
    const lerDiretorio = async (subDir, grupo) => {
      const dirCompleto = path.join(PLANOS_DIR, subDir);
      const entradas = await fsPromises.readdir(dirCompleto, { withFileTypes: true });
      const planos = [];
      for (const entrada of entradas) {
        if (entrada.isFile() && entrada.name.endsWith('.md')) {
          const id = path.join(subDir, entrada.name.replace('.md', '')).replace(/\\/g, '/');
          const nome = entrada.name.replace('.md', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
          planos.push({ id, nome, grupo });
        }
      }
      return planos;
    };
    const grupos = [
      { path: 'planos', grupo: 'Cronogramas e Planos' },
      { path: 'materias', grupo: 'Matérias' },
      { path: 'resumos', grupo: 'Resumos' },
      { path: 'simulados', grupo: 'Simulados' },
    ];
    const promessas = grupos.map(g => lerDiretorio(g.path, g.grupo));
    const resultados = await Promise.all(promessas);
    res.json(resultados.flat());
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar planos de estudo', detalhe: err.message });
  }
});

const planoHandler = async (req, res) => {
  const { grupo, nome } = req.params;
  const subPath = grupo ? path.join(grupo, nome) : nome;
  const caminho = path.join(PLANOS_DIR, subPath + '.md');
  if (!caminho.startsWith(PLANOS_DIR)) return res.status(403).json({ erro: 'Acesso negado' });
  try {
    const data = await fsPromises.readFile(caminho, 'utf-8');
    res.header('Content-Type', 'text/plain; charset=utf-8').send(data);
  } catch (err) {
    res.status(404).json({ erro: 'Arquivo não encontrado' });
  }
};

app.get('/api/plano/:grupo/:nome', planoHandler);
app.get('/api/plano/:nome', planoHandler);

app.use(express.static(SITE_DIR));

function tentarPorta(port) {
  const server = app.listen(port, () => {
    const addr = `http://localhost:${port}`;
    console.log(`\n  \uD83E\uDDEA Petrobras Study Tracker\n  ${addr}\n`);
  });
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`  Porta ${port} ocupada, tentando ${port + 1}...`);
      tentarPorta(port + 1);
    } else {
      console.error('  Erro ao iniciar servidor:', err.message);
      process.exit(1);
    }
  });
}

tentarPorta(PORT);
