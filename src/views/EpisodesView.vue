<script setup>
import Episode from '@/components/Episode.vue'
import Navigation from '@/components/Navigation.vue'
import axios from 'axios'
import { onMounted, reactive, ref, watch } from 'vue'
import Loader from '@/components/Loader.vue'
import SearchInput from '@/components/SearchInput.vue'

const currentPage = ref(1)

function receiveCurrentPage(page) {
    currentPage.value = page
}

const state = reactive({
    list: [],
    pages: 1,
    isLoading: true
})
const searchQuery = ref('')

function receiveQuery(query) {
    searchQuery.value = query
    console.log(searchQuery)
}

const fetchData = async () => {
    state.isLoading = true
    try {
        let url = `https://rickandmortyapi.com/api/episode?page=${currentPage.value}`
        if (searchQuery.value.trim()) {
            url += `&name=${searchQuery.value}`
        }
        const response = await axios.get(url)
        state.list = response.data.results
        state.pages = response.data.info.pages
    } catch (error) {
        console.log(error)
    } finally {
        state.isLoading = false
    }
}

onMounted(fetchData)

watch(searchQuery, () => {
    currentPage.value = 1
    fetchData()
})

watch(currentPage, fetchData)
</script>

<template>
    <div class="mx-5 md:mx-10 lg:mx-20">
        <h1 class="text-4xl text-center m-5">{{ $t('allEpisodes') }}</h1>
        <div class="flex justify-end">
            <SearchInput @send-query="receiveQuery" :placeholder="$t('title') + '...'" />
        </div>
        <div class="flex justify-center items-center" v-if="state.isLoading">
            <Loader />
        </div>
        <div v-show="!state.isLoading">
            <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div v-for="item in state.list" :key="item.id">
                    <router-link :to="'/episodes/' + item.id">
                        <Episode
                            :id="item.id"
                            :episode="item.episode"
                            :name="item.name"
                            :air_date="item.air_date"
                        />
                    </router-link>
                </div>
            </div>

            <Navigation
                @sendCurrentPage="receiveCurrentPage"
                :pages="state.pages"
                class="m-10 flex justify-center"
            />
        </div>
    </div>
</template>
