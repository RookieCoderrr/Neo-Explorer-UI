
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ArgonDashboard from "./plugins/argon-dashboard";
import il8n from "./lang/il8n.js";
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

const appInstance = createApp(App);
appInstance.use(router);
appInstance.use(il8n);
appInstance.use(ElementPlus)
appInstance.use(ArgonDashboard);
appInstance.mount("#app");


