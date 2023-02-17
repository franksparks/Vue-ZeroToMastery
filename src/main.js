import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import VeeValidatePlugin from "./includes/validation";

import Icon from "./directives/icon";
import i18n from "./includes/i18n";
import { registerSW } from "virtual:pwa-register";
import GlobalComponents from "./includes/_globals";
import progressBar from "./includes/progressBar";

import "./assets/main.css";
import "./assets/tailwind.css";
import "nprogress/nprogress.css";
import { auth } from "./includes/firebase";

registerSW({ immediate: true });

progressBar(router);

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);
    app
      .use(createPinia())
      .use(router)
      .use(VeeValidatePlugin)
      .directive("icon", Icon);
    app.use(i18n);
    app.use(GlobalComponents);
    app.mount("#app");
    console.log("App initialized");
  }
});
