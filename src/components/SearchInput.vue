<script setup>
import { ref } from 'vue'

defineProps({
    placeholder: String
})

const searchQuery = ref('')

const emit = defineEmits(['sendQuery'])

function sendData() {
    emit('sendQuery', searchQuery.value)
}

function deleteQuery() {
    searchQuery.value = ''
    emit('sendQuery', searchQuery.value)
}
</script>

<template>
    <div class="mb-5 sm:my-5 relative">
        <i class="pi pi-search text-gray-400 absolute left-4 top-3"></i>
        <input
            v-model="searchQuery"
            @input="sendData"
            :placeholder="`${placeholder}`"
            class="border rounded-xl py-2 px-10 outline-none focus:border-gray-400"
        />
        <button @click="deleteQuery">
            <i class="pi pi-times text-gray-400 absolute top-3 right-3"></i>
        </button>
    </div>
</template>
