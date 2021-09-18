
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import NeoDashboard from "./plugins/Neo-dashboard";
import i18n from "./lang/i18n.js";
import ElementPlus from "element-plus";
import net from "./store/store.js";
// import Vuex  from "vuex";


import './assets/css/global.css'


// if(window.URL==="/api"){
//     window.URL="/api"
//     console.log("1")
// } else if (window.URL==="/bpi"){
//     window.URL = "bpi"
//     console.log("2")
// } else {
//     window.URL ="/api"
//     console.log("3")
// }
// const store = new Vuex.Store(
//     {
//         state(){
//             return{
//                 url:'/api'
//             }
//         },
//         mutations:{
//             toMain(){
//                 this.state.url="/bpi"
//             },
//             toTest(){
//                 this.state.url="/api"
//             }
//         },
//         getters: {
//             showUrl(state){
//                 return state.url
//             }
//         }
//     }
// )

const appInstance = createApp(App);
appInstance.use(router);
appInstance.use(i18n);
appInstance.use(net)
appInstance.use(ElementPlus)
appInstance.use(NeoDashboard);
appInstance.mount("#app");

// export default {store}




