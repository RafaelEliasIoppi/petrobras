<script setup>
import { onMounted } from 'vue';
import { useFlashcards } from './useFlashcards.js';

const {
  flashcards, editandoFlashcard, flashcardsAgrupados, carregarFlashcards,
  novoFlashcard, salvarFlashcard, editarFlashcard, removerFlashcard, cancelarFlashcard,
  modoRevisao, configurandoRevisao, deckRevisao, cardAtual, progressoRevisao, opcoesRevisao,
  abrirConfiguracaoRevisao, iniciarRevisao, proximoCard, marcarResultado, finalizarRevisao,
  cancelarConfiguracaoRevisao
} = useFlashcards();

onMounted(() => {
  carregarFlashcards();
});
</script>

<template>
  <div>
    <div v-if="modoRevisao">
      <div class="grade-cartoes">
        <div class="cartao-stat azul">
          <div class="valor">{{ progressoRevisao }}%</div>
          <div class="rotulo">Progresso da revisão</div>
        </div>
        <div class="cartao-stat">
          <div class="valor" style="font-size:20px;">{{ deckRevisao.length - (cardAtual ? deckRevisao.indexOf(cardAtual) : 0) }} / {{ deckRevisao.length }}</div>
          <div class="rotulo">Restantes</div>
        </div>
      </div>
      <div class="card" v-if="cardAtual">
        <div class="card-titulo" style="font-size:13px;color:var(--texto-sec);">
          {{ cardAtual.materia }}
        </div>
        <div style="padding:24px;text-align:center;font-size:18px;min-height:120px;display:flex;align-items:center;justify-content:center;">
          <div v-if="!cardAtual.virado" @click="cardAtual.virado = true" style="cursor:pointer;width:100%;">
            {{ cardAtual.frente }}
          </div>
          <div v-else style="width:100%;">
            <div style="margin-bottom:16px;">{{ cardAtual.verso }}</div>
            <div style="display:flex;gap:8px;justify-content:center;">
              <button @click="marcarResultado(true)" style="background:var(--sucesso);color:#fff;border:none;padding:10px 24px;border-radius:8px;cursor:pointer;font-size:15px;">✔ Acertei</button>
              <button @click="marcarResultado(false)" style="background:var(--erro);color:#fff;border:none;padding:10px 24px;border-radius:8px;cursor:pointer;font-size:15px;">✘ Errei</button>
            </div>
          </div>
        </div>
        <div style="text-align:center;padding:8px;font-size:12px;color:var(--texto-sec);">
          <span v-if="!cardAtual.virado">Clique no card para virar</span>
          <span v-else>Como foi sua resposta?</span>
        </div>
      </div>
      <div style="margin-top:12px;text-align:center;">
        <button @click="finalizarRevisao" style="background:none;border:1px solid var(--erro);color:var(--erro);padding:8px 20px;border-radius:6px;cursor:pointer;font-size:13px;">Encerrar revisão</button>
      </div>
    </div>

    <div v-else>
      <div class="grade-cartoes">
        <div class="cartao-stat azul">
          <div class="valor">{{ flashcards.length }}</div>
          <div class="rotulo">Total de flashcards</div>
        </div>
      </div>

      <div class="card">
        <div class="card-titulo">
          <span v-if="editandoFlashcard">{{ editandoFlashcard.id ? 'Editar Flashcard' : 'Novo Flashcard' }}</span>
          <span v-else>Flashcards</span>
        </div>

        <div v-if="editandoFlashcard" class="form-simulado">
          <div>
            <label>Matéria</label>
            <select v-model="editandoFlashcard.materia" style="width:100%;padding:8px 10px;border:1px solid var(--borda);border-radius:6px;font-size:14px;font-family:inherit;background:var(--card);color:var(--texto);">
              <option value="">Selecione...</option>
              <option>Português</option>
              <option>Matemática</option>
              <option>Química</option>
            </select>
          </div>
          <div>
            <label>Frente (pergunta)</label>
            <textarea v-model="editandoFlashcard.frente" placeholder="Ex: O que é pH?" rows="3" style="width:100%;padding:8px 10px;border:1px solid var(--borda);border-radius:6px;font-size:14px;font-family:inherit;background:var(--card);color:var(--texto);resize:vertical;"></textarea>
          </div>
          <div>
            <label>Verso (resposta)</label>
            <textarea v-model="editandoFlashcard.verso" placeholder="Ex: Potencial hidrogeniônico..." rows="3" style="width:100%;padding:8px 10px;border:1px solid var(--borda);border-radius:6px;font-size:14px;font-family:inherit;background:var(--card);color:var(--texto);resize:vertical;"></textarea>
          </div>
          <div style="display:flex;gap:8px;">
            <button @click="salvarFlashcard" style="flex:1;">Salvar</button>
            <button @click="cancelarFlashcard" style="flex:1;background:var(--texto-sec);">Cancelar</button>
          </div>
        </div>

        <div v-else>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;">
            <button @click="novoFlashcard" style="padding:8px 20px;background:var(--primaria);color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px;font-family:inherit;">+ Novo Flashcard</button>
            <button @click="abrirConfiguracaoRevisao" style="padding:8px 20px;background:#6366f1;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px;font-family:inherit;">▶ Iniciar Revisão</button>
          </div>

          <div v-if="configurandoRevisao" style="padding:16px;background:var(--bg);border-radius:8px;margin-bottom:16px;">
            <h4 style="margin:0 0 12px;font-size:14px;">Configurar Revisão</h4>
            <div style="margin-bottom:12px;">
              <label style="font-size:13px;display:block;margin-bottom:4px;">Matérias</label>
              <div style="display:flex;gap:8px;flex-wrap:wrap;">
                <label v-for="m in ['Português', 'Matemática', 'Química']" :key="m" style="font-size:13px;display:flex;align-items:center;gap:4px;cursor:pointer;">
                  <input type="checkbox" :value="m" v-model="opcoesRevisao.materias"> {{ m }}
                </label>
              </div>
            </div>
            <div style="margin-bottom:12px;">
              <label style="font-size:13px;display:block;margin-bottom:4px;">Número de cards</label>
              <input type="number" v-model.number="opcoesRevisao.numCards" min="1" max="100" style="width:80px;padding:6px 10px;border:1px solid var(--borda);border-radius:6px;font-size:14px;font-family:inherit;background:var(--card);color:var(--texto);">
            </div>
            <div style="margin-bottom:12px;">
              <label style="font-size:13px;display:flex;align-items:center;gap:4px;cursor:pointer;">
                <input type="checkbox" v-model="opcoesRevisao.aleatorio"> Aleatório
              </label>
            </div>
            <div style="display:flex;gap:8px;">
              <button @click="iniciarRevisao" style="background:var(--primaria);color:#fff;border:none;padding:8px 20px;border-radius:6px;cursor:pointer;font-size:14px;">Iniciar</button>
              <button @click="cancelarConfiguracaoRevisao" style="background:var(--texto-sec);color:#fff;border:none;padding:8px 20px;border-radius:6px;cursor:pointer;font-size:14px;">Cancelar</button>
            </div>
          </div>

          <div v-for="(cards, materia) in flashcardsAgrupados" :key="materia" style="margin-bottom:20px;">
            <h4 style="font-size:14px;margin-bottom:8px;color:var(--texto-sec);text-transform:uppercase;">{{ materia }} ({{ cards.length }})</h4>
            <div v-if="cards.length === 0" style="font-size:13px;color:var(--texto-sec);padding:8px 0;">Nenhum flashcard.</div>
            <div v-for="card in cards" :key="card.id" style="padding:12px;border:1px solid var(--borda);border-radius:8px;margin-bottom:8px;font-size:14px;">
              <div style="display:flex;justify-content:space-between;align-items:start;gap:8px;">
                <div style="flex:1;">
                  <strong>{{ card.frente }}</strong>
                  <div style="margin-top:4px;font-size:13px;color:var(--texto-sec);">📌 Caixa {{ card.box || 1 }} · Última revisão: {{ card.lastReviewed || 'Nunca' }}</div>
                </div>
                <div style="display:flex;gap:4px;flex-shrink:0;">
                  <button @click="editarFlashcard(card)" title="Editar">✏️</button>
                  <button @click="removerFlashcard(card.id)" title="Remover">✕</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
