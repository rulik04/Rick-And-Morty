import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Navigation from '@/components/Navigation.vue'

describe('Navigation.vue', () => {
    const createWrapper = (props = {}) => {
        return mount(Navigation, {
            props: {
                pages: 5,
                currentPage: 1,
                ...props
            }
        })
    }

    it('renders the current page', () => {
        const wrapper = createWrapper()
        expect(wrapper.find('span').text()).toBe('1/5')
    })

    it('disables the previous button on the first page', () => {
        const wrapper = createWrapper()
        expect(wrapper.find('button[disabled]').exists()).toBe(true)
    })

    it('increments the page when next button is clicked', async () => {
        const wrapper = createWrapper()
        await wrapper.find('button:disabled ~ button').trigger('click')
        expect(wrapper.find('span').text()).toBe('2/5')
    })

    it('decrements the page when previous button is clicked', async () => {
        const wrapper = createWrapper({ currentPage: 2 })
        await wrapper.find('button:not([disabled])').trigger('click')
        expect(wrapper.find('span').text()).toBe('1/5')
    })

    it('disables the next button on the last page', () => {
        const wrapper = createWrapper({ currentPage: 5 })
        expect(wrapper.find('button[disabled]').exists()).toBe(true)
    })
})
