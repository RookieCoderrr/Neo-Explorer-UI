
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ArgonDashboard from "./plugins/argon-dashboard";
import i18n from "./lang/i18n.js";
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import './assets/css/global.css'

const appInstance = createApp(App);
appInstance.use(router);
appInstance.use(i18n);
appInstance.use(ElementPlus)
appInstance.use(ArgonDashboard);
appInstance.mount("#app");


