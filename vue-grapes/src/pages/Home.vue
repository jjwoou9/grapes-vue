<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mt-5">
        <h5>Create Page</h5>
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <input
                type="text"
                class="form-control"
                id="title"
                v-model="title"
                placeholder="Title of Page"
                required
            />
          </div>
          <div class="mb-3">
            <label for="slug" class="form-label">Slug</label>
            <input
                type="text"
                class="form-control"
                id="slug"
                v-model="slug"
                placeholder="Slug of Page"
                required
            />
          </div>
          <button type="submit" class="btn btn-primary">Save</button>
        </form>
      </div>
      <div class="col-12 my-2">
        <h5>Pages</h5>
        <table class="table table-bordered table-hover">
          <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Slug</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="page in pages" :key="page.id">
            <td>{{ page.id }}</td>
            <td>{{ page.title }}</td>
            <td>{{ page.slug }}</td>
            <td>{{ page.createdAt }}</td>
            <td>{{ page.updatedAt }}</td>
          </tr>
          <tr v-if="isLoading">
            <td colspan="5">Loading...</td>
          </tr>
          <tr v-if="error">
            <td colspan="5">Error loading pages</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ContentControllerService } from '@/api/ContentControllerService';

export default defineComponent({
  name: 'Home',
  setup() {
    const title = ref('');
    const slug = ref('');
    const { pages, error, isLoading } = ContentControllerService.findPages();

    const handleSubmit = async () => {
      try {
        await ContentControllerService.createPage(title.value, slug.value);
        title.value = '';
        slug.value = '';
      } catch (e) {
        console.error('Error creating page:', e);
      }
    };

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
/* 스타일링은 필요에 따라 추가 */
</style>
