<script setup>
import Card from '@/components/Card.vue'
import Navigation from '@/components/Navigation.vue'
import axios from 'axios'
import { onMounted, reactive, ref, watch } from 'vue'
import Loader from './Loader.vue'
import SearchInput from './SearchInput.vue'

const currentPage = ref(1)

function receiveCurrentPage(page) {
    currentPage.value = page
}

const state = reactive({
    list: [],
    pages: 1,
    isLoading: true
})

const sortBy = ref('all')
const searchQuery = ref('')

function receiveQuery(query) {
    searchQuery.value = query
    console.log(searchQuery)
}

const fetchData = async () => {
    state.isLoading = true
    try {
        let url = `https://rickandmortyapi.com/api/character?page=${currentPage.value}`
        if (sortBy.value && sortBy.value !== 'all') {
            url += `&status=${sortBy.value}`
        }
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

watch([sortBy, searchQuery], () => {
    currentPage.value = 1
    fetchData()
})

watch(currentPage, fetchData)
</script>

<template>
    <div>
        <div class="flex flex-col sm:flex-row justify-end gap-5 items-center">
            <div>
                <select v-model="sortBy" class="py-2 px-3 border rounded-xl outline-none">
                    <option value="all" class="">{{ $t('all') }}</option>
                    <option value="alive">{{ $t('alive') }}</option>
                    <option value="dead">{{ $t('dead') }}</option>
                    <option value="unknown">{{ $t('unknown') }}</option>
                </select>
            </div>

            <SearchInput @send-query="receiveQuery" :placeholder="$t('name') + '...'" />
        </div>
        <div class="flex justify-center items-center" v-if="state.isLoading">
            <Loader />
        </div>

        <div v-show="!state.isLoading">
            <div class="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
                <div v-for="item in state.list" :key="item.id">
                    <router-link :to="'/characters/' + item.id">
                        <Card :title="item.name" :imageUrl="item.image" :status="item.status" />
                    </router-link>
                </div>
            </div>

            <Navigation
                @sendCurrentPage="receiveCurrentPage"
                :pages="state.pages"
                :currentPage="currentPage"
                class="m-10 flex justify-center"
            />
        </div>
    </div>
</template>
