import { mount } from "@vue/test-utils";
import App from "../../src/App";
import Card from "../../src/components/Card";
import ApiService from "../../src/services/api.service";

let wrapper = null;
let teammates = null;
let newTeammate = null;

jest.mock("../../src/services/api.service");

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

    newTeammate = {
        name: {
            value: "Stefano Vannucchi"
        },
        gender: {
            value: "M"
        },
        email: {
            value: "stefano.vannucchi@stud.unifi.it"
        },
        city: {
            value: "Prato"
        },
        role: {
            value: "Student"
        },
        skills: [
            { id: "1", name: "Java" },
            { id: "2", name: "Spring Boot" },
            { id: "3", name: "Javascript" },
            { id: "4", name: "Vue js" }
        ]
    }
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

describe("The teammate is deleted", () => {

    beforeEach(() => {
        const resp = { data: teammates };

        ApiService.getAllTeammates.mockResolvedValue(resp);
        ApiService.deleteTeammate.mockResolvedValue(null);

        wrapper = mount(App, {
            data: () => {
                return {
                    teammates: []
                }
            }
        });
    });

    it("delete the teammate", async () => {
        const teammateToDelete = teammates[0].id;

        await wrapper.findAllComponents(Card).wrappers[0]
            .vm.deleteTeammate(teammateToDelete);

        expect(wrapper.vm.teammates
            .find(t => t.id === teammateToDelete))
            .toBeUndefined();
    });

});

describe("The teammate is being updated after performing the edit operation", () => {

    beforeEach(() => {
        const resp = { data: teammates };

        ApiService.getAllTeammates.mockResolvedValue(resp);

        wrapper = mount(App, {
            data: () => {
                return {
                    teammates: [],
                    newTeammate: {}
                }
            }
        });
    });

    it("it populates the newTeammate object", () => {
        const teammateToUpdate = teammates[0].id;

        wrapper.findAllComponents(Card).wrappers[0]
            .vm.updateTeammate(teammateToUpdate);

        expect(wrapper.vm.newTeammate)
            .toEqual(newTeammate);
    });

});
