<template>
  <div class="bg-white shadow-md rounded-lg mt-8 p-6">
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
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue';
import { ContentControllerService } from '@/api/ContentControllerService';
import {PageDto} from "@/types/PageDto";
import CreatePage from "@/components/Home/CreatePage.vue";
import {usePageStore} from "@/stores/pagesStore";

export default defineComponent({
  name: 'PageTable',
  components: {CreatePage},
  setup() {
    const pages = ref<PageDto[]>([]);
    const title = ref('');
    const slug = ref('');

    const pageStore = usePageStore();

    const fetchPages = async () => {
      const { data } = await ContentControllerService.findPages();
      console.log(data);
      if(data.value){
        pages.value = data.value;
      }
    };

    onMounted(async () => {
      fetchPages();
    });

    const handleSubmit = async () => {
      try {
        await ContentControllerService.createPage(title.value, slug.value);
        title.value = '';
        slug.value = '';
        //fetchPages(); // Fetch pages again after creating a new page
      } catch (e) {
        console.error('Error creating page:', e);
      }
    };

    return {
      pages,
      title,
      slug,
      handleSubmit,
    };
  },
});
</script>
<style scoped>
.container {
  max-width: 800px;
}
</style>