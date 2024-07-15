import { createRouter, createWebHistory } from 'vue-router'
import Home from "../pages/Home.vue";
import Editor from "../pages/Editor.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/editor/:pageId',
            name: 'editor',
            component: Editor
        },
    ]
})

export default router
