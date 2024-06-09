<template>
  <div class="relative">
    <slider
      v-if="packets.length"
      :arrowButtons="true"
      :slide="'packet'"
      :divPosition="divPosition"
      :arrowButtonType="arrowButtonType"
    >
      <template v-slot:main>
        <div
          v-for="(packet, index) in packets"
          :key="index"
          ref="cardDiv"
          class="snap-start flex flex-col justify-between mt-3 min-w-[250px] max-w-[250px] lg:min-w-[321px] lg:max-w-[321px] scale-[0.97] hover:scale-[0.99] transition-all single-packet"
          :style="`--packetClr:${packet.color}`"
        >
          <div
            class="rounded-t-xl transition-all cursor-pointer single-packet-head"
          >
            <div
              class="flex items-center justify-center h-15 text-base text-white font-medium rounded-t-xl px-1 text-center"
              :style="'background-color:' + packet.color"
            >
              {{ packet.packetName }}
            </div>
            <div>
              <img :src="packet.imageUrl" :alt="packet.packetName" class="h-32" draggable="false" />
            </div>
            <div
              class="flex items-center justify-center text-white text-sm font-medium h-6"
              :style="'background-color:' + packet.color"
            >
              100% indirim
            </div>
          </div>
          <div
            class="flex flex-col justify-between bg-white rounded-b-full px-3 pt-6 pb-3 h-full transition-all single-packet-body"
          >
            <div>
              <div v-for="(info, index) in packet.infoList" :key="index">
                <div class="flex items-start gap-1 text-left">
                  <div class="h-4 flex items-center">&#x2022;</div>
                  <div>paket detay</div>
                </div>
              </div>
            </div>
            <div class="flex flex-col items-center gap-1 lg:gap-3 mt-4">
              <div class="text-xs lg:text-xl font-medium line-through">
                {{ packet.lastBasePrice }} TL
              </div>
              <div class="flex flex-col items-center text-dolgerBlue">
                <div class="text-2xl lg:text-4.5xl font-semibold">
                  {{ packet.lastDiscountedPrice }}
                  <span class="text-base lg:text-2xl font-medium">TL</span>
                </div>
                <div class="text-xs lg:text-base -mt-1">
                  {{ monthlyPayment(packet.lastDiscountedPrice) }}
                </div>
              </div>
              <div class="flex flex-col items-center gap-3">
                <main-button
                  @click="addToBasket(packet.id)"
                  :text="'Satın al'"
                  :size="1"
                  class="w-48 lg:w-56"
                />
                <div
                  class="text-sm text-dolgerBlue font-medium text-center mb-2"
                >
                  İncele
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </slider>
    <div v-if="loading"><loader v-if="loading" class="top-0" /></div>
    <div v-if="packets.length == 0" class="text-xs lg:text-base">
      Paket bulunmamaktadır...
    </div>
  </div>
</template>

<script>
import slider from "@/common/components/widgets/slider.vue";
import mainButton from "@/common/components/buttons/mainButton.vue";
import loader from "@/common/components/loaders/loader.vue";

export default {
  components: {
    slider,
    mainButton,
    loader,
  },
  props: {
    packets: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    divPosition: {
      type: String,
      default: "",
    },
    arrowButtonType: {
      type: String,
      default: "",
    },
  },
  methods: {
    monthlyPayment(price) {
      return "(" + Math.ceil(price / 12) + " TL x 12 aya varan taksitle)";
    },
  },
};
</script>

<style scoped>
.single-packet:hover .single-packet-head,
.single-packet:hover .single-packet-body {
  box-shadow: 0 0 10px 0px var(--packetClr);
}
</style>