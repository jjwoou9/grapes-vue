<template>
  <button @click="savePage">Save Page</button>
</template>

<script setup lang="ts">
import { useSavePage } from '@/composables/useSavePage'

const { savePage } = useSavePage()
</script>

<style scoped>
button {
  /* 스타일을 필요에 따라 추가하세요 */
}
</style>
