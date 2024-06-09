import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./assets/styles/index.css";
import VueParticles from "vue-particles";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import i18n from './i18n'

library.add(fas, fab);

createApp(App)
  .component("fa", FontAwesomeIcon)
  .use(store)
  .use(router)
  .use(VueParticles)
  .use(i18n)
  .mount("#app");
