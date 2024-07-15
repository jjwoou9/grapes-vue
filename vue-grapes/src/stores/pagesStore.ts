import { defineStore } from 'pinia'
import {PageDto} from '@/types/PageDto';
import { ContentControllerService } from '@/api/ContentControllerService';

export const usePagesStore = defineStore('pages', {
    state: () => ({
        pages: [] as PageDto[],
        isLoading: false,
        error: null,
    }),
    actions: {
        async fetchPages() {
            this.isLoading = true;
            const { data, error } = await ContentControllerService.findPages();
            if (error) {
                 console.error(error);
            } else {
                console.log("data: ", data);
                // If data.value is defined
                if (data.value) {
                    this.pages = data.value;
                } else {
                    console.log("data.value is undefined");
                }
            }
            this.isLoading = false;
        },
        setPages(pages: PageDto[]) {
            this.pages = pages;
        },
    }
});
