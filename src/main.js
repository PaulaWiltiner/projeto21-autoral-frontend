import { createApp } from "vue";
import App from "./App.vue";
import { store } from "./store";
import "remixicon/fonts/remixicon.css";
import router from "../src/router/index";
import drag from "v-drag";

createApp(App)
  .use(router)
  .use(store)
  .use(drag, {
    removeTransition: false, // default: `true`
  })
  .mount("#app");
