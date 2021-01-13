require('dotenv').config()
import axios from 'axios'
export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'CalculaCamp',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    //'@nuxtjs/eslint-module'
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
    '@nuxt/content'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    }
  },
  generate: {
    routes(){
      console.log("generate")
      let recettes = axios({
        url: "https://api.baseql.com/airtable/graphql/apptVpg9XpET0IEyv",
        method: "post",
        data: {
          query: `{
            recettes {
              nom
              nombreDePersonnes
              procedure
              compositions {
                  nom
                  quantite
                  unites
                  nomIngredient
                  prix
              }
              prix
              slug
            }
          }`,
        },
      }).then((result) => {
      console.log("plop")
        return result.data.data.recettes.map(recette => {
          return {
            route: '/recette/' + recette.slug,
            payload: recette
          }
        })        
      });

      return Promise.all([recettes]).then((values) => {
        console.log(values);
        return values;
      });
      
     
    }
  }
}
