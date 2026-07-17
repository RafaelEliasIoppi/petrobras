const CONTEUDOS = [
  {
    id: 'portugues',
    nome: 'Língua Portuguesa',
    icone: '📝',
    cor: '#4CAF50',
    questoes: 10,
    grupos: [
      {
        nome: 'Interpretação de Textos',
        topicos: [
          'Compreensão global do texto',
          'Significação contextual de palavras e expressões',
          'Tipologia textual (narração, descrição, dissertação)',
          'Ideia principal e ideias secundárias',
          'Inferência e pressuposição',
          'Recursos expressivos e figuras de linguagem'
        ]
      },
      {
        nome: 'Ortografia e Acentuação',
        topicos: [
          'Emprego das letras (h, s, z, x, ch)',
          'Acentuação gráfica (regras)',
          'Emprego do hífen'
        ]
      },
      {
        nome: 'Morfologia',
        topicos: [
          'Substantivo, adjetivo, artigo, numeral',
          'Verbo: regulares, irregulares, tempos, modos, vozes',
          'Pronome: emprego, colocação, formas de tratamento',
          'Conjunção, preposição, advérbio',
          'Uso de "porque", "por que", "por quê", "porquê"',
          'Uso de "se" e "que"'
        ]
      },
      {
        nome: 'Sintaxe',
        topicos: [
          'Concordância verbal e nominal',
          'Regência verbal e nominal',
          'Crase',
          'Verbos impessoais',
          'Indeterminação do sujeito',
          'Voz passiva pronominal',
          'Pronomes relativos',
          'Emprego de "há" e "a"'
        ]
      },
      {
        nome: 'Pontuação',
        topicos: [
          'Vírgula',
          'Ponto e vírgula',
          'Dois-pontos',
          'Aspas, parênteses, travessão'
        ]
      },
      {
        nome: 'Reescritura e Problemas da Língua',
        topicos: [
          'Reescritura de frases e parágrafos',
          'Problemas da língua culta',
          'Estrutura e formação de palavras'
        ]
      }
    ]
  },
  {
    id: 'matematica',
    nome: 'Matemática',
    icone: '🔢',
    cor: '#2196F3',
    questoes: 10,
    grupos: [
      {
        nome: 'Funções',
        topicos: [
          'Função afim (1º grau)',
          'Função quadrática (2º grau)',
          'Função exponencial',
          'Função logarítmica',
          'Funções trigonométricas (seno, cosseno, tangente)'
        ]
      },
      {
        nome: 'Geometria',
        topicos: [
          'Geometria Plana: triângulos, quadriláteros, círculo',
          'Geometria Espacial: cubo, paralelepípedo, cilindro, cone, esfera',
          'Geometria Analítica: equação da reta, circunferência'
        ]
      },
      {
        nome: 'Análise Combinatória e Probabilidade',
        topicos: [
          'Princípio fundamental da contagem',
          'Permutação, arranjo, combinação',
          'Probabilidade'
        ]
      },
      {
        nome: 'Progressões',
        topicos: [
          'Progressão Aritmética (PA)',
          'Progressão Geométrica (PG)'
        ]
      },
      {
        nome: 'Matrizes e Sistemas',
        topicos: [
          'Operações com matrizes',
          'Determinantes',
          'Sistemas lineares'
        ]
      },
      {
        nome: 'Aritmética e Problemas',
        topicos: [
          'Conjuntos numéricos (N, Z, Q, R)',
          'Regra de três',
          'Porcentagem',
          'Raciocínio lógico'
        ]
      },
      {
        nome: 'Matemática Financeira (0-1q)',
        topicos: [
          'Juros simples e compostos',
          'Montante e descontos'
        ]
      },
      {
        nome: 'Estatística (0-1q)',
        topicos: [
          'Média, mediana, moda',
          'Desvio padrão e variância',
          'Gráficos e interpretação'
        ]
      }
    ]
  },
  {
    id: 'quimica',
    nome: 'Química',
    icone: '🧪',
    cor: '#FF9800',
    questoes: 38,
    grupos: [
      {
        nome: 'Substâncias e Propriedades',
        topicos: [
          'Modelos atômicos (Dalton, Thomson, Rutherford, Bohr)',
          'Números quânticos e distribuição eletrônica',
          'Tabela periódica: períodos e grupos',
          'Propriedades periódicas (raio, EI, afinidade, eletronegatividade)',
          'Ligações: iônica, covalente, metálica',
          'Geometria molecular (VSEPR)',
          'Polaridade e forças intermoleculares'
        ]
      },
      {
        nome: 'Funções Inorgânicas',
        topicos: [
          'Ácidos: identificação, nomenclatura, força',
          'Bases: identificação, nomenclatura, força',
          'Sais: identificação, nomenclatura, obtenção',
          'Óxidos: classificação (ácido, básico, anfótero, neutro)',
          'Hidretos',
          'Reações de formação de ácidos e bases',
          'Ácidos e bases fortes vs fracos',
          'Neutralização e titulação ácido-base'
        ]
      },
      {
        nome: 'Reações Inorgânicas',
        topicos: [
          'Balanceamento de equações',
          'NOX e reações de oxirredução (redox)',
          'Reações de síntese, decomposição, simples e dupla troca',
          'Reações de neutralização',
          'Reações de precipitação e dissolução',
          'Reações em meio ácido e básico',
          'Agentes oxidantes e redutores comuns',
          'Cálculo de NOX em compostos complexos'
        ]
      },
      {
        nome: 'Estequiometria',
        topicos: [
          'Massa atômica, molecular, mol, Constante de Avogadro',
          'Leis ponderais (Lavoisier, Proust)',
          'Cálculos estequiométricos',
          'Reagente limitante e excesso',
          'Rendimento e pureza'
        ]
      },
      {
        nome: 'Soluções',
        topicos: [
          'Concentração comum',
          'Molaridade (concentração molar)',
          'Molalidade',
          'Título e porcentagem',
          'ppm (partes por milhão)',
          'Fração molar',
          'Diluição (C1V1 = C2V2)',
          'Mistura de soluções',
          'Solubilidade e Kps',
          'Propriedades coligativas',
          'Coloides: classificação e propriedades'
        ]
      },
      {
        nome: 'Química Orgânica - Nomenclatura',
        topicos: [
          'Cadeias carbônicas (classificação)',
          'Hidrocarbonetos: alcanos, alcenos, alcinos, alcadienos',
          'Hidrocarbonetos aromáticos',
          'Petróleo: composição, refino, frações',
          'Funções oxigenadas: álcool, fenol, éter, aldeído, cetona, ácido, éster',
          'Funções nitrogenadas: amina, amida, nitrocomposto',
          'Haletos orgânicos',
          'Nomenclatura IUPAC'
        ]
      },
      {
        nome: 'Química Orgânica - Reações',
        topicos: [
          'Reações de adição (alcenos e alcinos)',
          'Reações de oxidação (álcool > aldeído/cetona/ácido)',
          'Reações de esterificação',
          'Polimerização (adição e condensação)',
          'Substituição em aromáticos'
        ]
      },
      {
        nome: 'Química Orgânica - Isomeria',
        topicos: [
          'Isomeria plana (função, cadeia, posição, metameria, tautomeria)',
          'Isomeria geométrica (cis-trans)'
        ]
      },
      {
        nome: 'Equilíbrio Químico',
        topicos: [
          'Constante de equilíbrio (Kc e Kp)',
          'Princípio de Le Chatelier',
          'Deslocamento de equilíbrio',
          'Equilíbrio iônico',
          'pH e pOH (cálculo e escala)',
          'Hidrólise de sais',
          'Solução-tampão',
          'Produto de solubilidade (Kps)'
        ]
      },
      {
        nome: 'Cinética Química',
        topicos: [
          'Velocidade das reações',
          'Fatores que afetam a velocidade',
          'Lei da velocidade',
          'Ordem de reação',
          'Energia de ativação',
          'Mecanismos de reação'
        ]
      },
      {
        nome: 'Termoquímica',
        topicos: [
          'Entalpia e variação de entalpia (ΔH)',
          'Reações exotérmicas e endotérmicas',
          'Lei de Hess',
          'Entalpia de formação, combustão, ligação'
        ]
      },
      {
        nome: 'Eletroquímica',
        topicos: [
          'Célula galvânica (pilha)',
          'Potencial de eletrodo e DDP',
          'Equação de Nernst',
          'Eletrólise ígnea e aquosa',
          'Leis de Faraday'
        ]
      },
      {
        nome: 'Técnicas de Laboratório',
        topicos: [
          'Destilação simples e fracionada',
          'Extração líquido-líquido e sólido-líquido',
          'Filtração simples e a vácuo',
          'Decantação e centrifugação',
          'Gravimetria',
          'Secagem e calcinação'
        ]
      },
      {
        nome: 'Titulometria',
        topicos: [
          'Volumetria de neutralização (ácido-base)',
          'Volumetria de precipitação',
          'Volumetria de complexação',
          'Volumetria de oxirredução (redox)',
          'Indicadores ácido-base e redox',
          'Curvas de titulação',
          'Cálculos titulométricos'
        ]
      },
      {
        nome: 'Análise Instrumental (menor incidência)',
        topicos: [
          'Espectrometria no Infravermelho (IV)',
          'Espectrometria UV-Vis (Lei de Beer-Lambert)',
          'Cromatografia líquida (HPLC)',
          'Cromatografia gasosa (CG)',
          'Potenciometria e pHmetro',
          'Condutometria'
        ]
      },
      {
        nome: 'Física-Química',
        topicos: [
          'Estados da matéria: sólido, líquido, gasoso, plasma',
          'Leis dos gases: Boyle, Charles, Gay-Lussac, Lei dos Gases Ideais',
          'Transformações isotérmicas, isobáricas, isocóricas e adiabáticas',
          'Pressão de vapor e ponto de ebulição',
          'Tensão superficial e capilaridade',
          'Viscosidade de fluidos',
          'Difusão e efusão de gases',
          'Termodinâmica: primeira lei, segunda lei, função de estado',
          'Entropia e energia livre de Gibbs',
          'Espontaneidade de processos',
          'Transformações de fase e diagramas de fase',
          'Pontos de fusão, ebulição e transição'
        ]
      },
      {
        nome: 'Química Analítica Avançada',
        topicos: [
          'Análise qualitativa de cátions em solução',
          'Análise qualitativa de ânions',
          'Marcha analítica clássica',
          'Determinação de concentrações por espectrofotometria',
          'Gravimetria: cálculos e técnicas de precipitação',
          'Análise volumétrica: normalidade e equivalência',
          'Padronização de soluções',
          'Erros em análise química: sistemáticos e aleatórios',
          'Tratamento de dados: média, desvio padrão, confiabilidade',
          'Detecção de erros: critério de rejeição de dados'
        ]
      },
      {
        nome: 'Mecanismo de Reações e Cinética Avançada',
        topicos: [
          'Reações elementares e molecularidade',
          'Intermediários de reação',
          'Estado de transição e complexo ativado',
          'Energia de ativação e teoria do complexo ativado',
          'Catalisadores homogêneos e heterogêneos',
          'Autocatálise e inibição',
          'Cinética de reações de primeira, segunda e ordem zero',
          'Tempo de meia-vida e sua dependência da ordem',
          'Métodos de determinação da ordem de reação',
          'Influência de temperatura: equação de Arrhenius'
        ]
      }
     ]
   },
   {
     id: 'processospetroleo',
     nome: '🛢️ Processos de Petróleo',
     icone: '🛢️',
     cor: '#000000',
     questoes: 8,
     grupos: [
      {
        nome: 'Exploração e Produção',
        topicos: [
          'Prospecção: métodos sísmicos e gravimétricos',
          'Exploração: poços exploratórios e delimitadores',
          'Produção: poços produtores e métodos de extração',
          'Perfuração: sistemas de circulação e fluidos de perfuração',
          'Testes de formação e avaliação de reservatórios',
          'Reservatórios: características, porosidade, permeabilidade, saturação'
        ]
      },
      {
        nome: 'Processamento Primário',
        topicos: [
          'Separação gás-óleo-água (GOSP)',
          'Redução de pressão e temperatura',
          'Desidratação de óleo cru',
          'Tratamento de emulsões',
          'Remoção de sais e corrosivos',
          'Centrifugação e decantação'
        ]
      },
      {
        nome: 'Refino - Operações Básicas',
        topicos: [
          'Destilação atmosférica',
          'Destilação a vácuo',
          'Viscorredução (visbreaking)',
          'Destilação flash multiestágios',
          'Fraccionamento de colunas',
          'Recuperação de gases leves'
        ]
      },
      {
        nome: 'Refino - Conversão',
        topicos: [
          'Craqueamento catalítico fluidizado (FCC)',
          'Hidrocraquejamento (HCK)',
          'Reforma catalítica',
          'Isomerização',
          'Alquilação',
          'Conversão de heavy oils'
        ]
      },
      {
        nome: 'Refino - Tratamento',
        topicos: [
          'Desulfurização: dessulfurização a vácuo (VDS), jet fuel, diesel, gasolina',
          'Hidrotratamento de frações leves',
          'Remoção de nitrogênio',
          'Remoção de metais (níquel, vanádio)',
          'Remoção de aromáticos',
          'Sweetening de naftas'
        ]
      },
      {
        nome: 'Blend de Produtos',
        topicos: [
          'Gasolina: octanagem, volatilidade, aditivos',
          'Diesel: índice de cetano, propriedades a baixa temperatura',
          'Querosene: ponto de congelação e destilação',
          'Óleo combustível: viscosidade, teor de enxofre',
          'Lubrificantes: viscosidade, índice de viscosidade',
          'Aditivos: antioxidantes, anticorrosivos, detergentes'
        ]
      },
      {
        nome: 'Logística e Armazenamento',
        topicos: [
          'Tanques de armazenamento: tipos e dimensionamento',
          'Emulsões e breaking de emulsões',
          'Estabilidade de produtos durante armazenagem',
          'Movimentação de produtos: dutos, navios-tanque, caminhões',
          'Monitoramento de qualidade em transferência',
          'Segregação de produtos'
        ]
      }
     ]
   },
   {
     id: 'segurancaaambiente',
     nome: '🔐 Segurança, Saúde e Ambiente (SSH)',
     icone: '🔐',
     cor: '#D32F2F',
     questoes: 7,
     grupos: [
      {
        nome: 'Legislação de SSH',
        topicos: [
          'NR 1 — Disposições Gerais e Gerenciamento de SSH',
          'NR 6 — Equipamento de Proteção Individual (EPI)',
          'NR 7 — Programa de Controle Médico de Saúde Ocupacional (PCMSO)',
          'NR 9 — Programa de Prevenção de Riscos Ambientais (PPRA)',
          'NR 15 — Atividades e Operações Insalubres',
          'NR 16 — Atividades e Operações Perigosas',
          'NR 35 — Trabalho em Altura',
          'Legislação ambiental: Lei 6938/81, Resolução CONAMA'
        ]
      },
      {
        nome: 'Identificação de Riscos',
        topicos: [
          'Matriz de risco: probabilidade, severidade, exposição',
          'Riscos físicos: ruído, vibração, radiação, temperatura',
          'Riscos químicos: classificação de substâncias perigosas',
          'Riscos biológicos: microorganismos, contaminantes',
          'Riscos ergonômicos: posturas inadequadas, esforço repetitivo',
          'Acidentes: causas diretas, causas raiz, eventos desencadeantes'
        ]
      },
      {
        nome: 'Controle e Mitigação',
        topicos: [
          'Hierarquia de controle: eliminação, substituição, engenharia, administrativo, EPI',
          'Ventilação de ambientes: natural, mecânica, diluidora, local',
          'Isolamento de fontes de perigo',
          'Sistemas de intertravamento de segurança',
          'Alarm systems e procedimentos de emergência',
          'Manutenção preventiva e corretiva'
        ]
      },
      {
        nome: 'Saúde Ocupacional',
        topicos: [
          'Conceitos de saúde ocupacional e vigilância à saúde',
          'Doenças ocupacionais: causalidade, latência, irreversibilidade',
          'Síndrome do Trabalho Repetitivo (STR)',
          'Lombalgias relacionadas ao trabalho',
          'Ototoxicidade: perda auditiva induzida por ruído (PAIR)',
          'Pneumoconioses: silicose, asbestose, talicose',
          'Dermatites de contato ocupacional',
          'Vigilância biológica: monitoramento de exposição'
        ]
      },
      {
        nome: 'Impactos Ambientais e Controle',
        topicos: [
          'Emissões atmosféricas: CO2, NOx, SOx, particulados, VOCs',
          'Poluição aquática: despejos, drenagem ácida, óleos',
          'Resíduos sólidos: classificação, tratamento, disposição',
          'Remediação de solos contaminados',
          'Efluentes: tratamento primário, secundário, terciário',
          'Gestão de resíduos perigosos'
        ]
      },
      {
        nome: 'Sistemas de Gestão SSH',
        topicos: [
          'ISO 45001: Sistema de Gestão de SSH',
          'ISO 14001: Sistema de Gestão Ambiental',
          'Auditorias internas e externas',
          'Programa de treinamento e conscientização',
          'Investigação de acidentes: metodologia, recomendações',
          'Indicadores: acidentalidade, absenteísmo, frequência',
          'Engajamento e comunicação com partes interessadas'
        ]
      },
      {
        nome: 'Resposta a Emergências',
        topicos: [
          'Plano de ação de emergência (PAE)',
          'Brigada de emergência e treinamento',
          'Primeiros socorros: ressuscitação cardiopulmonar (RCP)',
          'Eventos críticos: vazamentos, incêndios, explosões',
          'Plano de contingência para desastres ambientais',
          'Comunicação de crise com órgãos reguladores',
          'Pós-emergência: investigação e lições aprendidas'
        ]
      }
     ]
   },
   {
     id: 'metrologiacontrole',
     nome: '⚖️ Metrologia e Controle de Qualidade',
     icone: '⚖️',
     cor: '#1976D2',
     questoes: 6,
     grupos: [
      {
        nome: 'Fundamentos de Metrologia',
        topicos: [
          'Unidades SI: definições e derivações',
          'Padrões primários, secundários, de trabalho',
          'Rastreabilidade metrológica',
          'Certificados de calibração: leitura e interpretação',
          'Incerteza de medição: tipos A e B',
          'Expressão de incerteza com cobertura 95%'
        ]
      },
      {
        nome: 'Instrumentação Analítica',
        topicos: [
          'Calibração de equipamentos volumétricos: bureta, pipeta, balão volumétrico',
          'Balanças analíticas: tipos, sensibilidade, ajuste',
          'Espectrofotômetro UV-Vis: calibração de comprimento de onda e absorbância',
          'pHmetro: calibração em dois ou três pontos',
          'Condutivímetro: calibração com padrões',
          'Termômetros: calibração com pontos fixos'
        ]
      },
      {
        nome: 'Controle de Qualidade em Processo',
        topicos: [
          'Amostragem: planos de amostragem, tamanho da amostra',
          'Cartas de controle: média e amplitude (X-R), amplitude móvel (I-MR)',
          'Capacidade do processo: Cp, Cpk, Pp, Ppk',
          'Limites de controle: naturais e especificação',
          'Padrões de comportamento: zonas, pontos fora de controle',
          'Testes de hipótese: ANOVA, t-test, chi-square'
        ]
      },
      {
        nome: 'Garantia de Qualidade (QA)',
        topicos: [
          'Boas Práticas de Laboratório (BPL)',
          'Validação de métodos analíticos: exatidão, precisão, seletividade',
          'Linearidade, intervalo e robustez',
          'Padrões de referência: certificação e rastreabilidade',
          'Reagentes: qualificação, estabilidade, prazo de validade',
          'Documentação: rastreabilidade e arquivos'
        ]
      },
      {
        nome: 'Estatística aplicada à Qualidade',
        topicos: [
          'Distribuições: normal, t-Student, qui-quadrado, F',
          'Intervalos de confiança para média e proporção',
          'Teste de normalidade: Shapiro-Wilk, Anderson-Darling',
          'Teste de homocedasticidade: Levene, Bartlett',
          'ANOVA um fator e multifatorial',
          'Correlação e regressão linear/não-linear'
        ]
      },
      {
        nome: 'Sistemas de Qualidade (ISO)',
        topicos: [
          'ISO/IEC 17025: Requisitos para laboratórios',
          'ISO 9001: Sistema de Gestão da Qualidade',
          'ISO 13849-1: Segurança de máquinas',
          'Auditoria interna e não-conformidade',
          'Ações corretivas e preventivas (CAPA)',
          'Gestão de documentos: versões, aprovação, distribuição'
       ]
      }
    ]
  }
];

const SEMANAS_PLANO = 12;
const META_HORAS_SEMANA = 30;

const CICLO_ESTUDOS = [
  { materia: 'Português', icone: '📝', tempo: 80, peso: 4 },
  { materia: 'Química — Soluções + Inorgânica', icone: '🧪', tempo: 90, peso: 4 },
  { materia: 'Matemática', icone: '🔢', tempo: 70, peso: 3 },
  { materia: 'Química — Equilíbrio + pH', icone: '🧪', tempo: 60, peso: 2 },
  { materia: 'Química — Orgânica', icone: '🧪', tempo: 60, peso: 2 },
  { materia: 'Química — Cinética + Termo + Eletro', icone: '🧪', tempo: 60, peso: 3 },
  { materia: 'Química — Substâncias/Propriedades', icone: '🧪', tempo: 40, peso: 1 },
  { materia: 'Química — Técnicas + Titulometria', icone: '🧪', tempo: 60, peso: 2 },
  { materia: 'Química — Transformações + Estequiometria', icone: '🧪', tempo: 80, peso: 3 }
];

const DIAS_SEMANA = [
  { valor: 'seg', rotulo: 'Segunda' },
  { valor: 'ter', rotulo: 'Terça' },
  { valor: 'qua', rotulo: 'Quarta' },
  { valor: 'qui', rotulo: 'Quinta' },
  { valor: 'sex', rotulo: 'Sexta' },
  { valor: 'sab', rotulo: 'Sábado' },
  { valor: 'dom', rotulo: 'Domingo' }
];

const REVISAO_INTERVALOS = [
  { id: 'd1', rotulo: 'D+1 (24h)', dias: 1 },
  { id: 'd7', rotulo: 'D+7 (1 sem)', dias: 7 },
  { id: 'd30', rotulo: 'D+30 (1 mês)', dias: 30 }
];

const MATERIA_MAP = {
  P:   { nome: 'Português',        icone: '📝', cor: '#4CAF50' },
  M:   { nome: 'Matemática',       icone: '🔢', cor: '#2196F3' },
  Q:   { nome: 'Química',          icone: '🧪', cor: '#FF9800' },
  QO:  { nome: 'Química Orgânica', icone: '🧪', cor: '#E65100' },
  R:   { nome: 'Revisão',          icone: '🔄', cor: '#7C3AED' },
  SIM: { nome: 'Simulado',         icone: '📋', cor: '#DC2626' },
};

const CRONOGRAMA_SEMANAL = [
  {
    semana: 1, titulo: 'Fundamento Químico + Orgânica Básica',
    dias: [
      { dia: 'Segunda-feira', slots: [
        { periodo: '08h-10h', cod: 'P', conteudo: 'Interpretação de textos (estilo Cesgranrio)' },
        { periodo: '13h-15h', cod: 'Q', conteudo: 'Átomos, modelos atômicos, tabela periódica' },
        { periodo: '20h-22h', cod: 'Q', conteudo: 'Ligações químicas + geometria molecular' },
      ]},
      { dia: 'Terça-feira', slots: [
        { periodo: '08h-10h', cod: 'P', conteudo: 'Ortografia + Acentuação (Cesgranrio)' },
        { periodo: '13h-15h', cod: 'Q', conteudo: 'Funções inorgânicas I: Ácidos + Bases' },
        { periodo: '20h-22h', cod: 'Q', conteudo: 'Funções inorgânicas II: Sais + Óxidos' },
      ]},
      { dia: 'Quarta-feira', slots: [
        { periodo: '08h-10h', cod: 'M', conteudo: 'Conjuntos + Função afim (1º grau)' },
        { periodo: '13h-15h', cod: 'Q', conteudo: 'Reações inorgânicas (síntese, decomposição, simples/dupla troca)' },
        { periodo: '20h-22h', cod: 'Q', conteudo: 'Exercícios de funções inorgânicas' },
      ]},
      { dia: 'Quinta-feira', slots: [
        { periodo: '08h-10h', cod: 'P', conteudo: 'Classes de palavras (substantivo, adjetivo, artigo)' },
        { periodo: '13h-15h', cod: 'Q', conteudo: 'NOX + Reações redox' },
        { periodo: '20h-22h', cod: 'Q', conteudo: 'Balanceamento redox' },
      ]},
      { dia: 'Sexta-feira', slots: [
        { periodo: '08h-10h', cod: 'M', conteudo: 'Função quadrática' },
        { periodo: '13h-15h', cod: 'Q', conteudo: 'Revisão da semana + 30 questões' },
        { periodo: '20h-22h', cod: 'R', conteudo: 'Correção + caderno de erros' },
      ]},
    ],
  },
  {
    semana: 2, titulo: 'Estequiometria + Soluções I',
    dias: [
      { dia: 'Segunda-feira', slots: [
        { periodo: '08h-10h', cod: 'P', conteudo: 'Classes (verbos, pronomes, conjunções)' },
        { periodo: '13h-15h', cod: 'Q', conteudo: 'Massa molar, mol, Constante de Avogadro' },
        { periodo: '20h-22h', cod: 'Q', conteudo: 'Leis ponderais + Cálculos estequiométricos' },
      ]},
      { dia: 'Terça-feira', slots: [
        { periodo: '08h-10h', cod: 'P', conteudo: 'Sintaxe (concordância verbal e nominal)' },
        { periodo: '13h-15h', cod: 'Q', conteudo: 'Reagente limitante + Rendimento + Pureza' },
        { periodo: '20h-22h', cod: 'Q', conteudo: 'Exercícios de estequiometria' },
      ]},
      { dia: 'Quarta-feira', slots: [
        { periodo: '08h-10h', cod: 'M', conteudo: 'Geometria plana (triângulos, quadriláteros, círculo)' },
        { periodo: '13h-15h', cod: 'Q', conteudo: 'Soluções: concentração comum + molaridade' },
        { periodo: '20h-22h', cod: 'Q', conteudo: 'Diluição (C1V1 = C2V2)' },
      ]},
      { dia: 'Quinta-feira', slots: [
        { periodo: '08h-10h', cod: 'P', conteudo: 'Regência verbal + nominal + Crase' },
        { periodo: '13h-15h', cod: 'Q', conteudo: 'Mistura de soluções (mesmo soluto + c/ reação)' },
        { periodo: '20h-22h', cod: 'Q', conteudo: 'Título, ppm, fração molar' },
      ]},
      { dia: 'Sexta-feira', slots: [
        { periodo: '08h-10h', cod: 'M', conteudo: 'Geometria espacial (cubo, paralelepípedo, cilindro, cone)' },
        { periodo: '13h-15h', cod: 'Q', conteudo: 'Revisão estequiometria + soluções (30 questões)' },
        { periodo: '20h-22h', cod: 'R', conteudo: 'Correção' },
      ]},
    ],
  },
  {
    semana: 3, titulo: 'Soluções II + Equilíbrio Químico',
    dias: [
      { dia: 'Segunda-feira', slots: [
        { periodo: '08h-10h', cod: 'P', conteudo: 'Pontuação' },
        { periodo: '13h-15h', cod: 'Q', conteudo: 'Propriedades coligativas + Coloides' },
        { periodo: '20h-22h', cod: 'Q', conteudo: 'Solubilidade + Kps' },
      ]},
      { dia: 'Terça-feira', slots: [
        { periodo: '08h-10h', cod: 'P', conteudo: 'Reescritura de frases + Problemas língua culta' },
        { periodo: '13h-15h', cod: 'Q', conteudo: 'Equilíbrio Químico (Kc, Kp, relação)' },
        { periodo: '20h-22h', cod: 'Q', conteudo: 'Princípio de Le Chatelier' },
      ]},
      { dia: 'Quarta-feira', slots: [
        { periodo: '08h-10h', cod: 'M', conteudo: 'Progressões (PA e PG)' },
        { periodo: '13h-15h', cod: 'Q', conteudo: 'Exercícios de equilíbrio químico' },
        { periodo: '20h-22h', cod: 'Q', conteudo: 'pH + pOH + escala' },
      ]},
      { dia: 'Quinta-feira', slots: [
        { periodo: '08h-10h', cod: 'P', conteudo: '10 questões completas Cesgranrio (prova 2018)' },
        { periodo: '13h-15h', cod: 'Q', conteudo: 'Hidrólise de sais + Solução-tampão' },
        { periodo: '20h-22h', cod: 'Q', conteudo: 'Exercícios de pH e tampão' },
      ]},
      { dia: 'Sexta-feira', slots: [
        { periodo: '08h-10h', cod: 'M', conteudo: 'Análise Combinatória (PFC, permutação, arranjo, combinação)' },
        { periodo: '13h-15h', cod: 'R', conteudo: 'Revisão S1+S2 (átomos a soluções)' },
        { periodo: '20h-22h', cod: 'R', conteudo: '30 questões de revisão + correção' },
      ]},
    ],
  },
  {
    semana: 4, titulo: 'Técnicas de Laboratório + Titulometria + SIMULADO 1',
    dias: [
      { dia: 'Segunda-feira', slots: [
        { periodo: '08h-10h', cod: 'P', conteudo: 'Interpretação + vocabulário (Cesgranrio)' },
        { periodo: '13h-15h', cod: 'Q', conteudo: 'Técnicas: destilação, filtração, extração, decantação' },
        { periodo: '20h-22h', cod: 'Q', conteudo: 'Gravimetria' },
      ]},
      { dia: 'Terça-feira', slots: [
        { periodo: '08h-10h', cod: 'P', conteudo: 'Exercícios de sintaxe (Crase, concordância, regência)' },
        { periodo: '13h-15h', cod: 'Q', conteudo: 'Titulometria: conceitos, padrão primário, fator de correção' },
        { periodo: '20h-22h', cod: 'Q', conteudo: 'Volumetria ácido-base (curvas, indicadores)' },
      ]},
      { dia: 'Quarta-feira', slots: [
        { periodo: '08h-10h', cod: 'M', conteudo: 'Geometria analítica (reta, circunferência)' },
        { periodo: '13h-15h', cod: 'Q', conteudo: 'Volumetria redox (permanganometria, iodometria)' },
        { periodo: '20h-22h', cod: 'Q', conteudo: 'Volumetria de precipitação e complexação' },
      ]},
      { dia: 'Quinta-feira', slots: [
        { periodo: '08h-10h', cod: 'M', conteudo: 'Aritmética + Problemas (regra de 3, porcentagem)' },
        { periodo: '13h-15h', cod: 'Q', conteudo: 'Cálculos titulométricos' },
        { periodo: '20h-22h', cod: 'Q', conteudo: 'Exercícios completos de titulometria' },
      ]},
      { dia: 'Sexta-feira', slots: [
        { periodo: '08h-10h', cod: 'SIM', conteudo: 'SIMULADO 1 (2h: P+M / 2h: Q)' },
        { periodo: '13h-15h', cod: 'R', conteudo: 'Correção do simulado' },
        { periodo: '20h-22h', cod: 'R', conteudo: 'Caderno de erros + revisão' },
      ]},
    ],
  },
  {
    semana: 5, titulo: 'Química Orgânica',
    dias: [
      { dia: 'Segunda-feira', slots: [
        { periodo: '08h-10h', cod: 'P', conteudo: 'Exercícios de interpretação (3 textos Cesgranrio)' },
        { periodo: '13h-15h', cod: 'QO', conteudo: 'Cadeias carbônicas + Hidrocarbonetos (alcanos, alcenos, alcinos)' },
        { periodo: '20h-22h', cod: 'QO', conteudo: 'Nomenclatura IUPAC' },
      ]},
      { dia: 'Terça-feira', slots: [
        { periodo: '08h-10h', cod: 'P', conteudo: 'Morfologia (verbos: tempos, modos, vozes)' },
        { periodo: '13h-15h', cod: 'QO', conteudo: 'Hidrocarbonetos aromáticos + Petróleo e refino' },
        { periodo: '20h-22h', cod: 'QO', conteudo: 'Exercícios de nomenclatura' },
      ]},
      { dia: 'Quarta-feira', slots: [
        { periodo: '08h-10h', cod: 'M', conteudo: 'Álgebra Linear / Matrizes (operações, determinantes)' },
        { periodo: '13h-15h', cod: 'QO', conteudo: 'Funções oxigenadas (álcool, fenol, éter, aldeído, cetona, ácido, éster)' },
        { periodo: '20h-22h', cod: 'QO', conteudo: 'Funções nitrogenadas + Haletos' },
      ]},
      { dia: 'Quinta-feira', slots: [
        { periodo: '08h-10h', cod: 'P', conteudo: 'Pronomes: colocação + emprego' },
        { periodo: '13h-15h', cod: 'QO', conteudo: 'Reações orgânicas (adição, oxidação, esterificação, polimerização)' },
        { periodo: '20h-22h', cod: 'QO', conteudo: 'Exercícios de reações orgânicas' },
      ]},
      { dia: 'Sexta-feira', slots: [
        { periodo: '08h-10h', cod: 'M', conteudo: 'Raciocínio Lógico' },
        { periodo: '13h-15h', cod: 'QO', conteudo: 'Isomeria plana + geométrica' },
        { periodo: '20h-22h', cod: 'QO', conteudo: '30 questões completas de Orgânica' },
      ]},
    ],
  },
  {
    semana: 6, titulo: 'Cinética + Termoquímica + Estatística/Financeira',
    dias: [
      { dia: 'Segunda-feira', slots: [
        { periodo: '08h-10h', cod: 'P', conteudo: '10 questões Cesgranrio (prova completa Português 2018)' },
        { periodo: '13h-15h', cod: 'Q', conteudo: 'Cinética: velocidade, fatores, lei da velocidade' },
        { periodo: '20h-22h', cod: 'Q', conteudo: 'Ordem de reação + Energia de ativação' },
      ]},
      { dia: 'Terça-feira', slots: [
        { periodo: '08h-10h', cod: 'P', conteudo: 'Revisão geral de gramática Cesgranrio' },
        { periodo: '13h-15h', cod: 'Q', conteudo: 'Exercícios de cinética' },
        { periodo: '20h-22h', cod: 'Q', conteudo: 'Termoquímica (entalpia, calor de reação, Lei de Hess)' },
      ]},
      { dia: 'Quarta-feira', slots: [
        { periodo: '08h-10h', cod: 'M', conteudo: 'Matemática Financeira (juros simples e compostos)' },
        { periodo: '13h-15h', cod: 'Q', conteudo: 'Exercícios de termoquímica' },
        { periodo: '20h-22h', cod: 'Q', conteudo: '20 questões de cinética + termoquímica' },
      ]},
      { dia: 'Quinta-feira', slots: [
        { periodo: '08h-10h', cod: 'M', conteudo: 'Estatística básica (média, desvio, gráficos)' },
        { periodo: '13h-15h', cod: 'Q', conteudo: 'Eletroquímica (pilhas, potenciais, DDP)' },
        { periodo: '20h-22h', cod: 'Q', conteudo: 'Equação de Nernst + Eletrólise' },
      ]},
      { dia: 'Sexta-feira', slots: [
        { periodo: '08h-10h', cod: 'R', conteudo: 'Revisão S3+S4+S5 (equilíbrio, técnicas, orgânica)' },
        { periodo: '13h-15h', cod: 'R', conteudo: '40 questões mistas de Química' },
        { periodo: '20h-22h', cod: 'R', conteudo: 'Correção + caderno de erros' },
      ]},
    ],
  },
  {
    semana: 7, titulo: 'REVISÃO PESADA + SIMULADO 2',
    dias: [
      { dia: 'Segunda-feira', slots: [
        { periodo: '08h-10h', cod: 'P', conteudo: 'Revisão interpretação + sintaxe (2h cronometradas)' },
        { periodo: '13h-15h', cod: 'Q', conteudo: 'REVISÃO: Soluções + Funções Inorgânicas (40 questões)' },
        { periodo: '20h-22h', cod: 'Q', conteudo: 'REVISÃO: Estequiometria + Reações (30 questões)' },
      ]},
      { dia: 'Terça-feira', slots: [
        { periodo: '08h-10h', cod: 'M', conteudo: 'Revisão: funções + geometria (30 questões)' },
        { periodo: '13h-15h', cod: 'Q', conteudo: 'REVISÃO: Equilíbrio Químico + pH (25 questões)' },
        { periodo: '20h-22h', cod: 'Q', conteudo: 'REVISÃO: Técnicas + Titulometria (20 questões)' },
      ]},
      { dia: 'Quarta-feira', slots: [
        { periodo: '08h-10h', cod: 'P', conteudo: 'Revisão: morfologia + pontuação + crase' },
        { periodo: '13h-15h', cod: 'Q', conteudo: 'REVISÃO: Orgânica (30 questões)' },
        { periodo: '20h-22h', cod: 'Q', conteudo: 'REVISÃO: Cinética + Termoquímica (20 questões)' },
      ]},
      { dia: 'Quinta-feira', slots: [
        { periodo: '08h-10h', cod: 'M', conteudo: 'Revisão: combinatória + PA/PG + matrizes' },
        { periodo: '13h-15h', cod: 'R', conteudo: 'Mapeamento de pontos fracos' },
        { periodo: '20h-22h', cod: 'R', conteudo: 'Reforço nos tópicos críticos' },
      ]},
      { dia: 'Sexta-feira', slots: [
        { periodo: '08h-10h', cod: 'SIM', conteudo: 'SIMULADO 2 (2h: P+M / 2h: Q)' },
        { periodo: '13h-15h', cod: 'R', conteudo: 'Correção completa' },
        { periodo: '20h-22h', cod: 'R', conteudo: 'Caderno de erros' },
      ]},
    ],
  },
  {
    semana: 8, titulo: 'Provas Anteriores Cesgranrio (resolução completa)',
    dias: [
      { dia: 'Segunda-feira', slots: [
        { periodo: '08h-10h', cod: 'R', conteudo: 'Resolver PROVA CESGRANRIO 2018 (60 questões, cronometrado)' },
        { periodo: '13h-15h', cod: 'R', conteudo: 'Correção detalhada questão a questão' },
        { periodo: '20h-22h', cod: 'R', conteudo: 'Analisar padrão de erros' },
      ]},
      { dia: 'Terça-feira', slots: [
        { periodo: '08h-10h', cod: 'R', conteudo: 'Revisar tópicos que errou na prova 2018' },
        { periodo: '13h-15h', cod: 'Q', conteudo: 'Exercícios focados nos erros (Química)' },
        { periodo: '20h-22h', cod: 'R', conteudo: 'Exercícios focados nos erros (Port. + Mat.)' },
      ]},
      { dia: 'Quarta-feira', slots: [
        { periodo: '08h-10h', cod: 'R', conteudo: 'Resolver PROVA TRANSPETRO CESGRANRIO 2023 (60q, cronometrado)' },
        { periodo: '13h-15h', cod: 'R', conteudo: 'Correção detalhada questão a questão' },
        { periodo: '20h-22h', cod: 'R', conteudo: 'Analisar padrão de erros' },
      ]},
      { dia: 'Quinta-feira', slots: [
        { periodo: '08h-10h', cod: 'R', conteudo: 'Revisar tópicos que errou na prova 2023' },
        { periodo: '13h-15h', cod: 'Q', conteudo: 'Mais exercícios nos pontos fracos (Química)' },
        { periodo: '20h-22h', cod: 'R', conteudo: 'Mais exercícios nos pontos fracos (Port. + Mat.)' },
      ]},
      { dia: 'Sexta-feira', slots: [
        { periodo: '08h-10h', cod: 'R', conteudo: 'Resolver PROVA CESGRANRIO 2011 (se disponível)' },
        { periodo: '13h-15h', cod: 'R', conteudo: 'Correção' },
        { periodo: '20h-22h', cod: 'R', conteudo: 'Síntese: o que a Cesgranrio mais cobra' },
      ]},
    ],
  },
  {
    semana: 9, titulo: 'Aprofundamento nos Tópicos Campeões (parte 1)',
    dias: [
      { dia: 'Segunda-feira', slots: [
        { periodo: '08h-10h', cod: 'P', conteudo: '30 questões de interpretação Cesgranrio' },
        { periodo: '13h-15h', cod: 'Q', conteudo: '50 questões de Soluções + Funções Inorgânicas' },
        { periodo: '20h-22h', cod: 'R', conteudo: 'Correção' },
      ]},
      { dia: 'Terça-feira', slots: [
        { periodo: '08h-10h', cod: 'M', conteudo: '25 questões de funções + geometria' },
        { periodo: '13h-15h', cod: 'Q', conteudo: '40 questões de Transformações Químicas + Estequiometria' },
        { periodo: '20h-22h', cod: 'R', conteudo: 'Correção' },
      ]},
      { dia: 'Quarta-feira', slots: [
        { periodo: '08h-10h', cod: 'P', conteudo: '20 questões de sintaxe + crase + pontuação' },
        { periodo: '13h-15h', cod: 'Q', conteudo: '35 questões de Equilíbrio Químico + pH' },
        { periodo: '20h-22h', cod: 'R', conteudo: 'Correção' },
      ]},
      { dia: 'Quinta-feira', slots: [
        { periodo: '08h-10h', cod: 'M', conteudo: '15 questões de combinatória + PA/PG + matrizes' },
        { periodo: '13h-15h', cod: 'Q', conteudo: '30 questões de Técnicas de Laboratório + Titulometria' },
        { periodo: '20h-22h', cod: 'R', conteudo: 'Correção' },
      ]},
      { dia: 'Sexta-feira', slots: [
        { periodo: '08h-10h', cod: 'P', conteudo: '10 questões Cesgranrio (prova completa)' },
        { periodo: '13h-15h', cod: 'Q', conteudo: '30 questões de Orgânica' },
        { periodo: '20h-22h', cod: 'R', conteudo: 'Revisão dos erros da semana' },
      ]},
    ],
  },
  {
    semana: 10, titulo: 'Aprofundamento (parte 2) + Química Aplicada',
    dias: [
      { dia: 'Segunda-feira', slots: [
        { periodo: '08h-10h', cod: 'P', conteudo: 'Estratégias de leitura Cesgranrio' },
        { periodo: '13h-15h', cod: 'Q', conteudo: '20 questões de Cinética' },
        { periodo: '20h-22h', cod: 'Q', conteudo: '20 questões de Termoquímica' },
      ]},
      { dia: 'Terça-feira', slots: [
        { periodo: '08h-10h', cod: 'M', conteudo: 'Revisão: aritmética + problemas + estatística' },
        { periodo: '13h-15h', cod: 'Q', conteudo: 'Eletroquímica (revisão + 15 questões)' },
        { periodo: '20h-22h', cod: 'Q', conteudo: 'Análise Instrumental básica (IV, UV-Vis, Cromatografia)' },
      ]},
      { dia: 'Quarta-feira', slots: [
        { periodo: '08h-10h', cod: 'P', conteudo: '20 questões de morfologia (verbos, pronomes)' },
        { periodo: '13h-15h', cod: 'Q', conteudo: 'Operações Unitárias + Processos Industriais' },
        { periodo: '20h-22h', cod: 'Q', conteudo: 'Termodinâmica + Equilíbrio de fases' },
      ]},
      { dia: 'Quinta-feira', slots: [
        { periodo: '08h-10h', cod: 'M', conteudo: 'Matemática Financeira + Raciocínio Lógico' },
        { periodo: '13h-15h', cod: 'Q', conteudo: 'Análise Instrumental (mais questões)' },
        { periodo: '20h-22h', cod: 'R', conteudo: 'Revisão geral dos tópicos da semana' },
      ]},
      { dia: 'Sexta-feira', slots: [
        { periodo: '08h-10h', cod: 'P', conteudo: '10 questões Cesgranrio (leitura + gramática)' },
        { periodo: '13h-15h', cod: 'R', conteudo: '50 questões mistas de Química' },
        { periodo: '20h-22h', cod: 'R', conteudo: 'Correção + pontos fracos' },
      ]},
    ],
  },
  {
    semana: 11, titulo: 'Simulado 3 + Reta Final',
    dias: [
      { dia: 'Segunda-feira', slots: [
        { periodo: '08h-10h', cod: 'R', conteudo: 'Revisão relâmpago Português (mapas mentais)' },
        { periodo: '13h-15h', cod: 'R', conteudo: 'Revisão: Soluções + Inorgânica + Estequiometria' },
        { periodo: '20h-22h', cod: 'R', conteudo: 'Revisão: Equilíbrio + pH + Técnicas' },
      ]},
      { dia: 'Terça-feira', slots: [
        { periodo: '08h-10h', cod: 'R', conteudo: 'Revisão relâmpago Matemática (fórmulas)' },
        { periodo: '13h-15h', cod: 'R', conteudo: 'Revisão: Orgânica + Cinética + Termoquímica' },
        { periodo: '20h-22h', cod: 'R', conteudo: 'Revisão: Eletroquímica + Instrumental' },
      ]},
      { dia: 'Quarta-feira', slots: [
        { periodo: '08h-10h', cod: 'R', conteudo: 'Revisão acelerada de TODAS as fórmulas' },
        { periodo: '13h-15h', cod: 'R', conteudo: 'Resolução de dúvidas finais' },
        { periodo: '20h-22h', cod: 'R', conteudo: 'Leitura de resumos' },
      ]},
      { dia: 'Quinta-feira', slots: [
        { periodo: '08h-10h', cod: 'SIM', conteudo: 'SIMULADO 3 (igual à prova real: 60 questões, 4h)' },
        { periodo: '13h-15h', cod: 'R', conteudo: 'Correção completa' },
        { periodo: '20h-22h', cod: 'R', conteudo: 'Últimos ajustes' },
      ]},
      { dia: 'Sexta-feira', slots: [
        { periodo: '08h-10h', cod: 'R', conteudo: 'Revisão dos erros do simulado' },
        { periodo: '13h-15h', cod: 'R', conteudo: 'Revisão dos erros do simulado' },
        { periodo: '20h-22h', cod: 'R', conteudo: 'Revisão leve de resumos' },
      ]},
    ],
  },
  {
    semana: 12, titulo: 'Últimos Dias',
    dias: [
      { dia: 'Segunda-feira', slots: [
        { periodo: '08h-10h', cod: 'R', conteudo: 'Revisão TOP 3 Química (Soluções, Estequiometria, Equilíbrio)' },
        { periodo: '13h-15h', cod: 'R', conteudo: 'Revisão TOP 2 (Orgânica, Técnicas)' },
        { periodo: '20h-22h', cod: 'R', conteudo: 'Revisão TOP 2 (Cinética, Termoquímica)' },
      ]},
      { dia: 'Terça-feira', slots: [
        { periodo: '08h-10h', cod: 'R', conteudo: '25 questões rápidas de Português' },
        { periodo: '13h-15h', cod: 'R', conteudo: '25 questões rápidas de Matemática' },
        { periodo: '20h-22h', cod: 'R', conteudo: '30 questões rápidas de Química' },
      ]},
      { dia: 'Quarta-feira', slots: [
        { periodo: '08h-10h', cod: 'R', conteudo: 'Revisão de resumos + fórmulas' },
        { periodo: '13h-15h', cod: 'R', conteudo: 'Revisão de resumos + fórmulas' },
        { periodo: '20h-22h', cod: 'R', conteudo: 'Revisão de resumos + fórmulas' },
      ]},
      { dia: 'Quinta-feira', slots: [
        { periodo: '08h-10h', cod: 'R', conteudo: 'Leitura leve de resumos' },
        { periodo: '13h-15h', cod: 'R', conteudo: 'Logística: documentação, local, horário' },
        { periodo: '20h-22h', cod: 'R', conteudo: 'DESCANSO' },
      ]},
      { dia: 'Sexta-feira', slots: [
        { periodo: '08h-10h', cod: 'R', conteudo: 'DESCANSO TOTAL' },
        { periodo: '13h-15h', cod: 'R', conteudo: 'DESCANSO TOTAL' },
        { periodo: '20h-22h', cod: 'R', conteudo: 'DIA DA PROVA' },
      ]},
    ],
  },
];
