import { shallowMount } from "@vue/test-utils";
import CardFront from "../../src/components/CardFront";

let wrapper = null;

beforeEach(() => {
    wrapper = shallowMount(CardFront);
});

afterEach(() => {
    wrapper.destroy();
});

describe("CardFront.vue", () => {

    it("renders the card front", () => {
        expect(wrapper
            .find(".flip-card-front .ui.card .content")
            .exists())
            .toBeTruthy();
    });

});
