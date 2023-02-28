<template>
  <div ref="listNote" class="notes__list">
    <div v-for="(note, index) in notesd" :key="index" class="note">
      <div class="divdelete">
        <div class="ri-delete-bin-line trash" :data-trash-id="note.id"></div>
        <div
          class="ri-delete-bin-line trash two"
          :data-trash-id="note.id"
        ></div>
      </div>
      <Tnotes
        :notesL="note"
        class="notes__list-item"
        :data-note-id="note.id"
        v-drag="{ axis: 'x' }"
        @v-drag-start="activeCard(note.id)"
        @mouseup="endCard($event, note.id)"
        @v-drag-moving="moveCard(note.id)"
      />
    </div>
  </div>
</template>

<script setup>
import Tnotes from "./ItemNote.vue";
import { defineProps, computed, ref, onUpdated, onMounted } from "vue";
import * as NotesAPI from "../../composables/NotesApi";
import { useNoteStore } from "../../store";

const store = useNoteStore();

const listNote = ref("");

const props = defineProps(["notesd"]);
const notesd = computed(() => props.notesd);

onMounted(() => {
  transitionCard(props.notesd[0].id);
});

async function deleteClick(id) {
  const newNotes = await NotesAPI.deleteNote(id, store.userToken.user.id);

  store.addNote(newNotes);
  store.addActivedNote([newNotes[0]]);
  transitionCard(props.notesd[0].id);
}

function endCard(event, id) {
  const elem = listNote?.value?.querySelector(
    `.notes__list-item[data-note-id="${Number(id)}"]`
  );
  const coordX = event.view.data.relativeX;
  console.log(elem.style);
  if (Number(coordX) > 126.5 || Number(coordX) < -113) {
    elem.setAttribute("disabled", "");
    deleteClick(id);
    event.view.data.relativeX = 0;
    elem.style.left = 0;
    elem.style.transition = "left 1s";
  } else {
    if (elem) {
      event.view.data.relativeX = 0;
      elem.style.left = 0;
      elem.style.transition = "left 1s";
    }
  }
}

function moveCard(id) {
  const elem = listNote?.value?.querySelector(
    `.notes__list-item[data-note-id="${id}"]`
  );
  const buttonTrash = listNote?.value?.querySelectorAll(
    `.trash[data-trash-id="${id}`
  );
  if (
    elem?.getBoundingClientRect().x > 150 ||
    elem?.getBoundingClientRect().x < -136
  ) {
    buttonTrash.forEach((trashListItem) => {
      trashListItem.classList.add("riseButton");
    });
  } else {
    if (elem) {
      buttonTrash.forEach((trashListItem) => {
        trashListItem.classList.remove("riseButton");
      });
    }
  }
}

onUpdated(() => {
  transitionCard(props.notesd[0].id);
});

function transitionCard(id) {
  listNote.value
    .querySelectorAll(".notes__list-item")
    .forEach((noteListItem) => {
      noteListItem.classList.remove("notes__list-item--selected");
    });
  listNote.value
    .querySelector(`.notes__list-item[data-note-id="${Number(id)}"]`)
    .classList.add("notes__list-item--selected");
}

async function activeCard(id) {
  const note = await NotesAPI.getOneNote(id);
  store.addActivedNote([note]);

  transitionCard(id);
}
</script>

<style scoped>
.riseButton {
  font-size: 30px;
  color: rgb(49, 40, 40);
  top: 30px;
  transition: font-size 0.4s;
}
</style>
