<script setup>
defineProps({
    id: Number,
    name: String,
    type: String,
    dimension: String
})
</script>

<template>
    <router-link :to="`/locations/` + id">
        <div class="bg-gray-200 p-2 rounded-xl pl-10 hover:bg-gray-400 flex items-center h-full">
            <p class="">{{ id }} - {{ name }} - {{ type }} - {{ dimension }}</p>
        </div>
    </router-link>
</template>
