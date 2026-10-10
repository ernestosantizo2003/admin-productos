const { defineConfig } = require("cypress")
module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    video: true,                                  // graba video de la corrida
    setupNodeEvents(on, config) {},
  },
})