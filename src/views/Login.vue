<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-layout>
    <v-app-bar color="#fcaa67">
      <v-menu transition="slide-y-transition">
        <template v-slot:activator="{ props }">
          <v-app-bar-nav-icon v-bind="props" color="#fff"></v-app-bar-nav-icon>
        </template>
        <v-list>
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-title
              ><router-link class="navigate" to="/signup">{{
                item.title
              }}</router-link></v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>

      <v-app-bar-title class="title-bar">{{ $t("login") }}</v-app-bar-title>
    </v-app-bar>
  </v-layout>
  <div class="container-form">
    <v-row justify="center" align-content="center">
      <v-col class="collumn">
        <v-card justify="center" width="650" ref="form">
          <v-card-text>
            <v-text-field
              v-model="email.value.value"
              :error-messages="email.errorMessage.value"
              :label="$t('email')"
              bg-color="#fff"
            ></v-text-field>

            <v-text-field
              bg-color="#fff"
              v-model="password.value.value"
              :append-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'"
              :error-messages="password.errorMessage.value"
              :type="show1 ? 'text' : 'password'"
              :label="$t('password')"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn color="red-darken-1" @click="handleReset">
              {{ $t("clear") }}
            </v-btn>
            <v-spacer></v-spacer>

            <v-btn
              color="primary"
              variant="text"
              type="submit"
              @click.prevent="submit"
            >
              {{ $t("submit") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
  <div>
    <div v-if="languages">
      <span v-for="(lng, index) in Object.keys(languages)" :key="lng">
        <a
          v-if="$i18next.resolvedLanguage !== lng"
          v-on:click="$i18next.changeLanguage(lng)"
        >
          {{ languages[lng].nativeName }}
        </a>

        <strong class="font" v-if="$i18next.resolvedLanguage === lng">
          {{ languages[lng].nativeName }}
        </strong>

        <span v-if="index < Object.keys(languages).length - 1"
          >&nbsp;|&nbsp;</span
        >
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onUpdated } from "vue";
import { useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import * as mathodsApi from "../api/resources/methodsApi";
import { useNoteStore } from "../store";
import i18next from "i18next";

const store = useNoteStore();
const router = useRouter();
const show1 = ref(false);
const items = ref([{ title: i18next.t("signup") }]);

onUpdated(() => {
  items.value = [{ title: i18next.t("signup") }];
});
const languages = ref({
  en: { nativeName: "English" },
  pt: { nativeName: "Português" },
  es: { nativeName: "Español" },
  fr: { nativeName: "Français" },
});

const { handleSubmit, handleReset, setErrors } = useForm({
  validationSchema: {
    email(value) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;

      return i18next.t("errorEmail");
    },
    password(value) {
      if (value?.length >= 4) return true;
      return i18next.t("errorPassword");
    },
  },
});
const email = useField("email");
const password = useField("password");

const submit = handleSubmit(async (values) => {
  const data = values;
  const resp = await mathodsApi.postData(false, data, "/signin");
  if (resp === "Cannot find user") {
    setErrors({
      email: i18next.t("errorLoginEmail"),
    });
  } else if (resp === "Incorrect password") {
    setErrors({
      password: i18next.t("errorLoginPassword"),
    });
  } else {
    localStorage.setItem("user", JSON.stringify(resp));
    store.addUserToken(resp);
    router.replace({ path: "/letsnote" });
    setTimeout(() => {
      router.replace({ path: "/home" });
    }, 14000);
  }
});
</script>

<style scoped>
.collumn {
  display: flex;
  justify-content: center;
  width: 100%;
}
.font {
  color: #fcaa67;
}
.container-form {
  margin-top: 120px;
  margin-bottom: 240px;
}

.title-bar {
  color: #fff;
  font-weight: bold;
  font-size: 25px;
}
.navigate {
  text-decoration: none;
  color: black;
}
</style>
