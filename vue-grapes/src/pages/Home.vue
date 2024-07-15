<template>
  <div class="container mx-auto px-4 py-8">
    <div class="bg-white shadow-md rounded-lg p-6">
      <h5 class="text-xl font-semibold mb-4">Create Page</h5>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- ... (폼 내용은 이전과 동일) ... -->
      </form>
    </div>
    <div class="bg-white shadow-md rounded-lg mt-8 p-6">
      <h5 class="text-xl font-semibold mb-4">Pages</h5>
      <table class="min-w-full divide-y divide-gray-200" v-if="!isLoading && !error">
        <thead class="bg-gray-50">
        <!-- ... (thead 내용은 이전과 동일) ... -->
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="page in pageStore.allPages" :key="page.id">
          <td class="px-6 py-4 whitespace-nowrap">{{ page.id }}</td>
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
import { defineComponent, ref, watch } from 'vue';
import useSWRV from 'swrv';
import { ContentControllerService } from '@/api/ContentControllerService';
import { usePageStore } from '../stores/pagesStore';

export default defineComponent({
  name: 'Home',
  setup() {
    const pageStore = usePageStore();
    const title = ref('');
    const slug = ref('');

    const fetchPages = async () => {
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

    const handleSubmit = async () => {
      try {
        await ContentControllerService.createPage(title.value, slug.value);
        title.value = '';
        slug.value = '';
        // Trigger a revalidation after creating a new page
      } catch (e) {
        console.error('Error creating page:', e);
      }
    };

    return {
      pageStore,
      title,
      slug,
      error,
      isLoading: isValidating,
      handleSubmit,
    };
  },
});
</script>