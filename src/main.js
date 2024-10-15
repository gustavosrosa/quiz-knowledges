import { createApp } from 'vue'

// Importacao do Axios
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'

createApp(App)
    .use(VueAxios, axios) // Usar o .use antes de carregar a aplicação
    .mount('#app')
    
