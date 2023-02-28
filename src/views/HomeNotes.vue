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
              ><router-link class="navigate" to="/" @click="signout">{{
                item.title
              }}</router-link></v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>

      <v-app-bar-title class="title-bar">{{ $t("myNotes") }}</v-app-bar-title>
    </v-app-bar>
  </v-layout>
  <div id="notes" class="notes">
    <div class="container_left">
      <div class="divButtonAdd">
        <button class="notes__add" @click="addNote">
          {{ $t("addNote") }}
        </button>
      </div>
      <div class="notes__sidebar">
        <ListNotes v-if="store.notes.length > 0" :notesd="store.notes" />
      </div>
    </div>
    <div class="notes__preview">
      <TipTap
        v-if="store.activeNote.length > 0 && store.notes.length > 0"
        :actived="store.activeNote"
      />
    </div>
  </div>
</template>

<script setup>
import ListNotes from "../components/NotesComponent/ListNotes.vue";
import * as NotesAPI from "../composables/NotesApi";
import TipTap from "../components/EditorComponents/TipTap.vue";
import { useNoteStore } from "../store";
import { onBeforeMount, ref } from "vue";
import i18next from "i18next";

const items = ref([{ title: i18next.t("logout") }]);

const store = useNoteStore();

onBeforeMount(() => {
  const user = localStorage.getItem("user");
  store.addUserToken(JSON.parse(user));
  refreshNotes();
});

function signout() {
  store.addUserToken({});
  localStorage.removeItem("user");
}

async function refreshNotes() {
  const notes = await NotesAPI.getAllNotes(store.userToken.user.id);

  if (notes.length > 0) {
    store.addNote(notes);
    store.addActivedNote([notes[0]]);
  }
}

async function addNote() {
  const newNote = {
    body: {
      type: "doc",
      content: [
        { type: "heading", content: [{ type: "text", text: "New Note" }] },
        {
          type: "paragraph",
          content: [{ type: "text", text: "Write here" }],
        },
      ],
    },
  };

  const newNt = await NotesAPI.saveNote(newNote, store.userToken.user.id);
  store.addActivedNote(newNt);
  refreshNotes();
}
</script>

<style>
.navigate {
  text-decoration: none;
  color: black;
}
.title-bar {
  color: #fff;
  font-weight: bold !important;
  font-size: 25px !important;
}
.navigate {
  text-decoration: none;
  color: black;
}
.note {
  height: 114px;
  position: relative;
  margin-bottom: 20px;
}
.trash {
  font-size: 23px;
  color: #fff;
  position: absolute;
  top: 39px;
  left: 25px;
}

.two {
  top: 39px;
  left: 212px;
}

.divdelete {
  z-index: 1;
  background: #fd615c;
  border-radius: 7px;
  position: absolute;
  height: 108px;
  width: 265px;
  top: 3px;
}

.notes {
  display: flex;
  max-height: 800px;
  margin-top: 100px;
}

.notes * {
  font-family: sans-serif;
}

.notes__sidebar {
  border-right: 2px solid #fff;
  flex-shrink: 0;
  padding: 1em;
  width: 20em;
  max-height: 650px;
  min-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
}

.notes__add {
  background: #fab57d;
  border: none;
  border-radius: 7px;
  color: #ffffff;
  cursor: pointer;
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 1em;
  height: 53px;
  width: 270px;
}

.divButtonAdd {
  z-index: 1;
  width: 300px;
  height: 100px;
  display: flex;
  padding-top: 10px;
  justify-content: center;
  align-items: center;
  background-color: #ffe4b5;
}

.notes__add:hover {
  background: #fcaa67;
}

.notes_list {
  height: 100vh;
}
.notes__list-item {
  background: #fff;
  border-radius: 7px;
  padding: 2px;
  margin-bottom: 2px;
  height: 112px;
  z-index: 2;
  top: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.08);
}

.notes__list-item--selected {
  background: #f7f4d2;
  border-radius: 7px;
  font-weight: bold;
  padding: 2px;
}

.notes__small-title,
.notes__small-updated {
  padding: 10px;
}

.notes__small-title {
  font-size: 1.2em;
  height: 20px;
  color: #f99c50;
  margin-bottom: 25px;
}

.notes__small-body {
  padding: 0 10px;
  font-size: 0.9em;
  height: 24px;
}

.notes__small-updated {
  color: #aaaaaa;
  font-size: 0.85em;
  font-style: italic;
  text-align: right;
}

.notes__preview {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0.75em 0;
  z-index: 1000;
  max-height: 700px;
  max-width: 1200px;
  background-color: #ffe4b5;
}

.notes__title,
.notes__body {
  border: none;
  outline: none;
  width: 100%;
}

.notes__title {
  font-size: 3em;
  font-weight: bold;
}
</style>
