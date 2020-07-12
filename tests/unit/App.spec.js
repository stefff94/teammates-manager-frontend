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
let newTeammate = null;
let skills = null;

jest.mock('../../src/services/api.service');

beforeEach(() => {
    skills = [
        {code: 'sk1', name: 'skill1'},
        {code: 'sk2', name: 'skill2'}
    ]

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

})

describe('App.vue', () => {

    beforeEach(() => {
        newTeammate = {
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
        wrapper.setData({newTeammate: newTeammate})
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
            newTeammate: newTeammate
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
        newTeammate.errors.push('error1');
        newTeammate.errors.push('error2');
        await wrapper.setData({newTeammate: newTeammate});
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
    let spyResetSelects = null;

    beforeEach( () => {
        newTeammate = {
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

        spyResetSelects = jest.spyOn(App.methods, 'resetSelects');

        wrapper = shallowMount(App);
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

        await wrapper.setData({newTeammate: newTeammate});
        const resetButton = wrapper.find('button.ui.button:nth-of-type(2)');
        resetButton.trigger('click');

        expect(wrapper.vm.$data.newTeammate)
            .toStrictEqual(emptyTeammate);
        expect(spyResetSelects)
            .toHaveBeenCalled();
    })
})

describe('the teammate is inserted and the view is updated', () => {

    let spyHandleTeammate = null;
    let spyInsertTeammate = null;
    let spyApiInsertTeammate = null;
    let spyUpdateViewAfterInsert = null;
    let spyClearNewTeammate = null;
    let spyGetSkillsAndUpdateView = null;

    beforeEach(() => {
        newTeammate = {
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

        spyHandleTeammate = jest.spyOn(App.methods, 'handleTeammate');
        spyInsertTeammate = jest.spyOn(App.methods, 'insertTeammate');
        spyUpdateViewAfterInsert = jest.spyOn(App.methods, 'updateViewAfterInsert');
        spyApiInsertTeammate = jest.spyOn(ApiService, "insertTeammate");
        spyClearNewTeammate = jest.spyOn(App.methods, 'clearNewTeammate');
        spyGetSkillsAndUpdateView = jest.spyOn(App.methods, 'getSkillsAndUpdateView');

        const mockMath = Object.create(global.Math)
        mockMath.random = () => 0.9;
        global.Math = mockMath;

        wrapper = shallowMount(App);

        spyGetSkillsAndUpdateView.mockClear(); // Resets the spy so that it's not counting the mounted call
    })

    it('enables submit if teammate is valid', async () => {
        await wrapper.setData({
            newTeammate: newTeammate
        })

        expect(wrapper.vm.submitDisabled)
            .toBeFalsy();
        expect(wrapper
            .find('button.ui.button:nth-of-type(1)')
            .attributes('disabled'))
            .toBeUndefined();
    })

    it('does not trigger insertTeammate if the teammate has an id', async () => {
        newTeammate.id = 1;
        await wrapper.setData({
            newTeammate: newTeammate
        })

        wrapper.find('button.ui.button:nth-of-type(1)').trigger('click');
        await wrapper.vm.$nextTick();

        expect(spyHandleTeammate)
            .toHaveBeenCalledTimes(1);
        expect(spyInsertTeammate)
            .toHaveBeenCalledTimes(0);
    })

    it('triggers the handleTeammate and insertTeammate methods if the teammate is valid and has no id', async () => {
        await wrapper.setData({
            newTeammate: newTeammate
        })

        wrapper.find('button.ui.button:nth-of-type(1)').trigger('click');
        await wrapper.vm.$nextTick();

        expect(spyHandleTeammate)
            .toHaveBeenCalledTimes(1);
        expect(spyInsertTeammate)
            .toHaveBeenCalledTimes(1);
    })

    it('inserts the teammate if the teammate is valid and has no id', async () => {

        await wrapper.setData({
            newTeammate: newTeammate
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
                name: newTeammate.name.value,
                role: wrapper.vm.$data.roles.find(r => {
                    return r.id === newTeammate.role.value
                }).name,
                gender: newTeammate.gender.value,
                photoUrl: avatarBaseUrl
                    + wrapper.vm.$data.avatars[newTeammate.gender.value][2]
                ,
                email: newTeammate.email.value,
                city: newTeammate.city.value
            },
            skills: newTeammate.skills
        }

        await wrapper.setData({
            newTeammate: newTeammate
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

        expect(wrapper.vm.skills)
            .toContainEqual(skill1);
        expect(wrapper.vm.skills)
            .toContainEqual(skill2);
    })
})


describe('the teammate is updated and the view is updated accordingly', () => {

    let spyHandleTeammate = null;
    let spyUpdateTeammate = null;
    let spyApiUpdateTeammate = null;
    let spyUpdateViewAfterUpdate = null;
    let spyClearNewTeammate = null;
    let spyGetSkillsAndUpdateView = null;

    beforeEach(() => {
        newTeammate = {
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

        spyHandleTeammate = jest.spyOn(App.methods, 'handleTeammate');
        spyUpdateTeammate = jest.spyOn(App.methods, 'updateTeammate');
        spyApiUpdateTeammate = jest.spyOn(ApiService, 'updateTeammate');
        spyUpdateViewAfterUpdate = jest.spyOn(App.methods, 'updateViewAfterUpdate');
        spyClearNewTeammate = jest.spyOn(App.methods, 'clearNewTeammate');
        spyGetSkillsAndUpdateView = jest.spyOn(App.methods, 'getSkillsAndUpdateView');

        const mockMath = Object.create(global.Math)
        mockMath.random = () => 0.9;
        global.Math = mockMath;

        wrapper = shallowMount(App);

        spyGetSkillsAndUpdateView.mockClear(); // Resets the spy so that it's not counting the mounted call
    })

    it('enables submit if teammate is valid', async () => {
        await wrapper.setData({
            newTeammate: newTeammate
        })

        expect(wrapper.vm.submitDisabled)
            .toBeFalsy();
        expect(wrapper
            .find('button.ui.button:nth-of-type(1)')
            .attributes('disabled'))
            .toBeUndefined();
    })

    it('does not trigger updateTeammate if the teammate has no id', async () => {
        newTeammate.id = undefined;
        await wrapper.setData({
            newTeammate: newTeammate
        })

        wrapper.find('button.ui.button:nth-of-type(1)').trigger('click');
        await wrapper.vm.$nextTick();

        expect(spyHandleTeammate)
            .toHaveBeenCalledTimes(1);
        expect(spyUpdateTeammate)
            .toHaveBeenCalledTimes(0);
    })

    it('triggers the handleTeammate and updateTeammate methods if the teammate is valid and has an id', async () => {
        await wrapper.setData({
            newTeammate: newTeammate
        })

        wrapper.find('button.ui.button:nth-of-type(1)').trigger('click');
        await wrapper.vm.$nextTick();

        expect(spyHandleTeammate)
            .toHaveBeenCalledTimes(1);
        expect(spyUpdateTeammate)
            .toHaveBeenCalledTimes(1);
    })

    it('updates the teammate if the teammate is valid and has an id', async () => {
        await wrapper.setData({
            newTeammate: newTeammate
        })

        wrapper.vm.handleTeammate();
        await flushPromises();

        expect(spyUpdateTeammate)
            .toHaveBeenCalledTimes(1);
        expect(spyApiUpdateTeammate)
            .toHaveBeenCalledTimes(1);
    })

    it('updates the view after updating the teammate', async () => {
        newTeammate.id = undefined;
        await wrapper.setData({ newTeammate: newTeammate });
        wrapper.vm.insertTeammate(newTeammate);
        await flushPromises();
        const teammatesLength = wrapper.vm.teammates.length;

        newTeammate.id = 1;
        newTeammate.name.value = 'New Name';
        newTeammate.photoUrl = avatarBaseUrl
            + wrapper.vm.$data.avatars[newTeammate.gender.value][2];
        await wrapper.setData({
            newTeammate: newTeammate
        })
        const expectedTeammate = {
            id: 1,
            personalData: {
                name: newTeammate.name.value,
                role: wrapper.vm.$data.roles.find(r => {
                    return r.id === newTeammate.role.value
                }).name,
                gender: newTeammate.gender.value,
                photoUrl: avatarBaseUrl
                    + wrapper.vm.$data.avatars[newTeammate.gender.value][2]
                ,
                email: newTeammate.email.value,
                city: newTeammate.city.value
            },
            skills: newTeammate.skills
        }

        wrapper.vm.updateTeammate()
        await flushPromises();

        expect(spyUpdateViewAfterUpdate)
            .toHaveBeenCalledTimes(1);
        expect(wrapper.vm.teammates.length)
            .toBe(teammatesLength);
        expect(wrapper.vm.teammates)
            .toContainEqual(expectedTeammate);
        expect(spyClearNewTeammate)
            .toHaveBeenCalledTimes(2);
        expect(spyGetSkillsAndUpdateView)
            .toHaveBeenCalledTimes(2);
    })
})


describe('the teammate is not valid', () => {
    let spyInsertTeammate = null;
    let spyUpdateTeammate = null;

    beforeEach(() => {
        newTeammate = {
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

        spyInsertTeammate = jest.spyOn(App.methods, 'insertTeammate');
        spyUpdateTeammate = jest.spyOn(App.methods, 'updateTeammate');

        wrapper = shallowMount(App);
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
        newTeammate.email.value = 'bad email'
        await wrapper.setData({
            newTeammate: newTeammate
        })

        wrapper.find('button.ui.button:nth-of-type(1)').trigger('click');
        await wrapper.vm.$nextTick();

        expect(spyInsertTeammate)
            .toHaveBeenCalledTimes(0);
    })

    it('does not update the teammate if email is invalid', async () => {
        newTeammate.id = 1;
        newTeammate.email.value = 'bad email'
        await wrapper.setData({
            newTeammate: newTeammate
        })

        wrapper.find('button.ui.button:nth-of-type(1)').trigger('click');
        await wrapper.vm.$nextTick();

        expect(spyUpdateTeammate)
            .toHaveBeenCalledTimes(0);
    })

    it('does not insert the teammate if name is invalid', async () => {
        newTeammate.name.value = '1bad name1'
        await wrapper.setData({
            newTeammate: newTeammate
        })

        wrapper.find('button.ui.button:nth-of-type(1)').trigger('click');
        await wrapper.vm.$nextTick();

        expect(spyInsertTeammate)
            .toHaveBeenCalledTimes(0);
    })

    it('does not update the teammate if name is invalid', async () => {
        newTeammate.name.value = '1bad name1'
        await wrapper.setData({
            newTeammate: newTeammate
        })

        wrapper.find('button.ui.button:nth-of-type(1)').trigger('click');
        await wrapper.vm.$nextTick();

        expect(spyUpdateTeammate)
            .toHaveBeenCalledTimes(0);
    })

    it('does not insert the teammate if city is invalid', async () => {
        newTeammate.name.value = '1bad city1'
        await wrapper.setData({
            newTeammate: newTeammate
        })

        wrapper.find('button.ui.button:nth-of-type(1)').trigger('click');
        await wrapper.vm.$nextTick();

        expect(spyInsertTeammate)
            .toHaveBeenCalledTimes(0);
    })

    it('does not update the teammate if city is invalid', async () => {
        newTeammate.name.value = '1bad city1'
        await wrapper.setData({
            newTeammate: newTeammate
        })

        wrapper.find('button.ui.button:nth-of-type(1)').trigger('click');
        await wrapper.vm.$nextTick();

        expect(spyUpdateTeammate)
            .toHaveBeenCalledTimes(0);
    })
})

describe('The skills are loaded', () => {
    let spyGetSkillAndUpdateView = null;

    beforeEach(() => {
        const respGetSkills = [
            {id: 1, name: 'Java'},
            {id: 2, name: 'Vue js'}
        ]
        ApiService.getSkills.mockResolvedValue(respGetSkills);

        spyGetSkillAndUpdateView = jest.spyOn(App.methods, "getSkillsAndUpdateView");

        wrapper = shallowMount(App);
    })

    it('triggers the getSkillAndUpdateView method on mount', () => {
        expect(spyGetSkillAndUpdateView)
            .toHaveBeenCalledTimes(1);
    })



})

afterEach(() => {
    jest.clearAllMocks();
    wrapper.destroy();
})
