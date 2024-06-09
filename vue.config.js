const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false,
    },
  },
  publicPath: process.env.NODE_ENV === "production" ? "/vx-tech/" : "/",
  transpileDependencies: true
})
