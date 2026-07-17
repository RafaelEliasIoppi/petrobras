<script setup>
import { ref } from 'vue';

defineProps({
  erro: Boolean,
});

const emit = defineEmits(['tentativa-login']);

const senhaDigitada = ref('');

function submeterSenha() {
  emit('tentativa-login', senhaDigitada.value);
}
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <div class="sidebar-logo">
        <h1>Petrobras 2026</h1>
        <span>Técnico em Química • Cesgranrio</span>
      </div>
      <p class="instrucao">
        Para acessar a plataforma, por favor, insira a senha.
      </p>
      <form @submit.prevent="submeterSenha">
        <input
          v-model="senhaDigitada"
          type="password"
          placeholder="Digite sua senha"
          class="input-senha"
          autofocus
        />
        <button type="submit" class="btn-entrar">Entrar</button>
        <p v-if="erro" class="msg-erro">
          Senha incorreta. Tente novamente.
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: var(--fundo);
  padding: 20px;
}
.login-box {
  width: 100%;
  max-width: 380px;
  padding: 32px;
  background-color: var(--fundo-sec);
  border-radius: 8px;
  border: 1px solid var(--borda);
  text-align: center;
}
.instrucao {
  color: var(--texto-sec);
  margin-top: 8px;
  margin-bottom: 24px;
  font-size: 14px;
}
.input-senha {
  width: 100%;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid var(--borda);
  background-color: var(--fundo);
  color: var(--texto);
  font-size: 16px;
  margin-bottom: 16px;
}
.btn-entrar {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 4px;
  background-color: var(--primaria);
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}
.msg-erro {
  color: #ef4444; /* Cor de erro */
  font-size: 13px;
  margin-top: 12px;
}
.sidebar-logo {
  border-bottom: none;
  padding-bottom: 0;
}
</style>