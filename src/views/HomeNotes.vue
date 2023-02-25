<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="notes" class="notes">
    <div class="notes__sidebar">
      <div class="divButtonAdd">
        <button class="notes__add" type="button" @click="addNote">
          Add Note
        </button>
      </div>
      <ListNotes v-if="notes.length > 0" :notesd="notes" />
    </div>
    <div class="notes__preview">
      <TipTap
        v-if="activeNote.length > 0 && notes.length > 0"
        :actived="activeNote"
      />
    </div>
  </div>
</template>

<script setup>
import ListNotes from "../components/NotesComponent/ListNotes.vue";
import NotesAPI from "../composables/NotesApi";
import { store } from "../store";
import TipTap from "../components/EditorComponents/TipTap.vue";
import { computed } from "vue";

function refreshNotes() {
  const notes = NotesAPI.getAllNotes();

  if (notes.length > 0) {
    store.commit("addNote", notes);
    store.commit("add", [notes[0]]);
  }
}

refreshNotes();

const activeNote = computed(() => {
  const str = JSON.stringify(store.state.activeNote);
  return JSON.parse(str);
});

const notes = computed(() => {
  const str = JSON.stringify(store.state.notes);
  return JSON.parse(str);
});

function addNote() {
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

  const newNt = NotesAPI.saveNote(newNote);
  store.commit("add", [newNt]);
  refreshNotes();
}
</script>

<style>
.note {
  height: 134px;
}
.trash {
  font-size: 27px;
  color: #fff;
  position: absolute;
  top: 39px;
  left: 25px;
}

.two {
  top: 39px;
  left: 229px;
}

.divdelete {
  z-index: 1;
  background: #fd615c;
  border-radius: 7px;
  position: relative;
  height: 114px;
  width: 284px;
  top: 115px;
}

.notes {
  display: flex;
  height: 800px;
}

.notes * {
  font-family: sans-serif;
}

.notes__sidebar {
  border-right: 2px solid #fff;
  flex-shrink: 0;
  padding: 1em;
  width: 300px;
  height: 100%;
  overflow-y: auto;
}

.notes__add {
  background: #fab57d;
  border: none;
  border-radius: 7px;
  color: #ffffff;
  cursor: pointer;
  font-size: 1.25em;
  font-weight: bold;
  margin-bottom: 1em;
  padding: 0.75em 0;
  width: 300px;
}

.divButtonAdd {
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 1000;
  width: 354px;
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
  z-index: 2;
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
  margin-bottom: 10px;
}

.notes__small-body {
  padding: 0 10px;
  height: 24px;
}

.notes__small-updated {
  color: #aaaaaa;
  font-style: italic;
  text-align: right;
}

.notes__preview {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0.75em 0;
  z-index: 1000;
  height: 100%;
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

.notes__body {
  flex-grow: 1;
  font-size: 1.2em;
  line-height: 1.5;
  margin-top: 2em;
  resize: none;
}
</style>
