import { shallowMount } from "@vue/test-utils";
import CardBack from "@/components/CardBack";

let wrapper = null;

beforeEach(() => {
    wrapper = shallowMount(CardBack);
});

afterEach(() => {
    wrapper.destroy();
});

describe("CardBack.vue", () => {

   it("renders the card back", () => {
       expect(wrapper.find(".flip-card-back .ui.card .content"));
   });

});
