<template>
  <div class="page-wrapper">
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

      <div class="container content-wrapper">
        <div class="columns is-multiline  mt-6">
            <div class="column is-one-quarter" v-for="recette in recettes" :key="recette.slug">
              <nuxt-link :to="{path: '/recette/'+recette.slug}">
                <div class="card" >
                  <div class="card-content">
                    <p class="title">
                      {{recette.nom}}
                    </p>
                    <div class="content">
                      {{recette.introduction}}
                    </div>
                    <span class="tag is-success is-light">{{recette.diet}}</span>
                  </div>
                  <footer class="card-footer">
                    <p class="card-footer-item">
                      <span>
                        <button class="button is-primary">Voir la recette</button>
                      </span>
                    </p>
                  </footer>
                </div>
              </nuxt-link>
            </div>
        </div>
      </div>

      <footer class="footer">
        <div class="content has-text-centered">
          <p>
            Outil cuisiné par <a href="https://www.fristouille.org">Fristouille</a>
          </p>
        </div>
      </footer>
      <nuxt-link to="ajouter"><div class="fab"> + </div></nuxt-link>
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
    methods:{
      addToMenu(recette){
          this.$store.commit('add', recette);
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
                  diet,
                  introduction
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

<style scoped>
.page-wrapper {
	display: flex;
	min-height: 100vh;
	flex-direction: column;
}

.content-wrapper {
	flex: 1;
}

.fab {
   width: 70px;
   height: 70px;
   background-color: var(--color-yellow);
   border-radius: 50%;
   box-shadow: 0 2px 4px 0 #666;
   
   font-size: 50px;
   line-height: 70px;
   color: var(--color-blue);
   text-align: center;
   
   position: fixed;
   right: 20px;
   bottom: 20px;
   
  transition: all 0.1s ease-in-out;
  cursor: pointer;
}

.fab:hover {
   box-shadow: 0 6px 14px 0 #666;
   transform: scale(1.05);
}
</style>
