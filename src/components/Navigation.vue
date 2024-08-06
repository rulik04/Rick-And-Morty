<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    pages: Number,
    currentPage: {
        type: Number,
        default: 1
    }
})
const emit = defineEmits(['sendCurrentPage'])

const localCurrentPage = ref(props.currentPage)

watch(
    () => props.currentPage,
    (newVal) => {
        localCurrentPage.value = newVal
    }
)

const prevPage = () => {
    if (localCurrentPage.value > 1) {
        localCurrentPage.value -= 1
        emit('sendCurrentPage', localCurrentPage.value)
    }
}
const nextPage = () => {
    if (localCurrentPage.value < props.pages) {
        localCurrentPage.value += 1
        emit('sendCurrentPage', localCurrentPage.value)
    }
}
</script>

<template>
    <div class="flex gap-5">
        <button
            class="bg-slate-300 p-2 rounded-full w-10"
            :class="{
                'hover:bg-slate-500': localCurrentPage !== 1,
                'bg-gray-100': localCurrentPage === 1
            }"
            @click="prevPage"
            :disabled="localCurrentPage === 1"
        >
            <i class="pi pi-arrow-left"></i>
        </button>

        <span class="text-xl">{{ localCurrentPage }}/{{ pages }}</span>

        <button
            class="bg-slate-300 p-2 rounded-full w-10"
            :class="{
                'hover:bg-slate-500': localCurrentPage !== pages,
                'bg-gray-100': localCurrentPage === pages
            }"
            @click="nextPage"
            :disabled="localCurrentPage === pages"
        >
            <i class="pi pi-arrow-right"></i>
        </button>
    </div>
</template>
