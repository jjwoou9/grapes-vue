<template>
  <GrapesEditor />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import GrapesEditor  from "@/components/GrapesEditor/GrapesEditor.vue";

const route = useRoute(); // Get current route object
const pageId = route.params.pageId; // Get pageId from route parameters
console.log('Page ID:', pageId);
</script>