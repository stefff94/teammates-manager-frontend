import { shallowMount } from "@vue/test-utils";
import TagMultiselect from "../../../src/components/TagMultiselect";
import Multiselect from "vue-multiselect";

let wrapper = null;

beforeEach(() => {
    wrapper = shallowMount(TagMultiselect, {
        propsData: {
            options: []
        }
    });
})

afterEach(() => {
    wrapper.destroy();
})

describe("TagMultiselect.vue", () => {
    it('renders the multiselect', () => {
        expect(wrapper.findComponent(Multiselect)
            .exists())
            .toBeTruthy();
    })
})
