import { shallowMount } from '@vue/test-utils';
import TagMultiselect from '../../../src/components/TagMultiselect';
import Multiselect from 'vue-multiselect';

let wrapper = null;

beforeEach(() => {
    wrapper = shallowMount(TagMultiselect, {
        propsData: {
            options: [],
            teammate: {
                skills: []
            }
        }
    });
})

afterEach(() => {
    wrapper.destroy();
})

describe('TagMultiselect.vue', () => {
    it('renders the multiselect', () => {
        const multiSelect = wrapper.findComponent(Multiselect);
        expect(multiSelect
            .exists())
            .toBeTruthy();
        expect(multiSelect
            .attributes('placeholder'))
            .toMatch('Search or add a new skill');
        expect(multiSelect
            .attributes('multiple'))
            .toBeTruthy();
        expect(multiSelect
            .attributes('taggable'))
            .toBeTruthy();
    })

    it('updates the options and skills array', () => {
        expect(wrapper.vm.options.length)
            .toBe(0);
        expect(wrapper.vm.teammate.skills.length)
            .toBe(0);

        wrapper.vm.addSkill('skill');

        expect(wrapper.vm.options.length)
            .toBe(1);
        expect(wrapper.vm.teammate.skills.length)
            .toBe(1);
        expect(wrapper.vm.options[0].name)
            .toMatch('skill');
        expect(wrapper.vm.teammate.skills[0].name)
            .toMatch('skill');
    })


})
