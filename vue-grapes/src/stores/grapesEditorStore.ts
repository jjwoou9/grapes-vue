import { defineStore } from 'pinia'
import type { Editor } from 'grapesjs'

interface GrapesEditorState {
    editor: Editor | null
}

export const useGrapesEditorStore = defineStore('grapesEditor', {
    state: (): GrapesEditorState => ({
        editor: null
    }),
    actions: {
        setEditor(editor: Editor) {
            this.editor = editor
        },
        getProjectData() {
            return this.editor?.getProjectData()
        },
        loadProjectData(data: any) {
            this.editor?.loadProjectData(data)
        }
    }
})