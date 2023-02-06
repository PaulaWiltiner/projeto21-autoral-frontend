<template >
  <div id="notes" class="notes">
  <div class="notes__sidebar">
      <button class="notes__add" type="button" v-on:click="addNote" >Add Note</button>
      <ListNotes v-if="notes.length > 0" v-bind:notesd="notes" />
  </div>
  <div class="notes__preview"  >
      <TipTap  v-if="activeNote.length > 0 && notes.length > 0"  v-bind:actived="activeNote" />
  </div>
</div>
</template>

<script>

import ListNotes from './ListNotes.vue'
import NotesAPI from "./NotesApi";
import { mapState } from 'vuex';
import { store } from '../../store'
import TipTap from '../TipTap.vue'
export default {
  name: 'NotesComponent',
  components: {
    ListNotes,
    TipTap
  },
  created: function() {
    this.refreshNotes();
  },
  computed: {
    ...mapState({
        activeNote: (state) => {
          const str = JSON.stringify(state.activeNote);
          return JSON.parse(str);
        },
        notes: (state) => {
          const str = JSON.stringify(state.notes);
          return JSON.parse(str);
        },
    }),
    
    
  },
  methods: {
    refreshNotes() {
        const notes = NotesAPI.getAllNotes();
       
        if(notes.length>0){
          store.commit('addNote', notes );
          store.commit('add', [notes[0]] );
        }
    },

    addNote(){
      const newNote = {
         body:{ type:'doc',
          content: [
              {type: 'heading',content:[{type:'text',text:'New Note'}]},
              {type:'paragraph', content:[{type:'text',text:'Write here'}]}
            
      ]}
      };

      const newNt =NotesAPI.saveNote(newNote);
      store.commit('add',[newNt] )
      this.refreshNotes();
    },

  }
        
}
</script>

<style >

  
  .note{
    margin-top: -7em;
  }
  .trash{
    font-size: 40px;
    color:#fff;
    position: absolute;
    top:39px;
    left: 34px;
  }
  .divdelete{
    z-index: 1;
    background: #fd615c;
    border-radius: 7px;
    position: relative;
    height: 114px;
    width: 295px;
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
    width: 100%;
  }

  .notes__add:hover {
    background: #fcaa67;
  }

  .notes_list{
    overflow-y: auto;
    height: 400px;
  }
  .notes__list-item {
    cursor: pointer;
    background: #fff;
    border-radius: 7px;
    padding: 2px;
    margin-bottom: 0px;
    z-index: 1000;
    
  }

  .notes__list-item--selected {
    background: #f7f4d2;
    border-radius: 7px;
    font-weight: bold;
    padding: 2px;
    z-index: 1000;
  }

  .notes__small-title,
  .notes__small-updated {
    padding: 10px;
  }

  .notes__small-title {
    font-size: 1.2em;
    height:20px;
    color:#f99c50;
    margin-bottom: 10px;
  }

  .notes__small-body {
    padding: 0 10px;
    height:24px;
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