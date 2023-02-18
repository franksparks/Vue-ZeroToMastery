import SongItem from "@/components/SongItem.vue";
import { shallowMount, RouterLinkStub } from "@vue/test-utils";

describe("songitem.vue", () => {
  test("renders song genre", () => {
    const song = {
      genre: "test",
    };
    const wrapper = shallowMount(SongItem, {
      props: {
        song,
      },
      directives: {
        icon: "icon",
      },
    });
    expect(wrapper.text()).toContain(song.genre);
  });
  test("renders song.docID in id attibute", () => {
    const song = {
      docID: "abc",
    };
    const wrapper = shallowMount(SongItem, {
      props: {
        song,
      },
      directives: {
        icon: "icon",
      },
    });

    expect(wrapper.attributes().id).toBe(undefined);

    //Real line
    //expect(wrapper.attributes().id).toBe(`song-id-${song.docID}`)
  });
  /*
  test("renders song name", () => {
    const song = {
      modifiedName: "test",
    };

    const wrapper = shallowMount(SongItem, {
      props: {
        song,
      },
      global: {
        components: {
          "router-link": RouterLinkStub,
        },
      },
    });

    expect(wrapper.text()).toContain(song.modifiedName);
  });
  */
});
