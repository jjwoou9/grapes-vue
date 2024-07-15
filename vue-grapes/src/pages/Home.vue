<template>
  <div class="container mx-auto px-4 py-8">
    <CreatePage @pageCreated="fetchPages" />
    <PageTable ref="pageTable" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import CreatePage from '@/components/Home/CreatePage.vue';
import PageTable from '@/components/Home/PageTable.vue';

export default defineComponent({
  name: 'Home',
  components: {
    CreatePage,
    PageTable,
  },
  setup() {
    const pageTableRef = ref();

    const fetchPages = () => {
      if (pageTableRef.value) {
        pageTableRef.value.fetchPages();
      }
    };

    return {
      fetchPages,
      pageTableRef,
    };
  },
});
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
