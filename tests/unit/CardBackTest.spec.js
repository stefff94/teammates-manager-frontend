import { shallowMount } from "@vue/test-utils";
import CardBack from "../../src/components/CardBack";

let wrapper = null;

beforeEach(() => {
    wrapper = shallowMount(CardBack);
});

afterEach(() => {
    wrapper.destroy();
});

describe("CardBack.vue", () => {

   it("renders the card back", () => {
       expect(wrapper.find(".flip-card-back .ui.card .content")
           .exists())
           .toBeTruthy();
   });

   it("renders the delete icon button", () => {
       expect(wrapper.find(".content .delete.right.floated.large.x.icon")
           .exists())
           .toBeTruthy();
   });

});
