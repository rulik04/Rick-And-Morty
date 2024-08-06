<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const isMenuOpen = ref(false)
const { locale } = useI18n()

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}

const isActiveLink = (routePath) => {
    const route = useRoute()
    return route.path === routePath
}
const changeLanguage = (event) => {
    locale.value = event.target.value
}
</script>

<template>
    <header class="px-10 sm:px-20 py-2 sticky top-0 z-20 bg-white shadow">
        <div class="flex items-center justify-between">
            <router-link to="/">
                <div class="flex items-center">
                    <img src="@/assets/img/logo-1.png" class="h-20" />
                    <img
                        src="@/assets/img/351-3510590_rick-and-morty-clipart-african-american-rick-and.webp"
                        class="h-10 hidden sm:block"
                    />
                </div>
            </router-link>
            <div class="block md:hidden">
                <button
                    class="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600"
                    @click="toggleMenu"
                >
                    <i class="pi pi-bars"></i>
                </button>
            </div>
            <nav class="hidden md:flex items-center">
                <ul class="flex gap-4">
                    <li>
                        <RouterLink
                            to="/"
                            :class="[
                                isActiveLink('/')
                                    ? 'bg-gray-400'
                                    : 'hover:bg-gray-700 hover:text-white',
                                'rounded-xl',
                                'px-3',
                                'py-2'
                            ]"
                            >{{ $t('characters') }}</RouterLink
                        >
                    </li>
                    <li>
                        <router-link
                            to="/locations"
                            :class="[
                                isActiveLink('/locations')
                                    ? 'bg-gray-400'
                                    : 'hover:bg-gray-700 hover:text-white',
                                'rounded-xl',
                                'px-3',
                                'py-2'
                            ]"
                        >
                            {{ $t('locations') }}
                        </router-link>
                    </li>
                    <li>
                        <router-link
                            to="/episodes"
                            :class="[
                                isActiveLink('/episodes')
                                    ? 'bg-gray-400'
                                    : 'hover:bg-gray-700 hover:text-white',
                                'rounded-xl',
                                'px-3',
                                'py-2'
                            ]"
                        >
                            {{ $t('episodes') }}
                        </router-link>
                    </li>
                </ul>
                <select @change="changeLanguage" class="border rounded-lg p-1 ml-4">
                    <option value="ru">RU</option>
                    <option value="eng">ENG</option>
                </select>
            </nav>
        </div>

        <nav
            :class="{ block: isMenuOpen, hidden: !isMenuOpen }"
            class="md:hidden flex flex-col justify-end"
            id="menu"
        >
            <ul class="flex flex-col gap-2 mt-5 text-end">
                <li>
                    <RouterLink
                        to="/"
                        :class="[
                            isActiveLink('/')
                                ? 'bg-gray-400'
                                : 'hover:bg-gray-700 hover:text-white',
                            'rounded-xl',
                            'px-3',
                            'py-2'
                        ]"
                        @click="toggleMenu"
                    >
                        {{ $t('characters') }}
                    </RouterLink>
                </li>
                <li>
                    <router-link
                        to="/locations"
                        :class="[
                            isActiveLink('/locations')
                                ? 'bg-gray-400'
                                : 'hover:bg-gray-700 hover:text-white',
                            'rounded-xl',
                            'px-3',
                            'py-2'
                        ]"
                        @click="toggleMenu"
                    >
                        {{ $t('locations') }}
                    </router-link>
                </li>
                <li>
                    <router-link
                        to="/episodes"
                        :class="[
                            isActiveLink('/episodes')
                                ? 'bg-gray-400'
                                : 'hover:bg-gray-700 hover:text-white',
                            'rounded-xl',
                            'px-3',
                            'py-2'
                        ]"
                        @click="toggleMenu"
                        >{{ $t('episodes') }}</router-link
                    >
                </li>
            </ul>
            <select name="" id="" class="border rounded-lg p-1 ms-auto mt-2">
                <option value="ru">RU</option>
                <option value="eng">ENG</option>
            </select>
        </nav>
    </header>
</template>

<style scoped></style>
