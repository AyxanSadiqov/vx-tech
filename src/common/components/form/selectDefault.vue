NOT: "startsWith" > "includes" ile degistiginde aratilan harf tum string-lerde olacaktir.
<template>
  <div v-if="options.length" class="relative flex">
    <input
      type="text"
      @focus="dropdown = true"
      @blur="closeDropdown"
      :placeholder="placeholder"
      :value="selectedOption"
      readonly
      class="bg-transparent flex items-start h-full w-40 text-sm lg:text-base cursor-pointer text-black-800 outline-none flags"
      :class="disabled ? 'cursor-not-allowed' : null"
      :style="disabled ? 'cursor:not-allowed;' : null"
      :disabled="disabled"
    />
    <div
      v-show="dropdown"
      class="absolute w-full top-full left-0 border border-gray-400 bg-white mt-2 rounded-md p-4 grid gap-2 shadow-1 z-20 overflow-y-auto"
      style="max-height: 245px"
    >
      <template v-if="options.length">
        <div v-if="searchable">
          <input
            v-model="searchInput"
            @focus="focusSearchInput"
            @blur="blurSearchInput"
            placeholder="Ara"
            class="w-full h-10 lg:h-13 bg-white rounded-md border border-gray-400 px-4 transition-all text-base placeholder-black-600 focus:ring-1 focus:ring-dolgerBlue"
          />
        </div>
        <div
          v-for="(option, index) in optionFunc"
          :key="'select' + index"
          :class="[
            'cursor-pointer hover:bg-inputBackground rounded-md py-3 px-4 text-sm lg:text-base flags text-left',
            !multiSelect
              ? value == option.value
                ? 'bg-gray-200'
                : ''
              : value.includes(option.value)
              ? 'bg-gray-200'
              : '',
          ]"
          @click="selectOption(option)"
          v-html="optionName(option.name)"
        ></div>
        <div v-if="optionFunc.length <= 0" class="pt-1 text-gray-400">
          Sonuç bulunamadı
        </div>
      </template>
      <template v-else>
        <div class="py-3 px-4 text-sm lg:text-base">
          {{ $t("error.list.noSearchResult") }}
        </div>
      </template>
    </div>
    <div
      v-if="!disabled"
      @click="toggleDropdownIcon()"
      class="absolute right-4 top-0 h-full flex items-center transition-transform duration-500 ease-in-out cursor-pointer"
    >
      <slot name="chevron-down-special">
        <fa
          :icon="['fa', 'chevron-down']"
          class="w-4 h-4 text-black-600 transition-all"
          :class="dropdown ? 'rotate-180' : null"
        />
      </slot>
    </div>
  </div>
</template>

<script>
import { TrToEn } from "@/common/helpers/user";

export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    value: {
      type: [String, Number, Array, Object, Boolean],
      default: 0,
    },
    placeholder: {
      type: String,
      default: "",
    },
    multiSelect: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    searchable: {
      type: Boolean,
      default: false,
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dropdown: false,
      searchInputFocused: false, // eventListener-siz arama inputu tiklandiginda dropdown kapanmasin kontrolu bu deger ile yapildi
      searchInput: "",
      TrToEn,
    };
  },
  computed: {
    selectedOption() {
      const list = this.options.filter((item) => item.value == this.value);
      let selectedOption = "";
      if (list.length) {
        selectedOption = list[0].name;
      } else {
        if (this.multiSelect) {
          var selectedArr = [];
          this.options.forEach((o) => {
            this.value.forEach((v) => {
              if (o.value == v) {
                selectedArr.push(o.name);
              }
            });
          });
          selectedOption = String(selectedArr);
        } else {
          selectedOption = this.options[0].name;
        }
      }
      return selectedOption;
    },
    optionFunc() {
      return this.options.filter((o) =>
        this.TrToEn(o.name)
          .toLowerCase()
          .startsWith(this.TrToEn(this.searchInput).toLowerCase())
      );
    },
  },
  methods: {
    focusSearchInput() {
      this.searchInputFocused = true;
    },
    blurSearchInput() {
      this.closeDropdown();
      this.searchInputFocused = false;
    },
    optionName(optionName) {
      // asagidaki islemler arama inputu olursa diye aranan kelimeyi belirtmek icin
      let result = optionName;
      let copyOfOpt = String(optionName).slice();
      let convertedCopyOfOpt = this.TrToEn(copyOfOpt).toLowerCase();
      let convertedSearchInput = this.TrToEn(this.searchInput).toLowerCase();
      if (convertedCopyOfOpt.startsWith(convertedSearchInput)) {
        const firstIndex = convertedCopyOfOpt.indexOf(convertedSearchInput);
        const lastIndex = firstIndex + convertedSearchInput.length;
        const firstPart = copyOfOpt.substring(0, firstIndex);
        const searchedPart = copyOfOpt.substring(firstIndex, lastIndex);
        const lastPart = copyOfOpt.substring(lastIndex, copyOfOpt.length);
        result = `<span>${firstPart}<span class="bg-dolgerBlue bg-opacity-30">${searchedPart}</span>${lastPart}</span>`;
      }
      return result;
    },
    closeDropdown() {
      setTimeout(() => {
        if (this.searchInputFocused) return;
        this.dropdown = false;
        this.searchInput = "";
      }, 250);
    },
    selectOption(option) {
      this.dropdown = false;
      if (this.multiSelect) {
        if (option.value == null) return;
        const value = this.value.includes(option.value)
          ? this.value.filter((v) => v != option.value)
          : [...this.value, option.value];
        this.$emit("input", value);
      } else if (option.value != this.value) {
        this.$emit("input", option.value);
        this.$emit("searched", option);
      }
    },
    toggleDropdownIcon() {
      if (this.dropdown == false) {
        this.dropdown = true;
      } else {
        this.dropdown = false;
      }
    },
  },
};
</script>

<style scoped>
@font-face {
  font-family: NotoColorEmojiLimited;
  unicode-range: U+1F1E6-1F1FF;
  src: url(https://raw.githack.com/googlefonts/noto-emoji/main/fonts/NotoColorEmoji.ttf);
}
.flags {
  font-family: 'NotoColorEmojiLimited', -apple-system, BlinkMacSystemFont, 
  'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 
  'Segoe UI Emoji', 'Segoe UI Symbol';
}
</style>
