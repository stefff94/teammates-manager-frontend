import { shallowMount } from "@vue/test-utils";
import Card from "../../src/components/Card";

let wrapper = null;

beforeEach(() => {
    wrapper = shallowMount(Card);
});

afterEach(() => {
    wrapper.destroy();
});

describe("Card.vue", () => {

    it("renders the flip card", () => {
        expect(wrapper
            .find(".flip-card .flip-card-inner")
            .exists())
            .toBeTruthy();
    });

});
