import { shallowMount } from "@vue/test-utils";
import TagMultiselect from "../../../src/components/TagMultiselect";

let wrapper = null;

beforeEach(() => {
    wrapper = shallowMount(TagMultiselect);
})

afterEach(() => {
    wrapper.destroy();
})

describe("TagMultiselect.vue", () => {
    it('removes failure from travis as placeholder', () => {
        expect(wrapper.find('multiselect')
            .exists())
            .toBeTruthy();
    })
})
