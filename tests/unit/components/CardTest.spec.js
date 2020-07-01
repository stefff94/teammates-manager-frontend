import { shallowMount } from "@vue/test-utils";
import Card from "../../../src/components/Card";
import CardBack from "../../../src/components/CardBack";
import CardFront from "../../../src/components/CardFront";

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
            .find(".flip-card .flip-card-inner.text-left")
            .exists())
            .toBeTruthy();
    });

    it("renders the card front", () => {
        const cardFrontComponent =
            wrapper.findComponent(CardFront);

        expect(cardFrontComponent.exists())
            .toBeTruthy();

        expect(cardFrontComponent.props("data"))
            .toBe(wrapper.vm.person.personalData);
    });

    it("renders the card back", () => {
        const cardBackComponent =
            wrapper.findComponent(CardBack);
        
        expect(cardBackComponent.exists())
            .toBeTruthy();

        expect(cardBackComponent.props("skills"))
            .toBe(wrapper.vm.person.skills);

        expect(cardBackComponent.props("id"))
            .toBe(wrapper.vm.person.id);
    });

});
