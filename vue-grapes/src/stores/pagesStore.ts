// stores/pageStore.ts
import { defineStore } from 'pinia'
import { PageDto } from '../types/PageDto'

export const usePageStore = defineStore('page', {
    state: () => ({
        pages: [] as PageDto[]
    }),
    getters: {
        allPages: (state): PageDto[] => state.pages
    },
    actions: {
        setPageList(pages: PageDto[]) {
            this.pages = pages
        },
        addPages(newPages: PageDto[]) {
            this.pages = [...this.pages, ...newPages]
        }
    }

})