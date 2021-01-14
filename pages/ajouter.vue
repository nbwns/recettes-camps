<template>
  
<div>
    <section class="hero is-primary">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              Ajouter une recette
            </h1>
          </div>
        </div>
      </section>

      <div class="container">
        <div class="columns">
            <div class="column is-half">
                <div class="field">
                    <label class="label">Nom de la recette</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Salade de pommes de terre">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Type</label>
                    <div class="control">
                        <div class="select">
                            <select>
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
                        <input class="input" type="number" placeholder="5">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Procédure</label>
                    <div class="control">
                        <textarea class="textarea" placeholder="1. Eplucher les pommes de terre"></textarea>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Ingrédients</label>
                </div>

                <div class="field is-horizontal" v-for="compo in compositions" :key="compo.id">
                    
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
                        <button class="button is-primary">Envoyer</button>
                    </div>
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
            compositions: [
                {
                    id:1,
                    quantite: null,
                    unite: 'gr',
                    ingredient: null
                },
                {
                    id:2,
                    quantite: null,
                    unite: 'gr',
                    ingredient: null
                }
            ],
            ingredients: []
        }
    },
    methods:{
        ajouterIngredient() {
            this.compositions.push(
                {
                    id:2,
                    quantite: null,
                    unite: 'gr',
                    ingredient: null
                }
            );
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
            console.log(result.data)
            this.ingredients = result.data.data.ingredients.map(i => i.nom);
        })
    }
  }
</script>

<style>
@import 'vue-select/dist/vue-select.css';
</style>