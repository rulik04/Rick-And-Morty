<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import Card from '@/components/Card.vue'
import Location from '@/components/Location.vue'
import Loader from '@/components/Loader.vue'
const location = ref({})
const characters = ref([])
const isLoading = ref(true)
const route = useRoute()
const episodeId = route.params.id

onMounted(async () => {
    isLoading.value = true
    try {
        const response = await axios.get('https://rickandmortyapi.com/api/location/' + episodeId)
        location.value = response.data
        console.log(location.value)

        const requests = location.value.residents.map((url) => axios.get(url))
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
        <h2 class="text-3xl text-center font-medium m-5">{{ $t('locationInfo') }}</h2>
        <div class="flex justify-center">
            <Location
                :id="location.id"
                :name="location.name"
                :type="location.type"
                :dimension="location.dimension"
                class="md:w-1/2 h-24"
            />
        </div>

        <h2 class="text-3xl text-center font-medium m-5">{{ $t('residents') }}</h2>
        <div class="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            <div v-for="item in characters" :key="item.id">
                <router-link :to="'/locations/' + item.id">
                    <Card :title="item.name" :imageUrl="item.image" :status="item.status" />
                </router-link>
            </div>
        </div>
    </div>
</template>
