<template>
  <div class="container mx-auto px-4 py-8">
    <div class="bg-white shadow-md rounded-lg p-6">
      <h5 class="text-xl font-semibold mb-4">Create Page</h5>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
          <input
              type="text"
              class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              id="title"
              v-model="title"
              placeholder="Title of Page"
              required
          />
        </div>
        <div>
          <label for="slug" class="block text-sm font-medium text-gray-700">Slug</label>
          <input
              type="text"
              class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              id="slug"
              v-model="slug"
              placeholder="Slug of Page"
              required
          />
        </div>
        <button type="submit" class="btn-primary mt-4">Save</button>
      </form>
    </div>
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
        <tr v-if="error">
          <td colspan="5" class="px-6 py-4 text-center text-red-500">Error loading pages</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { ContentControllerService } from '@/api/ContentControllerService';
import { PageDto } from '../types/PageDto';

export default defineComponent({
  name: 'Home',
  setup() {
    const title = ref('');
    const slug = ref('');
    const pages = ref<PageDto[]>([]);
    const error = ref<string | null>(null);
    const isLoading = ref<boolean>(false);

    const fetchPages = async () => {
      isLoading.value = true;
      error.value = null;
      try {
        const { data, error: fetchError } = ContentControllerService.findPages();
        if (fetchError) {
          throw fetchError;
        }
        pages.value = data;
      } catch (e) {
        error.value = e.message;
      } finally {
        isLoading.value = false;
      }
    };

    const handleSubmit = async () => {
      try {
        await ContentControllerService.createPage(title.value, slug.value);
        title.value = '';
        slug.value = '';
        fetchPages(); // Fetch pages again after creating a new page
      } catch (e) {
        console.error('Error creating page:', e);
      }
    };

    onMounted(() => {
      fetchPages(); // Fetch pages when component is mounted
    });

    return {
      title,
      slug,
      pages,
      error,
      isLoading,
      handleSubmit,
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
