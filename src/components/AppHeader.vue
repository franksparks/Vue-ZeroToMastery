<template>
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <RouterLink
        class="text-white font-bold uppercase text-2xl mr-4"
        :to="{ name: 'home' }"
        exact-active-class="no-active"
      >
        Music
      </RouterLink>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <li>
            <RouterLink class="px-2 text-white" :to="{ name: 'about' }">
              {{ $t("header.about") }}
            </RouterLink>
          </li>
          <!-- Navigation Links -->
          <li v-if="!this.userStore.userLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal"
              >{{ $t("header.login") }} / {{ $t("header.register") }}</a
            >
          </li>
          <template v-else>
            <li>
              <a class="px-2 text-white" href="#" @click.prevent="signOut()">{{
                $t("header.logout")
              }}</a>
            </li>
            <li>
              <RouterLink class="px-2 text-white" :to="{ name: 'manage' }">{{
                $t("header.manage")
              }}</RouterLink>
            </li>
          </template>
        </ul>
        <ul class="ml-auto">
          <li>
            <select
              v-model="this.$i18n.locale"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            >
              <option value="en">English</option>
              <option value="es">Castellano</option>
              <option value="cat">Català</option>
            </select>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapStores } from "pinia";
import useModalStore from "../stores/modal";
import useUserStore from "../stores/user";

export default {
  name: "AppHeader",
  computed: {
    ...mapStores(useModalStore, useUserStore),

    //...mapWritableState(useModalStore, ["isOpen"]),
  },
  methods: {
    //...mapActions(useUserStore, ["signOut"]),
    toggleAuthModal() {
      this.modalStore.isOpen = !this.modalStore.isOpen;
      //this.isOpen = !this.isOpen;
    },
    signOut() {
      this.userStore.signOut();
      //console.log(this.$route);
      //if (this.$route.name === "manage") {
      if (this.$router.meta.requiresAuth) {
        this.$router.push({ name: "home" });
      }
    },
  },
};
</script>
