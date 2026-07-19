import { createApp } from 'vue'
import App from './App.vue'
import './estilo.css'

const app = createApp(App)

app.config.errorHandler = (err, instance, info) => {
  console.error('[Global ErrorHandler]', err, info);
};

app.mount('#app')
