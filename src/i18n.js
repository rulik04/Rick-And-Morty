import { createI18n } from 'vue-i18n'

import en from './locales/en.json'
import ru from './locales/ru.json'

const messages = {
    en,
    ru
}

const i18n = createI18n({
    legacy: false,
    locale: 'ru',
    fallbackLocale: 'en',
    messages
})

export function setLocale(locale) {
    i18n.global.locale = locale
}

export default i18n
