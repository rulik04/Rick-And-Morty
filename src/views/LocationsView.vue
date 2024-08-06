<script setup>
import Navigation from '@/components/Navigation.vue'
import axios from 'axios'
import { onMounted, reactive, ref, watch } from 'vue'
import Loader from '@/components/Loader.vue'
import Location from '@/components/Location.vue'
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

const fetchData = async () => {
    state.isLoading = true
    try {
        let url = `https://rickandmortyapi.com/api/location?page=${currentPage.value}`
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

const searchQuery = ref('')

function receiveQuery(query) {
    searchQuery.value = query
    console.log(searchQuery)
}

watch(searchQuery, () => {
    currentPage.value = 1
    fetchData()
})

watch(currentPage, fetchData)
</script>

<template>
    <div class="mx-5 md:mx-10 lg:mx-20">
        <h1 class="text-4xl text-center m-5">{{ $t('allLocations') }}</h1>
        <div class="flex justify-end">
            <SearchInput @send-query="receiveQuery" :placeholder="$t('title') + '...'" />
        </div>
        <div class="flex justify-center items-center" v-if="state.isLoading">
            <Loader />
        </div>
        <div v-show="!state.isLoading">
            <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div v-for="item in state.list" :key="item.id">
                    <router-link :to="'/locations/' + item.id">
                        <Location
                            :id="item.id"
                            :name="item.name"
                            :type="item.type"
                            :dimension="item.dimension"
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
