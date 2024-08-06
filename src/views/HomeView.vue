<script setup>
import CardList from '@/components/CardList.vue'
</script>

<template>
    <main class="mx-5 md:mx-10 lg:mx-20">
        <h1 class="text-4xl text-center m-5">{{ $t('allCharacters') }}</h1>

        <CardList />
    </main>
</template>
