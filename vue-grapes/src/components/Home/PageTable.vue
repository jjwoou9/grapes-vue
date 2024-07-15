<template>
  <div class="bg-white shadow-md rounded-lg mt-8 p-6">
    <h5 class="text-xl font-semibold mb-4">Pages</h5>
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
      <tr>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated At</th>
      </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
      <tr v-for="page in pages" :key="page.id">
        <td class="px-6 py-4 whitespace-nowrap">{{ page.id }}</td>
        <td class="px-6 py-4 whitespace-nowrap">{{ page.title }}</td>
        <td class="px-6 py-4 whitespace-nowrap">{{ page.slug }}</td>
        <td class="px-6 py-4 whitespace-nowrap">{{ page.createdAt }}</td>
        <td class="px-6 py-4 whitespace-nowrap">{{ page.updatedAt }}</td>
      </tr>
      <tr v-if="isLoading">
        <td colspan="5" class="px-6 py-4 text-center text-gray-500">Loading...</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue';
import { usePagesStore } from '@/stores/pagesStore';

export default defineComponent({
  name: 'PageTable',
  setup() {
    const pagesStore = usePagesStore();

    onMounted(async () => {
      await pagesStore.fetchPages();
    });

    const pages = computed(() => {
      pagesStore.pages
      console.log(pagesStore.pages)
    });
    const isLoading = computed(() => pagesStore.isLoading);

    return {
      pages,
      isLoading,
    };
  },
});
</script>
<style scoped>
.container {
  max-width: 800px;
}
</style>
