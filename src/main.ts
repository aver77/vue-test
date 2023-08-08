import * as Vue from "vue"
import * as VueRouter from 'vue-router';

import App from './App.vue'
import routes from "@/routes";
import {cardsStore} from "@/store/cardsStore";

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes: routes
})

const app = Vue.createApp(App);
app.use(router);
app.use(cardsStore);
app.mount('#app')
