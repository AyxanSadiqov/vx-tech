<template>
  <div id="navbarId" class="flex flex-col justify-center w-full z-40">
    <!-- kupon alani START -->
    <!-- <div id="topNavbarId" class="cursor-default z-50">
      <Transition name="slide">
        <div
          class="w-full hidden md:flex justify-center background-animation text-white"
        >
          <div
            class="w-full max-w-container-lg flex items-center justify-between gap-3 py-3 px-3 md:px-20"
          >
            <div class="w-full text-left">
              <span class="text-white text-sm lg:text-base"
                >Sınav eksiklerini yapay zekâ ile daha hızla kapat. Şimdi
                harekete geç!
              </span>
            </div>
            <div class="flex items-center gap-4">
              <div
                class="hidden md:block bg-white font-medium px-3 py-2 rounded-lg hover:bg-opacity-90"
              >
                <span class="text-sm lg:text-base text-black-800"
                  >Paketler</span
                >
              </div>
              <button
                @click="showSecondNav = false"
                class="p-2 rounded-lg transition-all hover:bg-white hover:text-black-800"
              >
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div> -->
    <!-- kupon alani END -->
    <div
      class="flex items-center justify-center bg-white w-full navbar"
      :class="isLandingPage ? null : 'border-b'"
    >
      <div
        class="flex items-center justify-between px-3 md:px-20 w-full max-w-container-lg transition-all"
      >
        <div class="flex items-center 310:gap-1 md:gap-4 lg:gap-8">
          <button
            @click="homePage()"
            aria-label="Ana sayfa"
            class="flex items-center gap-3 w-full"
          >
            <img
              src="@/assets/images/landing-page/x-logo.png"
              alt="Logo"
              class="h-14"
            />
            <div class="text-3xl font-extrabold logo-text">VX-Tech</div>
          </button>
          <div class="flex items-center gap-4 lg:gap-6">
            <!-- <div
              class="hidden md:block text-sm lg:text-base font-medium text-black-800 hover:text-dolgerBlue transition-all"
            >
              Çalışmalarım
            </div> -->
          </div>
        </div>
        <div class="flex items-center gap-4 lg:gap-8">
          <div class="flex items-center gap-2 lg:gap-6">
            <div
              class="flex items-center relative gap-2.5 text-sm lg:text-base font-medium text-black-800 transition-all"
            >
              <select-default
                :value="language"
                @input="getLanguage"
                :options="languages"
                class="h-12 border border-gray-400 rounded-md bg-white px-4"
              />
            </div>
          </div>
          <button
            @click="ShowMenu()"
            aria-label="Menü aç/kapat"
            class="md:hidden block"
          >
            <div class="toggle" :class="mobileMenuVisibility ? 'active' : null">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobil menu -->
    <div class="relative z-50">
      <left-to-left>
        <template v-slot:main>
          <!-- 55 su anki navbar yuksekligi -->
          <div
            v-if="mobileMenuVisibility"
            class="fixed bg-white flex flex-col justify-between w-full max-w-container-lg h-full overflow-y-auto pt-14 pb-24"
          >
            <div>
              <div v-for="(menu, index) in navbarMenus" :key="index">
                <router-link
                  :to="menu.link"
                  v-slot="{ isActive, route, isExactActive, href, navigate }"
                  custom
                  class="px-3"
                  v-if="menu.forLoggingInOnly"
                >
                  <a
                    @click="navigate"
                    :href="href"
                    class="flex items-center justify-between h-14 border-b"
                    :class="
                      isExactActive || (isActive && route.name != 'home')
                        ? 'text-dolgerBlue bg-dolgerBlue bg-opacity-10'
                        : ''
                    "
                  >
                    <div class="font-medium">
                      {{ $t("menuTitles." + menu.label) }}
                    </div>
                    <!-- <svg-icon
                      name="chevron-right"
                      class="w-4 h-4 lg:w-5 lg:h-5"
                      :class="
                        isExactActive || (isActive && route.name != 'home')
                          ? 'text-dolgerBlue'
                          : 'text-black-800'
                      "
                    /> -->
                  </a>
                </router-link>
              </div>
              <div class="flex flex-col gap-3 px-3 mt-10 mb-4">
                <button
                  @click="$router.push({ name: 'register' })"
                  aria-label="Üye ol"
                  class="flex items-center justify-center w-full h-[42px] bg-dolgerBlue text-white font-medium rounded-full"
                >
                  Üye Ol
                </button>
                <div>veya</div>
                <button
                  @click="$router.push({ name: 'login' })"
                  aria-label="Giriş yap"
                  class="flex items-center justify-center w-full h-[42px] bg-dolgerBlue bg-opacity-10 text-dolgerBlue font-medium rounded-full"
                >
                  Giriş Yap
                </button>
              </div>
            </div>
            <div>
              <a
                href="https://wa.me/905418989088?text=Merhaba"
                target="_blank"
                class="flex items-center gap-1 text-base font-medium text-black-800 px-3 my-4"
              >
                <!-- <svg-icon name="whatsapp" class="w-7 h-7" /> -->
                <div class="text-base font-medium">Görüşme Başlat</div>
              </a>
            </div>
          </div>
        </template>
      </left-to-left>
    </div>
  </div>
</template>

<script>
import leftToLeft from "../animations/leftToLeft.vue";
import selectDefault from "@/common/components/form/selectDefault.vue";

export default {
  components: {
    leftToLeft,
    selectDefault,
  },
  data() {
    return {
      mobileMenuVisibility: false,
      isMobile: false,
      navbarMenus: [
        // Mobil ekranda gosterilecek menu
        {
          label: "howItWorks",
          link: "/how-it-works",
          forLoggingInOnly: true,
        },
        {
          label: "aboutUs",
          link: "/about-us",
          forLoggingInOnly: true,
        },
        {
          label: "contactUs",
          link: "/contact-us",
          forLoggingInOnly: true,
        },
      ],
      showSecondNav: true,
      language: "US",
      // 🇦🇫 🇦🇱 🇩🇿 🇦🇩 🇦🇴 🇦🇬 🇦🇷 🇦🇲 🇦🇺 🇦🇹 🇦🇿 🇧🇸 🇧🇭 🇧🇩 🇧🇧 🇧🇾 🇧🇪 🇧🇿 🇧🇯 🇧🇹 🇧🇴 🇧🇦 🇧🇼 🇧🇷 🇧🇳 🇧🇬 🇧🇫 🇧🇮 🇨🇻 🇰🇭 🇨🇲 🇨🇦 🇨🇫 🇹🇩 🇨🇱 🇨🇴 🇰🇲 🇨🇩 🇨🇷 🇨🇮 🇭🇷 🇨🇺 🇨🇾 🇨🇿 🇰🇵
      // 🇨🇬 🇩🇰 🇩🇯 🇩🇲 🇩🇴 🇪🇨 🇪🇬 🇸🇻 🇬🇶 🇪🇷 🇪🇪 🇸🇿 🇪🇹 🇫🇯 🇫🇮 🇫🇷 🇬🇦 🇬🇲 🇬🇪 🇩🇪 🇬🇭 🇬🇷 🇬🇩 🇬🇹 🇬🇳 🇬🇼 🇬🇾 🇭🇹 🇭🇳 🇭🇺 🇮🇸 🇮🇳 🇮🇩 🇮🇷 🇮🇶 🇮🇪 🇮🇱 🇮🇹 🇯🇲 🇯🇵 🇯🇴 🇰🇿 🇰🇪 🇰🇮 🇰🇼
      // 🇰🇬 🇱🇦 🇱🇻 🇱🇧 🇱🇸 🇱🇷 🇱🇾 🇱🇮 🇱🇹 🇱🇺 🇲🇬 🇲🇼 🇲🇾 🇲🇻 🇲🇱 🇲🇹 🇲🇭 🇲🇷 🇲🇺 🇲🇽 🇫🇲 🇲🇨 🇲🇳 🇲🇪 🇲🇦 🇲🇿 🇲🇲 🇳🇦 🇳🇷 🇳🇵 🇳🇱 🇳🇿 🇳🇮 🇳🇪 🇳🇬 🇲🇰 🇳🇴 🇴🇲 🇵🇰 🇵🇼 🇵🇦 🇵🇬
      // 🇵🇾 🇵🇪 🇵🇭 🇵🇱 🇵🇹 🇶🇦 🇰🇷 🇲🇩 🇷🇴 🇷🇺 🇷🇼 🇰🇳 🇱🇨 🇻🇨 🇼🇸 🇸🇲 🇸🇹 🇸🇦 🇸🇳 🇷🇸 🇸🇨 🇸🇱 🇸🇬 🇸🇰 🇸🇮 🇸🇧 🇸🇴 🇿🇦 🇸🇸 🇪🇸 🇱🇰 🇸🇩 🇸🇷 🇸🇪 🇨🇭 🇸🇾 🇹🇯 🇹🇭 🇹🇱 🇹🇬 🇹🇴 🇹🇹 🇹🇳 🇹🇷 🇹🇲 🇹🇻
      // 🇺🇬 🇺🇦 🇦🇪 🇬🇧 🇹🇿 🇺🇸 🇺🇾 🇺🇿 🇻🇺 🇻🇪 🇻🇳 🇾🇪 🇿🇲 🇿🇼
      languages: [
        { id: 1, name: "🇺🇸 English", value: "en" },
        { id: 2, name: "🇷🇺 Russian", value: "ru" },
        { id: 3, name: "🇬🇪 Georgian", value: "ge" },
        { id: 4, name: "🇦🇿 Azerbaijani", value: "az" },
      ],
    };
  },
  watch: {
    "$route.name"() {
      this.mobileMenuVisibility = false;
    },
    mobileMenuVisibility() {
      if (this.$route.name == "login" || this.$route.name == "register") return;
    },
  },
  mounted() {
    this.resizeWindow(); // sayfa ilk yuklendiginda mobil ekrani mi degil mi ogrenmek icin burada cagrildi
    window.addEventListener("resize", this.resizeWindow);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.resizeWindow);
  },
  computed: {
    isBasketPage() {
      return this.$route.name == "basket";
    },
    showBasketArea() {
      let isShow = true;
      if (this.isMobile) {
        isShow = true;
      } else {
        if (!this.isBasketPage) isShow = true;
        else isShow = false;
      }
      return isShow;
    },
    isLandingPage() {
      return this.$route.name == "landingPage";
    },
  },
  methods: {
    ShowMenu() {
      this.mobileMenuVisibility
        ? (this.mobileMenuVisibility = false)
        : (this.mobileMenuVisibility = true);
    },
    resizeWindow() {
      if (window.innerWidth > 768) {
        this.mobileMenuVisibility = false;
        this.isMobile = false;
      } else {
        this.isMobile = true;
      }
    },
    homePage() {
      if (this.$route.name == "landingPage") {
        this.mobileMenuVisibility = false;
        return;
      }
      this.$router.push({ name: "landingPage" });
    },
    logOutFunc() {
      this.$popupModal({
        type: "error",
        title: "Çıkış yapmak istediğinize emin misiniz?",
        buttonText: "Çıkış yap",
      }).then((res) => {
        if (res) {
          this.$router.push({ name: "login" });
        }
      });
    },
    getLanguage(val) {
      this.language = val
      this.$i18n.locale = val
    }
  },
};
</script>

<style scoped>
@media only screen and (min-width: 1024px) {
  .navbar {
    height: 80px !important;
    min-height: 80px !important;
    max-height: 80px !important;
  }
}
.navbar {
  height: 52px;
  min-height: 52px;
  max-height: 52px;
  transition: 0.25s;
}
.toggle {
  position: relative;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  /* border: 1px solid red; */
}
.toggle span {
  position: absolute;
  width: 10px;
  height: 2.4px;
  background: #242424;
  border-radius: 4px;
  transition: 0.5s;
}
.toggle span:nth-child(1) {
  transform: translateY(-8px);
  width: 25px;
  left: 0px;
}
.toggle.active span:nth-child(1) {
  width: 25px;
  transform: translateY(0px) rotate(45deg);
  transition-delay: 0.125s;
}
.toggle span:nth-child(2) {
  transform: translateY(8px);
  width: 25px;
  left: 0px;
}
.toggle.active span:nth-child(2) {
  width: 25px;
  transform: translateY(0px) rotate(315deg);
  transition-delay: 0.25s;
}
.toggle span:nth-child(3) {
  width: 25px;
  left: 0px;
}
.toggle.active span:nth-child(3) {
  transform: translateX(30px);
}

.slide-leave-active,
.slide-enter-active {
  transition: all 0.4s ease;
}
.slide-enter,
.slide-leave-to {
  transform: translateY(-100px);
  opacity: 0;
}

/* Demo Purpose Only*/
.demo {
  font-family: "Raleway", sans-serif;
  color: #fff;
  display: block;
  margin: 0 auto;
  padding: 15px 0;
  text-align: center;
}
.demo a {
  font-family: "Raleway", sans-serif;
  color: #000;
}

.background-animation {
  background: linear-gradient(132deg, #df5b93, #1c7bff, #333333);
  background-size: 400% 400%;
}

@media screen and (max-width: 1280px) {
  .wp-shadow {
    filter: drop-shadow(0px 0px 7px rgba(0, 0, 0, 0.6));
  }
}

.logo-text {
  background: -webkit-linear-gradient(#009aad, #03d3da, #860af8, #d32de8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>