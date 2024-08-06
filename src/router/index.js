import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CharacterView from '@/views/CharacterView.vue'
import LocationsView from '@/views/LocationsView.vue'
import EpisodesView from '@/views/EpisodesView.vue'
import SingleEpisodeView from '@/views/SingleEpisodeView.vue'
import SingleLocationView from '@/views/SingleLocationView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/locations',
            name: 'locations',
            component: LocationsView
        },
        {
            path: '/episodes',
            name: 'episodes',
            component: EpisodesView
        },
        {
            path: '/characters/:id',
            name: 'character',
            component: CharacterView
        },
        {
            path: '/episodes/:id',
            name: 'episode',
            component: SingleEpisodeView
        },
        {
            path: '/locations/:id',
            name: 'location',
            component: SingleLocationView
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFoundView
        }
    ]
})

export default router
