import { createApp } from "vue";
import App from "./App.vue";
import router from "./plugins/router";
import "./index.css";
import { emitter } from "./plugins/emitter";

const app = createApp(App).use(router);

app.config.globalProperties.emitter = emitter;

app.mount("#app");
