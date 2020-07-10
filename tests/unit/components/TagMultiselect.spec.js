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
        wrapper.vm.addSkill('skill');

        expect(wrapper.vm.options.length)
            .toBe(1);
        expect(wrapper.vm.teammate.skills.length)
            .toBe(1);
        expect(wrapper.vm.options[0].name)
            .toMatch('skill');
        expect(wrapper.vm.options[0].code)
            .toContain('sk');
        expect(wrapper.vm.teammate.skills[0].name)
            .toMatch('skill');
        expect(wrapper.vm.teammate.skills[0].code)
            .toContain('sk')
    })

    it('triggers the addSkill function on tag event', async () => {
        let spyAddSkillMethod = jest.fn()
        wrapper.vm.addSkill = spyAddSkillMethod
        await wrapper.vm.$forceUpdate()
        const multiselect = wrapper.findComponent(Multiselect);

        multiselect.vm.$emit('tag', 'skill');

        expect(spyAddSkillMethod).toBeCalledTimes(1)
    })

    it('renders the teammate skills', async () => {
        wrapper.vm.teammate.skills.push({code: 'sk1', name: 'skill1'})
        wrapper.vm.teammate.skills.push({code: 'sk2', name: 'skill2'})
        await wrapper.vm.$nextTick()

        const multiSelect = wrapper.findComponent(Multiselect);

        expect(multiSelect.props().value.length)
            .toBe(2);
    })


})
