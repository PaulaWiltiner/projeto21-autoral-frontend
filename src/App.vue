<template>
  <div id="app">
    <NotesComponent />
  </div>
</template>

<script>
import NotesComponent from './components/NotesComponent/index.vue';
	

export default {
  name: 'App',
  components: {
    NotesComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #ffe4b5;
  width:100%;
  height: 100%;
}
</style>
