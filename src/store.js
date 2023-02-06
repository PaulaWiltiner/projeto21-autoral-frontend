import { createStore } from "vuex";

export const store = new createStore({
  state: {
    activeNote: [],
    notes: [],
  },
  mutations: {
    add(state, note) {
      state.activeNote = note;
    },
    addNote(state, note) {
      state.notes = note;
    },
  },
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
