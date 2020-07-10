import { shallowMount } from '@vue/test-utils'
import App from "../../src/App";
import PersonalDataForm from "../../src/components/PersonalDataForm";

let wrapper = null;
let teammate = null;


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
        }
    }

    wrapper = shallowMount(App);
});

describe('App.vue', () => {
    it('renders the divider', () => {
        expect(wrapper
            .find(".ui.divider")
            .exists())
            .toBeTruthy();
    })

    it('renders the PersonalDataForm', () => {
        wrapper.setData({newTeammate: teammate})
        const personalDataForm = wrapper.findComponent(PersonalDataForm);

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

});
