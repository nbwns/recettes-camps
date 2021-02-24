<template>
    <div>
        <section class="hero">
            <div class="hero-body">
                <div class="container">
                    <nav class="level">
                        <div class="level-left">
                        <div class="level-item">
                            <div class="container">
                                <nuxt-link to="/">&lt; Retour</nuxt-link>
                                <h1 class="title pt-2">
                                {{recette.nom}}
                                </h1>
                            </div>
                        </div>
                        </div>
                        <div class="level-right">
                            
                                <button class="button">Mon menu de camp
                                    <span class="tag ml-2">{{menu.length}}</span>
                                </button>
                            
                        </div>
                    </nav>
                </div>
            </div>
        </section>

        <div class="container">  
            <div class="columns" v-if="recette.description">
                <div class="column">
                    <article class="message">
                        <div class="message-body">
                            {{recette.description}}
                        </div>
                    </article>
                </div>
            </div>  
            <div class="columns">
                <div class="column is-half">
                     <div class="field is-horizontal">
                        <div class="field-label ">
                            <label class="label">Couverts</label>
                        </div>
                        <div class="field-body">
                            <div class="field is-narrow">
                                <div class="control">
                                    <input class="input" type="number" v-model="plates">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column is-mobile">
                    <div class="buttons">
                        <button class="button is-primary" @click="addToMenu(recette)">📝 Ajouter au menu</button>
                        <button class="button">✨ Personnaliser</button>
                        <button class="button">🖨️ Imprimer</button>
                    </div>
                </div>
            </div>
           
            <div class="columns">
                <div class="column">
                    <h2 class="is-size-4">Ingrédients</h2>
                    
                    <div class="columns m-0 p-0 is-mobile">
                        <div class="column">
                            <strong>Quantité</strong>
                        </div>
                        <div class="column">
                            <strong>Prix indicatif 
                                    <span class="clickable"  @click="modal = true">
                                        ❓
                                    </span>
                            </strong>
                        </div>
                    </div>
                    <div v-for="compo in recette.compositions" :key="compo.nom" class="columns m-0 p-0 is-mobile">
                        <div class="column">
                            {{Math.floor(compo.quantite * plateRatio)}} {{compo.unites}} {{compo.nomIngredient[0]}}
                        </div>
                        <div class="column">
                            {{ (compo.prix * plateRatio).toFixed(2) }} €
                        </div>
                    </div>
                    <div class="columns is-mobile m-0 p-0">
                        <div class="column"><strong>Prix du plat</strong></div>
                        <div class="column">{{(recette.prix * plateRatio).toFixed(2)}} €</div>
                    </div>
                </div>
                <div class="column">
                    <h2 class="is-size-4">Préparation</h2>
                    <div class="pl-5" v-html="procedure"></div>
                </div>
            </div>            
        </div>
        <div class="modal" :class="{'is-active': modal}">
            <div class="modal-background"></div>
            <div class="modal-content">
                <article class="message is-info">
                    <div class="message-header">
                        <p>Prix indicatif</p>
                        <button class="delete" aria-label="delete" @click="modal=false"></button>
                    </div>
                    <div class="message-body">
                        Les prix sont basés sur l'offre du Marché de la Glacière à Saint-Gilles qui travaille en direct avec des petits producteurs et grossistes bio.
                    </div>
                    </article>
            </div>
            <button class="modal-close is-large" aria-label="close"></button>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import marked from 'marked'
import Header from '~/components/Header'

export default {
    components: {
      Header
    },
     data () {
        return {
            recette: null,
            plates: 0,
            modal: false
        }
    },
    computed: {
        procedure(){
            return marked(this.recette.procedure)
        },
        plateRatio(){
            return this.plates / this.recette.nombreDePersonnes;
        },
        menu () {
            return this.$store.state.menu || []
        }
    },
    methods:{
      addToMenu(recette){
          this.$store.commit('add', recette);
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
                        description
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