export default {
  beforeMount(el, binding) {
    let iconClass = `fa fa-${binding.value} text-xl`;
    if (binding.arg === "full") {
      iconClass = binding.value;
    }
    if (binding.modifiers.right) {
      iconClass += " float-right";
    }
    if (binding.modifiers.green400) {
      iconClass += " text-green-400";
    }
    if (binding.modifiers.gray600) {
      iconClass += " text-gray-600";
    }

    el.innerHTML += `<i class="${iconClass}"></i>`;
  },
};
