import { shallowMount } from "@vue/test-utils";
import CardBack from "../../../src/components/CardBack";

let wrapper = null;

beforeEach(() => {
    wrapper = shallowMount(CardBack, {
        propsData: {
            skills: [
                { id: "1", name: "Java" },
                { id: "2", name: "Spring Boot" },
                { id: "3", name: "Javascript" },
                { id: "4", name: "Vue js" }
            ],
            id: 1
        }
    });
});

afterEach(() => {
    wrapper.destroy();
});

describe("CardBack.vue", () => {

   it("renders the card back", () => {
       expect(wrapper
           .find(".flip-card-back .ui.card .content")
           .exists())
           .toBeTruthy();
   });

   it("renders the delete icon button", () => {
       expect(wrapper
           .find(".content .delete.right.floated.large.x.icon")
           .exists())
           .toBeTruthy();
   });

   it("renders the header", () => {
       const header = wrapper.find(".content .header.text-center");

       expect(header.exists())
           .toBeTruthy();

       expect(header.text())
           .toMatch("Skills");
   });

   it("renders the content", () => {
      expect(wrapper
          .find(".content .description.mt30")
          .exists())
          .toBeTruthy();
   });

   it("renders the items", () => {
       const items = wrapper
           .findAll(".description .ui.bulletted.list .item");

       expect(items.length)
           .toBe(wrapper.vm.skills.length);

       items.wrappers.forEach(skill =>
           expect(wrapper.vm.skills.map(s => s.name))
               .toContain(skill.text())
       );
   });

});
