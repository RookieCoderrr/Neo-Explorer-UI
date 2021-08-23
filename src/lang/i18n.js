import { createI18n } from "vue-i18n/index"; //引入vue . i18n组件
import messages from "./index.js";
//注册i8n实例并引入语言文件
const i18n = createI18n({
  locale: localStorage.lang || "en",
  messages,
});

//引入语言文件
export default i18n; //暴露出去，在main. js中引入挂载
