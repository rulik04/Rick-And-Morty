<template>
    <section class="text-center flex flex-col justify-center items-center m-20">
        <i class="pi pi-exclamation-triangle text-yellow-500 text-7xl mb-5"></i>
        <h1 class="text-4xl md:text-6xl font-bold mb-4">404 Not Found</h1>
        <p class="text-lg md:text-xl mb-5">
            {{ $t('notExist') }}
            <RouterLink
                to="/"
                class="text-white bg-green-700 hover:bg-green-900 rounded-md px-3 py-2 mt-4"
                >{{ $t('goBack') }}</RouterLink
            >
        </p>
    </section>
</template>
