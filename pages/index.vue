<template>
  <div>
      <section class="hero is-primary">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              Camps zéro déchet
            </h1>
            <h2 class="subtitle">
              Fiches recettes et création de menus
            </h2>
          </div>
        </div>
      </section>

      <div class="container mt-6" v-show="loading">
        ça arrive...
      </div>

      <div class="container">
        <div class="columns mt-6">
            <div class="column is-one-quarter" v-for="recette in recettes" :key="recette.slug">
              <div class="card" >
                <div class="card-content">
                  <p class="title">
                    {{recette.nom}}
                  </p>
                  <span class="tag is-success is-light">{{recette.diet}}</span>
                </div>
                <footer class="card-footer">
                  <p class="card-footer-item">
                    <span>
                      <nuxt-link :to="{path: '/recette/'+recette.slug}">Voir la recette</nuxt-link>
                    </span>
                  </p>
                  <p class="card-footer-item">
                    <span>
                      Ajouter au menu
                    </span>
                  </p>
                </footer>
              </div>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from "axios"
export default {
     data () {
        return {
            recettes: [],
            loading: true
        }
    },
    mounted(){
        return axios({
            url: "https://api.baseql.com/airtable/graphql/apptVpg9XpET0IEyv",
            method: "post",
            data: {
            query: `{
                recettes(_order_by: "nom") {
                  nom
                  slug,
                  diet
                }
            }`,
            },
        }).then((result) => {
            console.log(result.data)
            this.recettes = result.data.data.recettes;
            this.loading = false;
        })
    }
  }
</script>

<style>

</style>
