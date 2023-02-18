import About from "@/views/AboutView.vue";
import { shallowMount } from "@vue/test-utils";

describe("about.vue", () => {
  test("renders inner text", () => {
    const wrapper = shallowMount(About);

    expect(wrapper.text()).toContain("about");
  });
});
