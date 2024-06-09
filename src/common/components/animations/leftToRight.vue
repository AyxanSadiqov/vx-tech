<template>
  <transition
    mode="out-in"
    appear
    @before-enter="beforeEnter"
    @enter="enter"
    @before-leave="beforeLeave"
    @leave="leave"
  >
    <slot name="main"></slot>
  </transition>
</template>

<script>
import gsap from "gsap";

export default {
  methods: {
    beforeEnter(el) {
      el.style.transform = "translateX(-100vh)";
    },
    enter(el, done) {
      gsap.to(el, {
        duration: 1,
        opacity: 1,
        translateX: "0vh",
        ease: "power4.inOut",
        onComplete: done,
      });
    },
    beforeLeave(el) {
      el.style.transform = "translateX(0vh)";
    },
    leave(el, done) {
      gsap.to(el, {
        duration: 1,
        opacity: 1,
        translateX: "100vh",
        ease: "power4.inOut",
        onComplete: done,
      });
    },
  },
};
</script>

<style>
</style>