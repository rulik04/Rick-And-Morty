<script setup>
defineProps({
    id: Number,
    name: String,
    air_date: String,
    episode: String
})
</script>

<template>
    <router-link :to="`/episodes/` + id">
        <div class="bg-gray-200 p-2 rounded-xl pl-10 hover:bg-gray-400 flex items-center h-full">
            {{ id }} - {{ name }} - {{ episode }} - {{ air_date }}
        </div>
    </router-link>
</template>
