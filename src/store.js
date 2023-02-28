import { defineStore } from "pinia";
import { ref } from "vue";

export const useNoteStore = defineStore("notes", () => {
  const activeNote = ref([]);
  const notes = ref([]);
  const userToken = ref({});

  function addActivedNote(note) {
    activeNote.value = note;
    return activeNote;
  }
  function addNote(note) {
    notes.value = note;
  }
  function addUserToken(value) {
    userToken.value = value;
  }
  return {
    activeNote,
    notes,
    addActivedNote,
    addNote,
    addUserToken,
    userToken,
  };
  // getters: {

  // }

  // actions: {
  //   getTodos({ commit }) {
  //     fetch("https://jsonplaceholder.typicode.com/todos?userId=1")
  //       .then((res) => res.json())
  //       .then((data) => commit("addTodos", data))
  //       .catch((error) => console.log(error));
  //   },
  // },
});
