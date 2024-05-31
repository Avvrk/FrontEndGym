import { createApp } from "vue";
import { Quasar, Notify } from "quasar";
import { router } from "./router/router.js";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";

import "@quasar/extras/material-icons/material-icons.css";
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'

// Import Quasar css
import "quasar/src/css/index.sass";

const pinia = createPinia();
const app = createApp(App);

app.use(Quasar, {
    plugins: {
        Notify,
    }, // import Quasar plugins and add here
});

app.use(pinia);
app.use(router);
app.mount("#app");
