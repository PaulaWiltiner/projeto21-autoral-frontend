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
              ><router-link class="navigate" to="/">{{
                item.title
              }}</router-link></v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>

      <v-app-bar-title class="title-bar">{{ $t("signup") }}</v-app-bar-title>
    </v-app-bar>
  </v-layout>
  <div class="container-form">
    <h1 class="title-login">Let's Note |</h1>
    <v-row justify="center" align-content="center">
      <v-col class="collumn">
        <v-card width="700" ref="form">
          <v-card-text>
            <v-text-field
              v-model="name.value.value"
              :counter="10"
              :error-messages="name.errorMessage.value"
              :label="$t('name')"
              bg-color="#fff"
            ></v-text-field>

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
</template>

<script setup>
import { ref } from "vue";
import { useField, useForm } from "vee-validate";
import * as mathodsApi from "../api/resources/methodsApi";
import { useRouter } from "vue-router";
import i18next from "i18next";

const show1 = ref(false);
const items = ref([{ title: i18next.t("login") }]);

const router = useRouter();
const { handleSubmit, handleReset, setErrors } = useForm({
  validationSchema: {
    name(value) {
      if (value?.length >= 2) return true;

      return i18next.t("errorName");
    },
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
const name = useField("name");
const email = useField("email");
const password = useField("password");

const submit = handleSubmit(async (values) => {
  const data = values;
  const resp = await mathodsApi.postData(false, data, "/users");
  if (resp === "Email already exists") {
    setErrors({
      email: i18next.t("errorSignupEmail"),
    });
  } else {
    router.replace({ path: "/" });
  }
});
</script>

<style scoped>
.title-login {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin-bottom: 100px;
}
.collumn {
  display: flex;
  justify-content: center;
  width: 100%;
}
.container-form {
  margin-top: 160px;
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
