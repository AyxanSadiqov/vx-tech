<template>
  <button
    @click="disabled ? null : $emit('click')"
    class="relative w-full rounded-full font-medium transition-all overflow-hidden"
    :disabled="disabled"
    :class="[buttonClass]"
    :style="disabled ? 'cursor: not-allowed;' : ''"
    :aria-label="text"
  >
    <span :class="textClass">{{ text }}</span>
    <loader v-if="loading" class="top-0" />
  </button>
</template>

<script>
import loader from "@/common/components/loaders/loader.vue";

export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "main",
    },
    size: {
      type: Number,
      default: 2,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    loader,
  },
  computed: {
    buttonClass() {
      let buttonClassString = [];

      if (this.type === "main") {
        buttonClassString.push("bg-dolgerBlue text-white");
        if (this.disabled) buttonClassString.push("opacity-30");
        else buttonClassString.push("hover:opacity-80");
      } else if (this.type === "white") {
        buttonClassString.push("bg-white text-dolgerBlue");
        if (this.disabled) buttonClassString.push("opacity-30");
        else buttonClassString.push("hover:opacity-80");
      } else if (this.type === "blue-bordered") {
        buttonClassString.push(
          "bg-white text-dolgerBlue border border-dolgerBlue"
        );
        if (this.disabled) buttonClassString.push("opacity-30");
        else buttonClassString.push("hover:bg-dolgerBlue hover:text-white");
      } else if (this.type === "gradient") {
        buttonClassString.push("gradient-button text-white");
        if (this.disabled) buttonClassString.push("opacity-30");
        else buttonClassString.push("");
      }

      if (this.size === 0.5) buttonClassString.push("h-8");
      else if (this.size === 1) buttonClassString.push("h-12");
      else if (this.size === 2) buttonClassString.push("h-14");
      else if (this.size === 3) buttonClassString.push("h-17.5");

      return buttonClassString;
    },
    textClass() {
      let textClass = [];

      if (this.size === 0.5) textClass.push("text-sm");
      else if (this.size === 1) textClass.push("text-base");
      else if (this.size === 2) textClass.push("text-base");
      else if (this.size === 3) textClass.push("text-base");

      return textClass;
    },
  },
};
</script>

<style scoped>
.gradient-button {
  background-image: linear-gradient(to right, #4a13f3, #00BCD4);
}
.gradient-button:hover {
  background-image: linear-gradient(to left, #E040FB, #00BCD4);
}
</style>