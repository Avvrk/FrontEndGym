import { createApp } from "vue";
import { Quasar, Notify, Loading } from "quasar";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { router } from "./router/router.js";
import App from "./App.vue";
import "./style.css";

import "@quasar/extras/material-icons/material-icons.css";
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import "quasar/src/css/index.sass";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

app.use(Quasar, {
  plugins: {
    Notify,
    Loading,
  },
});

app.use(pinia);
app.use(router);
app.mount("#app");