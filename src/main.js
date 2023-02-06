import { createApp } from "vue";
import App from "./App.vue";
import { store } from "./store";
import "remixicon/fonts/remixicon.css";
import drag from "v-drag";

createApp(App).use(store).use(drag).mount("#app");
