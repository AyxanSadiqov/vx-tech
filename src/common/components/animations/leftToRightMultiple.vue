<template>
  <transition-group
    mode="out-in"
    appear
    @before-enter="beforeEnter"
    @enter="enter"
  >
    <slot name="main"></slot>
  </transition-group>
</template>

<script>
import gsap from "gsap";

export default {
  data() {
    return {
      each: 0,
    }
  },
  methods: {
    beforeEnter(el) {
      el.style.transform = "translateX(-100vh)";
    },
    enter(el, done) {
      this.each += 0.25
      gsap.to(el, {
        duration: this.each,
        opacity: 1,
        translateX: "0vh",
        ease: "power4.inOut",
        onComplete: done,
      });
    },
  },
};
</script>

<style>
</style>