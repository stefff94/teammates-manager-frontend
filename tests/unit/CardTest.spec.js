import { shallowMount } from "@vue/test-utils";
import Card from "../../src/components/Card";
import CardBack from "../../src/components/CardBack";
import CardFront from "../../src/components/CardFront";

let wrapper = null;

// shallowMount method auto stubs child components of mounted component
// in our case it automatically stubs CardBack and CardFront component
beforeEach(() => {
    wrapper = shallowMount(Card, {
        propsData: {
            person: {
                personalData: {},
                skills: [],
                id: 1
            }
        }
    });
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

    it("renders the card front", () => {
        expect(wrapper.find(CardFront).exists())
            .toBeTruthy();

        expect(wrapper.find(CardFront).props("data"))
            .toBe(wrapper.vm.person.personalData);
    });

    it("renders the card back", () => {
        expect(wrapper.find(CardBack).exists())
            .toBeTruthy();

        expect(wrapper.find(CardBack).props("skills"))
            .toBe(wrapper.vm.person.skills);

        expect(wrapper.find(CardBack).props("id"))
            .toBe(wrapper.vm.person.id);
    });

});
