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
        wrapper.setData({
            skills: skills,
            newTeammate: teammate
        })
        await wrapper.vm.$forceUpdate();
        const tagMultiselect = wrapper.findComponent(TagMultiselect);

        expect(wrapper
            .find('.mt35.mb35')
            .exists())
            .toBeTruthy()
        expect(tagMultiselect
            .exists())
            .toBeTruthy()
        expect(tagMultiselect.props('teammate'))
            .toBe(wrapper.vm.$data.newTeammate);
        expect(tagMultiselect.props('options'))
            .toBe(wrapper.vm.$data.skills)
    })

});
