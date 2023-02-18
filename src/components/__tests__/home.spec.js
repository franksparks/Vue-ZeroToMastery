import Home from "@/views/HomeView.vue";
import SongItem from "@/components/SongItem.vue";
import { shallowMount } from "@vue/test-utils";
import { expect } from "vitest";

describe("Home.vue", () => {
  test("renders list of songs", () => {
    const songs = [{}, {}, {}];

    const component = shallowMount(Home, {
      data() {
        return {
          songs,
        };
      },
      global: {
        mocks: {
          $t: (message) => message,
        },
        directives: {
          icon: "icon",
        },
      },
    });
    const items = component.findAllComponents(SongItem);

    expect(items).toHaveLength(songs.length);
  });
  test("checks songs order", () => {
    const songs = [{}, {}, {}];

    const component = shallowMount(Home, {
      data() {
        return {
          songs,
        };
      },
      global: {
        mocks: {
          $t: (message) => message,
        },
        directives: {
          icon: "icon",
        },
      },
    });
    const items = component.findAllComponents(SongItem);

    items.forEach((wrapper, i) => {
      expect(wrapper.props().song).toStrictEqual(songs[i]);
    });
  });
});
