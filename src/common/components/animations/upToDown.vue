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
      console.log("before enter - set initial state");
      el.style.transform = "translateY(-100vh)";
    },
    enter(el, done) {
      console.log("starting to enter - make transition");
      gsap.to(el, {
        duration: 1,
        opacity: 1,
        translateY: "0vh",
        ease: "power4.inOut",
        onComplete: done,
      });
    },
    beforeLeave(el) {
      console.log("before leave");
      el.style.transform = "translateY(0vh)";
    },
    leave(el, done) {
      console.log("leave");
      gsap.to(el, {
        duration: 1,
        opacity: 1,
        translateY: "100vh",
        ease: "power4.inOut",
        onComplete: done,
      });
    },
  },
};
</script>

<style>
</style>