<template>
  <div id="gjs" ref="editor" style="height:100vh; overflow:hidden">
    <div class="panel">
      <h1 class="welcome">Welcome to</h1>
      <div class="big-title">
        <span>GrapesJS</span>
      </div>
      <div class="description">
        This is a demo content from index.html. For the development, you shouldn't edit this file, instead you can
        copy and rename it to _index.html, on next server start the new file will be served, and it will be ignored by git.
      </div>
    </div>
  </div>
</template>

<
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useGrapesJS } from '@/composables/useGrapesJS';

const editor = ref<HTMLElement | null>(null);

onMounted(() => {
  if (editor.value) {
    const { initGrapesEditor } = useGrapesJS();
    initGrapesEditor(editor.value);
  }
});
</script>

<style lang="scss" scoped>
@import './GrapesEditor.styles.scss';
</style>
