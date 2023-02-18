import { setActivePinia, createPinia } from "pinia";
import useUserStore from "@/stores/user";

vi.mock("@/includes/firebase", () => ({
  auth: {
    signInWithEmailAndPassword: () => Promise.resolve,
  },
}));

describe("stores", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  test("not logged user", async () => {
    const store = useUserStore();
    console.log(store.userLoggedIn);

    expect(store.userLoggedIn).toBeFalsy();
  }),
    test("authenticates user", async () => {
      const store = useUserStore();
      console.log(store.userLoggedIn);

      expect(store.userLoggedIn).toBeFalsy();

      await store.authenticate({});
      expect(store.userLoggedIn).toBe(true);
    });
});
