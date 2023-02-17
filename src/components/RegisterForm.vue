<template>
  <div
    class="text-white text-center font-bold p-4 rouded mb-4"
    v-if="reg_show_alert"
    :class="reg_alert_variant"
  >
    {{ reg_alert_msg }}
  </div>
  <VeeForm
    :validation-schema="registerSchema"
    @submit="register"
    :initial-values="userData"
  >
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t("register.name") }}</label>
      <VeeField
        name="name"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
      <ErrorMessage class="text-red-600" name="name" />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t("register.email") }}</label>
      <VeeField
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t("register.age") }}</label>
      <VeeField
        name="age"
        type="number"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <ErrorMessage class="text-red-600" name="age" />
    </div>
    <!-- Role -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t("register.role") }}</label>
      <VeeField
        as="select"
        name="role"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="Admin">{{ $t("register.admin") }}</option>
        <option value="Listener">{{ $t("register.listener") }}</option>
        <option value="Musician">{{ $t("register.musician") }}</option>
        <option value="Producer">{{ $t("register.producer") }}</option>
      </VeeField>
      <ErrorMessage class="text-red-600" name="role" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t("register.password") }}</label>
      <VeeField name="password" :bails="false" v-slot="{ field, errors }">
        <input
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          type="password"
          placeholder="Password"
          v-bind="field"
        />
        <div class="text-red-600" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </VeeField>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{
        $t("register.passwordConfirmation")
      }}</label>
      <VeeField
        name="passwordConfirmation"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <ErrorMessage class="text-red-600" name="passwordConfirmation" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t("register.country") }}</label>
      <VeeField
        as="select"
        name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Andorra">Andorra</option>
      </VeeField>
      <ErrorMessage class="text-red-600" name="country" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <VeeField
        value="1"
        name="tos"
        type="checkbox"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
      />
      <i18n-t class="inline-block" keypath="register.accept" tag="label"
        ><a href="#">{{ $t("register.tos") }}</a>
      </i18n-t>
      <ErrorMessage class="text-red-600" name="tos" />
    </div>

    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="reg_in_submission"
    >
      {{ $t("register.submit") }}
    </button>
  </VeeForm>
</template>

<script>
import { ErrorMessage } from "vee-validate";
import { mapState, mapWritableState, mapActions } from "pinia";
import useModalStore from "../stores/modal";
import useUserStore from "../stores/user";

export default {
  name: "RegisterForm",
  components: { ErrorMessage },
  data() {
    return {
      registerSchema: {
        name: "required|minimum:3|maximum:100|alpha_spaces",
        email: "required|minimum:3|maximum:100|email",
        age: "required|min_val:18|max_val:99",
        role: "required|role_excluded:Admin",
        password: "required|minimum:3|maximum:10|excluded:password",
        passwordConfirmation: "passwords_mismatch:@password",
        country: "required|country_excluded:Andorra",
        tos: "tos",
      },
      userData: {
        country: "USA",
        role: "Listener",
      },
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_variant: "bg-blue-500",
      reg_alert_msg: "Please wait, your account is being created. ",
    };
  },
  computed: {
    ...mapState(useModalStore, ["hiddenClass"]),
    ...mapWritableState(useModalStore, {
      modalVisibility: "isOpen",
    }),
  },
  methods: {
    ...mapActions(useUserStore, {
      createUser: "register",
    }),
    async register(values) {
      this.reg_show_alert = true;
      this.reg_in_submission = true;
      this.reg_alert_variant = "bg-blue-500";
      this.reg_alert_msg = "Please wait, your account is being created. ";

      try {
        await this.createUser(values);
      } catch (error) {
        this.reg_in_submission = false;
        this.reg_alert_variant = "bg-red-500";
        this.reg_alert_msg = "An unexpected error occurred.";
        console.log(error);
        return;
      }

      this.reg_alert_variant = "bg-green-500";
      this.reg_alert_msg = "Sucess, your account has been created. ";
      this.modalVisibility = false;
      this.reg_show_alert = false;
      this.reg_in_submission = false;
      //TODO -- Clean form as well!
      //window.location.reload();
    },
  },
};
</script>
