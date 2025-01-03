// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-11-01',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },

  plugins: [
    '~/plugins/i18.ts',
    '~/plugins/ic/ic.ts'
  ],

  runtimeConfig: {
    public: {
      backendCanisterId: process.env.NUXT_PUBLIC_CANISTER_ID_BACKEND,
      network: process.env.NUXT_PUBLIC_DFX_NETWORK
    }
  },

  modules: ['@nuxt/icon']
})