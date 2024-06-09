const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  pluginOptions: {
    i18n: {
      locale: "tr",
      fallbackLocale: "tr",
      localeDir: "locales",
      enableInSFC: false,
    },
  },
  transpileDependencies: true
})
