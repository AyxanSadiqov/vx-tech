<template>
  <div class="confetti-time">
    <div v-for="i in 30" :key="i" class="confetti z-50"></div>
    <div class="fixed w-screen h-screen left-0 z-40" style="backdrop-filter: blur(3px)">
      <h1
        class="sweet-title sticky top-1/2 z-50"
      >
        <span data-text="TEBRİKLER">TEBRİKLER</span>
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    var elements = document.querySelectorAll(".confetti:nth-child(n)");
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.left = this.getRandomArbitrary(0, 90) + "%";
      elements[i].style.animationDelay = 0.1 * i + "s";
      elements[i].style.background = this.randomColors();
    }
  },
  methods: {
    getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    },
    randomColors() {
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      return "rgb(" + r + "," + g + "," + b + ")";
    },
  },
};
</script>

<style scoped>
.confetti {
  position: fixed;
  top: -3rem;
  width: 3rem;
  height: 3rem;
  -webkit-animation: confettiRotation 1.5s ease-in;
  -moz-animation: confettiRotation 1.5s ease-in;
  animation: confettiRotation 1.5s ease-in;
}

@-webkit-keyframes confettiRotation {
  0% {
    -webkit-transform: translate3d(0, 0, 0), skew(30deg) rotateX(0) rotateY(0);
  }
  100% {
    -webkit-transform: translate3d(20px, 100vh, 0) skew(-30deg) rotateX(100deg)
      rotateY(380deg);
  }
}

@-moz-keyframes confettiRotation {
  0% {
    -moz-transform: translate3d(0, 0, 0), skew(30deg) rotateX(0) rotateY(0);
  }
  100% {
    -moz-transform: translate3d(20px, 100vh, 0) skew(-30deg) rotateX(100deg)
      rotateY(380deg);
  }
}

@keyframes confettiRotation {
  0% {
    transform: translate3d(0, 0, 0), skew(30deg) rotateX(0) rotateY(0);
  }
  100% {
    transform: translate3d(20px, 100vh, 0) skew(-30deg) rotateX(100deg)
      rotateY(380deg);
  }
}
</style>

<style lang="scss" scoped>
.sweet-title {
  order: 2;
  color: #e2eeff;
  font-weight: 900;
  text-transform: uppercase;
  line-height: 0.75em;
  text-align: center;
  text-shadow: 3px 1px 1px #4af7ff, 2px 2px 1px #165bfb, 4px 2px 1px #4af7ff,
    3px 3px 1px #165bfb, 5px 3px 1px #4af7ff, 4px 4px 1px #165bfb,
    6px 4px 1px #4af7ff, 5px 5px 1px #165bfb, 7px 5px 1px #4af7ff,
    6px 6px 1px #165bfb, 8px 6px 1px #4af7ff, 7px 7px 1px #165bfb,
    9px 7px 1px #4af7ff;
  animation: congratz 3s ease-in;

  span {
    display: block;
    position: relative;
    font-size: 4rem;

    &:before {
      content: attr(data-text);
      position: absolute;
      text-shadow: 2px 2px 1px #1C7BFF, -1px -1px 1px #1C7BFF,
        -2px 2px 1px #1C7BFF, 1px -1px 1px #1C7BFF;
      z-index: 1;
    }
  }
}
@keyframes congratz {
  0% {
    transform: scale(1) skew(0, 0deg);
  }
  20% {
    transform: scale(1.2) skew(0, -10deg);
  }
  40% {
    transform: scale(0.8) skew(0, 0deg);
  }
  60% {
    transform: scale(1.1) skew(0, -5deg);
  }
  80% {
    transform: scale(0.9) skew(0, 0deg);
  }
  100% {
    transform: scale(1) skew(0, 0deg);
  }
}
</style>