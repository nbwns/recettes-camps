<template>
    <div>
      <section class="hero">
        <div class="hero-body">
          <div class="container">
            <nuxt-link to="/">&lt; Retour</nuxt-link>
            <h1 class="title pt-2">
              {{recette.nom}}
            </h1>
          </div>
        </div>
      </section>

        <div class="container">  
            <div class="columns">
                <div class="column is-half">
                     <div class="field is-horizontal">
                        <div class="field-label">
                            <label class="label">Nombre de couverts</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <input class="input" type="text" v-model="plates" style="width: 11%;">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
            <div class="columns">
                <div class="column">
                    <h2 class="is-size-4">Ingrédients</h2>
                    <div v-for="compo in recette.compositions" :key="compo.nom" class="columns m-0 p-0">
                        <div class="column">
                            {{Math.floor(compo.quantite * plateRatio)}} {{compo.unites}} {{compo.nomIngredient[0]}}
                        </div>
                        <div class="column">
                            {{ (compo.prix * plateRatio).toFixed(2) }} €
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column"><strong>Prix du plat</strong></div>
                        <div class="column">{{(recette.prix * plateRatio).toFixed(2)}} €</div>
                    </div>
                </div>
                <div class="column">
                    <h2 class="is-size-4">Préparation</h2>
                    <div v-html="procedure"></div>
                </div>
            </div>            
        </div>
    </div>
</template>

<script>
import axios from "axios"
import marked from 'marked'

export default {
     data () {
        return {
            recette: null,
            plates: 0
        }
    },
    computed: {
        procedure(){
            return marked(this.recette.procedure)
        },
        plateRatio(){
            return this.plates / this.recette.nombreDePersonnes;
        }
    },
    asyncData({ params, error, payload }){
        console.log(payload);
        console.log(params)
        if (payload){
            return { recette: payload, plates: payload.nombreDePersonnes };
        }
        else {
            return axios({
                url: "https://api.baseql.com/airtable/graphql/apptVpg9XpET0IEyv",
                method: "post",
                data: {
                query: `{
                   recettes(slug: "${params.index}") {
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
                    }
                }`,
                },
            }).then((result) => {
                return {
                    recette: result.data.data.recettes[0],
                    plates: result.data.data.recettes[0].nombreDePersonnes
                }
            })
        }
  }
}
</script>

<style>

</style>