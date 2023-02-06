<template>
      <!-- <button @click="deleteClick(notesL.id)" class="ri-delete-bin-line"></button> --> 
    
    <div class="note"  @click="onClick(notesL.id)" >
      <div class="divdelete"><div class="ri-delete-bin-line trash" ></div></div>
    <div :class="classNote" :data-note-id=notesL.id v-drag="{ axis:'x'}" @v-drag-end =" someFunction(notesL.id) " >
            <div class="notes__small-title">{{ notesL.body.content.find(item => item.type==='heading').content ? notesL.body.content.find(item => item.type==='heading').content[0].text : 'No Title'}}</div>
            <div class="notes__small-body">
              {{ notesL.body.content.find(item => item.type==='paragraph') && notesL.body.content.find(item => item.type==='paragraph').content ? notesL.body.content.find(item => item.type==='paragraph').content.find(item => item.type==='text').text.substring(0,30) : 'Write here...' }}
              {{ notesL.body.content.find(item => item.type==='paragraph') && notesL.body.content.find(item => item.type==='paragraph').content ? (notesL.body.content.find(item => item.type==='paragraph').content.find(item => item.type==='text').text.length > 30 ? "..." : "" ) : ''}}
            </div>
            <div class="notes__small-updated">
                {{ formatDate(notesL.updated) }}
            </div>
            
        </div>
      </div>
  

</template>
<script>

import moment from 'moment';
import { store } from '../../store'
import NotesAPI from './NotesApi';

export default {
  name: 'ItemNote',
  props:['notesL','classNote'],
  
  methods:{
    someFunction(id){
      const elem = document.querySelector(`.notes__list-item[data-note-id="${Number(id)}"]`);
      
      if(elem.getBoundingClientRect().x>170){
        this.deleteClick(id)
      }else{
      const notes = NotesAPI.getAllNotes();
      const selectedNote = notes.find(note => note.id === Number(id))
      store.commit('add',[selectedNote] );
      
      document.querySelectorAll(".notes__list-item").forEach(noteListItem => {
            noteListItem.classList.remove("notes__list-item--selected");
        });
      document.querySelector(`.notes__list-item[data-note-id="${Number(id)}"]`).classList.add("notes__list-item--selected");

      }
    },
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY hh:mm a')
      }
    },
    
   deleteClick(id){
      const newNotes =NotesAPI.deleteNote(id);
      store.commit('addNote', newNotes );
      store.commit('add', [newNotes[0]] );
   }
   }
 }
</script>
