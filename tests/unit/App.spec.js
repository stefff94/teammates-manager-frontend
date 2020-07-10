import { shallowMount } from '@vue/test-utils'
import App from "../../src/App";
import PersonalDataForm from "../../src/components/PersonalDataForm";

import jQuery from 'jquery'
import $ from 'jquery'
import TagMultiselect from "../../src/components/TagMultiselect";
global.jQuery = jQuery
global.$ = $
require('fomantic-ui/dist/semantic.min.js')

let wrapper = null;
let teammate = null;
let skills = null;

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
        errors: [
            'error1',
            'error2'
        ]
    }

    skills = [
        {code: 'sk1', name: 'skill1'},
        {code: 'sk2', name: 'skill2'}
    ]

    wrapper = shallowMount(App);
});

describe('App.vue', () => {

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
