<template>
  <div
    class="text-white text-center font-bold p-4 rouded mb-4"
    v-if="log_show_alert"
    :class="log_alert_variant"
  >
    {{ log_alert_msg }}
  </div>
  <VeeForm :validation-schema="loginSchema" @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2"> {{ $t("login.email") }} </label>
      <VeeField
        name="email"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2"> {{ $t("login.password") }} </label>
      <VeeField
        name="password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <ErrorMessage class="text-red-600" name="password" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="log_in_submission"
    >
      {{ $t("login.login") }}
    </button>
  </VeeForm>
</template>

<script>
import { ErrorMessage } from "vee-validate";
import { mapActions, mapWritableState, mapState } from "pinia";
import useModalStore from "../stores/modal";
import useUserStore from "../stores/user";
export default {
  name: "LoginForm",
  components: { ErrorMessage },
  data() {
    return {
      loginSchema: {
        email: "required|email",
        password: "required|password",
      },
      log_in_submission: false,
      log_show_alert: false,
      log_alert_variant: "bg-blue-500",
      log_alert_msg: "Please wait, you are being logged. ",
    };
  },
  computed: {
    ...mapState(useModalStore, ["hiddenClass"]),
    ...mapWritableState(useModalStore, {
      modalVisibility: "isOpen",
    }),
  },
  methods: {
    ...mapActions(useUserStore, ["authenticate"]),

    async login(values) {
      this.log_show_alert = true;
      this.log_in_submission = true;
      this.log_alert_variant = "bg-blue-500";
      this.log_alert_msg = "Please wait, we are checking your credentials. ";

      try {
        await this.authenticate(values);
      } catch (error) {
        this.log_in_submission = false;
        this.log_alert_variant = "bg-red-500";
        this.log_alert_msg = "Invalid login details";
        return;
      }

      this.log_alert_variant = "bg-green-500";
      this.log_alert_msg = "Success, you have been logged. ";
      this.modalVisibility = false;
      this.log_show_alert = false;
      this.log_in_submission = false;
      //TODO -- Clean form as well!
      //window.location.reload();
    },
  },
};
</script>
