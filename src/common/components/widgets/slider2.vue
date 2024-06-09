<template>
  <div class="">
    <div
      class="wrapper relative w-full max-w-container-lg"
      :class="divPositionClass"
    >
      <!-- @touchstart="dragStart($event, 'mobile')"
      @touchmove="dragging($event, 'mobile')"
      @touchend="dragStop" -->
      <div
        ref="mainSlider"
        @mousedown="dragStart($event, 'web')"
        @mousemove="dragging($event, 'web')"
        @mouseup="dragStop"
        @touchmove="resetSlides()"
        @touchend="dragStop"
        class="ml-3 overflow-x-auto overflow-y-hidden scrollbar select-none"
        :class="[dragClass, gridClass]"
      >
        <slot name="main"></slot>
      </div>

      <!-- Slide altindaki ileri geri buton-lar -->
      <div v-if="bottomButtons" class="grid col-span-12 pt-6">
        <div class="flex items-center justify-center gap-4">
          <button
            @click="buttons('left')"
            aria-label="Sola kaydır"
            class="hidden lg:flex items-center justify-center w-13 h-13 bg-white text-black-400 rounded-full"
            style="z-index:10 !important"
          >
            <fa :icon="['fa', 'chevron-left']" class="w-4 h-4" />
          </button>
          <button
            @click="buttons('right')"
            aria-label="Sağa kaydır"
            class="hidden lg:flex items-center justify-center w-13 h-13 bg-white text-black-400 rounded-full"
            style="z-index:10 !important"
          >
            <fa :icon="['fa', 'chevron-right']" class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- points -->
      <div
        v-if="showDots"
        class="grid col-span-12 place-items-center h-min w-full sm:mt-6 mt-4"
      >
        <div class="flex items-center lg:justify-between justify-center">
          <div class="flex gap-3">
            <div v-for="(i, index) in slideLength" :key="index" style="z-index:20 !important">
              <div
                class="lg:w-4 lg:h-4 w-3 h-3 rounded-full cursor-pointer border-2 border-white"
                :class="index == activeDot ? 'bg-white' : ''"
                @click="changeDots(index)"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    slide: {
      type: String,
      default: "normal",
    },
    arrowButtons: {
      type: Boolean,
      default: false,
    },
    bottomButtons: {
      type: Boolean,
      default: false,
    },
    divPosition: {
      // slide div-lerin konumu
      type: String,
      default: "",
    },
    arrowButtonType: {
      // sag/sol buton tipi
      type: String,
      default: "",
    },
    titleChangable: {
      // landingPage > ogretmenler/ogrenciler/veliler ne diyor alani icin yapildi. basliklar icerige gore degissin diye (ileride farkli yerlerde kullanilacaksa optimize edilebilir)
      type: Boolean,
      default: false,
    },
    slideLength: {
      type: [Number, String],
      default: 0,
    },
    showDots: {
      type: Boolean,
      default: false,
    },
    hasVideo: { // slide-da video varsa duracagi icin diger slide otomatik oynatmasini etkilemesin diye
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isDragging: false,
      startX: false,
      startScrollLeft: false,
      dragClass: "scroll-smooth snap-mandatory snap-x",
      showLeftButton: false,
      showRightButton: true,
      activeDot: 0,
      interval: "",
    };
  },
  computed: {
    gridClass() {
      let gClass = [];

      if (this.slide == "normal") gClass.push(`flex gap-2`);
      else if (this.slide == "packet") gClass.push(`flex gap-5`);

      // if (this.slide == "normal")
      //   gClass.push(`grid grid-flow-col gap-2
      //         auto-cols-[calc((100%_/_2)_-_15px)]
      //         sm:auto-cols-[calc((100%_/_3)_-_15px)]
      //         md:auto-cols-[calc((100%_/_4)_-_13px)]
      //         lg:auto-cols-[calc((100%_/_5)_-_12px)]
      //         xl:auto-cols-[calc((100%_/_6)_-_12px)]`);

      // else if (this.slide == "packet")
      //   gClass.push(`grid grid-flow-col gap-2
      //         auto-cols-[calc((100%_/_1)_-_35px)]
      //         310:auto-cols-[calc((100%_/_1)_-_100px)]
      //         410:auto-cols-[calc((100%_/_1)_-_170px)]
      //         xs:auto-cols-[calc((100%_/_2)_-_15px)]
      //         sm:auto-cols-[calc((100%_/_3)_-_15px)]
      //         850:auto-cols-[calc((100%_/_4)_-_13px)]
      //         lg:auto-cols-[calc((100%_/_5)_-_12px)]
      //         xl:auto-cols-[calc((100%_/_6)_-_12px)]`);

      return gClass;
    },
    divPositionClass() {
      let positionClass = [];
      if (this.divPosition == "center")
        positionClass.push("flex justify-center");
      return positionClass;
    },
  },
  watch: {
    activeDot(val) {
      this.changeDots(val)
    }
  },
  mounted() {
    if (!this.hasVideo) {
      this.startSlides(); // slide otomatik olarak oynatilmaya baslar
    }
    // slide video oynatma
    var video = this.$parent.$refs.slideVideo1[0];
    video.muted = true;
    video?.play();
    video.addEventListener("playing", this.slideVideo1IsPlaying);
    video.addEventListener("ended", this.slideVideo1Ended);
  },
  beforeUnmount() {
    var video = this.$parent.$refs.slideVideo1[0];
    video?.removeEventListener("playing", this.slideVideo1IsPlaying);
    video?.removeEventListener("ended", this.slideVideo1Ended);
  },
  methods: {
    resetSlides() {
      // bastan baslar
      clearInterval(this.interval);
      this.startSlides();
    },
    startSlides(timer = 6000) {
      this.activeDot = Number(this.activeDot)
      this.interval = setInterval(() => {
        this.activeDot + 1 >= this.slideLength
          ? (this.activeDot = 0)
          : (this.activeDot += 1);
      }, timer);
    },
    slideVideo1IsPlaying() {
      // video oynatiliyorsa slide gecis kalkar
      if (this.hasVideo) {
        clearInterval(this.interval);
      }
    },
    slideVideo1Ended() {
      // video bittikten 1 saniye sonra bir sonraki slide-a gecis saglanir
      this.startSlides(1000);
    },
    stopSlideVideo() {
      var video = this.$parent.$refs.slideVideo1[0];
      video.pause();
    },
    buttons(movement) {
      let firstCardWidth = this.$parent.$refs.cardDiv[0]?.offsetWidth;
      if (movement == "left") {
        if (this.$refs.mainSlider.scrollLeft == 0) {
          this.$refs.mainSlider.scrollLeft = firstCardWidth * this.slideLength;
        } else {
          this.$refs.mainSlider.scrollLeft += -firstCardWidth;
        }
        this.activeDot = Number((this.$refs.mainSlider.scrollLeft) / (firstCardWidth + 20) - 1).toFixed(0)
        if (this.activeDot < 0) this.activeDot = this.slideLength - 1
      } else {
        if (
          this.$refs.mainSlider.scrollLeft >=
          firstCardWidth * (this.slideLength - 1)
        ) {
          this.$refs.mainSlider.scrollLeft = 0;
        } else {
          this.$refs.mainSlider.scrollLeft += firstCardWidth;
        }
        this.activeDot = Number((this.$refs.mainSlider.scrollLeft + firstCardWidth + 20) / (firstCardWidth + 20)).toFixed(0)
      }
      // aktif slide id
      if (this.activeDot == this.slideLength) this.activeDot = 0
      // NOTTTTT: geri tiklandiginda "activeDot" sorunlu. Bakilsin
      this.$emit("activeSlideId", this.activeDot)
      this.resetSlides()
      if (this.hasVideo) {
        this.stopSlideVideo();
      }
    },
    changeDots(clickedDotIndex) {
      this.activeDot = clickedDotIndex
      let firstCardWidth = this.$parent.$refs.cardDiv[0]?.offsetWidth;
      this.$refs.mainSlider.scrollLeft = firstCardWidth * clickedDotIndex
      this.$emit("activeSlideId", this.activeDot)
      this.resetSlides()
      if (this.hasVideo) {
        this.stopSlideVideo();
      }
    },
    dragStart(e, device) {
      this.isDragging = true;
      this.dragClass = "select-none scroll-auto snap-none";
      // Döngünün ilk imlecini ve kaydırma konumunu kaydeder
      this.startX = device == 'web' ? e.pageX : e.touches[0].pageX;
      this.startScrollLeft = this.$refs.mainSlider.scrollLeft;
    },
    dragging(e, device) {
      if (!this.isDragging) return;
      let devicePageX = device == 'web' ? e.pageX : e.touches[0].pageX
      // mainSlider-in kaydırma konumunu imleç hareketine göre günceller
      this.$refs.mainSlider.scrollLeft =
        this.startScrollLeft - (devicePageX - this.startX);
    },
    dragStop() {
      this.isDragging = false;
      this.dragClass = "scroll-smooth snap-mandatory snap-x";
      setTimeout(() => {
        let firstCardWidth = this.$parent.$refs.cardDiv[0]?.offsetWidth + 20;
        this.activeDot = Number((this.$refs.mainSlider.scrollLeft + firstCardWidth) / (firstCardWidth)).toFixed(0) - 1
        this.$emit("activeSlideId", this.activeDot)
      }, 500);
    },
  },
};
</script>

<style scoped>
.scrollbar {
  scrollbar-width: none;
}
.scrollbar::-webkit-scrollbar {
  display: none;
}
</style>