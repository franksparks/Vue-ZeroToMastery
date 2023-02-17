import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure,
} from "vee-validate";
import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  min_value as minVal,
  max_value as maxVal,
  confirmed,
  not_one_of as excluded,
} from "@vee-validate/rules";

export default {
  install(app) {
    app.component("VeeForm", VeeForm);
    app.component("VeeField", VeeField);
    app.component("ErrorMessage", ErrorMessage);

    defineRule("required", required);
    defineRule("minimum", min);
    defineRule("maximum", max);
    defineRule("alpha_spaces", alphaSpaces);
    defineRule("email", email);
    defineRule("min_val", minVal);
    defineRule("max_val", maxVal);
    defineRule("passwords_mismatch", confirmed);
    defineRule("excluded", excluded);
    defineRule("country_excluded", excluded);
    defineRule("role_excluded", excluded);
    defineRule("tos", required);
    defineRule("password", required);

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `The field ${ctx.field} is required`,
          minimum: `The field ${ctx.field} is not long enough`,
          maximum: `The field ${ctx.field} is too long`,
          alpha_spaces: `The field ${ctx.field} may contain only characters and numbers`,
          email: `The field ${ctx.field} does not contain an email`,
          minVal: `The field ${ctx.field} is too low`,
          maxVal: `The field ${ctx.field} is too high`,
          excluded: `You cannot use that value for ${ctx.field}`,
          role_excluded: `You cannot use that value for ${ctx.field}`,
          country_excluded: `You cannot use that value for ${ctx.field}`,
          passwords_mismatch: `The passwords not match`,
          tos: `You must accept the terms of service`,
          password: `Please provide your password`,
        };
        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The field ${ctx.field} is invalid`;

        return message;
      },
      validateOnBlur: true,
      validateOnInput: true,
    });
  },
};
