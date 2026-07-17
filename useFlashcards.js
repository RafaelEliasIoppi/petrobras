import { ref, computed, watch } from 'vue';
import { Armazenamento } from './armazenamento.js';

let instance;

export function useFlashcards() {
  if (instance) return instance;

  const flashcards = ref([]);
  const editandoFlashcard = ref(null);
  const carregado = ref(false);

  const LEITNER_BOXES = { 1: 1, 2: 3, 3: 7, 4: 14, 5: 30 };

  const modoRevisao = ref(false);
  const configurandoRevisao = ref(false);
  const deckRevisao = ref([]);
  const cardAtualIndex = ref(0);
  const opcoesRevisao = ref({ materias: [], numCards: 10, aleatorio: true });

  const cardAtual = computed(() => deckRevisao.value[cardAtualIndex.value] || null);
  const progressoRevisao = computed(() =>
    deckRevisao.value.length > 0
      ? Math.round(((cardAtualIndex.value + 1) / deckRevisao.value.length) * 100)
      : 0
  );

  const flashcardsAgrupados = computed(() => {
    const grupos = {};
    ['Português', 'Matemática', 'Química'].forEach(m => grupos[m] = []);
    flashcards.value.forEach(f => {
      if (grupos[f.materia]) grupos[f.materia].push(f);
    });
    return grupos;
  });

  async function carregarFlashcards() {
    if (carregado.value) return;
    flashcards.value = await Armazenamento.carregar('flashcards', []);
    carregado.value = true;
  }

  watch(flashcards, (val) => {
    if (!carregado.value) return;
    Armazenamento.salvar('flashcards', val);
  }, { deep: true });

  function novoFlashcard() {
    editandoFlashcard.value = { id: Date.now(), materia: '', frente: '', verso: '', box: 1, lastReviewed: null };
  }

  function salvarFlashcard() {
    if (!editandoFlashcard.value?.materia) return;
    const card = { box: 1, lastReviewed: null, ...editandoFlashcard.value };
    const idx = flashcards.value.findIndex(f => f.id === card.id);
    if (idx >= 0) flashcards.value.splice(idx, 1, card);
    else flashcards.value.push(card);
    editandoFlashcard.value = null;
  }

  function removerFlashcard(id) {
    flashcards.value = flashcards.value.filter(f => f.id !== id);
  }

  function abrirConfiguracaoRevisao() { configurandoRevisao.value = true; }
  function cancelarConfiguracaoRevisao() { configurandoRevisao.value = false; }

  function iniciarRevisao() {
    configurandoRevisao.value = false;
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    let dueCards = flashcards.value.filter(card => {
      if (!card.lastReviewed) return true;
      const last = new Date(card.lastReviewed);
      const intervalo = LEITNER_BOXES[card.box || 1] || 1;
      const due = new Date(last);
      due.setDate(due.getDate() + intervalo);
      return hoje >= due;
    });
    if (opcoesRevisao.value.materias.length > 0) {
      dueCards = dueCards.filter(c => opcoesRevisao.value.materias.includes(c.materia));
    }
    if (opcoesRevisao.value.aleatorio) {
      for (let i = dueCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [dueCards[i], dueCards[j]] = [dueCards[j], dueCards[i]];
      }
    }
    deckRevisao.value = dueCards.slice(0, opcoesRevisao.value.numCards).map(c => ({ ...c, virado: false }));
    cardAtualIndex.value = 0;
    modoRevisao.value = true;
  }

  function proximoCard() {
    if (cardAtualIndex.value < deckRevisao.value.length - 1) cardAtualIndex.value++;
    else finalizarRevisao();
  }

  async function marcarResultado(acertou) {
    const card = cardAtual.value;
    if (!card) return;
    if (acertou) card.box = Math.min((card.box || 1) + 1, 5);
    else card.box = 1;
    card.lastReviewed = new Date().toISOString().slice(0, 10);
    const original = flashcards.value.find(f => f.id === card.id);
    if (original) Object.assign(original, { box: card.box, lastReviewed: card.lastReviewed });
    proximoCard();
  }

  function finalizarRevisao() { modoRevisao.value = false; }

  instance = {
    flashcards, editandoFlashcard, carregandoFlashcards: carregado,
    flashcardsAgrupados, carregarFlashcards, novoFlashcard, salvarFlashcard,
    editarFlashcard: (c) => editandoFlashcard.value = { ...c },
    removerFlashcard, cancelarFlashcard: () => editandoFlashcard.value = null,
    modoRevisao, configurandoRevisao, deckRevisao, cardAtual, progressoRevisao, opcoesRevisao,
    abrirConfiguracaoRevisao, iniciarRevisao, proximoCard, marcarResultado, finalizarRevisao,
    cancelarConfiguracaoRevisao
  };
  return instance;
}
