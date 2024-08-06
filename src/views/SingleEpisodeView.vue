<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import Card from '@/components/Card.vue'
import Episode from '@/components/Episode.vue'
import Loader from '@/components/Loader.vue'
const episode = ref({})
const characters = ref([])
const isLoading = ref(true)
const route = useRoute()
const episodeId = route.params.id

onMounted(async () => {
    isLoading.value = true
    try {
        const response = await axios.get('https://rickandmortyapi.com/api/episode/' + episodeId)
        episode.value = response.data
        console.log(episode.value)

        const requests = episode.value.characters.map((url) => axios.get(url))
        const characterResponse = await Promise.all(requests)
        characters.value = characterResponse.map((res) => res.data)
        console.log(characters.value)
    } catch (error) {
        console.error(error)
    } finally {
        isLoading.value = false
    }
})
</script>
<template>
    <div class="flex justify-center items-center" v-if="isLoading">
        <Loader />
    </div>
    <div class="mx-5 md:mx-10 lg:mx-20" v-else>
        <h2 class="text-3xl text-center font-medium m-5">{{ $t('episodeInfo') }}</h2>
        <div class="flex justify-center">
            <Episode
                :id="episode.id"
                :episode="episode.episode"
                :name="episode.name"
                :air_date="episode.air_date"
                class="md:w-1/2 h-24"
            />
        </div>

        <h2 class="text-3xl text-center font-medium m-5">{{ $t('characters') }}</h2>
        <div class="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            <div v-for="item in characters" :key="item.id">
                <router-link :to="'/characters/' + item.id">
                    <Card :title="item.name" :imageUrl="item.image" :status="item.status" />
                </router-link>
            </div>
        </div>
    </div>
</template>
