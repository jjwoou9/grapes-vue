<template>
  <button @click="savePage">Save Page</button>
</template>

<script setup lang="ts">
import { useSavePage } from '@/composables/useSavePage'

const { savePage } = useSavePage()
</script>

<style scoped>
button {
  display: inline-block;
  padding: 10px 20px;
  margin: 20px auto 0;
  border-radius: 3px;
  background-color: #444;
  color: rgba(255, 255, 255, 0.75);
  font-size: 1rem;
  font-weight: 100;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.25);
}

button:hover {
  background-color: #333;
  color: rgba(255, 255, 255, 1);
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.3);
}

button:active {
  background-color: #222;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
}
</style>
