const { createApp, ref, computed, watch, onMounted } = Vue;

//  COMPOSABLES - Lógica de Negócio Modularizada
// ===================================================================

function useSimulados(semanasPlano) {
  const simulados = ref([]);
  const formSimulado = ref({ semana: 1, portugues: 0, matematica: 0, quimica: 0 });

  const simuladosOrdenados = computed(() => {
    return [...simulados.value]
      .sort((a, b) => a.semana - b.semana)
      .map(s => ({
        ...s,
        total: (s.portugues || 0) + (s.matematica || 0) + (s.quimica || 0),
        porcentagem: Math.round(((s.portugues || 0) + (s.matematica || 0) + (s.quimica || 0)) / 60 * 100)
      }));
  });

  const formSimuladoTotal = computed(() => {
    return (formSimulado.value.portugues || 0) +
           (formSimulado.value.matematica || 0) +
           (formSimulado.value.quimica || 0);
  });

  async function salvarSimulado() {
    const s = { ...formSimulado.value };
    if (!s.semana || s.semana < 1 || s.semana > semanasPlano) return;

    const novoSimulado = {
      semana: s.semana,
      portugues: Number(s.portugues) || 0,
      matematica: Number(s.matematica) || 0,
      quimica: Number(s.quimica) || 0
    };

    // Otimização: Atualiza a UI reativamente, sem re-fetch
    const idx = simulados.value.findIndex(item => item.semana === novoSimulado.semana);
    if (idx >= 0) {
      simulados.value.splice(idx, 1, novoSimulado);
    } else {
      simulados.value.push(novoSimulado);
    }

    await Armazenamento.salvarSimulado(novoSimulado);
    formSimulado.value = { semana: s.semana + 1, portugues: 0, matematica: 0, quimica: 0 };
  }

  async function removerSimulado(semana) {
    // Otimização: Atualiza a UI reativamente
    const idx = simulados.value.findIndex(item => item.semana === semana);
    if (idx >= 0) {
      simulados.value.splice(idx, 1);
    }
    await Armazenamento.removerSimulado(semana);
  }

  const simuladoStatus = computed(() => {
    if (simuladosOrdenados.value.length === 0) {
      return { texto: '—', classe: '' };
    }
    const ultimo = simuladosOrdenados.value[simuladosOrdenados.value.length - 1];
    return {
      texto: `${ultimo.porcentagem}%`,
      classe: ultimo.porcentagem >= 70 ? 'verde' : ultimo.porcentagem >= 50 ? 'laranja' : 'vermelho'
    };
  });

  return {
    simulados,
    formSimulado,
    simuladosOrdenados,
    formSimuladoTotal,
    salvarSimulado,
    removerSimulado,
    simuladoStatus
  };
}

function useErros() {
  const erros = ref([]);
  const formErro = ref({ materia: '', topico: '', descricao: '', pensamento: '', respostaCorreta: '', lacuna: '', tipo: 'B' });
  const editandoErro = ref(null);
  const carregandoErros = ref(false);

  const errosAgrupados = computed(() => {
    const grupos = {};
    const materias = ['Português', 'Matemática', 'Química'];
    materias.forEach(m => grupos[m] = []);
    erros.value.forEach(e => {
      if (grupos[e.materia]) grupos[e.materia].push(e);
    });
    return grupos;
  });

  const totalErros = computed(() => erros.value.length);

  async function carregarErros() {
    if (erros.value.length > 0) return; // Evita recarregar se já tiver dados
    carregandoErros.value = true;
    erros.value = await Armazenamento.getErros();
    carregandoErros.value = false;
  }

  function novoErro() {
    editandoErro.value = { id: Date.now(), data: new Date().toISOString().slice(0, 10), ...formErro.value };
  }

  async function salvarErro() {
    if (!editandoErro.value || !editandoErro.value.materia || !editandoErro.value.topico) return;
    
    const erroSalvo = { ...editandoErro.value };

    // Otimização: Atualiza a UI reativamente
    const idx = erros.value.findIndex(e => e.id === erroSalvo.id);
    if (idx >= 0) {
      erros.value.splice(idx, 1, erroSalvo);
    } else {
      erros.value.push(erroSalvo);
    }

    await Armazenamento.salvarErro(erroSalvo);
    editandoErro.value = null;
    formErro.value = { materia: '', topico: '', descricao: '', pensamento: '', respostaCorreta: '', lacuna: '', tipo: 'B' };
  }

  function editarErro(e) {
    editandoErro.value = { ...e };
  }

  async function removerErro(id) {
    // Otimização: Atualiza a UI reativamente
    const idx = erros.value.findIndex(e => e.id === id);
    if (idx >= 0) {
      erros.value.splice(idx, 1);
    }
    await Armazenamento.removerErro(id);
  }

  function cancelarErro() {
    editandoErro.value = null;
  }

  return {
    erros, formErro, editandoErro, errosAgrupados, totalErros, carregandoErros,
    novoErro, salvarErro, editarErro, removerErro, cancelarErro, carregarErros
  };
}

function useCiclo(cicloEstudosData) {
  const ciclo = ref({ posicao: 0, concluido: {} });
  const cicloExpandido = ref(false);

  const cicloPonderado = computed(() => {
    const arr = [];
    cicloEstudosData.forEach((item, idx) => {
      for (let w = 0; w < item.peso; w++) {
        arr.push({ ...item, idxOriginal: idx });
      }
    });
    return arr;
  });

  const totalPonderado = computed(() => cicloPonderado.value.length);

  const materiaAtual = computed(() => {
    const pond = cicloPonderado.value;
    if (pond.length === 0) return cicloEstudosData[0] || {};
    return pond[ciclo.value.posicao] || pond[0];
  });

  const idxOriginalAtual = computed(() => materiaAtual.value.idxOriginal ?? 0);

  const cicloCompleto = computed(() => {
    const total = totalPonderado.value;
    if (total === 0) return 0;
    const totalCompletions = Object.values(ciclo.value.concluido || {}).reduce((a, b) => a + b, 0);
    return Math.min(100, Math.round(totalCompletions / total * 100));
  });

  const completosPorItem = computed(() => {
    const map = {};
    cicloEstudosData.forEach((_, i) => {
      map[i] = ciclo.value.concluido[`item-${i}`] || 0;
    });
    return map;
  });

  async function avancarCiclo() {
    const item = cicloPonderado.value[ciclo.value.posicao];
    const novoCiclo = { ...ciclo.value, concluido: { ...(ciclo.value.concluido || {}) } };
    const chave = `item-${item.idxOriginal}`;
    novoCiclo.concluido[chave] = (novoCiclo.concluido[chave] || 0) + 1;
    novoCiclo.posicao = (ciclo.value.posicao + 1) % totalPonderado.value;
    ciclo.value = novoCiclo;
    await Armazenamento.salvarCiclo(novoCiclo);
  }

  async function reiniciarCiclo() {
    const novoCiclo = { posicao: 0, concluido: {} };
    ciclo.value = novoCiclo;
    await Armazenamento.salvarCiclo(novoCiclo);
  }

  return {
    ciclo, cicloExpandido, materiaAtual, idxOriginalAtual,
    cicloCompleto, completosPorItem, avancarCiclo, reiniciarCiclo
  };
}

function useDiario(checklistItens) {
  const diario = ref({});
  const diarioData = ref(new Date().toISOString().slice(0, 10));

  const diarioHoje = computed(() => {
    return diario.value[diarioData.value] || {};
  });

  const diarioProgresso = computed(() => {
    const items = diarioHoje.value;
    const total = checklistItens.length;
    if (total === 0) return 0;
    const feitos = checklistItens.filter(i => items[i.id]).length;
    return Math.round(feitos / total * 100);
  });

  async function alternarDiario(itemId) {
    // Garante que o objeto para a data de hoje exista
    if (!diario.value[diarioData.value]) {
      diario.value[diarioData.value] = {};
    }

    // Atualização reativa e imediata
    const hoje = diario.value[diarioData.value];
    hoje[itemId] = !hoje[itemId];

    // Persiste a alteração em segundo plano
    await Armazenamento.salvarDiario(diarioData.value, hoje);
  }

  return {
    diario, diarioData, diarioHoje, diarioProgresso, alternarDiario
  };
}

function useHoras(semanasPlano, diasSemana, metaHoras) {
  const horas = ref({});

  function horaValor(semana, dia, materia) {
    return horas.value[semana]?.[dia]?.[materia] || 0;
  }

  async function setHora(semana, dia, materia, valor) {
    // Otimização: Atualização reativa e imediata da UI
    if (!horas.value[semana]) {
      horas.value[semana] = {};
    }
    if (!horas.value[semana][dia]) {
      horas.value[semana][dia] = {};
    }
    horas.value[semana][dia][materia] = Number(valor) || 0;

    // Persiste a alteração em segundo plano
    await Armazenamento.salvarHora(semana, dia, materia, valor);
  }

  function totalDia(semana, dia) {
    return ['portugues', 'matematica', 'quimica']
      .reduce((acc, m) => acc + horaValor(semana, dia, m), 0);
  }

  function totalMateriaSemana(semana, materia) {
    return diasSemana.reduce((acc, d) => acc + horaValor(semana, d.valor, materia), 0);
  }

  function horasSemana(semana) {
    return ['portugues', 'matematica', 'quimica']
      .reduce((acc, m) => acc + totalMateriaSemana(semana, m), 0);
  }

  function totalAcumulado(materia) {
    let total = 0;
    for (let s = 1; s <= semanasPlano; s++) {
      total += totalMateriaSemana(s, materia);
    }
    return Math.round(total * 10) / 10;
  }

  const totalHorasAcumuladas = computed(() => {
    return Math.round(
      ['portugues', 'matematica', 'quimica']
        .reduce((acc, m) => acc + totalAcumulado(m), 0) * 10
    ) / 10;
  });

  return {
    horas, horaValor, setHora, totalDia, totalMateriaSemana, horasSemana,
    totalAcumulado, totalHorasAcumuladas
  };
}

function useChecklist(conteudosData) {
  const checklist = ref({});
  const gruposAbertos = ref({});
  const filtro = ref('');

  // Initialize all groups as open by default
  conteudosData.forEach(m => {
    m.grupos.forEach(g => {
      gruposAbertos.value[m.id + '-' + g.nome] = true;
    });
  });

  function chaveItem(materiaId, grupoNome, idx) {
    return `${materiaId}::${grupoNome}::${idx}`;
  }

  function checkId(materiaId, grupoNome, idx) {
    return !!checklist.value[chaveItem(materiaId, grupoNome, idx)];
  }

  async function alternarItem(materiaId, grupoNome, idx) {
    const k = chaveItem(materiaId, grupoNome, idx);
    // Instant reactive UI update
    checklist.value[k] = !checklist.value[k];
    // Persist change in the background
    await Armazenamento.salvarChecklist(k, checklist.value[k]);
  }

  function toggleGrupo(materiaId, grupoNome) {
    const k = materiaId + '-' + grupoNome;
    gruposAbertos.value[k] = !gruposAbertos.value[k];
  }

  function totalItens(materia) {
    return materia.grupos.reduce((acc, g) => acc + g.topicos.length, 0);
  }

  function itensConcluidos(materia) {
    let count = 0;
    materia.grupos.forEach(g => {
      g.topicos.forEach((_, idx) => {
        if (checkId(materia.id, g.nome, idx)) count++;
      });
    });
    return count;
  }

  function itensConcluidosGrupo(materiaId, grupo) {
    let count = 0;
    grupo.topicos.forEach((_, idx) => {
      if (checkId(materiaId, grupo.nome, idx)) count++;
    });
    return count;
  }

  function progressoMateria(materia) {
    const total = totalItens(materia);
    if (total === 0) return 0;
    return Math.round(itensConcluidos(materia) / total * 100);
  }

  const totalGeral = computed(() => conteudosData.reduce((acc, m) => acc + totalItens(m), 0));
  const totalConcluidoGeral = computed(() => conteudosData.reduce((acc, m) => acc + itensConcluidos(m), 0));
  const progressoGeral = computed(() => {
    if (totalGeral.value === 0) return 0;
    return Math.round(totalConcluidoGeral.value / totalGeral.value * 100);
  });

  const conteudosFiltrados = computed(() => {
    if (!filtro.value.trim()) return conteudosData;
    const termo = filtro.value.toLowerCase();
    return conteudosData.map(materia => ({
      ...materia,
      grupos: materia.grupos.map(grupo => ({
        ...grupo,
        topicos: grupo.topicos.filter(topico => topico.toLowerCase().includes(termo))
      })).filter(grupo => grupo.topicos.length > 0)
    })).filter(materia => materia.grupos.length > 0);
  });

  function expandirTudo() { Object.keys(gruposAbertos.value).forEach(k => gruposAbertos.value[k] = true); }
  function colapsarTudo() { Object.keys(gruposAbertos.value).forEach(k => gruposAbertos.value[k] = false); }

  return {
    checklist, gruposAbertos, filtro,
    chaveItem, checkId, alternarItem, toggleGrupo,
    totalItens, itensConcluidos, itensConcluidosGrupo, progressoMateria,
    totalGeral, totalConcluidoGeral, progressoGeral,
    conteudosFiltrados, expandirTudo, colapsarTudo
  };
}

function useRevisoes(revisaoIntervalos) {
  const revisoes = ref([]);

  const revisoesPendentes = computed(() => {
    const hoje = new Date();
    return revisoes.value.filter(r => new Date(r.data) <= hoje && !r.concluida);
  });

  const revisoesHoje = computed(() => {
    const hoje = new Date().toISOString().slice(0, 10);
    return revisoesPendentes.value.filter(r => r.data === hoje);
  });

  async function agendarRevisao(topico, materia, dataEstudo) {
    const dt = new Date(dataEstudo);
    const novasRevisoes = [];
    for (const iv of revisaoIntervalos) {
      const dataRev = new Date(dt);
      dataRev.setDate(dataRev.getDate() + iv.dias);
      const rev = {
        id: `${topico}-${iv.id}-${Date.now()}`,
        topico, materia,
        data: dataRev.toISOString().slice(0, 10),
        intervalo: iv.rotulo,
        concluida: false
      };
      novasRevisoes.push(rev);
      await Armazenamento.salvarRevisao(rev); // Salva uma por uma
    }
    revisoes.value.push(...novasRevisoes); // Atualização reativa em massa
  }

  async function concluirRevisao(id) {
    const rev = revisoes.value.find(r => r.id === id);
    if (rev) {
      rev.concluida = true; // Atualização reativa
      await Armazenamento.salvarRevisao(rev);
    }
  }

  async function removerRevisao(id) {
    const idx = revisoes.value.findIndex(r => r.id === id);
    if (idx > -1) revisoes.value.splice(idx, 1); // Atualização reativa
    await Armazenamento.removerRevisao(id);
  }

  return { revisoes, revisoesPendentes, revisoesHoje, agendarRevisao, concluirRevisao, removerRevisao };
}

function useFlashcards() {
  const flashcards = ref([]);
  const formFlashcard = ref({ materia: '', frente: '', verso: '' });
  const editandoFlashcard = ref(null);
  const carregandoFlashcards = ref(false);
  
  // --- Estado do Modo de Revisão ---
  const modoRevisao = ref(false);
  const configurandoRevisao = ref(false);
  const deckRevisao = ref([]);
  const cardAtualIndex = ref(0);
  const opcoesRevisao = ref({ materias: [], numCards: 10, aleatorio: true });

  // Configuração do Sistema Leitner
  const LEITNER_BOXES = {
    1: 1,  // Revisar todo dia
    2: 3,  // A cada 3 dias
    3: 7,  // A cada 7 dias
    4: 14, // A cada 14 dias
    5: 30  // A cada 30 dias
  };
  const cardAtual = computed(() => deckRevisao.value[cardAtualIndex.value] || null);
  const progressoRevisao = computed(() => deckRevisao.value.length > 0 ? Math.round(((cardAtualIndex.value + 1) / deckRevisao.value.length) * 100) : 0);


  const flashcardsAgrupados = computed(() => {
    const grupos = {};
    const materias = ['Português', 'Matemática', 'Química'];
    materias.forEach(m => grupos[m] = []);
    flashcards.value.forEach(f => {
      if (grupos[f.materia]) grupos[f.materia].push(f);
    });
    return grupos;
  });

  async function carregarFlashcards() {
    if (flashcards.value.length > 0) return;
    carregandoFlashcards.value = true;
    flashcards.value = await Armazenamento.getFlashcards();
    carregandoFlashcards.value = false;
  }

  function novoFlashcard() {
    editandoFlashcard.value = { 
      id: Date.now(), 
      ...formFlashcard.value,
      box: 1, // Novos cards começam na caixa 1
      lastReviewed: null 
    };
  }

  async function salvarFlashcard() {
    if (!editandoFlashcard.value || !editandoFlashcard.value.materia) return;
    const cardSalvo = { box: 1, lastReviewed: null, ...editandoFlashcard.value };

    const idx = flashcards.value.findIndex(f => f.id === cardSalvo.id);
    if (idx >= 0) flashcards.value.splice(idx, 1, cardSalvo);
    else flashcards.value.push(cardSalvo);

    await Armazenamento.salvarFlashcard(cardSalvo);
    editandoFlashcard.value = null;
    formFlashcard.value = { materia: '', frente: '', verso: '' };
  }

  function editarFlashcard(card) {
    editandoFlashcard.value = { ...card };
  }

  async function removerFlashcard(id) {
    const idx = flashcards.value.findIndex(f => f.id === id);
    if (idx > -1) flashcards.value.splice(idx, 1);
    await Armazenamento.removerFlashcard(id);
  }

  function cancelarFlashcard() { 
    editandoFlashcard.value = null; 
  }

  // --- Métodos do Modo de Revisão ---
  function abrirConfiguracaoRevisao() {
    configurandoRevisao.value = true;
  }

  function iniciarRevisao() {
    configurandoRevisao.value = false;
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    // 1. Seleciona os cards "vencidos" para revisão
    let dueCards = flashcards.value.filter(card => {
      if (!card.lastReviewed) return true; // Cards nunca revisados estão sempre vencidos
      const lastReviewed = new Date(card.lastReviewed);
      const interval = LEITNER_BOXES[card.box || 1] || 1;
      const dueDate = new Date(lastReviewed);
      dueDate.setDate(dueDate.getDate() + interval);
      return hoje >= dueDate;
    });

    // 2. Filtra por matéria, se o usuário selecionou alguma
    if (opcoesRevisao.value.materias.length > 0) {
      dueCards = dueCards.filter(card => opcoesRevisao.value.materias.includes(card.materia));
    }

    // 3. Embaralha o deck
    if (opcoesRevisao.value.aleatorio) {
      for (let i = dueCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [dueCards[i], dueCards[j]] = [dueCards[j], dueCards[i]];
      }
    }

    // 4. Limita o número de cards e prepara para a revisão
    deckRevisao.value = dueCards.slice(0, opcoesRevisao.value.numCards).map(c => ({...c, virado: false}));
    cardAtualIndex.value = 0;
    modoRevisao.value = true;
  }

  function proximoCard() {
    if (cardAtualIndex.value < deckRevisao.value.length - 1) {
      cardAtualIndex.value++;
    } else {
      finalizarRevisao(); // Termina a revisão ao chegar no último card
    }
  }

  async function marcarResultado(acertou) {
    const card = cardAtual.value;
    if (!card) return;

    if (acertou) {
      card.box = Math.min((card.box || 1) + 1, 5); // Avança a caixa, máx 5
    } else {
      card.box = 1; // Errou, volta para a caixa 1
    }
    card.lastReviewed = new Date().toISOString().slice(0, 10);

    // Salva a alteração no card original
    const originalCard = flashcards.value.find(f => f.id === card.id);
    if (originalCard) {
      Object.assign(originalCard, { box: card.box, lastReviewed: card.lastReviewed });
      await Armazenamento.salvarFlashcard(originalCard);
    }
    proximoCard();
  }

  function finalizarRevisao() {
    modoRevisao.value = false;
  }

  function cancelarConfiguracaoRevisao() {
    configurandoRevisao.value = false;
  }

  return { flashcards, formFlashcard, editandoFlashcard, carregandoFlashcards, flashcardsAgrupados, carregarFlashcards, novoFlashcard, salvarFlashcard, editarFlashcard, removerFlashcard, cancelarFlashcard, modoRevisao, configurandoRevisao, deckRevisao, cardAtual, progressoRevisao, opcoesRevisao, abrirConfiguracaoRevisao, iniciarRevisao, proximoCard, marcarResultado, finalizarRevisao, cancelarConfiguracaoRevisao };
}

function useCronograma(cronogramaData) {
  const progresso = ref({});
  const carregado = ref(false);

  const cronChave = (semana, dia, periodo) => `s${semana}_${dia}_${periodo}`;

  function slotConcluido(semana, dia, periodo) {
    return !!progresso.value[cronChave(semana, dia, periodo)];
  }

  const totalSlots = computed(() => {
    let total = 0;
    cronogramaData.forEach(sem => { sem.dias.forEach(d => { total += d.slots.length; }); });
    return total;
  });

  const totalConcluidos = computed(() => {
    return Object.values(progresso.value).filter(Boolean).length;
  });

  const progressoGeralCron = computed(() => {
    if (totalSlots.value === 0) return 0;
    return Math.round(totalConcluidos.value / totalSlots.value * 100);
  });

  const progressoSemana = (semana) => {
    const sem = cronogramaData[semana - 1];
    if (!sem) return 0;
    let total = 0, concluidos = 0;
    sem.dias.forEach(d => {
      d.slots.forEach(s => {
        total++;
        if (slotConcluido(semana, d.dia, s.periodo)) concluidos++;
      });
    });
    return total > 0 ? Math.round(concluidos / total * 100) : 0;
  };

  const totalSlotsSemana = (semana) => {
    const sem = cronogramaData[semana - 1];
    if (!sem) return 0;
    let total = 0;
    sem.dias.forEach(d => { total += d.slots.length; });
    return total;
  };

  const concluidosSemana = (semana) => {
    const sem = cronogramaData[semana - 1];
    if (!sem) return 0;
    let concluidos = 0;
    sem.dias.forEach(d => {
      d.slots.forEach(s => {
        if (slotConcluido(semana, d.dia, s.periodo)) concluidos++;
      });
    });
    return concluidos;
  };

  async function alternarSlot(semana, dia, periodo) {
    const chave = cronChave(semana, dia, periodo);
    const novoValor = !progresso.value[chave];
    progresso.value[chave] = novoValor;
    await Armazenamento.alternarCronograma(chave, novoValor);
  }

  async function carregarProgresso() {
    if (carregado.value) return;
    const dados = await Armazenamento.getCronograma();
    progresso.value = dados;
    carregado.value = true;
  }

  return {
    progresso, carregado,
    slotConcluido, alternarSlot,
    totalSlots, totalConcluidos, progressoGeralCron,
    progressoSemana, totalSlotsSemana, concluidosSemana,
    carregarProgresso
  };
}

// ===================================================================
//  APLICAÇÃO VUE - O Orquestrador
// ===================================================================

const app = createApp({
  setup() {
    // --- Estado da UI e Navegação ---
    const view = ref('dashboard');
    const menuAberta = ref(false);
    const semanaAtual = ref(1);
    const carregando = ref(true);
    const tema = ref('light');

    // --- Constantes e Dados Estáticos ---
    const semanasPlano = SEMANAS_PLANO;
    const metaHoras = META_HORAS_SEMANA;

    // --- Usando o Composable para a feature de Simulados ---
    const { simulados, formSimulado, simuladosOrdenados, formSimuladoTotal, salvarSimulado, removerSimulado, simuladoStatus } = useSimulados(semanasPlano);

    // --- Usando o Composable para a feature de Caderno de Erros ---
    const { erros, formErro, editandoErro, errosAgrupados, totalErros, carregandoErros, novoErro, salvarErro, editarErro, removerErro, cancelarErro, carregarErros } = useErros();

    // --- Usando o Composable para a feature de Ciclo de Estudos ---
    const { ciclo, cicloExpandido, materiaAtual, idxOriginalAtual, cicloCompleto, completosPorItem, avancarCiclo, reiniciarCiclo } = useCiclo(CICLO_ESTUDOS);

    // --- Usando o Composable para a feature de Diário de Estudos ---
    const CHECKLIST_ITENS = [
      { id: 'ciclo', texto: 'Defini a próxima matéria do ciclo' },
      { id: 'teoria', texto: 'Estudei teoria (máx 25 min por Pomodoro)' },
      { id: 'recall', texto: 'Fiz Active Recall (fechei e tentei lembrar)' },
      { id: 'questoes', texto: 'Resolvi questões do tópico' },
      { id: 'correcao', texto: 'Corrigi e registrei erros no caderno' },
      { id: 'flashcards', texto: 'Revisei flashcards pendentes (10-15 min)' },
      { id: 'checklist', texto: 'Marquei progresso no checklist de conteúdos' },
      { id: 'horas', texto: 'Registrei horas no quadro de horas' }
    ];
    const { diario, diarioData, diarioHoje, diarioProgresso, alternarDiario } = useDiario(CHECKLIST_ITENS);

    // --- Usando o Composable para a feature de Quadro de Horas ---
    const { horas, horaValor, setHora, totalDia, totalMateriaSemana, horasSemana, totalAcumulado, totalHorasAcumuladas } = useHoras(semanasPlano, DIAS_SEMANA, metaHoras);

    // --- Usando o Composable para a feature de Checklist de Conteúdos ---
    const { checklist, gruposAbertos, filtro, chaveItem, checkId, alternarItem, toggleGrupo,
            totalItens, itensConcluidos, itensConcluidosGrupo, progressoMateria,
            totalGeral, totalConcluidoGeral, progressoGeral,
            conteudosFiltrados, expandirTudo, colapsarTudo } = useChecklist(CONTEUDOS);

    // --- Usando o Composable para a feature de Revisões ---
    const { revisoes, revisoesPendentes, revisoesHoje, agendarRevisao, concluirRevisao, removerRevisao } = useRevisoes(REVISAO_INTERVALOS);

    // --- Usando o Composable para a feature de Flashcards ---
    const { flashcards, formFlashcard, editandoFlashcard, carregandoFlashcards, flashcardsAgrupados, carregarFlashcards, novoFlashcard, salvarFlashcard, editarFlashcard, removerFlashcard, cancelarFlashcard, modoRevisao, configurandoRevisao, deckRevisao, cardAtual, progressoRevisao, opcoesRevisao, abrirConfiguracaoRevisao, iniciarRevisao, proximoCard, marcarResultado, finalizarRevisao, cancelarConfiguracaoRevisao } = useFlashcards();


    const horasSemanaAtual = computed(() => horasSemana(semanaAtual.value));
    const metaSemanaCss = computed(() => {
      const h = horasSemanaAtual.value;
      return h >= metaHoras ? 'verde' : h >= metaHoras * 0.5 ? 'laranja' : 'vermelho';
    });

    const diasSemana = DIAS_SEMANA.filter(d => d.valor !== 'sab' && d.valor !== 'dom');

    // Inicialização assíncrona
    onMounted(async () => {
      carregando.value = true;
      const config = await Armazenamento.getConfig();
      tema.value = config.tema || 'light';
      document.documentElement.setAttribute('data-tema', tema.value);

      checklist.value = await Armazenamento.getChecklist();
      horas.value = await Armazenamento.getHoras(); // Exemplo de como outras features seriam carregadas
      simulados.value = await Armazenamento.getSimulados();
      // erros.value = await Armazenamento.getErros(); // << REMOVIDO DAQUI
      diario.value = await Armazenamento.getDiario();
      revisoes.value = await Armazenamento.getRevisoes();
      ciclo.value = await Armazenamento.getCiclo();
      await carregarProgresso();
      initPlanos();
      carregando.value = false;
    });

    // Observador para carregar dados sob demanda (Lazy Loading)
    watch(view, (novaView) => {
      if (novaView === 'erros') {
        carregarErros();
      }
      if (novaView === 'flashcards') {
        carregarFlashcards();
      }
    });

    const tituloView = computed(() => ({
      dashboard: 'Dashboard',
      checklist: 'Conteúdos',
      ciclo: 'Ciclo de Estudos',
      horas: 'Quadro de Horas',
      simulados: 'Simulados',
      erros: 'Caderno de Erros',
      flashcards: 'Flashcards',
      diario: 'Diário de Estudos',
      cronograma: 'Cronograma Semanal',
      plano: 'Plano de Estudos'
    })[view.value]);

    const subtituloView = computed(() => ({
      dashboard: 'Visão geral do seu progresso',
      checklist: 'Marque os tópicos já estudados',
      ciclo: 'Sua próxima matéria no ciclo de estudos',
      horas: 'Registre suas horas de estudo',
      simulados: 'Acompanhe seu desempenho nos simulados',
      erros: 'Caderno de Erros — cada erro é um ponto garantido',
      flashcards: 'Crie e revise seus flashcards',
      diario: 'Checklist diário do concurseiro aprovado',
      cronograma: 'Cronograma detalhado semana a semana',
      plano: 'Consulte o cronograma e conteúdos programáticos'
    })[view.value]);

    // --- Computeds Globais ---
    const totalMeta = computed(() => semanasPlano * metaHoras);

    // --- Cronograma ---
    const periodos = ['08h-10h', '13h-15h', '20h-22h'];
    const cronSemana = ref(1);
    const cronograma = CRONOGRAMA_SEMANAL;
    const {
      slotConcluido, alternarSlot,
      totalSlots, totalConcluidos, progressoGeralCron,
      progressoSemana, totalSlotsSemana, concluidosSemana,
      carregarProgresso
    } = useCronograma(cronograma);

    const semanaAtualDias = computed(() => {
      const s = cronograma[cronSemana.value - 1];
      return s ? s.dias : [];
    });

    function materiaInfo(cod) { return MATERIA_MAP[cod] || { nome: cod, icone: '\uD83D\uDCD8', cor: '#6b7280' }; }

    const materiasList = computed(() => {
      const seen = {};
      if (!semanaAtualDias.value) return [];
      semanaAtualDias.value.forEach(d => d.slots.forEach(s => { seen[s.cod] = MATERIA_MAP[s.cod]; }));
      return Object.entries(seen).map(([cod, info]) => ({ cod, ...info }));
    });

    // --- Plano ---
    const PLANOS_LISTA = [
      { id: 'caderno-erros', nome: 'Caderno de Erros', grupo: 'Cronogramas e Planos' },
      { id: 'checklist-conteudos', nome: 'Checklist de Conteúdos', grupo: 'Cronogramas e Planos' },
      { id: 'ciclo-estudos', nome: 'Ciclo de Estudos', grupo: 'Cronogramas e Planos' },
      { id: 'conteudo-programatico', nome: 'Conteúdo Programático', grupo: 'Cronogramas e Planos' },
      { id: 'cronograma-12-semanas-provas', nome: 'Cronograma 12 Semanas (Provas)', grupo: 'Cronogramas e Planos' },
      { id: 'cronograma-cesgranrio', nome: 'Cronograma Cesgranrio', grupo: 'Cronogramas e Planos' },
      { id: 'cronograma-completo', nome: 'Cronograma Completo', grupo: 'Cronogramas e Planos' },
      { id: 'metodologia-estudo', nome: 'Metodologia de Estudo', grupo: 'Cronogramas e Planos' },
      { id: 'quadro-horas', nome: 'Quadro de Horas', grupo: 'Cronogramas e Planos' },
      { id: 'relatorio-metodos-concurseiros', nome: 'Relatório — Métodos de Concurseiros', grupo: 'Cronogramas e Planos' },
      { id: 'revisoes-simulados', nome: 'Revisões e Simulados', grupo: 'Cronogramas e Planos' },
      { id: 'materias/portugues', nome: 'Português', grupo: 'Matérias' },
      { id: 'materias/matematica', nome: 'Matemática', grupo: 'Matérias' },
      { id: 'materias/quimica-geral', nome: 'Química Geral', grupo: 'Matérias' },
      { id: 'materias/quimica-analitica', nome: 'Química Analítica', grupo: 'Matérias' },
      { id: 'materias/quimica-organica', nome: 'Química Orgânica', grupo: 'Matérias' },
      { id: 'materias/fisico-quimica', nome: 'Físico-Química', grupo: 'Matérias' },
      { id: 'materias/analise-instrumental', nome: 'Análise Instrumental', grupo: 'Matérias' },
      { id: 'materias/metrologia-estatistica', nome: 'Metrologia e Estatística', grupo: 'Matérias' },
      { id: 'resumos/analise-geral', nome: 'Análise Geral', grupo: 'Resumos' },
      { id: 'resumos/portugues', nome: 'Português', grupo: 'Resumos' },
      { id: 'resumos/matematica', nome: 'Matemática', grupo: 'Resumos' },
      { id: 'resumos/quimica-geral', nome: 'Química Geral', grupo: 'Resumos' },
      { id: 'resumos/quimica-organica', nome: 'Química Orgânica', grupo: 'Resumos' },
      { id: 'resumos/fisico-quimica', nome: 'Físico-Química', grupo: 'Resumos' },
      { id: 'resumos/tecnicas-laboratorio', nome: 'Técnicas de Laboratório', grupo: 'Resumos' },
      { id: 'simulados/simulado-01', nome: 'Simulado 01', grupo: 'Simulados' },
      { id: 'simulados/simulado-02', nome: 'Simulado 02', grupo: 'Simulados' },
      { id: 'simulados/simulado-03', nome: 'Simulado 03', grupo: 'Simulados' },
    ];

    const planoSelecionado = ref('');
    const planoHtml = ref('');
    const carregandoPlano = ref(false);
    const planosDisponiveis = ref([]);

    const planosGrupos = computed(() => {
      const grupos = [...new Set(planosDisponiveis.value.map(p => p.grupo))];
      return grupos;
    });

    function planosFiltrados(grupo) {
      return planosDisponiveis.value.filter(p => p.grupo === grupo);
    }

    async function carregarPlano() {
      if (!planoSelecionado.value) return;
      carregandoPlano.value = true;
      try {
        let md;
        const apiUrl = `/api/plano/${planoSelecionado.value}`;
        const staticUrl = `planos/${planoSelecionado.value}.md`;
        const r = await fetch(apiUrl);
        if (r.ok) {
          md = await r.text();
        } else {
          const r2 = await fetch(staticUrl);
          if (!r2.ok) {
            const r3 = await fetch(`/${staticUrl}`);
            if (!r3.ok) throw new Error('Não encontrado');
            md = await r3.text();
          } else {
            md = await r2.text();
          }
        }
        if (typeof marked !== 'undefined') {
          planoHtml.value = marked.parse(md, { breaks: true, gfm: true });
        } else {
          planoHtml.value = `<pre style="white-space:pre-wrap;font-size:13px;">${md.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>`;
        }
      } catch {
        planoHtml.value = '<p style="color:var(--erro)">Erro ao carregar o documento.</p>';
      }
      carregandoPlano.value = false;
    }

    async function initPlanos() {
      try {
        const r = await fetch('/api/planos');
        if (r.ok) {
          planosDisponiveis.value = await r.json();
          return;
        }
      } catch {}
      planosDisponiveis.value = PLANOS_LISTA;
    }

    // --- Nav ---
    function irPara(v) {
      view.value = v;
      menuAberta.value = false;
      if (v === 'plano' && !planoSelecionado.value && planosDisponiveis.value.length > 0) {
        planoSelecionado.value = planosDisponiveis.value[0].id;
        carregarPlano();
      }
    }

    async function alternarTema() {
      tema.value = tema.value === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-tema', tema.value);
      await Armazenamento.salvarConfig({ tema: tema.value });
    }

    return {
      view, menuAberta, semanaAtual,
      tema, diasSemana, carregando,
      tituloView, subtituloView,
      semanasPlano, metaHoras, totalMeta,
      conteudos: CONTEUDOS,
      // Expondo tudo do Composable de Checklist
      checklist, gruposAbertos, filtro, chaveItem, checkId, alternarItem, toggleGrupo,
      totalItens, itensConcluidos, itensConcluidosGrupo, progressoMateria,
      totalGeral, totalConcluidoGeral, progressoGeral,
      // Expondo tudo do Composable de Horas
      horas,
      horaValor, setHora, totalDia, totalMateriaSemana, horasSemana,
      totalAcumulado, totalHorasAcumuladas, horasSemanaAtual, metaSemanaCss,
      // Expondo tudo do Composable de Simulados
      simulados, formSimulado, simuladosOrdenados, formSimuladoTotal,
      salvarSimulado, removerSimulado, simuladoStatus,
      planoSelecionado, planoHtml, carregandoPlano,
      planosDisponiveis, planosGrupos, planosFiltrados,
      carregarPlano,
      irPara, alternarTema,
      // Expondo tudo do Composable de Erros
      erros, formErro, editandoErro, errosAgrupados, totalErros,
      carregandoErros, novoErro, salvarErro, editarErro, removerErro, cancelarErro,
      // Expondo tudo do Composable de Diário
      CHECKLIST_ITENS, diario, diarioData, diarioHoje, diarioProgresso, alternarDiario,
      // Expondo tudo do Composable de Revisões
      revisoes, revisoesPendentes, revisoesHoje,
      agendarRevisao, concluirRevisao, removerRevisao,
      // Expondo tudo do Composable de Flashcards
      flashcards, formFlashcard, editandoFlashcard, carregandoFlashcards, flashcardsAgrupados,
      novoFlashcard, salvarFlashcard, editarFlashcard, removerFlashcard, cancelarFlashcard,
      modoRevisao, configurandoRevisao, deckRevisao, cardAtual, progressoRevisao, opcoesRevisao, 
      abrirConfiguracaoRevisao, iniciarRevisao, proximoCard, marcarResultado, finalizarRevisao, cancelarConfiguracaoRevisao,
      // Expondo tudo do Composable de Ciclo de Estudos
      ciclo, materiaAtual, idxOriginalAtual, cicloCompleto, cicloExpandido, completosPorItem,
      avancarCiclo, reiniciarCiclo,
      CICLO_ESTUDOS, REVISAO_INTERVALOS, DIAS_SEMANA,
      conteudosFiltrados, expandirTudo, colapsarTudo,
      // Cronograma
      periodos, cronSemana, cronograma, semanaAtualDias, materiaInfo, materiasList,
      slotConcluido, alternarSlot, totalSlots, totalConcluidos, progressoGeralCron,
      progressoSemana, totalSlotsSemana, concluidosSemana
    };
  }
});

app.mount('#app');
