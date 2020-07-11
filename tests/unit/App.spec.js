import { shallowMount } from '@vue/test-utils'
import flushPromises from "flush-promises";
import App from "../../src/App";
import PersonalDataForm from "../../src/components/PersonalDataForm";

import jQuery from 'jquery'
import $ from 'jquery'
import TagMultiselect from "../../src/components/TagMultiselect";
import ApiService from "../../src/services/api.service";
import {avatarBaseUrl} from "../../src/variables";

global.jQuery = jQuery
global.$ = $
require('fomantic-ui/dist/semantic.min.js')

let wrapper = null;
let teammate = null;
let skills = null;

jest.mock('../../src/services/api.service');

beforeEach(() => {

    skills = [
        {code: 'sk1', name: 'skill1'},
        {code: 'sk2', name: 'skill2'}
    ]

})

describe('App.vue', () => {

    beforeEach(() => {
        teammate = {
            name: {
                value: 'Name'
            },
            gender: {
                value: 'M'
            },
            email: {
                value: 'email@email.it'
            },
            city: {
                value: 'City'
            },
            role: {
                value: 'R1'
            },
            skills: [
                {code: 'sk1', name: 'skill1'}
            ],
            errors: []
        }

        wrapper = shallowMount(App);
    });

    afterEach(() => {
        wrapper.destroy();
    })

    it('renders the app wrapper', () => {
        const appWrapper = wrapper.find('#app.m20');

        expect(appWrapper
            .exists())
            .toBeTruthy();
    })

    it('renders the divider', () => {
        expect(wrapper
            .find(".ui.divider")
            .exists())
            .toBeTruthy();
    })

    it('renders the PersonalDataForm', () => {
        wrapper.setData({newTeammate: teammate})
        const personalDataForm = wrapper.findComponent(PersonalDataForm);

        expect(wrapper
            .find('.mt35')
            .exists())
            .toBeTruthy();
        expect(personalDataForm
            .exists())
            .toBeTruthy();
        expect(personalDataForm.props('teammate'))
            .toBe(wrapper.vm.$data.newTeammate);
        expect(personalDataForm.props('genders'))
            .toBe(wrapper.vm.$data.genders);
        expect(personalDataForm.props('roles'))
            .toBe(wrapper.vm.$data.roles);
    })

    it('renders the TagMultiselect component', async () => {
        await wrapper.setData({
            skills: skills,
            newTeammate: teammate
        })

        const tagMultiselect = wrapper.findComponent(TagMultiselect);

        expect(wrapper
            .find('.mt35.mb35')
            .exists())
            .toBeTruthy();
        expect(tagMultiselect
            .exists())
            .toBeTruthy();
        expect(tagMultiselect.props('teammate'))
            .toBe(wrapper.vm.$data.newTeammate);
        expect(tagMultiselect.props('options'))
            .toBe(wrapper.vm.$data.skills);
    })

    it('renders the submit button', () => {
        const submitButton = wrapper.find('button.ui.button:nth-of-type(1)');

        expect(submitButton
            .exists())
            .toBeTruthy();
        expect(submitButton
            .text())
            .toMatch('Submit');
    })

    it('renders the reset button', () => {
        const resetButton = wrapper.find('button.ui.button:nth-of-type(2)')

        expect(resetButton
            .exists())
            .toBeTruthy();
        expect(resetButton
            .text())
            .toMatch('Reset');
    })

    it('renders the errors list when teammate has errors', async () => {
        teammate.errors.push('error1');
        teammate.errors.push('error2');
        await wrapper.setData({newTeammate: teammate});
        const errorListWrapper = wrapper.find('.ui.error.message.mt30 .header span');

        expect(errorListWrapper
            .exists())
            .toBeTruthy();
        expect(errorListWrapper
            .text())
            .toMatch('Issues');
        expect(wrapper.findAll('.ui.error.message.mt30 .list li').length)
            .toBe(2);
    })

    it('does not render the error list when teammate has no errors', async () => {
        const errorListWrapper = wrapper.find('.ui.error.message.mt30 .header span');
        expect(errorListWrapper
            .exists())
            .toBeFalsy();
    })

});

describe('the form is reset', () => {
    beforeEach( () => {
        teammate = {
            name: {
                value: 'Name'
            },
            gender: {
                value: 'M'
            },
            email: {
                value: 'email@email.it'
            },
            city: {
                value: 'City'
            },
            role: {
                value: 'R1'
            },
            skills: [
                {code: 'sk1', name: 'skill1'}
            ],
            errors: []
        }
        wrapper = shallowMount(App);
    })

    afterEach(() => {
        wrapper.destroy();
    })

    it('resets the PersonalDataForm and the TagMultiselect on Reset button click', async () => {
        const emptyTeammate = {
            name: {},
            gender: {},
            email: {},
            city: {},
            role: {},
            skills: [],
            errors: []
        }

        const spyResetSelects = jest.spyOn(wrapper.vm, 'resetSelects');
        await wrapper.vm.$forceUpdate();

        await wrapper.setData({newTeammate: teammate});
        const resetButton = wrapper.find('button.ui.button:nth-of-type(2)');
        resetButton.trigger('click');

        expect(wrapper.vm.$data.newTeammate)
            .toStrictEqual(emptyTeammate);
        expect(spyResetSelects)
            .toHaveBeenCalled();
    })
})

describe('the teammate is inserted and the view is updated', () => {

    beforeEach(() => {
        teammate = {
            name: {
                value: 'Name'
            },
            gender: {
                value: 'M'
            },
            email: {
                value: 'email@email.it'
            },
            city: {
                value: 'City'
            },
            role: {
                value: 'R1'
            },
            skills: [
                {code: 'sk1', name: 'skill1'}
            ],
            errors: []
        }
        wrapper = shallowMount(App);

        const respInsertTeammate = {data: {
            id:1
            }}
        ApiService.insertTeammate.mockResolvedValue(respInsertTeammate);

        const respUpdateTeammate = {data: {
                id:1
            }}
        ApiService.updateTeammate.mockResolvedValue(respUpdateTeammate);

        let respGetSkills = {
            0: {
                id: 1,
                name: 'Java'
            },
            1: {
                id: 2,
                name: 'Vue js'
            }
        }
        ApiService.getSkills.mockResolvedValue(respGetSkills);

        const mockMath = Object.create(global.Math)
        mockMath.random = () => 0.9;
        global.Math = mockMath;
    })

    afterEach(() => {
        jest.clearAllMocks();
        wrapper.destroy();
    })

    it('enables submit if teammate is valid', async () => {
        await wrapper.setData({
            newTeammate: teammate
        })

        expect(wrapper.vm.submitDisabled)
            .toBeFalsy();
        expect(wrapper
            .find('button.ui.button:nth-of-type(1)')
            .attributes('disabled'))
            .toBeUndefined();
    })

    it('does not trigger insertTeammate if the teammate has an id', async () => {
        const spyHandleTeammate = jest.spyOn(wrapper.vm, 'handleTeammate');
        const spyInsertTeammate = jest.spyOn(wrapper.vm, 'insertTeammate');
        teammate.id = 1;
        await wrapper.setData({
            newTeammate: teammate
        })

        wrapper.find('button.ui.button:nth-of-type(1)').trigger('click');
        await wrapper.vm.$nextTick();

        expect(spyHandleTeammate)
            .toHaveBeenCalledTimes(1);
        expect(spyInsertTeammate)
            .toHaveBeenCalledTimes(0);
    })

    it('triggers the handleTeammate and insertTeammate methods if the teammate is valid and has no id', async () => {
        const spyHandleTeammate = jest.spyOn(wrapper.vm, 'handleTeammate');
        const spyInsertTeammate = jest.spyOn(wrapper.vm, 'insertTeammate');
        await wrapper.setData({
            newTeammate: teammate
        })

        wrapper.find('button.ui.button:nth-of-type(1)').trigger('click');
        await wrapper.vm.$nextTick();

        expect(spyHandleTeammate)
            .toHaveBeenCalledTimes(1);
        expect(spyInsertTeammate)
            .toHaveBeenCalledTimes(1);
    })

    it('inserts the teammate if the teammate is valid and has no id', async () => {
        const spyInsertTeammate = jest.spyOn(wrapper.vm, 'insertTeammate');
        const spyUpdateViewAfterInsert = jest.spyOn(wrapper.vm, 'updateViewAfterInsert');
        const spyApiInsertTeammate = jest.spyOn(ApiService, "insertTeammate");
        await wrapper.setData({
            newTeammate: teammate
        })

        wrapper.vm.handleTeammate();
        await flushPromises();

        expect(spyInsertTeammate)
            .toHaveBeenCalledTimes(1);
        expect(spyApiInsertTeammate)
            .toHaveBeenCalledTimes(1);
        expect(spyUpdateViewAfterInsert)
            .toHaveBeenCalledTimes(1);
    })

    it('updates the view after adding the new teammate', async () => {
        const expectedTeammate = {
            id: 1,
            personalData: {
                name: teammate.name.value,
                role: wrapper.vm.$data.roles.find(r => {
                    return r.id === teammate.role.value
                }).name,
                gender: teammate.gender.value,
                photoUrl: avatarBaseUrl
                    + wrapper.vm.$data.avatars[teammate.gender.value][2]
                ,
                email: teammate.email.value,
                city: teammate.city.value
            },
            skills: teammate.skills
        }
        const spyClearNewTeammate = jest.spyOn(wrapper.vm, 'clearNewTeammate');
        const spyGetSkillsAndUpdateView = jest.spyOn(wrapper.vm, 'getSkillsAndUpdateView');
        await wrapper.setData({
            newTeammate: teammate
        })

        wrapper.vm.insertTeammate()
        await flushPromises();

        expect(wrapper.vm.$data.teammates)
            .toContainEqual(expectedTeammate);
        expect(spyClearNewTeammate)
            .toHaveBeenCalledTimes(1);
        expect(spyGetSkillsAndUpdateView)
            .toHaveBeenCalledTimes(1);
    })

    it('recovers the skills from the database', async () => {
        const skill1 = {
            code: 'Ja9000000',
            name: 'Java'
        }

        const skill2 = {
            code: 'Vu9000000',
            name: 'Vue js'
        }

        wrapper.vm.getSkillsAndUpdateView()
        await flushPromises();

        expect(wrapper.vm.$data.skills)
            .toContainEqual(skill1);
        expect(wrapper.vm.$data.skills)
            .toContainEqual(skill2);
    })
})


describe('the teammate is updated and the view is updated accordingly', () => {

    beforeEach(() => {
        teammate = {
            id: 1,
            name: {
                value: 'Name'
            },
            gender: {
                value: 'M'
            },
            email: {
                value: 'email@email.it'
            },
            city: {
                value: 'City'
            },
            role: {
                value: 'R1'
            },
            skills: [
                {code: 'sk1', name: 'skill1'}
            ],
            errors: []
        }
        wrapper = shallowMount(App);

        const respInsertTeammate = {data: {
                id:1
            }}
        ApiService.insertTeammate.mockResolvedValue(respInsertTeammate);

        const respUpdateTeammate = {data: {
                id:1
            }}
        ApiService.updateTeammate.mockResolvedValue(respUpdateTeammate);

        let respGetSkills = {
            0: {
                id: 1,
                name: 'Java'
            },
            1: {
                id: 2,
                name: 'Vue js'
            }
        }
        ApiService.getSkills.mockResolvedValue(respGetSkills);

        const mockMath = Object.create(global.Math)
        mockMath.random = () => 0.9;
        global.Math = mockMath;
    })

    afterEach(() => {
        jest.clearAllMocks();
        wrapper.destroy();
    })

    it('enables submit if teammate is valid', async () => {
        await wrapper.setData({
            newTeammate: teammate
        })

        expect(wrapper.vm.submitDisabled)
            .toBeFalsy();
        expect(wrapper
            .find('button.ui.button:nth-of-type(1)')
            .attributes('disabled'))
            .toBeUndefined();
    })

    it('does not trigger updateTeammate if the teammate has no id', async () => {
        const spyHandleTeammate = jest.spyOn(wrapper.vm, 'handleTeammate');
        const spyUpdateTeammate = jest.spyOn(wrapper.vm, 'updateTeammate');
        teammate.id = undefined;
        await wrapper.setData({
            newTeammate: teammate
        })

        wrapper.find('button.ui.button:nth-of-type(1)').trigger('click');
        await wrapper.vm.$nextTick();

        expect(spyHandleTeammate)
            .toHaveBeenCalledTimes(1);
        expect(spyUpdateTeammate)
            .toHaveBeenCalledTimes(0);
    })

    it('triggers the handleTeammate and updateTeammate methods if the teammate is valid and has an id', async () => {
        const spyHandleTeammate = jest.spyOn(wrapper.vm, 'handleTeammate');
        const spyUpdateTeammate = jest.spyOn(wrapper.vm, 'updateTeammate');
        await wrapper.setData({
            newTeammate: teammate
        })

        wrapper.find('button.ui.button:nth-of-type(1)').trigger('click');
        await wrapper.vm.$nextTick();

        expect(spyHandleTeammate)
            .toHaveBeenCalledTimes(1);
        expect(spyUpdateTeammate)
            .toHaveBeenCalledTimes(1);
    })

    it('updates the teammate if the teammate is valid and has an id', async () => {
        const spyUpdateTeammate = jest.spyOn(wrapper.vm, 'updateTeammate');
        const spyApiUpdateTeammate = jest.spyOn(ApiService, 'updateTeammate');
        await wrapper.setData({
            newTeammate: teammate
        })

        wrapper.vm.handleTeammate();
        await flushPromises();

        expect(spyUpdateTeammate)
            .toHaveBeenCalledTimes(1);
        expect(spyApiUpdateTeammate)
            .toHaveBeenCalledTimes(1);
    })

    it('updates the view after updating the teammate', async () => {
        teammate.id = undefined;
        await wrapper.setData({ newTeammate: teammate });
        wrapper.vm.insertTeammate(teammate);
        await flushPromises();
        const teammatesLength = wrapper.vm.teammates.length;

        teammate.id = 1;
        teammate.name.value = 'New Name';
        teammate.photoUrl = avatarBaseUrl
            + wrapper.vm.$data.avatars[teammate.gender.value][2];
        await wrapper.setData({
            newTeammate: teammate
        })
        const expectedTeammate = {
            id: 1,
            personalData: {
                name: teammate.name.value,
                role: wrapper.vm.$data.roles.find(r => {
                    return r.id === teammate.role.value
                }).name,
                gender: teammate.gender.value,
                photoUrl: avatarBaseUrl
                    + wrapper.vm.$data.avatars[teammate.gender.value][2]
                ,
                email: teammate.email.value,
                city: teammate.city.value
            },
            skills: teammate.skills
        }
        const spyUpdateViewAfterUpdate = jest.spyOn(wrapper.vm, 'updateViewAfterUpdate');
        const spyClearNewTeammate = jest.spyOn(wrapper.vm, 'clearNewTeammate');
        const spyGetSkillsAndUpdateView = jest.spyOn(wrapper.vm, 'getSkillsAndUpdateView');

        wrapper.vm.updateTeammate()
        await flushPromises();

        expect(spyUpdateViewAfterUpdate)
            .toHaveBeenCalledTimes(1);
        expect(wrapper.vm.teammates.length)
            .toBe(teammatesLength);
        expect(wrapper.vm.teammates)
            .toContainEqual(expectedTeammate);
        expect(spyClearNewTeammate)
            .toHaveBeenCalledTimes(1);
        expect(spyGetSkillsAndUpdateView)
            .toHaveBeenCalledTimes(1);
    })
})


describe('the teammate is not valid', () => {
    let spyInsertTeammate = null;
    let spyUpdateTeammate = null;

    beforeEach(() => {
        teammate = {
            name: {
                value: 'Name'
            },
            gender: {
                value: 'M'
            },
            email: {
                value: 'email@email.it'
            },
            city: {
                value: 'City'
            },
            role: {
                value: 'R1'
            },
            skills: [
                {code: 'sk1', name: 'skill1'}
            ],
            errors: []
        }
        wrapper = shallowMount(App);

        spyInsertTeammate = jest.spyOn(wrapper.vm, 'insertTeammate');
        spyUpdateTeammate = jest.spyOn(wrapper.vm, 'updateTeammate');
    })

    afterEach(() => {
        wrapper.destroy();
    })

    it('disables submit if teammate is not valid', async () => {
        const emptyTeammate = {
            name: {},
            gender: {},
            email: {},
            city: {},
            role: {},
            skills: [],
            errors: []
        }
        await wrapper.setData({ newTeammate: emptyTeammate })

        expect(wrapper.vm.submitDisabled)
            .toBeTruthy();
        expect(wrapper
            .find('button.ui.button:nth-of-type(1)')
            .attributes('disabled'))
            .toBeDefined();
    })

    it('does not insert the teammate if email is invalid', async () => {
        teammate.email.value = 'bad email'
        await wrapper.setData({
            newTeammate: teammate
        })

        wrapper.find('button.ui.button:nth-of-type(1)').trigger('click');
        await wrapper.vm.$nextTick();

        expect(spyInsertTeammate)
            .toHaveBeenCalledTimes(0);
    })

    it('does not update the teammate if email is invalid', async () => {
        teammate.id = 1;
        teammate.email.value = 'bad email'
        await wrapper.setData({
            newTeammate: teammate
        })

        wrapper.find('button.ui.button:nth-of-type(1)').trigger('click');
        await wrapper.vm.$nextTick();

        expect(spyUpdateTeammate)
            .toHaveBeenCalledTimes(0);
    })

    it('does not insert the teammate if name is invalid', async () => {
        teammate.name.value = '1bad name1'
        await wrapper.setData({
            newTeammate: teammate
        })

        wrapper.find('button.ui.button:nth-of-type(1)').trigger('click');
        await wrapper.vm.$nextTick();

        expect(spyInsertTeammate)
            .toHaveBeenCalledTimes(0);
    })

    it('does not update the teammate if name is invalid', async () => {
        teammate.name.value = '1bad name1'
        await wrapper.setData({
            newTeammate: teammate
        })

        wrapper.find('button.ui.button:nth-of-type(1)').trigger('click');
        await wrapper.vm.$nextTick();

        expect(spyUpdateTeammate)
            .toHaveBeenCalledTimes(0);
    })

    it('does not insert the teammate if city is invalid', async () => {
        teammate.name.value = '1bad city1'
        await wrapper.setData({
            newTeammate: teammate
        })

        wrapper.find('button.ui.button:nth-of-type(1)').trigger('click');
        await wrapper.vm.$nextTick();

        expect(spyInsertTeammate)
            .toHaveBeenCalledTimes(0);
    })

    it('does not update the teammate if city is invalid', async () => {
        teammate.name.value = '1bad city1'
        await wrapper.setData({
            newTeammate: teammate
        })

        wrapper.find('button.ui.button:nth-of-type(1)').trigger('click');
        await wrapper.vm.$nextTick();

        expect(spyUpdateTeammate)
            .toHaveBeenCalledTimes(0);
    })
})
