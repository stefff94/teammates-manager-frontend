import { shallowMount } from '@vue/test-utils'
import App from "../../src/App";

let wrapper = null;

beforeEach(() => {
    wrapper = shallowMount(App);
});

describe('App.vue', () => {
    it('renders the divider', () => {
        expect(wrapper.find(".ui.divider"))
    })
});
