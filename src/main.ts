import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import naive from "naive-ui";
import { pinia } from "./store";
import "./index.css";

const app = createApp(App);
app.use(router);
app.use(naive);
app.use(pinia);
app.mount("#app");
