require('dotenv').config()
import axios from 'axios'
export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Super Intendance',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Lato&family=Yanone+Kaffeesatz&display=swap'},
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css'}
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    'assets/css/main.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/v-select.js',
    { src:'~/plugins/vue-toggle.js', mode: 'client'},
    { src: '~/plugins/vuex-persist', ssr: false }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    //'@nuxtjs/eslint-module'
    '@nuxtjs/google-analytics'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    '@nuxtjs/bulma',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/toast',
    'nuxt-clipboard'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  pwa: {
    manifest: {
      name: 'Super Intendance',
      short_name: 'Super Intendance',
      description: 'Te facilite ton intendance durable',
      orientation: 'portrait',
      lang: 'fr-BE',
      useWebmanifestExtension: false,
      theme_color: '#569aa0',
      background_color: '#dbe391',
    },
    icon: {
      fileName: 'app-icon.png'
    }
  },

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  toast: {
    position: 'bottom-center'
  },

  googleAnalytics: {
    id: 'G-K0PVGSRVY5'
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    transpile: ['v-select']
  },
  generate: {
    /*routes(){
      console.log("generate")
      let recettes = axios({
        url: "https://api.baseql.com/airtable/graphql/apptVpg9XpET0IEyv",
        method: "post",
        data: {
          query: `{
            recettes {
              id
              description
              nom
              nombreDePersonnes
              procedure
              compositions {
                  nom
                  quantite
                  unites
                  nomIngredient
                  prix
                  mesure
              }
              prix
              slug
              prix
              assietteAutre
              assietteCereale
              assietteLegume
              assietteLegumineuse
              contactAuteur
              auteur
            }
          }`,
        },
      }).then((result) => {
        return result.data.data.recettes.map(recette => {
          return {
            route: 'recette/' + recette.slug,
            payload: recette
          }
        })        
      });

      return Promise.all([recettes]).then((values) => {
        console.log(values);
        return values[0];
      });
      
     
    },*/
    fallback: true
  }
}
