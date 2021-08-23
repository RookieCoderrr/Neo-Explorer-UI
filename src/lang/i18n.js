// import Vue from 'vue'
import { createI18n } from "vue-i18n/index"; //引入vue . i18n组件
import messages from "./index.js";
//注册i8n实例并引入语言文件
// const LOCALE_KEY = 'localeLanguage'
// const DEFAULT_LANG = 'en'
const i18n = createI18n({
  locale: localStorage.getItem('lang') || "en",
  messages,
});

// 1const locales = messages
// 1export const setup = lang => {
// 1  if (lang === undefined) {
// 1    lang = window.localStorage.getItem(LOCALE_KEY)
// 1    if (locales[lang] === undefined) {
// 1      lang = DEFAULT_LANG
// 1    }
// 1  }
// 1  window.localStorage.setItem(LOCALE_KEY, lang)
// 1
// 1  Object.keys(locales).forEach(lang => {
// 1    document.body.classList.remove(`lang-${lang}`)
// 1  })
// 1  document.body.classList.add(`lang-${lang}`)
// 1  document.body.setAttribute('lang', lang)
// 1
// 1  // Vue.config.lang = lang
// 1  i18n.locale = lang
// 1}
// 1
// 1setup()

//引入语言文件
export default i18n; //暴露出去，在main. js中引入挂载
