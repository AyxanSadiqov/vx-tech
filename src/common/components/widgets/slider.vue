<template>
  <div class="">
    <div
      class="wrapper relative w-full max-w-container-lg"
      :class="divPositionClass"
    >
      <Transition>
        <button
          v-if="arrowButtons && showLeftButton"
          @click="buttons('left')"
          class="absolute top-1/2 -translate-y-1/2 flex items-center justify-center bg-white rounded-full transition-all z-20"
          :class="arrowButtonTypeClass('leftButton')"
          aria-label="Sola kaydır"
        >
          <fa
            :icon="['fa', 'chevron-left']"
            class="w-2 h-2 lg:w-3 lg:h-3 text-black-800"
          />
        </button>
      </Transition>
      <div
        ref="mainSlider"
        @mousedown="isSlideFeatureOpen ? dragStart : null"
        @mousemove="isSlideFeatureOpen ? dragging : null"
        @mouseup="isSlideFeatureOpen ? dragStop : null"
        class="ml-3 overflow-x-auto scrollbar select-none"
        :class="[dragClass, gridClass]"
      >
        <slot name="main"></slot>
      </div>
      <Transition>
        <button
          v-if="arrowButtons && showRightButton"
          @click="buttons('right')"
          class="absolute top-1/2 -translate-y-1/2 flex items-center justify-center bg-white rounded-full transition-all z-10"
          :class="arrowButtonTypeClass('rightButton')"
          aria-label="Sağa kaydır"
        >
          <fa
            :icon="['fa', 'chevron-right']"
            class="w-2 h-2 lg:w-3 lg:h-3 text-black-800"
          />
        </button>
      </Transition>

      <!-- Slide altindaki ileri geri buton-lar -->
      <div v-if="bottomButtons" class="grid col-span-12 pt-6">
        <div class="flex items-center justify-center gap-4">
          <button
            @click="buttons('left')"
            aria-label="Sola kaydır"
            class="hidden lg:flex items-center justify-center w-13 h-13 bg-white rounded-full"
          >
            <fa :icon="['fa', 'chevron-left']" class="w-4 h-4" />
          </button>
          <button
            @click="buttons('right')"
            aria-label="Sağa kaydır"
            class="hidden lg:flex items-center justify-center w-13 h-13 bg-white rounded-full"
          >
            <fa :icon="['fa', 'chevron-right']" class="w-4 h-4" />
          </button>
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
  },
  data() {
    return {
      isDragging: false,
      startX: false,
      startScrollLeft: false,
      dragClass: "scroll-smooth snap-mandatory snap-x",
      showLeftButton: false,
      showRightButton: true,
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
    isSlideFeatureOpen() {
      // dokunma destegi varsa
      return "ontouchstart" in window || navigator.maxTouchPoints > 0;
    },
  },
  mounted() {
    this.buttonDisabled();
  },
  methods: {
    buttons(movement) {
      let firstCardWidth = this.$parent.$refs.cardDiv[0]?.offsetWidth;
      this.$refs.mainSlider.scrollLeft +=
        movement == "left" ? -firstCardWidth : firstCardWidth;
      this.buttonDisabled(
        movement == "left" ? firstCardWidth : -firstCardWidth
      );
      this.changeTitle(movement);
    },
    dragStart(e) {
      this.isDragging = true;
      this.dragClass = "select-none scroll-auto snap-none";
      // Döngünün ilk imlecini ve kaydırma konumunu kaydeder
      this.startX = e.pageX;
      this.startScrollLeft = this.$refs.mainSlider.scrollLeft;
      this.buttonDisabled();
    },
    dragging(e) {
      if (!this.isDragging) return;
      // mainSlider-in kaydırma konumunu imleç hareketine göre günceller
      this.$refs.mainSlider.scrollLeft =
        this.startScrollLeft - (e.pageX - this.startX);
      this.buttonDisabled();
    },
    dragStop() {
      this.isDragging = false;
      this.dragClass = "scroll-smooth snap-mandatory snap-x";
      this.buttonDisabled();
    },
    buttonDisabled(cardWidth = 0) {
      if (this.$parent.$refs.cardDiv == undefined) return;
      // ileri ve geri butonlarinin show/hide-i icin islemler asagidaki gibi
      var leftSideOfMainDiv =
        this.$refs.mainSlider.getBoundingClientRect().left;
      var rightSideOfMainDiv =
        this.$refs.mainSlider.getBoundingClientRect().right + 1; // +1 olma sebebi sagdan birazcik bosluk oldugu icin
      var leftPositionOfFirstElement =
        this.$parent.$refs.cardDiv[0].getBoundingClientRect().left;
      var rightPositionOfLastElement =
        this.$parent.$refs.cardDiv[
          this.$parent.$refs.cardDiv.length - 1
        ].getBoundingClientRect().right;
      // console.log(cardWidth, " > ", leftPositionOfFirstElement, "--", leftSideOfMainDiv)
      var extraSizeWhenButtonClicked = cardWidth != 0 ? cardWidth + 50 : 0; // butona tiklayarak ile surukleyerek ilerlemede farkli degerler gitmeli. deneme ile sabitlendi
      if (
        leftPositionOfFirstElement + extraSizeWhenButtonClicked <
        leftSideOfMainDiv
      )
        this.showLeftButton = true;
      else this.showLeftButton = false;
      if (
        rightPositionOfLastElement + extraSizeWhenButtonClicked >
        rightSideOfMainDiv
      )
        this.showRightButton = true;
      else this.showRightButton = false;
    },
    arrowButtonTypeClass(button) {
      let buttonClass = [];
      if (this.arrowButtonType == "cornerBig") {
        if (button == "leftButton") {
          // sol buton
          buttonClass.push(
            "hidden md:flex -left-16 w-13 h-13 hover:bg-gray-100"
          );
        } else {
          // sag buton
          buttonClass.push(
            "hidden md:flex -right-16 w-13 h-13 hover:bg-gray-100"
          );
        }
      } else if (this.arrowButtonType == "standartBig") {
        // standart tasarimin buyugu ise
        if (button == "leftButton") {
          // sol buton
          buttonClass.push(
            "-left-2 border border-gray-400 md:w-10 md:h-10 w-7 h-7 hover:bg-gray-100"
          );
        } else {
          // sag buton
          buttonClass.push(
            "md:-right-5 -right-3 border border-gray-400 md:w-10 md:h-10 w-7 h-7 hover:bg-gray-100"
          );
        }
      } else {
        // standart ise
        if (button == "leftButton") {
          // sol buton
          buttonClass.push("-left-2 border border-gray-400 w-7 h-7");
        } else {
          // sag buton
          buttonClass.push("-right-3 border border-gray-400 w-7 h-7");
        }
      }
      return buttonClass;
    },
    changeTitle(movement) {
      if (this.titleChangable) {
        // landingPage-de "Ogrenciler Ne diyor, Ogretmenler ne diyor, Veliler ne diyor" slide alani icin kullaniliyor simdilik
        // Slide basligi hangi div-den sonra degisecekse o div baz alinarak hesaplama yapilir. Ornek olarak su anki hesaplama 3. divden (yani box3 demek) sonra yapiliyor
        let box3;
        let box6;
        if (movement == "right") {
          box3 =
            document.getElementById("box3").getBoundingClientRect().left -
            this.$parent.$refs.cardDiv[0]?.offsetWidth;
          box6 =
            document.getElementById("box6").getBoundingClientRect().left -
            this.$parent.$refs.cardDiv[0]?.offsetWidth;
        } else {
          box3 =
            document.getElementById("box3").getBoundingClientRect().left +
            this.$parent.$refs.cardDiv[0]?.offsetWidth;
          box6 =
            document.getElementById("box6").getBoundingClientRect().left +
            this.$parent.$refs.cardDiv[0]?.offsetWidth;
        }
        if (box3 > 0) this.$emit("changeSlideTitle", "first");
        else if (box6 > 0) this.$emit("changeSlideTitle", "second");
        else this.$emit("changeSlideTitle", "third");
      }
    },
    // elementsOverlap(el1, el2) {
    //   const domRect1 = el1.getBoundingClientRect();
    //   const domRect2 = el2.getBoundingClientRect();

    //   return !(
    //     domRect1.top > domRect2.bottom ||
    //     domRect1.right < domRect2.left ||
    //     domRect1.bottom < domRect2.top ||
    //     domRect1.left > domRect2.right
    //   );
    // }
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
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>