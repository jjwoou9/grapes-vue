<template>
  <div class="container mx-auto px-4 py-8">
    <CreatePage @page-created="fetchPages()" />

    <div class="bg-white shadow-md rounded-lg mt-8 p-6">
      <h5 class="text-xl font-semibold mb-4">Pages</h5>
      <table class="min-w-full divide-y divide-gray-200" v-if="!isLoading && !error">
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
        <tr v-for="page in pageStore.allPages" :key="page.id">
          <td class="px-6 py-4 whitespace-nowrap">
              <RouterLink :to="`/editor/${page.id}`">{{ page.id }}</RouterLink>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">{{ page.title }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ page.slug }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ page.createdAt }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ page.updatedAt }}</td>
        </tr>
        </tbody>
      </table>
      <div v-if="isLoading" class="px-6 py-4 text-center text-gray-500">Loading...</div>
      <div v-if="error" class="px-6 py-4 text-center text-red-500">Error loading pages: {{ error }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref, watch} from 'vue';
import useSWRV from 'swrv';
import { ContentControllerService } from '@/api/ContentControllerService';
import { usePageStore } from '../stores/pagesStore';
import CreatePage from "@/components/Home/CreatePage.vue";

export default defineComponent({
  name: 'Home',
  components: {CreatePage},
  setup() {
    const pageStore = usePageStore();

    const fetchPages = async () => {
      console.log('Fetching pages...');
      const response = await ContentControllerService.findPages();
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    };

    const { data, error, isValidating } = useSWRV('pages', fetchPages);

    watch(data, newPages => {
      if (newPages) {
        pageStore.setPageList(newPages);
      }
    });

    onMounted(fetchPages);

    return {
      pageStore,
      fetchPages,
      error,
      isLoading: isValidating,
    };
  },
});
</script>
<style scoped>
/* 기본적으로 Tailwind CSS를 사용하는 스타일이 적용되어 있습니다 */
.container {
  max-width: 800px;
}
.btn-primary {
  @apply bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-600;
}
</style>
