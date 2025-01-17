// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  components: [
    { path: '~/src/components' },
  ],
  plugins: [
    '~/src/plugins/ic/ic'
  ],
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      backendCanisterId: process.env.NUXT_PUBLIC_CANISTER_ID_BACKEND,
      network: process.env.NUXT_PUBLIC_DFX_NETWORK
    }
  },
})
