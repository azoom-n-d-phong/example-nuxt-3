// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=500, initial-scale=1',
      title: 'Nuxt 3',
      meta: [
        { name: 'description', content: 'Nuxt 3' } // ~ <meta name="description" content="Nuxt 3">
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700&display=swap'
        }
      ]
    }
  },
  css: ['@/assets/scss/main.scss'],
  modules: ['@vuestic/nuxt'],
  vuestic: {
    config: {
      colors: {
        variables: {
          primary: '#284e68',
          backgroundPrimary: '#f9f9f7',
          backgroundSecondary: '#f9f9f7',
          backgroundElement: '#fff',
          backgroundBorder: '#284E687F'
        }
      },
      components: {
        VaInput: {
          outline: true,
        }
      }
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/assets/scss/utils/_mixins.scss";
          `
        }
      }
    }
  }
});
