import { shallowMount } from '@vue/test-utils'
import App from "../../src/App";
import Card from "../../src/components/Card";

let wrapper = null;
let teammates = [];

beforeEach(() => {

    teammates = [
        {
            id: 1,
            personalData: {
                photoUrl: "/images/avatar/large/steve.jpg",
                name: "Stefano Vannucchi",
                role: "Student",
                email: "stefano.vannucchi@stud.unifi.it",
                city: "Prato"
            },
            skills: [
                { id: "1", name: "Java" },
                { id: "2", name: "Spring Boot" },
                { id: "3", name: "Javascript" },
                { id: "4", name: "Vue js" }
            ],
        },
        {
            id: 2,
            personalData: {
                photoUrl: "/images/avatar/large/matthew.jpg",
                name: "Paolo Innocenti",
                role: "Student",
                email: "paolo.innocenti@stud.unifi.it",
                city: "Pistoia"
            },
            skills: [
                { id: "1", name: "Java" },
                { id: "2", name: "Spring Boot" },
                { id: "3", name: "Javascript" },
                { id: "4", name: "Vue js" }
            ],
        }
    ]

    wrapper = shallowMount(App, {
        data: () => {
            return {
                teammates: teammates
            }
        }
    });

});

describe("App.vue", () => {

    it("renders the divider", () => {
        expect(wrapper.find(".ui.divider"));
    });

    it("renders the teammates list title", () => {
        const element = wrapper.find(".ui.center.aligned.icon.header");

        expect(element
            .find(".circular.users.icon")
            .exists())
            .toBeTruthy();

        expect(element.text())
            .toMatch("Teammates");

    });

    it("renders the card's grid", () => {
        expect(wrapper
            .find(".ui.three.column.stackable.grid.mt35")
            .exists())
            .toBeTruthy();
    });

    it("renders the cards", () => {
        const cards = wrapper.findAllComponents(Card);

        expect(cards.length)
            .toBe(wrapper.vm.teammates.length);

        cards.wrappers.forEach(card => {
            expect(card.classes("column"))
                .toBeTruthy();

            expect(card.attributes("style"))
                .toMatch("margin-bottom: 20px");

            expect(wrapper.vm.teammates)
                .toContain(card.props("person"));
        });
    });

});
