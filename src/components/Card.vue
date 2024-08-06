<script setup>
import { ref } from 'vue'

defineProps({
    imageUrl: String,
    title: String,
    status: String
})

const isLoading = ref(true)

function handleImageLoad() {
    isLoading.value = false
}
</script>

<template>
    <div
        class="relative border border-slate-100 rounded-3xl flex flex-col p-4 sm:p-8 h-full w-full cursor-pointer hover:-translate-y-2 hover:shadow-xl transition"
    >
        <div
            class="absolute w-fit p-2 h-8 top-2 left-2 sm:top-4 sm:left-4 rounded-xl flex items-center justify-center"
            :class="{
                'bg-green-500': status == 'Alive',
                'bg-red-500': status == 'Dead',
                'bg-gray-500': status == 'unknown'
            }"
        >
            <p class="text-xl capitalize">{{ status }}</p>
        </div>

        <img v-if="isLoading" src="@/assets/img/noImg.jpeg" alt="Loading" class="rounded-xl" />
        <img
            v-show="!isLoading"
            :src="imageUrl"
            alt="Character"
            class="rounded-xl"
            @load="handleImageLoad"
        />

        <p class="mt-2 sm:text-lg lg:text-2xl text-center font-medium title">{{ title }}</p>
    </div>
</template>
