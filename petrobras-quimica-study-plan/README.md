# Projeto de Estudos - Concurso Petrobras Técnico em Química (Química de Petróleo)

## Visão Geral

- **Cargo:** Profissional Petrobras de Nível Técnico Júnior - Ênfase: Química de Petróleo
- **Banca:** Cesgranrio (confirmada 2026, contrato vigente até julho/2028)
- **Base:** Padrão real das provas Cesgranrio 2011, 2018 e Transpetro 2023
- **Duração do plano:** 12 semanas (~3 meses)
- **Carga horária semanal:** 30h (segunda a sexta, 6h/dia)
- **Horários fixos:** 08h-10h | 13h-15h | 20h-22h

## Estrutura da Prova (Padrão Cesgranrio)

### 60 questões, múltipla escolha (5 alternativas)

| Matéria | Questões | % |
|---------|----------|---|
| **Química** | 38-40 | 63-67% |
| **Português** | 10 | 17% |
| **Matemática** | 8-10 | 13-17% |
| Mat. Financeira / Estatística | 0-1 | 0-2% |

### Dentro de Química (38-40 questões)

| Tópico | Qs típicas |
|--------|-----------|
| Soluções + Substâncias Inorgânicas | ~10 |
| Transformações Químicas + Estequiometria | ~7 |
| Equilíbrio Químico + pH | ~5 |
| Técnicas de Laboratório + Titulometria | ~5 |
| Química Orgânica | ~5 |
| Cinética Química | ~3 |
| Termoquímica | ~3 |
| Substâncias/Propriedades (átomos, tabela, ligações) | ~2 |

## Distribuição do Tempo de Estudo

| Matéria | % na prova | h/semana |
|---------|-----------|----------|
| Química (Geral + Orgânica + Analítica + Físico-Química) | 65% | **19.5** |
| Português | 17% | **5.0** |
| Matemática | 15% | **4.5** |
| Mat. Financeira + Estatística | 3% | **1.0** |

## Metodologia

Cada sessão de 2h segue o padrão:
- **40 min** Teoria / Videoaula
- **30 min** Exercícios
- **10 min** Correção
- **40 min** Questões de provas anteriores

Simulados nas semanas 4, 7 e 11. Provas anteriores resolvidas na semana 8.

## Site Interativo

Dashboard web com checklist, quadro de horas e simulados. Persistência via arquivos (com servidor Node.js) ou localStorage.

```bash
node server.js
# Acessar: http://localhost:3000
```

## Estrutura do Projeto

```
├── server.js              Servidor Node.js (Express 5)
├── package.json           Dependências npm
├── start.sh               Script de inicialização
├── README.md              Documentação
├── planos/                Cronogramas e planos de estudo
│   ├── cronograma-cesgranrio.md      (principal) Plano 12 semanas Cesgranrio
│   ├── cronograma-completo.md        Plano completo
│   ├── cronograma-12-semanas-provas.md   Plano anterior (ambas bancas)
│   ├── conteudo-programatico.md      Detalhamento de todos os tópicos
│   ├── checklist-conteudos.md        Checklist para impressão
│   ├── quadro-horas.md               Quadro de horas para impressão
│   ├── caderno-erros.md              Caderno de erros
│   ├── ciclo-estudos.md              Ciclo de estudos
│   ├── metodologia-estudo.md         Metodologia de estudo
│   ├── relatorio-metodos-concurseiros.md  Relatório de métodos
│   └── revisoes-simulados.md         Revisões e simulados
├── materias/              Planos detalhados por matéria
├── resumos/               Resumos de estudo
├── simulados/             Simulados
├── dados/                 Dados runtime (persistência JSON)
└── site/                  Aplicação web (Vue 3)
    ├── index.html
    ├── css/estilo.css
    └── js/{app,dados,armazenamento}.js
```

> **Nota:** Os planos em `planos/` são os cronogramas gerais. Em `materias/` estão os planos detalhados por disciplina.
