import { createApp } from "vue";
import App from "./App.vue";
import "remixicon/fonts/remixicon.css";
import router from "../src/router/index";
import drag from "v-drag";
import { createPinia } from "pinia";
// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import i18n from "./i18n";

const vuetify = createVuetify({
  components,
  directives,
});

i18n(createApp(App))
  .use(router)
  .use(drag, {
    removeTransition: false, // default: `true`
  })
  .use(vuetify)
  .use(createPinia())
  .use(i18n)
  .mount("#app");
