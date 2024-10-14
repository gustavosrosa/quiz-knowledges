import { createApp } from 'vue'

// Importacao do Axios
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'

createApp(App)
    .mount('#app')
    .use(VueAxios, axios)
