<template>
  
<div>
    <Header>
        <h1 class="title is-1">
            Ajouter une recette
        </h1>
    </Header>
 
       <div class="container" v-if="ajoutee">
        <div class="columns">
            <div class="column">
                <div class="notification is-primary">
                    Recette ajoutée ! <br/>
                    <nuxt-link :to="{path: '/recette/'+slug}">Je vais voir la recette</nuxt-link>
                </div>
            </div>
        </div>
       </div>

      <div class="container" v-if="!ajoutee">
        <div class="columns">
            <div class="column is-half">
                <div class="field">
                    <label class="label">Nom de la recette</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Salade de pommes de terre" v-model="recette.nom">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Auteur</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="97ème de Saint-Glinglin" v-model="recette.auteur">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Type</label>
                    <div class="control">
                        <div class="select">
                            <select v-model="recette.type">
                                <option>Omnivore</option>
                                <option>Végétarien</option>
                                <option>Végétalien</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Nombre de couverts</label>
                    <div class="control">
                        <input class="input" type="number" placeholder="5" v-model="recette.couverts">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Procédure</label>
                    <div class="control">
                        <textarea class="textarea" placeholder="1. Eplucher les pommes de terre" v-model="recette.procedure"></textarea>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Ingrédients</label>
                </div>

                <div class="field is-horizontal" v-for="compo in recette.compositions" :key="compo.id">
                    
                    <div class="field-body">
                        <div class="field">
                            <p class="control">
                                <input class="input" type="number" placeholder="800" v-model="compo.quantite">
                            </p>
                        </div>
                        <div class="field">
                            <span class="control">
                                <div class="select" >
                                    <select v-model="compo.unite">
                                        <option>gr</option>
                                        <option>kg</option>
                                        <option>l</option>
                                        <option>ml</option>
                                    </select>
                                </div>
                            </span>
                        </div>
                        <div class="field">
                            <p class="control">
                                <v-select :options="ingredients" v-model="compo.ingredient"></v-select>
                            </p>
                        </div>
                    </div>
                </div>

                <div>
                    <button class="button is-fullwidth" @click="ajouterIngredient">Ajouter un ingrédient</button>
                </div>

                <div class="field">
                    <div class="control">
                        <button class="button is-primary" @click="ajouter()">Envoyer</button>
                    </div>
                </div>

            </div>
        </div>

        
      </div>

</div>



</template>

<script>
import axios from "axios"
import Header from '~/components/Header'

export default {
    components: {
      Header
    },
     data () {
        return {
            recette: {
                nom: null,
                auteur: null,
                couverts: null,
                procedure: null,
                type: 'Omnivore',
                compositions: [
                    {
                        id:1,
                        quantite: null,
                        unite: 'gr',
                        ingredient: {code:0, label: null}
                    },
                    {
                        id:2,
                        quantite: null,
                        unite: 'gr',
                        ingredient: {code:0, label: null}
                    }
                ]
            },
            ingredients: [],
            ajoutee: false,
            slug: null
        }
    },
    methods:{
        ajouterIngredient() {
            this.recette.compositions.push(
                {
                    id:2,
                    quantite: null,
                    unite: 'gr',
                    ingredient: null
                }
            );
        },
        ajouter(){
            console.log(this.recette)
            axios.post("https://hook.integromat.com/rh9d6t7q8kxjiam2mx48q7d11ts00afs", this.recette)
            .then(response => {
                this.slug = response.data.slug;
                this.ajoutee = true;
            })
        }
    },
    mounted(){
        return axios({
            url: "https://api.baseql.com/airtable/graphql/apptVpg9XpET0IEyv",
            method: "post",
            data: {
            query: `{
                  ingredients {
                        id
                        nom
                    }
            }`,
            },
        }).then((result) => {
            console.log(JSON.stringify(result.data))
            this.ingredients = result.data.data.ingredients.map(i => ({
                code: i.id, 
                label: i.nom
                })
            );
        })
    }
  }
</script>

<style>
@import 'vue-select/dist/vue-select.css';
</style>