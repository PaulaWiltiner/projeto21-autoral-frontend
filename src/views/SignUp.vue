<!-- eslint-disable vue/valid-template-root -->
<template>
  <div v-drag="{ handle }">
    Drag me using handle
    <div ref="drag-handle">Handle</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      handle: undefined,
    };
  },

  mounted() {
    this.$data.handle = this.$refs.dragHandle;
  },
};
</script>
