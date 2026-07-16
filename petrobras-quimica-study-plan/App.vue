<script setup>
import { ref, computed, onMounted } from 'vue';

// 1. Importamos apenas os componentes de view
import Dashboard from './views/Dashboard.vue';
import Checklist from './views/Checklist.vue';
import Horas from './views/Horas.vue';
import Ciclo from './views/Ciclo.vue';
import Simulados from './views/Simulados.vue';
import Erros from './views/Erros.vue';
import Diario from './views/Diario.vue';
import Plano from './views/Plano.vue';

// Lógica de navegação e tema
const carregando = ref(true);
const menuAberta = ref(false);
const view = ref('dashboard'); // O estado que controla a view atual
const tema = ref(localStorage.getItem('petrobras_quimica_tema') || 'dark');

const titulos = {
  dashboard: { t: 'Dashboard', s: 'Visão geral do seu progresso' },
  checklist: { t: 'Conteúdos', s: 'Checklist de tópicos do edital' },
  ciclo: { t: 'Ciclo de Estudos', s: 'Metodologia de estudo rotativo' },
  horas: { t: 'Quadro de Horas', s: 'Controle seu tempo de estudo' },
  simulados: { t: 'Simulados', s: 'Acompanhe seu desempenho' },
  erros: { t: 'Caderno de Erros', s: 'Transforme falhas em aprendizado' },
  diario: { t: 'Diário de Bordo', s: 'Seu checklist de hábitos diários' },
  plano: { t: 'Plano de Estudos', s: 'Documentos e cronogramas' },
};

const tituloView = computed(() => titulos[view.value]?.t || 'Dashboard');
const subtituloView = computed(() => titulos[view.value]?.s || '');

function irPara(novaView) {
  view.value = novaView;
  menuAberta.value = false;
  window.scrollTo(0, 0);
}

function alternarTema() {
  tema.value = tema.value === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.tema = tema.value;
  localStorage.setItem('petrobras_quimica_tema', tema.value);
}

onMounted(() => {
  document.documentElement.dataset.tema = tema.value;
  // Simula um tempo de carregamento para os dados iniciais
  setTimeout(() => {
    carregando.value = false;
  }, 200);
});

// 3. Mapeamos os componentes às suas "views"
const views = {
  dashboard: Dashboard,
  checklist: Checklist,
  horas: Horas,
  ciclo: Ciclo,
  simulados: Simulados,
  erros: Erros,
  diario: Diario,
  plano: Plano,
};

// Adiciona o restante dos links de navegação
const navLinks = [
  { view: 'dashboard', icon: '📊', text: 'Dashboard' },
  { view: 'checklist', icon: '✅', text: 'Conteúdos' },
  { view: 'ciclo', icon: '🔄', text: 'Ciclo' },
  { view: 'horas', icon: '⏱', text: 'Horas' },
  { view: 'simulados', icon: '📋', text: 'Simulados' },
  { view: 'erros', icon: '📕', text: 'Erros' },
  { view: 'diario', icon: '📌', text: 'Diário' },
];

const planoLink = { view: 'plano', icon: '📖', text: 'Plano de Estudos' };

</script>

<template>
  <div v-if="carregando" class="loading-screen">
    Carregando...
  </div>
  <template v-else>
    <aside class="sidebar" :class="{ aberta: menuAberta }">
      <!-- Conteúdo do seu <aside> do index.html original vai aqui -->
      <div class="sidebar-logo">
        <h1>Petrobras 2026</h1>
        <span>Técnico em Química • Cesgranrio</span>
      </div>
      <nav class="sidebar-nav">
        <a v-for="link in navLinks" :key="link.view" :href="`#${link.view}`" class="nav-item" :class="{ ativa: view === link.view }" @click.prevent="irPara(link.view)">
          <span class="icone">{{ link.icon }}</span> {{ link.text }}
        </a>
        <div style="border-top:1px solid rgba(255,255,255,0.08);margin:8px 16px;"></div>
        <a :href="`#${planoLink.view}`" class="nav-item" :class="{ ativa: view === planoLink.view }" @click.prevent="irPara(planoLink.view)">
          <span class="icone">{{ planoLink.icon }}</span> {{ planoLink.text }}
        </a>
      </nav>
      <div style="padding: 16px 20px; border-top: 1px solid rgba(255,255,255,0.08);">
        <button class="nav-item" @click="alternarTema" style="font-size:13px;">
          <span class="icone">{{ tema === 'dark' ? '☀️' : '🌙' }}</span>
          {{ tema === 'dark' ? 'Tema Claro' : 'Tema Escuro' }}
        </button>
      </div>
    </aside>

    <main class="conteudo">
      <div class="topo">
        <div>
          <button class="menu-toggle" @click="menuAberta = !menuAberta" aria-label="Alternar menu">☰</button>
          <h2>{{ tituloView }}</h2>
          <span class="sub">{{ subtituloView }}</span>
        </div>
      </div>

      <transition name="fade" mode="out-in">
        <!-- 4. Renderização dinâmica de componentes -->
        <component
          :is="views[view]" 
          :key="view" 
        />
      </transition>
    </main>
  </template>
</template>

<style scoped>
.loading-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  font-size: 18px;
  color: var(--texto-sec);
}
</style>