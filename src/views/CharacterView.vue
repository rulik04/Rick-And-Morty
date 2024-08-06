<script setup>
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import Loader from '@/components/Loader.vue'
import Episode from '@/components/Episode.vue'
import Card from '@/components/Card.vue'

const route = useRoute()
const characterId = route.params.id

const state = reactive({
    info: {},
    episodes: [],
    isLoading: true
})

onMounted(async () => {
    state.isLoading = true
    try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/` + characterId)
        state.info = response.data

        const requests = state.info.episode.map((url) => axios.get(url))
        const episodeResponse = await Promise.all(requests)
        state.episodes = episodeResponse.map((res) => res.data)
        console.log(state.episodes)
    } catch (error) {
        console.log(error)
    } finally {
        state.isLoading = false
    }
})
</script>

<template>
    <div class="flex justify-center items-center" v-if="state.isLoading">
        <Loader />
    </div>
    <div v-else class="mx-5 md:mx-10 lg:mx-20">
        <h1 v-if="state.info" class="text-center text-3xl mt-5 mb-5 font-semibold">
            {{ state.info.name }}
        </h1>

        <div v-if="state.info.origin" class="md:flex gap-5 justify-center">
            <div class="flex md:flex-col gap-5 xl:w-2/5 mb-4">
                <Card
                    :title="state.info.name"
                    :image-url="state.info.image"
                    :status="state.info.status"
                    class="!h-fit"
                />

                <div
                    class="border border-slate-100 rounded-3xl flex flex-col p-8 gap-5 text-sm sm:text-base"
                >
                    <p>{{ $t('species') }}: {{ state.info.species }}</p>
                    <p>{{ $t('gender') }}: {{ state.info.gender }}</p>
                    <p>{{ $t('origin') }}: {{ state.info.origin.name }}</p>
                    <p>{{ $t('location') }}: {{ state.info.location.name }}</p>
                </div>
            </div>

            <div class="border border-slate-100 rounded-3xl">
                <h1 class="font-bold text-2xl lg:text-4xl mb-1 text-center py-6">
                    {{ $t('episodes') }}
                </h1>
                <div class="grid grid-cols-1 gap-3 mx-auto px-2">
                    <Episode
                        v-for="item in state.episodes"
                        :key="item.id"
                        :id="item.id"
                        :name="item.name"
                        :episode="item.episode"
                        :air_date="item.air_date"
                        class="text-sm sm:text-base"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
