<template>
   <div class="notes__list">
      <tnotes  v-for="(note, index) in notesd" :key="note" :notesL="note" :classNote="index===0 ? 'notes__list-item notes__list-item--selected' : 'notes__list-item'" />
   </div>
</template>
<script>
import Tnotes from './ItemNote.vue';
export default {
   props:['notesd'],
   components:{
      Tnotes,
   },
} 
</script>