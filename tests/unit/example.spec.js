import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

let wrapper = null;
const msg = "new message";

beforeEach(() => {
  wrapper = shallowMount(HelloWorld, {
    propsData: { msg }
  });
});

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    expect(wrapper.text()).toMatch(msg)
  })
});

describe("Test method", () => {

  beforeEach(() => {
    wrapper.vm.doSomething();
  });

  it("say hi", () => {
    expect(wrapper.emitted().greeting[0])
        .toEqual(["hi"]);
  });

});
