
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import NeoDashboard from "./plugins/Neo-dashboard";
import i18n from "./lang/i18n.js";
import ElementPlus from "element-plus";
import './assets/css/global.css'


const appInstance = createApp(App);
appInstance.use(router);
appInstance.use(i18n);
appInstance.use(ElementPlus)
appInstance.use(NeoDashboard);
appInstance.mount("#app");


