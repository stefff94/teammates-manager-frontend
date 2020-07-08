import { mount } from "@vue/test-utils";
import App from "../../src/App";
import Card from "../../src/components/Card";

let wrapper = null;
let teammates = null;

beforeEach(() => {
    let skills = [
        { id: "1", name: "Java" },
        { id: "2", name: "Spring Boot" },
        { id: "3", name: "Javascript" },
        { id: "4", name: "Vue js" }
    ];

    teammates = [
        {
            id: 1,
            personalData: {
                photoUrl: "/images/avatar/large/steve.jpg",
                name: "Stefano Vannucchi",
                role: "Student",
                email: "stefano.vannucchi@stud.unifi.it",
                city: "Prato",
                gender: "M"
            },
            skills: skills
        },
        {
            id: 2,
            personalData: {
                photoUrl: "/images/avatar/large/matthew.jpg",
                name: "Paolo Innocenti",
                role: "Student",
                email: "paolo.innocenti@stud.unifi.it",
                city: "Pistoia",
                gender: "M"
            },
            skills: skills,
        }
    ];
});

describe("App.vue", () => {

    beforeEach(() => {
        // mount method mounts automatically also child components
        wrapper = mount(App, {
            data: () => {
                return {
                    teammates: teammates
                }
            }
        });
    });

    it("renders the Cards components correctly", () => {
        const cards = wrapper.findAllComponents(Card);

        cards.wrappers.forEach(card => {
            expect(teammates)
                .toContain(card.vm.person);
        });
    });

});
