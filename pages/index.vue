<template>
  <div class="page-wrapper">
      <Header className="is-primary">
      </Header>

      <div class="container content-wrapper">
		<h2 class="title is-2 mt-4">
			Les recettes
		</h2>
        <div class="columns is-multiline  mt-4" v-if="loading">
            <div class="column is-one-quarter "><div class="emptystate emptycard">&nbsp;</div></div>
            <div class="column is-one-quarter "><div class="emptystate emptycard">&nbsp;</div></div>
            <div class="column is-one-quarter "><div class="emptystate emptycard">&nbsp;</div></div>
            <div class="column is-one-quarter "><div class="emptystate emptycard">&nbsp;</div></div>
        </div>            

        <div class="columns is-multiline  mt-4">
            <recipe-card v-for="recette in recettes" :key="recette.slug" :recipe="recette"/>
			<div class="column is-one-quarter" v-if="!loading" >
				<div class="card has-background-primary" >
					<div class="card-content">
						<p class="title mb-0 has-text-white">Ajoute ta recette</p>
						<div class="content mt-3 has-text-white">
							Fais découvrir ta meilleure recette aux autres unités en l'ajoutant à Super Intendance
						</div>
					</div>
					<footer class="card-footer">
						<p class="card-footer-item">
							<nuxt-link to="/recette/ajouter">
								<button class="button">Ajouter une recette</button>
							</nuxt-link>
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
import Header from '~/components/Header'
import RecipeCard from '~/components/RecipeCard'

export default {
  components: {
      Header,
      RecipeCard
    },
     data () {
        return {
            recettes: [],
            loading: true
        }
    },
    mounted(){
        return axios({
            url: this.$config.baseqlURL,
            method: "post",
            data: {
            query: `{
                recettes(_order_by: "nom") {
                  id
                  nom
                  slug
                  diet
                  introduction
                  auteur
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
