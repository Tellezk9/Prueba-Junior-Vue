import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

const app = createApp(App);

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
app.config.globalProperties.$http = axios;
app.use(router);
app.mount("#app");
