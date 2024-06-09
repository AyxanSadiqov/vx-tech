<template>
  <transition leave-to-class="opacity-0" enter-class="opacity-0">
    <div
      class="absolute flex flex-col justify-center items-center text-center gap-2 w-full h-full pointer-events-none transition-opacity"
      style="backdrop-filter:blur(5px);background:rgba(255,255,255,0.6)"
    >
      <div
        :class="['animate-spin rounded-full border-primary-400', spinClasses]"
        style="border-right-color:transparent"
      ></div>
      {{ title }}
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    size: {
      type: Number,
      default: 2
    }
  },
  computed: {
    spinClasses() {
      let classes = ""
      if (this.size == 1) classes = "border-3 w-5 h-5"
      else if (this.size == 2) classes = "border-6 w-10 h-10"
      else classes = "border-6 w-13 h-13"
      return classes
    }
  }
}
</script>

<style></style>
