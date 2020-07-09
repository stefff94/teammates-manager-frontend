import { shallowMount } from '@vue/test-utils'
import PersonalDataForm from "../../../src/components/PersonalDataForm";

let wrapper = null;

beforeEach(() => {
    wrapper = shallowMount(PersonalDataForm, {
        propsData:{
            teammate: {
                name: {},
                gender: {},
                email: {},
                city: {},
                role: {},
                skills: []
            },
            genders: [
                {'id': 'M', 'name': 'Male'},
                {'id': 'F', 'name': 'Female'}
                ]

        }
    });
})

afterEach(() => {
    wrapper.destroy();
})

describe("PersonalDataForm.vue", () => {

    it("renders the form", () => {
        expect(wrapper
            .find("form.ui.form")
            .exists())
            .toBeTruthy();
    })

    it("renders the header", () => {
        const header = wrapper.find("form .ui.dividing.header");
        expect(header
            .exists())
            .toBeTruthy();
        expect(header
            .text())
            .toMatch("Teammate Data")

    })

    it("renders the fields wrapper",  () => {
        expect(wrapper
            .find(".form .field")
            .exists())
            .toBeTruthy()
    })

    it("renders the label", () => {
        const label = wrapper.find(".form .field label")
        expect(label
            .exists())
            .toBeTruthy()
        expect(label
            .text())
            .toMatch("Personal Data");
    })

    it("renders the name input field", () => {
        const nameInputField = wrapper.find(".field:nth-of-type(1) input");

        expect(nameInputField
            .exists())
            .toBeTruthy();
        expect(nameInputField
            .attributes("type"))
            .toBe("text");
        expect(nameInputField
            .attributes("name"))
            .toBe("name");
        expect(nameInputField
            .attributes("placeholder"))
            .toBe("Name");
        expect(nameInputField
            .text())
            .toBe("");
    })

    it("renders the email input field", () => {
        const emailInputField = wrapper.find(".field:nth-of-type(2) input");

        expect(emailInputField
            .exists())
            .toBeTruthy();
        expect(emailInputField
            .attributes("type"))
            .toBe("text");
        expect(emailInputField
            .attributes("name"))
            .toBe("email");
        expect(emailInputField
            .attributes("placeholder"))
            .toBe("E-mail")
    })

    it("renders the gender dropdown select", () => {
        const genderSelectField = wrapper.find(".field:nth-of-type(3) select");

        expect(genderSelectField
            .exists())
            .toBeTruthy();
        expect(genderSelectField
            .attributes("class"))
            .toBe("ui selection dropdown");
        expect(genderSelectField
            .attributes("id"))
            .toBe("gender-dropdown");
        expect(genderSelectField
            .element
            .value)
            .toBe("");
        expect(wrapper.vm.teammate.gender.value)
            .toBeUndefined();
        expect(genderSelectField.findAll('option').length)
            .toBe(3);
    })


})
