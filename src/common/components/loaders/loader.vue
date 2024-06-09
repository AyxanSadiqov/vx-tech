<template>
  <transition leave-to-class="opacity-0" enter-class="opacity-0">
    <div
      class="container absolute flex justify-center items-center text-center w-full h-full flex gap-3 z-10"
    >
      <div v-for="i in 3" :key="i.id" class="box" :class="loaderClasses"></div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    loaderClasses() {
      let classes = "";
      if (this.size == 1) classes = "w-5 h-5";
      else if (this.size == 2) classes = "w-10 h-10";
      else classes = "w-13 h-13";
      return classes;
    },
  },
};
</script>

<style scoped>
.container {
  backdrop-filter: blur(5px);
  background: rgba(255, 255, 255, 0.6);
  width: 100% !important;
  min-width: 100% !important;
  max-width: 100% !important;
  /* z-index: 1000; */
}
.box {
  color: #00136c;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s ease-in-out;
}

.box:first-child {
  background-color: #c555ac;
  animation: loader 2s infinite;
}

.box:nth-child(2) {
  background-color: #1c7bff;
  animation: loader 3s infinite;
}

.box:last-child {
  background-color: #2c2c2c;
  animation: loader 4s infinite;
}

@keyframes loader {
  0% {
    rotate: 0deg;
  }
  25% {
    rotate: y 90deg;
    scale: 0.5;
  }
  50% {
    rotate: 180deg;
  }
  75% {
    rotate: x 270deg;
    border-radius: 50%;
  }
  100% {
    rotate: 360deg;
  }
}

@supports not (rotate: 0deg) {
  @keyframes loader {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: scale(0.5) rotateY(90deg);
    }
    50% {
      transfrom: rotate(180deg);
    }
    75% {
      transform: rotateX(270deg);
      border-radius: 50%;
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>