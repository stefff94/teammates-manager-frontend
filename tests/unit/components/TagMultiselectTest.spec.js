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

    const mockMath = Object.create(global.Math)
    mockMath.random = () => 0.9;
    global.Math = mockMath;
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
        expect(multiSelect
            .attributes('label'))
            .toMatch('name');
        expect(multiSelect
            .attributes('tagplaceholder'))
            .toMatch('Add this as a new skill');
        expect(multiSelect
            .attributes('trackby'))
            .toMatch('code')
    })

    it('triggers the addSkill function on tag event', async () => {
        const spyAddSkillMethod = jest.spyOn(wrapper.vm, 'addSkill');
        await wrapper.vm.$forceUpdate();
        const multiselect = wrapper.findComponent(Multiselect);

        multiselect.vm.$emit('tag', 'skill');

        expect(spyAddSkillMethod).toBeCalledTimes(1)
    })

    it('renders the teammate skills', async () => {
        const skill1 = {code: 'sk1', name: 'skill1'};
        const skill2 = {code: 'sk2', name: 'skill2'};
        wrapper.vm.teammate.skills.push(skill1);
        wrapper.vm.teammate.skills.push(skill2);
        await wrapper.vm.$nextTick()

        const multiSelect = wrapper.findComponent(Multiselect);

        expect(multiSelect.props().value.length)
            .toBe(2);
        expect(multiSelect.props().value[0])
            .toEqual(skill1);
        expect(multiSelect.props().value[1])
            .toEqual(skill2);
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
            .toMatch('sk900000');
        expect(wrapper.vm.teammate.skills[0].name)
            .toMatch('skill');
        expect(wrapper.vm.teammate.skills[0].code)
            .toMatch('sk9000000')
    })
})
