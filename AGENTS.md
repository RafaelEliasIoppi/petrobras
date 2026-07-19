# Memorias do Projeto - Estudo Petrobras

## Visao Geral
App para concurso Petrobras - Tecnico em Quimica. Duas implementacoes:
- **Vue 3 + Vite** (raiz) — desenvolvimento, roteamento hash, singleton pattern
- **Site estatico** (`petrobras-quimica-study-plan/site/`) — producao (servido por Express ou GitHub Pages)
- Armazenamento localStorage com prefixo `petrobras_quimica_` + API REST `/api/dados/{nome}.json`
- Remote: `git@github.com:RafaelEliasIoppi/petrobras.git` (SSH)

## Comandos
- `npm run dev` — Vite dev server (porta 5173)
- `npm run build` — Build Vite de producao
- `npm start` — Backend Express (porta 3000, serve site/ + API)
- `bash start.sh` — Auto-instala deps + sobe Express
- `.\start.ps1` — Mata porta 3000, instala deps, sobe Express + abre browser

## Estrutura
```
/                                # Vue/Vite (root)
├── App.vue, main.js, index.html, vite.config.js
├── dados.js                     # CONTEUDOS, CICLO_ESTUDOS, metas, CICLO_MAP, mapCicloParaMateriaId
├── armazenamento.js             # localStorage (prefixo petrobras_quimica_)
├── usuarios.js                  # Autenticacao + gerarTokenSessao
├── use*.js                      # Composables (Checklist, Horas, Ciclo, etc.)
├── *.vue                        # Componentes (Dashboard, Ciclo, Diario, Relatorio, etc.)
├── Login.vue                    # Tela de login com toggle senha (icone 🔒/👁)
├── estilo.css                   # CSS global
├── .github/workflows/deploy.yml # CI: build Vite → gh-pages
├── start.ps1                    # Script PowerShell pra dev (npm run dev)
├── server.js                    # Express (porta 3000, serve dist/ + API planos)
├── deploy.ps1                   # Sincroniza build + server + planos pra VM
│
petrobras-quimica-study-plan/    # Dados + scripts servidor
├── start.sh                     # Builda Vite + sobe Express (usado na VM)
├── setup-vm.sh                  # Instala Node/Nginx/systemd na VM
├── dados/                       # JSON files (persistencia servidor)
└── planos/                      # Documentos .md
```

## Seguranca - Sessao Unica
- `localStorage` + `sessionStorage` com token aleatorio (`petro_quimica_sessao`)
- Ao logar, salva `{ user, token, timestamp }` em ambos
- `storage` event listener detecta login em outra aba → faz logout automatico
- `verificarSessao()` restaura sessao do localStorage ao recarregar

## Conta Demo
- Usuario `estudante` / senha `petro2026`
- Recursos **bloqueados** com overlay marketing (👑 Versao Premium):
  - Ciclo, Horas, Simulados, Erros, Diario, Relatorio, Questoes, Admin
- Recursos **liberados**: Dashboard, Conteudos, Flashcards, Plano de Estudos
- Overlay cobre a tela com backdrop blur, impede interacao/scroll
- Sidebar mostra 🔒 nos itens bloqueados
- Sidebar mostra badge `R$49,90` no item Premium se `!isPremium`

## Persistencia (toda feature)
1. **Cache** — estado reativo
2. **localStorage** — `_salvarLocal()` com prefixo `petrobras_quimica_`
3. **Servidor** — `_putToServer()` com debounce 1s

## Responsividade
- **Breakpoints**: 1024px, 768px, 600px, **480px**
- 480px adicionado em: Login.vue, estilo.css, Diario.vue, Flashcards.vue, Erros.vue, Relatorio.vue, Ciclo.vue, Exercicios.vue, App.vue
- **Checklist tabs**: em 480px viram scroll horizontal (`overflow-x: auto; flex-wrap: nowrap`)
- **Login 480px**: brand escondido, card ocupa tela toda, depoimentos 1 coluna, social-notification sem `nowrap`
- **Sidebar backdrop**: div `.sidebar-backdrop` em App.vue, visivel quando `menuAberta` em mobile, clica pra fechar

## CSS Global
- `estilo.css` importado em `main.js` (`import './estilo.css'`) — essencial para o funcionamento do CSS interno
- Sem essa importação, todas as páginas internas (Dashboard, Horas, etc.) ficam sem estilo

## Login
- `submeter()` em Login.vue chama `.trim()` no usuário e senha para ignorar espaços
- Admin senha: `_[D1W)6hOO0h[R1/` (hash SHA-256: `a6035b25e8694b3ccef86d66b713e003340782642f8876a1a9fc738724eaa8e6`)
- Se alterar hash do admin em usuarios.js, a funcao `carregarUsuarios()` detecta e força o update no localStorage

## Premium Overlay (unificado)
- **Login.vue**: fluxo PIX/QR inline no card (instrucaoPremium toggle)
- **App.vue**: overlay modal com MESMO layout (PIX/QR + WhatsApp + Voltar)
- Ambos usam `qrcode` lib + `gerarPayloadPix()` pra gerar QR Code
- WhatsApp: `wa.me/5551983098650?text=...pagamento Premium (PIX)...`
- Preco: R$ 49,90, chave PIX: +5551983098650

## Admin - Dashboard de Visitas
- Servidor: POST `/api/visitas` grava visita, GET `/api/visitas` retorna total/hoje/ultimas 100
- Storage: `dados/visitas.json` no servidor
- Client: `registrarVisita()` chamada no login + onMount no App.vue
- Admin.vue exibe cards de total/hoje + tabela com usuario/data/hora

## Login Page Brand
- Badge "🔥 Edital 2026" no topo
- Destaque salarial: R$ 6.638 inicial, + benefícios, até R$ 11.300 com turno
- 5 features focadas no concurso (conteúdo específico, flashcards, métricas, simulados Cesgranrio, caderno de erros)
- Highlight box com vidro (glassmorphism) exibindo faixas salariais

## Memorias Fixas (nao errar de novo)
- **🚨 NUNCA editar/configurar VM ou servidor em producao sem permissao explicita do usuario.** Nao mexer em nginx, systemd, firewall, portas, SSL, ou qualquer configuracao de infraestrutura. Se achar algo "errado", perguntar primeiro. Usar SEMPRE o `deploy.ps1` para atualizar a VM — e somente depois de commit+push.
- **Site estatico** (`site/index.html`): SEMPRE incluir `<script src="https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.js"></script>` ANTES dos scripts locais (dados.js, armazenamento.js, app.js). A versao Vite (raiz) nao precisa, mas o site estatico sim.
- **Cache busting**: ao alterar CSS/JS, atualizar `?v=` nos links. Usar data + letra (ex: `20260718a`).
- **Variáveis Vue no template**: qualquer `ref()` criada em app.js precisa estar no `return {}` do `setup()`, senao dá `Property not defined on instance`.
- **armazenamento.js**: nao usar `const server` duas vezes no mesmo escopo (erro `Identifier 'server' has already been declared`). Renomear para `serverData` na segunda.
- **Depoimentos**: usar glassmorphism (`rgba(255,255,255,0.05)`, `backdrop-filter`) no lugar de `var(--card)` pra fundo escuro. Exibir `cidade` junto com `nome`.
- **Contador visitantes**: sempre aplicar `Math.max(32, valor)` pra nunca ficar abaixo de 32. Usar `requestAnimationFrame` pra animacao suave.
- **Comprar Premium**: se `usuarioAtual` for null (tela de login), redirecionar pra WhatsApp. Se logado, criar preference no Mercado Pago.
- **Login footer**: usar `<button @click>` em vez de `<a href>` pra evitar popup blocker e garantir que o clique sempre dispare acao.
- **Ciclo de Estudos**: `CICLO_PONDERADO` expande por `peso` (total 24 slots). `posicao` indexa nos 24, wrap no fim. `concluido` usa `item-{idx}` com contador.

## Telas
| Rota | Arquivo | Proposito |
|------|---------|-----------|
| `#dashboard` | Dashboard.vue | Visao geral |
| `#checklist` | Checklist.vue | Topicos do edital |
| `#ciclo` | Ciclo.vue | Ciclo de estudos (ponderado) |
| `#horas` | Horas.vue | Grade de horas |
| `#simulados` | Simulados.vue | Desempenho |
| `#erros` | Erros.vue | Caderno de erros |
| `#diario` | Diario.vue | Registro do Dia + Revisoes |
| `#relatorio` | Relatorio.vue | Analise de produtividade |
| `#plano` | Plano.vue | Documentos |
| `#cronograma` | Cronograma.vue / cronograma in site/ | Cronograma semanal interativo |
| `#flashcards` | Flashcards.vue | Revisao com flashcards |
| `#premium` | index.html/app.js | Tela de compra Premium 👑 |

## Login e Cadastro
- **Abas "Entrar" / "Criar Conta"** no formulário de login (alterna `modoCadastro`)
- `handleRegister()` envia POST `/api/auth/register` → salva em `dados/usuarios.json`
- `handleLogin()` melhorado: chama `autenticar()` + `verificarPremium()` após login
- Senhas em texto plano (MVP), podem ser hashadas depois

## Premium / Pagamento
- **Preço**: R$ 49,90 (pagamento único, acesso vitalício)
- **Gateway**: Mercado Pago (`mercadopago` SDK)
- `comprarPremium()` → POST `/api/mercadopago/preference` → redireciona ao checkout MP
- Webhook `/api/mercadopago/webhook` atualiza `dados/premium.json`
- `verificarPremium()` → GET `/api/premium/status/:usuario` → libera recursos
- Sidebar mostra badge `R$49,90` se `!isPremium`
- Premium libera: Ciclo, Horas, Simulados, Erros, Diario, Relatorio, Questoes, Admin

## Provas Sociais
- `notificacoes` — notificações flutuantes estilo "João acabou de comprar o Premium!"
- `iniciarSocialProof()` — intervalo aleatório 4-8s, notificação some após 5s
- `depoimentos` — array de 10 depoimentos com nome, avatar, texto e estrelas
- Exibidos na tela de login (grade 4 cards) e na página Premium (grade completa)

## CI/CD
- `.github/workflows/deploy.yml` — push no main → copia site/ → deploy no gh-pages
- URL: https://rafaeleliasioppi.github.io/petrobras/
- Persistencia no Pages funciona via localStorage apenas (fallback offline)
