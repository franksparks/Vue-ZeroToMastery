import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import SongItem from "@/components/SongItem.vue";
import { expect } from "vitest";

describe("snapshot SongItem.vue", () => {
  test("renders correctly", () => {
    const song = {
      docID: "tabe",
      modifiedName: "test",
      displayName: "test",
      commentCount: 5,
    };

    const wrapper = shallowMount(SongItem, {
      props: { song },
      global: {
        components: {
          "router-link": RouterLinkStub,
        },
        directives: {
          icon: "icon",
        },
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
