<template>
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
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ContentControllerService } from '@/api/ContentControllerService';

export default defineComponent({
  name: 'CreatePage',
  emits: ['page-created'],
  setup(props, { emit }) {
    const title = ref('');
    const slug = ref('');

    const handleSubmit = async () => {
      try {
        await ContentControllerService.createPage(title.value, slug.value);
        title.value = '';
        slug.value = '';
        emit('page-created');
      } catch (e) {
        console.error('Error creating page:', e);
      }
    };

    return {
      title,
      slug,
      handleSubmit,
    };
  },
});
</script>