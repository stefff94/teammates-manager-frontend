import { shallowMount } from '@vue/test-utils'
import PersonalDataForm from "../../../src/components/PersonalDataForm";

let wrapper = null;

beforeEach(() => {
    wrapper = shallowMount(PersonalDataForm);
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
        const header = wrapper.find("h3.ui.dividing.header");
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

})
