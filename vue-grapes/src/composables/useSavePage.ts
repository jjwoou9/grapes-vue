// src/composables/useSavePage.ts
import { useGrapesEditorStore } from '@/stores/grapesEditorStore'
import { mutate } from 'swrv'
import { fetcher } from '@/utils/fetcher'

export const useSavePage = () => {
    const grapesEditorStore = useGrapesEditorStore()

    const savePage = async () => {
        const pageData = grapesEditorStore.getProjectData()
        if (pageData) {
            try {
                const response = await fetcher('/api/pages', {  // endpoint만 전달
                    method: 'POST',
                    body: JSON.stringify({ content: JSON.stringify(pageData) }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                await mutate('/api/pages', response)  // endpoint만 전달
                alert('Page saved successfully!')
            } catch (error) {
                console.error('Error saving page:', error)
                alert('Error saving page. Please try again.')
            }
        }
    }

    return { savePage }
}
