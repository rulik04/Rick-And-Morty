import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Card from '@/components/Card.vue'

describe('Card.vue', () => {
    const createWrapper = () => {
        return mount(Card, {
            props: {
                imageUrl: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
                title: 'Rick Sanchez',
                status: 'Alive'
            }
        })
    }
    it('renders the title', () => {
        const wrapper = createWrapper()
        expect(wrapper.find('p.title').text()).toBe('Rick Sanchez')
    })

    it('shows loading image initially', () => {
        const wrapper = createWrapper()
        expect(wrapper.find('img[alt="Loading"]').exists()).toBe(true)
    })

    it('shows the correct status color', () => {
        const wrapper = createWrapper()
        expect(wrapper.find('.bg-green-500').exists()).toBe(true)
    })

    it('displays character image after loading', async () => {
        const wrapper = createWrapper()
        await wrapper.find('img[alt="Character"]').trigger('load')
        expect(wrapper.find('img[alt="Loading"]').exists()).toBe(false)
        expect(wrapper.find('img[alt="Character"]').exists()).toBe(true)
    })
})
