import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import TheHeader from '@/components/TheHeader.vue'
import router from '@/router'
import i18n from '@/i18n'
const createWrapper = () => {
    return mount(TheHeader, {
        global: {
            plugins: [i18n, router]
        }
    })
}

describe('TheHeader.vue', () => {
    it('renders correctly', () => {
        const wrapper = createWrapper()
        expect(wrapper.find('header').exists()).toBe(true)
        expect(wrapper.find('nav').exists()).toBe(true)
        expect(wrapper.findAll('li').length).toBe(6)
    })

    it('toggles menu on button click', async () => {
        const wrapper = createWrapper()
        const menuButton = wrapper.find('button')
        expect(wrapper.find('#menu').classes()).toContain('hidden')
        await menuButton.trigger('click')
        expect(wrapper.find('#menu').classes()).toContain('block')
        await menuButton.trigger('click')
        expect(wrapper.find('#menu').classes()).toContain('hidden')
    })

    it('changes language on select change', async () => {
        const wrapper = createWrapper()
        const select = wrapper.find('select')
        await select.setValue('ru')
        expect(wrapper.vm.$i18n.locale).toBe('ru')
    })

    it('activates the correct link', async () => {
        const wrapper = createWrapper()
        await router.push('/locations')
        expect(wrapper.find('.bg-gray-400').text()).toBe('Локации')
    })
})
