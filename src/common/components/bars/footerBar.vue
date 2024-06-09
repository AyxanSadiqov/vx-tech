<template>
  <div v-if="dontShowInThisPages" class="flex flex-col items-center mt-8 z-10">
    <div
      class="w-full max-w-container-lg bg-dolgerBlue"
      :class="[isPaymentOrBasketPage ? 'hidden md:block' : '']"
    >
      <div class="grid grid-cols-12 items-start py-10 px-3 md:px-20 text-white">
        <div
          class="grid col-span-12 place-items-center mt-4 lg:mt-0"
        >
          <div
            class="flex flex-col 310:flex-row lg:flex-col lg:justify-center justify-between lg:items-start items-center gap-3 items-start h-min"
          >
            <div class="font-medium w-full">Bizi Takip Edin</div>
            <div class="flex gap-3">
              <a
                target="_blank"
                href=""
                aria-label="Tiktok"
              >
                <fa :icon="['fab', 'facebook']" class="w-6 h-6 410:w-9 410:h-9" />
              </a>
              <a
                target="_blank"
                href=""
                aria-label="Tiktok"
              >
                <fa :icon="['fab', 'instagram']" class="w-6 h-6 410:w-9 410:h-9" />
              </a>
              <a
                target="_blank"
                href=""
                aria-label="Tiktok"
              >
                <fa :icon="['fab', 'linkedin']" class="w-6 h-6 410:w-9 410:h-9" />
              </a>
              <a
                target="_blank"
                href=""
                aria-label="Tiktok"
              >
                <fa :icon="['fab', 'tiktok']" class="w-6 h-6 410:w-9 410:h-9" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        class="flex flex-col justify-center items-center gap-3 pb-10 px-3 md:px-20"
      >
        <div class="text-sm py-2 md:order-first order-last text-white">
          Copyright © {{ new Date().getFullYear() }} VX-Tech
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      packetNames: [],
    };
  },
  computed: {
    isPaymentOrBasketPage() {
      return this.$route.name == "payment" || this.$route.name == "basket";
    },
    dontShowInThisPages() {
      return (
        this.$route.name != "test" && this.$route.name != "developmentTest"
      );
    },
  },
  methods: {},
};
</script>

<style scoped>
a.router-link-exact-active {
  color: #c4c4c4;
}
</style>