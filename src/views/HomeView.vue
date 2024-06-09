<template>
  <div class="appBody h-screen flex justify-center min-h-full overflow-y-auto">
    <div class="flex flex-col w-full min-h-full z-10">
      <Navbar />
      <div class="flex flex-col items-center lg:justify-center transition-all">
        <div class="flex flex-col items-center relative w-full">
          <!-- 1st Page -->
          <div
            class="w-full bg-color-transition relative bottom-curved pb-16 mb-12 background-animation overflow-hidden"
            :class="firstPage[activeFirstPageSlideId].bgColor"
          >
            <vue-particles
              color="#dedede"
              :particleOpacity="0.7"
              :particlesNumber="120"
              shapeType="polygon"
              :particleSize="4"
              linesColor="#dedede"
              :linesWidth="1"
              :lineLinked="true"
              :lineOpacity="0.4"
              :linesDistance="150"
              :moveSpeed="3"
              :hoverEffect="true"
              hoverMode="grab"
              :clickEffect="true"
              clickMode="push"
              class="absolute w-full h-full z-10"
            ></vue-particles>
            <slider-2
              v-if="firstPage.length"
              :slideLength="firstPage.length"
              :arrowButtons="false"
              :bottomButtons="true"
              :showDots="showFirstPageDots()"
              :slide="'packet'"
              :arrowButtonType="'cornerBig'"
              :hasVideo="true"
              @activeSlideId="activeFirstPageSlideId = $event"
              class="flex justify-center w-full text-white"
            >
              <template v-slot:main>
                <div
                  v-for="(first, index) in firstPage"
                  :key="index"
                  ref="cardDiv"
                  class="relative snap-start flex items-start justify-start w-full"
                >
                  <div
                    class="flex flex-col items-center justify-end w-[calc(100vw-10px)] h-[521px] 350:h-[566px] 410:h-[656px] 560:h-[616px] lg:h-[459px]"
                  >
                    <div
                      class="grid grid-cols-12 items-end w-full max-w-container-lg px-3 md:px-20"
                    >
                      <div
                        class="grid lg:col-span-5 col-span-12 lg:justify-start justify-center lg:place-items-start place-items-center lg:order-first order-last gap-4 lg:text-left lg:pr-6 lg:pt-0 pt-4 h-min"
                      >
                        <div
                          class="lg:text-4.5xl text-2.5xl font-medium z-20 md:z-0"
                        >
                          {{ $t('home.message') }}
                          {{ first.title }}
                        </div>
                        <div class="lg:text-2xl text-base z-20 md:z-0">
                          {{ first.subTitle }}
                        </div>
                        <main-button
                          @click="
                            $router.push({ name: first.buttonActionName })
                          "
                          :text="first.buttonName"
                          :type="'gradient'"
                          class="lg:mt-12 mt-4 xs:w-[406px] z-20"
                        />
                      </div>
                      <div
                        class="grid lg:col-span-7 col-span-12 lg:justify-end justify-center items-center"
                      >
                        <img
                          v-if="first.image"
                          :src="first.image"
                          :alt="first.title"
                          draggable="false"
                          class="z-20"
                        />
                        <div
                          v-else
                          class="flex lg:justify-end justify-center 850:items-end items-center md:ml-2 h-[300px] 410:h-[450px] 560:h-[400px] sm:h-[500px] lg:h-auto sm:pt-20 lg:pt-0 z-20"
                        >
                          <div
                            class="relative 850:w-9/12 lg:w-10/12 xl:w-11/12"
                          >
                            <div
                              v-if="loadingVideo"
                              class="absolute w-full h-full z-20 rounded-lg"
                            >
                              <loader class="rounded-lg" />
                            </div>
                            <button
                              v-if="videoMuted"
                              @click="unMuteVideo"
                              class="flex items-center gap-3 absolute bottom-4 left-4 text-sm font-medium bg-black-800 hover:bg-opacity-80 text-white border border-white p-2 rounded-lg z-10"
                            >
                              <!-- <svg-icon name="mute" class="w-5 h-5" /> -->
                              Ses için dokunun
                            </button>
                            <video
                              ref="slideVideo1"
                              class="rounded-lg"
                              controls
                              controlslist="nodownload"
                              playsinline
                              draggable="false"
                            >
                              <source
                                :src="first.url + '#t=0.0'"
                                type="video/mp4"
                              />
                              <source
                                :src="first.url + '#t=0.0'"
                                type="video/ogg"
                              />
                              Your browser does not support the video tag.3
                            </video>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </slider-2>
          </div>

          <!-- 2nd Page -->
          <div
            class="flex flex-col items-center lg:gap-8 gap-4 w-full max-w-container-lg px-3 md:px-20 lg:mt-10"
          >
            <div class="leading-normal lg:text-4.5xl text-2xl w-full max-w-4xl">
              <span class="lg:text-4.5xl text-2xl font-semibold"
                >edu
                <span
                  class="text-dolgerBlue lg:text-4.5xl text-2xl font-semibold lg:-ml-2 -ml-1"
                  >next</span
                ></span
              >’i Kullanan Öğrencilerin
              <span class="lg:text-4.5xl text-2xl font-semibold relative">
                <!-- <span
                  class="absolute lg:-left-2 lg:top-1 bg-azureishWhite rounded-full rotate-[-15deg] lg:w-[120px] w-[60px] lg:h-[40px] h-[30px] z-negative"
                ></span> -->
                %90’ı</span
              >
              Daha Yüksek Notlar Alıyor
            </div>
            <div
              class="flex xs:flex-row flex-col items-center justify-between xs:gap-0 gap-4 w-full"
            >
              <div class="flex flex-col gap-2">
                <div class="lg:text-4xl text-3xl font-medium">
                  30.000 <span class="text-4xl text-dolgerBlue ml-2">+</span>
                </div>
                <div class="lg:text-2.5xl text-xl">
                  Soruları Yapay Zekâ Seçsin
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <div class="lg:text-4xl text-3xl font-medium">
                  1000 <span class="text-4xl text-dolgerBlue ml-2">+</span>
                </div>
                <div class="lg:text-2.5xl text-xl">Başarı Hikayesi</div>
              </div>
              <div class="flex flex-col gap-2">
                <div class="lg:text-4xl text-3xl font-medium">
                  5000 <span class="text-4xl text-dolgerBlue ml-2">+</span>
                </div>
                <div class="lg:text-2.5xl text-xl">
                  Öğrenciye Özel Ders Anlatımı
                </div>
              </div>
            </div>
          </div>

          <!-- 3rd Page -->
          <div class="w-full max-w-container-lg lg:my-32 my-20">
            <div
              class="bg-dolgerBlue bg-opacity-30 rounded-xl mx-3 md:mx-20 px-4 sm:pt-16 pt-10 pb-8"
            >
              <slider-2
                v-if="thirdPage.length"
                :slideLength="thirdPage.length"
                :slide="'packet'"
                :showDots="true"
                :arrowButtonType="'cornerBig'"
                @activeSlideId="activeThirdPageSlideId = $event"
                class="flex justify-center w-full"
              >
                <template v-slot:main>
                  <div
                    v-for="(third, index) in thirdPage"
                    :key="index"
                    ref="cardDiv"
                    class="relative snap-start flex items-start justify-start w-full"
                  >
                    <div class="grid grid-cols-12 w-[calc(100vw-10px)]">
                      <div
                        class="grid sm:col-span-6 col-span-12 place-items-center sm:px-4"
                      >
                        <img
                          :src="third.image"
                          :alt="third.title"
                          class="w-[573px]"
                          draggable="false"
                        />
                      </div>
                      <div
                        class="grid sm:col-span-6 col-span-12 justify-center place-items-center sm:px-4"
                      >
                        <div
                          class="flex flex-col gap-3 sm:text-left text-center sm:order-first order-last sm:pt-0 pt-4"
                        >
                          <div class="lg:text-[32px] text-2xl font-medium">
                            {{ third.title }}
                          </div>
                          <div class="lg:text-2xl text-base">
                            {{ third.subTitle }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </slider-2>
            </div>
          </div>

          <!-- 5th Page -->
          <div class="w-full max-w-container-lg lg:mt-14 lg:mb-4">
            <div class="grid grid-cols-12 place-items-center mx-3 md:mx-20">
              <div
                class="grid sm:col-span-6 col-span-12 place-items-center sm:px-4 relative"
              >
                <img
                  src="@/assets/images/landing-page/fifth-page-1.webp"
                  alt="Fifth page 1"
                />
                <img
                  src="@/assets/images/landing-page/graph-with-an-arrow.webp"
                  alt="Graph with an arrow"
                  class="sm:hidden absolute -bottom-9 -left-2"
                />
              </div>
              <div
                class="grid sm:col-span-6 col-span-12 gap-4 md:gap-6 sm:text-left sm:place-items-start place-items-center sm:px-4 h-min"
              >
                <div
                  class="flex items-center justify-center bg-clearDay text-success-400 text-xs md:text-sm font-semibold rounded-md w-[240px] h-10 md:mt-0 mt-8"
                >
                  VX-Tech
                </div>
                <div
                  class="lg:text-4.5xl text-2xl lg:font-semibold font-medium leading-none"
                >
                  Sirket bilgisi haqqinda basliq
                </div>
                <div class="text-base">
                  Sirket haqqinda bilgi
                </div>
              </div>
            </div>
          </div>

          <!-- 6th Page -->
          <div class="w-full">
            <div class="sixth-page-top bg-gray-100"></div>
            <div class="flex flex-col items-center w-full bg-gray-100">
              <div class="w-full max-w-container-lg pl-3 md:pl-20 text-left">
                <div class="leading-normal lg:text-4.5xl text-2xl font-medium">
                  {{ sixthPageTitle }}
                </div>
                <div class="leading-normal lg:text-2.5xl text-base mt-2 mb-5">
                  {{ sixthPageSubtitle }}
                </div>
                <slider
                  v-if="sixthPage.length"
                  :slide="'packet'"
                  :bottomButtons="true"
                  :titleChangable="true"
                  @changeSlideTitle="changeSlideTitleFunc"
                >
                  <template v-slot:main>
                    <div
                      v-for="(sixth, index) in sixthPage"
                      :key="index"
                      ref="cardDiv"
                      :id="`box${index + 1}`"
                      class="relative snap-start flex flex-col justify-between bg-white rounded-xl min-w-[277px] max-w-[277px] lg:min-w-[467px] lg:max-w-[467px] z-10"
                    >
                      <div
                        class="grid grid-cols-12 place-items-center gap-4 p-4 lg:pt-0 pt-14 min-h-[335px]"
                      >
                        <div class="grid lg:col-span-4 col-span-12">
                          <div>
                            <img
                              :src="sixth.image"
                              :alt="sixth.nameSurname"
                              class="z-0"
                              draggable="false"
                            />
                            <div class="relative grid place-items-center z-10">
                              <div
                                class="absolute rounded-full rotate-[-13deg] w-28 h-10 z-negative"
                                :style="`background-color:${sixth.badgeBg}`"
                              ></div>
                              <div
                                class="text-xl font-medium"
                                :class="`text-${sixth.badgeColor}`"
                              >
                                {{ sixth.badgeName }}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          class="relative grid lg:col-span-8 col-span-12 gap-3 place-items-center h-min lg:pt-0 pt-4"
                        >
                          <div
                            class="absolute lg:-top-10 lg:-left-10 -top-64 right-16 text-[80px]"
                            :class="`text-${sixth.badgeColor}`"
                          >
                            ‘‘
                          </div>
                          <div class="">{{ sixth.subTitle }}</div>
                          <div class="w-full text-left">
                            <div>{{ sixth.nameSurname }}</div>
                            <div class="font-medium">{{ sixth.role }}</div>
                          </div>
                        </div>
                      </div>
                      <!-- <button
                        class="flex items-center gap-2 text-sm font-medium absolute lg:bottom-4 lg:top-auto lg:left-auto lg:right-4 top-36 left-4 z-negative"
                      >
                        <fa :icon="['fa', 'download']" class="w-4 h-4" />
                        <div>CV Indir</div>
                      </button> -->
                    </div>
                  </template>
                </slider>
              </div>
            </div>
            <div class="sixth-page-bottom bg-gray-100"></div>
          </div>

          <!-- 7th Page -->
          <div class="w-full -mt-32">
            <div class="seventh-page-top bg-piggyPink"></div>
            <div
              class="flex flex-col items-center w-full bg-piggyPink md:pb-24 pb-8 z-10"
            >
              <div class="w-full max-w-container-lg px-3 md:px-20 text-center">
                <div class="leading-normal lg:text-4.5xl text-2xl font-medium">
                  Bizim Takım
                </div>
                <div
                  class="leading-normal lg:text-2.5xl text-base mt-2 lg:mb-14 mb-6"
                >
                  Takımımız hakkında bilgi sahibi olun.
                </div>
                <slider
                  v-if="seventhPage.length"
                  :arrowButtons="true"
                  :slide="'packet'"
                  :arrowButtonType="'cornerBig'"
                >
                  <template v-slot:main>
                    <div
                      v-for="(seventh, index) in seventhPage"
                      :key="index"
                      ref="cardDiv"
                      class="snap-start flex flex-col justify-between rounded-xl min-w-[250px] max-w-[250px] lg:min-w-[321px] lg:max-w-[321px]"
                    >
                      <img
                        :src="seventh.image"
                        :alt="seventh.title"
                        class="rounded-t-xl"
                        draggable="false"
                      />
                      <div
                        class="flex flex-col bg-white rounded-b-xl gap-6 text-left p-3 pb-6 h-full"
                      >
                        <div class="text-xl font-medium">
                          {{ seventh.title }}
                        </div>
                        <div class="flex flex-col justify-between h-full gap-3">
                          <div
                            class="flex items-center gap-1 text-sm font-medium text-black-600"
                          >
                            <!-- <svg-icon :name="'clock'" class="w-4 h-4" /> -->
                            {{ seventh.readingTime }}
                          </div>
                          <div>
                            {{ seventh.subTitle }}
                          </div>
                          <main-button
                            @click="
                              $router.push({
                                name: seventh.buttonActionName,
                                params: { title: seventh.buttonParamName },
                              })
                            "
                            :text="seventh.buttonName"
                            :type="seventh.buttonType"
                            class="w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </template>
                </slider>
              </div>
            </div>
            <div class="seventh-page-bottom bg-piggyPink md:mt-0 mt-3"></div>
          </div>
        </div>
      </div>

      <div
        class="min-h-[100px] w-full -mt-[120px] -mb-8 z-negative bg-dolgerBlue"
      ></div>
      <div class="bg-dolgerBlue">
        <FooterBar />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/common/components/bars/navbar.vue";
import FooterBar from "@/common/components/bars/footerBar";
import mainButton from "@/common/components/buttons/mainButton.vue";
import slider from "@/common/components/widgets/slider.vue";
import Slider2 from "@/common/components/widgets/slider2.vue";
import loader from "@/common/components/loaders/loader.vue";

export default {
  components: {
    Navbar,
    FooterBar,
    mainButton,
    // badgesBar,
    slider,
    Slider2,
    loader,
  },
  data() {
    return {
      activeFirstPageSlideId: 0,
      firstPage: [
        {
          bgColor: "bg-water",
          title: "Sana Özel Matematik ile Tanış",
          subTitle: "Yapay zekâ, öğrenme becerine göre çalışmalar hazırlasın.",
          buttonName: "HEMEN BAŞLA",
          buttonActionName: "packets",
          url: require("@/assets/images/landing-page/first-page-2.mp4"),
        },
        {
          bgColor: "bg-piggyPink",
          title: "Yapay Zekâ ile Kolay ve Hızlı Başar",
          subTitle:
            "Adaptif öğrenme modeli ile öğrenciye özel çalışmalar ve veri analiz sistemi ile başarıyı artıran geri bildirimler.",
          buttonName: "HEMEN BAŞLA",
          buttonActionName: "packets",
          image: require("@/assets/images/landing-page/first-page-1.webp"),
        },
        {
          bgColor: "bg-lavender",
          title: "Yapay Zekâ ile Matematik'te Fark Yarat",
          subTitle:
            "Yapay Zekâ seni tanır, öğrenmeye hazır olduğun çalışmaya yönlendirir.",
          buttonName: "HEMEN BAŞLA",
          buttonActionName: "packets",
          image: require("@/assets/images/landing-page/first-page-4.webp"),
        },
        {
          bgColor: "bg-antiqueWhite",
          title: "İstediğin Zaman, İstediğin Yerde Çalış",
          subTitle:
            "Telefonda, tablette, bilgisayarda, internetin olduğu her yerde, istediğin zaman çalış.",
          buttonName: "HEMEN BAŞLA",
          buttonActionName: "packets",
          image: require("@/assets/images/landing-page/first-page-3.webp"),
        },
      ],
      activeThirdPageSlideId: 0,
      thirdPage: [
        {
          image: require("@/assets/images/landing-page/third-page-1.webp"),
          title: "Öğrenciye Özel Öğrenme",
          subTitle:
            "Teknopark'ta geliştirilmiş yapay zekâ, öğrenme becerine ve öğrenme hızına göre dinamik çalışmalar hazırlasın.",
        },
        {
          image: require("@/assets/images/landing-page/third-page-2.webp"),
          title: "Becerilerine Göre Öğren",
          subTitle:
            "Yapay zekâ, öğrenme becerine göre ihtiyacın olan sana özel çalışmayı hazırlasın: konuyu daha verimli ve etkili bir şekilde öğrenmene yardımcı olsun.",
        },
        {
          image: require("@/assets/images/landing-page/third-page-3.webp"),
          title: "Başarı Grafiğin Verilerle Yükselsin",
          subTitle:
            "Gelişim yolculuğu sayfan, öğrenme çabanın ve başarının net bir göstergesidir. Yapay zekânın gücüyle, hedefine bir adım daha yaklaşacaksın.",
        },
      ],
      packetCategoryList: [],
      activePacketCategoryId: "",
      packets: [],
      packetPending: false,
      sixthPage: [
        {
          subTitle:
            "Matematiğim iyiydi ama istediğim yeri kazanmak için eksiklerim vardı. Yapay zekâ eksiklerimi kapattı. Çok hızlı ilerlemeye başladım.",
          image: require("@/assets/images/landing-page/sixth-page-1.webp"),
          badgeName: "Yapay Zekâ",
          badgeBg: "#D2DFFF", // tailwind-de tanimli renkleri almadigi icin hex code ile tanimlama yapildi
          badgeColor: "dolgerBlue",
          nameSurname: "Defne K.",
          role: "Öğrenci",
          icon: require("@/assets/images/landing-page/white-bubble-with-three-dots.webp"),
        },
        {
          subTitle:
            "İlk defa yapay zekâ ile çalıştım. Başarabileceğimi fark edince, çalışmaya olan hevesim bayağı bir arttı!",
          image: require("@/assets/images/landing-page/sixth-page-2.webp"),
          badgeName: "Başarı",
          badgeBg: "#D2DFFF",
          badgeColor: "dolgerBlue",
          nameSurname: "Arda S.",
          role: "Öğrenci",
          icon: require("@/assets/images/landing-page/blue-bubble-with-three-dots.webp"),
        },
        {
          subTitle:
            "Yapay zekâ desteğiyle hatalarımı düzelttim. Yanlışlarım doğru oldu diyebilirim. Hem ders notlarım yükseldi hem de sınavlarda netlerim arttı.",
          image: require("@/assets/images/landing-page/sixth-page-3.webp"),
          badgeName: "İlerleme",
          badgeBg: "#D2DFFF",
          badgeColor: "dolgerBlue",
          nameSurname: "Ayça T.",
          role: "Öğrenci",
          icon: require("@/assets/images/landing-page/white-bubble-with-three-dots.webp"),
        },
        {
          subTitle:
            "Özel ders veren bir öğretmen olarak, öğrencinin seviyesini genel olarak anlayabiliyorum. Ancak tanı testlerinin öğrencinin eksik kazanımlarını nokta atışı tespit etmesi sayesinde öğrencimle beklentimin çok üstünde ilerleme sağladık.",
          image: require("@/assets/images/landing-page/sixth-page-4.webp"),
          badgeName: "Tanı Testi",
          badgeBg: "#FFDBC2",
          badgeColor: "orange-400",
          nameSurname: "Ahmet K.",
          role: "Öğretmen",
          icon: require("@/assets/images/landing-page/blue-bubble-with-three-dots.webp"),
        },
        {
          subTitle:
            "Her öğrencinin kendi eksikliğini tespit eden Tanı Testi muazzam. Yapay zekâ ile öğrenme deneyimi daha etkili ve kişiselleştirilmiş hale gelmiş. Tüm öğrencilerime tavsiye ediyorum.",
          image: require("@/assets/images/landing-page/sixth-page-5.webp"),
          badgeName: "Öneriyorum",
          badgeBg: "#FFDBC2",
          badgeColor: "orange-400",
          nameSurname: "Öykü L.",
          role: "Öğretmen",
          icon: require("@/assets/images/landing-page/white-bubble-with-three-dots.webp"),
        },
        {
          subTitle:
            "Tanılama raporları, değerlendirmeler ve gelişim alanları son derece yardımcı oluyor. Öğrencilerimden sonuçlarını benimle de paylaşmasını istiyorum.",
          image: require("@/assets/images/landing-page/sixth-page-6.webp"),
          badgeName: "Güvenilir",
          badgeBg: "#FFDBC2",
          badgeColor: "orange-400",
          nameSurname: "Elif T.",
          role: "Öğretmen",
          icon: require("@/assets/images/landing-page/blue-bubble-with-three-dots.webp"),
        },
        {
          subTitle:
            "Çocuğumun özellikle Matematik dersinde başarılı olmasını istiyordum. Kısa sürede eksikliklerini kapattığı için kendine güven geldiğini gördüm. Onun heyecanı ve başarısı bizi de mutlu ediyor.",
          image: require("@/assets/images/landing-page/sixth-page-7.webp"),
          badgeName: "İçim rahat",
          badgeBg: "#F4D0DF",
          badgeColor: "pink-600",
          nameSurname: "Levent V.",
          role: "Veli",
          icon: require("@/assets/images/landing-page/white-bubble-with-three-dots.webp"),
        },
        {
          subTitle:
            "Çocuğumuzun tekrar tekrar çalışmasının önemli olduğunu düşünüyorduk ama aynı konuları tekrarlamak yerine eksikliklerini gidermesi onu daha başarılı yaptı.",
          image: require("@/assets/images/landing-page/sixth-page-8.webp"),
          badgeName: "Hızlı başarı",
          badgeBg: "#F4D0DF",
          badgeColor: "pink-600",
          nameSurname: "Zeynep V.",
          role: "Veli",
          icon: require("@/assets/images/landing-page/blue-bubble-with-three-dots.webp"),
        },
        {
          subTitle:
            "Kızım LGS'ye girecek, geçen sene matematik'te sınıf ortalamasının altındaydı. Bu uygulamayla karşılaşmamız bizim içim şans oldu. Şu an tüm geçmiş sınıflarının eksikliklerini tamamladı. Umarım istediğimiz okulu kazanırız.",
          image: require("@/assets/images/landing-page/sixth-page-9.webp"),
          badgeName: "Verimli",
          badgeBg: "#F4D0DF",
          badgeColor: "pink-600",
          nameSurname: "Sevgi H.",
          role: "Veli",
          icon: require("@/assets/images/landing-page/white-bubble-with-three-dots.webp"),
        },
      ],
      sixthPageTitle: "Öğrenciler Ne Diyor?",
      sixthPageSubtitle: "Çocukların Matematik başarısındaki değişimler.",
      seventhPage: [
        {
          image: require("@/assets/images/landing-page/seventh-page-1.webp"),
          title: "Ayxan Sadiqov",
          readingTime: "Frontend Developer",
          subTitle:
            "Ayxan haqqinda qisa bilgi",
          buttonName: "CV İndir",
          buttonActionName: "blog",
          buttonParamName: "kendimizi-taniyarak-baslayalim-mi", // bu deger blog sayfasindaki "paramsList"-i icermeli
          buttonType: "blue-bordered",
        },
        {
          image: require("@/assets/images/landing-page/seventh-page-7.webp"),
          title: "Behruz Veliyev",
          readingTime: "React Native Developer",
          subTitle:
            "Behruz haqqinda qisa bilgi",
          buttonName: "CV İndir",
          buttonActionName: "blog",
          buttonParamName: "kendimizi-taniyarak-baslayalim-mi", // bu deger blog sayfasindaki "paramsList"-i icermeli
          buttonType: "blue-bordered",
        },
        {
          image: require("@/assets/images/landing-page/seventh-page-8.webp"),
          title: "Ehtiram Xudiyev",
          readingTime: "React Native Developer",
          subTitle:
            "Ehtiram haqqinda qisa bilgi",
          buttonName: "CV İndir",
          buttonActionName: "blog",
          buttonParamName: "kendimizi-taniyarak-baslayalim-mi", // bu deger blog sayfasindaki "paramsList"-i icermeli
          buttonType: "blue-bordered",
        },
        {
          image: require("@/assets/images/landing-page/seventh-page-9.webp"),
          title: "Ayxan Sadiqov",
          readingTime: "Frontend Developer",
          subTitle:
            "Ayxan haqqinda qisa bilgi",
          buttonName: "CV İndir",
          buttonActionName: "blog",
          buttonParamName: "kendimizi-taniyarak-baslayalim-mi", // bu deger blog sayfasindaki "paramsList"-i icermeli
          buttonType: "blue-bordered",
        },
        {
          image: require("@/assets/images/landing-page/seventh-page-2.webp"),
          title: "Behruz Veliyev",
          readingTime: "React Native Developer",
          subTitle:
            "Behruz haqqinda qisa bilgi",
          buttonName: "CV İndir",
          buttonActionName: "blog",
          buttonParamName: "kendimizi-taniyarak-baslayalim-mi", // bu deger blog sayfasindaki "paramsList"-i icermeli
          buttonType: "blue-bordered",
        },
        {
          image: require("@/assets/images/landing-page/seventh-page-3.webp"),
          title: "Ehtiram Xudiyev",
          readingTime: "React Native Developer",
          subTitle:
            "Ehtiram haqqinda qisa bilgi",
          buttonName: "CV İndir",
          buttonActionName: "blog",
          buttonParamName: "kendimizi-taniyarak-baslayalim-mi", // bu deger blog sayfasindaki "paramsList"-i icermeli
          buttonType: "blue-bordered",
        },
      ],
      videoMuted: true,
      loadingVideo: true,
      // blinkEvent: null
    };
  },
  mounted() {
    window.addEventListener("resize", this.showFirstPageDots);
    var video = this.$refs.slideVideo1[0];
    video.addEventListener("canplay", this.videoCanPlay);
    // document.addEventListener("visibilitychange", this.ifOnAnotherPage)
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.showFirstPageDots);
    // document.removeEventListener("visibilitychange", this.ifOnAnotherPage)
  },
  computed: {},
  methods: {
    changeSlideTitleFunc(val) {
      // 'first' > ilk 3lu div, 'second' > 3-6 div-ler icin, 'third' > 6-9 div-ler icin
      if (val == "first") {
        this.sixthPageTitle = "Öğrenciler Ne Diyor?";
        this.sixthPageSubtitle =
          "Çocukların Matematik başarısındaki değişimler.";
      } else if (val == "second") {
        this.sixthPageTitle = "Öğretmenler Ne Diyor?";
        this.sixthPageSubtitle =
          "Çocukların Matematik başarısındaki değişimler.";
      } else {
        this.sixthPageTitle = "Veliler Ne Diyor?";
        this.sixthPageSubtitle =
          "Çocukların Matematik başarısındaki değişimler.";
      }
    },
    showFirstPageDots() {
      if (window.innerWidth > 1024) return false;
      else return true;
    },
    unMuteVideo() {
      this.videoMuted = false;
      var video = this.$refs.slideVideo1[0];
      video.muted = false;
    },
    videoCanPlay() {
      this.loadingVideo = false;
    },
    // ifOnAnotherPage() {
    //   var isPageActive = !document.hidden;
    //   if(!isPageActive){
    //     this.blink();
    //   }else {
    //     document.title = "Edunext"; // tekrar geri geldiginde sayfa basliginin adi
    //     clearInterval(this.blinkEvent);
    //   }
    // },
    // blink(){
    //   // sayfada olmadiginda baslik sirayla "Edunext" ve "attentionMessage" olarak degisir
    //   var attentionMessage = '*Geri Gel!';
    //   this.blinkEvent = setInterval(function() {
    //     if(document.title === attentionMessage){
    //       document.title = "Edunext";
    //     }else {
    //       document.title = attentionMessage;
    //     }
    //   }, 100);
    // }
  },
};
</script>

<style scoped>
.third-page-top {
  position: relative;
  bottom: -40px;
  width: 100%;
  height: 120px;
  border-radius: 50%;
  border-top-left-radius: 100%;
  border-top-right-radius: 200%;
  z-index: -1;
}
.third-page-bottom {
  position: relative;
  top: -40px;
  width: 100%;
  height: 120px;
  border-radius: 50%;
  border-bottom-left-radius: 200%;
  border-bottom-right-radius: 100%;
  z-index: -1;
}
.sixth-page-top {
  position: relative;
  bottom: -40px;
  width: 100%;
  height: 120px;
  border-radius: 50%;
  border-top-left-radius: 200%;
  border-top-right-radius: 100%;
  z-index: -1;
}
.sixth-page-bottom {
  position: relative;
  top: 0px;
  width: 100%;
  height: 150px;
  z-index: -1;
}
.seventh-page-top {
  position: relative;
  bottom: -40px;
  width: 100%;
  height: 120px;
  border-radius: 50%;
  border-top-left-radius: 100%;
  border-top-right-radius: 200%;
  z-index: -1;
}
.seventh-page-bottom {
  position: relative;
  top: -40px;
  width: 100%;
  height: 120px;
  border-radius: 50%;
  border-bottom-left-radius: 200%;
  border-bottom-right-radius: 100%;
  z-index: 1;
}

.scrollbar {
  scrollbar-width: none;
}
.scrollbar::-webkit-scrollbar {
  display: none;
}

.bg-color-transition {
  -webkit-transition: background-color 500ms linear;
  -moz-transition: background-color 500ms linear;
  -o-transition: background-color 500ms linear;
  -ms-transition: background-color 500ms linear;
  transition: background-color 500ms linear;
}
.bottom-curved {
  border-radius: 0% 0% 300% 300%/0% 0% 60% 60%;
}

.background-animation {
  background: linear-gradient(132deg, #df5b93, #1c7bff, #333333);
  background-size: 400% 400%;
  animation: anim-gradient 15s ease infinite;
}
@keyframes anim-gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>