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
                    <nuxt-link :to="{path: '/recette?id='+recordId}">Je vais voir la recette</nuxt-link>
                </div>
            </div>
        </div>
    </div>
    <form v-on:submit.prevent="post" class="mb-5">
      <div class="container is-fluid" v-if="!ajoutee">
        <div class="columns">
           
            <div class="column is-half">
                <article class="message is-warning">
                    <div class="message-body">
                        <p>⚠️ La recette doit être un <strong>plat complet</strong> auquel il ne faut rien ajouter.</p>
                        <p>Si la recette s'accompagne par exemple de pain ou de riz, tu dois l'ajouter dans les ingrédients.</p>
                        <br/>
                        <p><strong>Les quantités à indiquer sont pour des adultes</strong></p>
                    </div>
                </article>


                <div class="field">
                    <label class="label">Nom de la recette</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Salade de pommes de terre" v-model="recette.nom" required="required">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Courte description de la recette</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="C'est super facile et les animés adorent !" v-model="recette.introduction">
                    </div>
                    <p class="help">Pour donner envie de la consulter</p>
                </div>

                <div class="field">
                    <label class="label">Auteur</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="97ème de Saint-Glinglin" v-model="recette.auteur" required="required">
                    </div>
                </div>

                <div class="field">
                    <label class="label">E-mail de l'auteur</label>
                    <div class="control">
                        <input class="input" type="email" placeholder="97saintglinglin@gmail.com" v-model="recette.contactAuteur" required="required">
                    </div>
                    <p class="help">Adresse à laquelle on peut vous contacter en cas de questions sur la recette</p>
                </div>

                <div class="field">
                    <label class="label">Type</label>
                    <div class="control">
                        <div class="select">
                            <select v-model="recette.type" required>
                                <option>Omnivore</option>
                                <option>Végétarien</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Nombre de couverts (en adultes)</label>
                    <div class="control">
                        <input class="input" type="number" placeholder="5" v-model="recette.couverts" required>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Procédure</label>
                    <div class="control">
                        <textarea class="textarea" placeholder="1. Eplucher les pommes de terre" v-model="recette.procedure" required></textarea>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Ingrédients</label>
                </div>
                <div class="mb-2">
                    <article class="message is-info">
                        <div class="message-body">
                            <p class="help">💡 Tu ne trouves pas un produit dans la liste ? <a href="https://airtable.com/shrAXUQUh0KC3FUQn" target="_blank">Soumet-le nous</a> et ensuite <a href="#" @click="fetchIngredients(); return false;">recharge la liste des ingrédients</a></p>
                        </div>
                    </article>
                </div>
                <div class="field is-horizontal" v-for="compo in recette.compositions" :key="compo.id">
                    <div class="field-body">
                        <div class="field">
                            <p class="control">
                                <v-select 
                                    :options="ingredients" 
                                    label="nom" 
                                    v-model="compo.ingredient"
                                    @input="ingredient => updateUnit(compo, ingredient.mesure)">
                                </v-select>
                            </p>
                        </div>
                        <div class="field" v-if="compo.ingredient">
                            <p class="control">
                                <input class="input" type="number" placeholder="800" step=".01" v-model="compo.quantite" required>
                            </p>
                        </div>
                        <div class="field" v-if="compo.ingredient">
                            <span class="control">
                                <div class="select" >
                                    <select v-model="compo.unite" v-if="compo.ingredient" required>
                                        <option v-if="compo.ingredient.mesure === 'Masse'">kg</option>
                                        <option v-if="compo.ingredient.mesure === 'Masse'">gr</option>
                                        <option v-if="compo.ingredient.mesure === 'Volume'">l</option>
                                        <option v-if="compo.ingredient.mesure === 'Volume'">ml</option>
                                    </select>
                                </div>
                            </span>
                        </div>
                        <div class="field">
                            <i class="fas fa-trash-alt clickable" @click="removeIngredient(compo.id)"></i>
                        </div>
                    </div>
                </div>
                <div>
                    <button class="button is-fullwidth" @click.stop.prevent="addIngredient" >Ajouter un ingrédient</button>
                </div>
                <div class="field">
                    <label class="label">Remarques</label>
                    <div class="control">
                        <textarea class="textarea" placeholder="Vous pouvez réutiliser les restes le lendemain en les transformant en gnocchis" v-model="recette.description"></textarea>
                    </div>
                    <p class="help">Pour expliquer comment réutiliser les restes le lendemain, le petit truc spécial à savoir ou toute autre info utile</p>
                </div>

                <div class="field">
                    <div class="control">
                        <button class="button is-primary" type="submit" :disabled="sending">
                            <span v-if="!sending">Envoyer la recette</span>
                            <span v-else>...</span>
                        </button>
                    </div>
                    <p class="help">La recette sera immédiatement ajoutée à la base de données.</p>
                </div>

            </div>
        </div>
    </div>
    </form>
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
            ingredientIndex: 2,
            recette: {
                nom: null,
                auteur: null,
                contactAuteur: null,
                couverts: null,
                procedure: null,
                type: 'Omnivore',
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
                ]
            },
            ingredients: [],
            ajoutee: false,
            slug: null,
            recordId: null,
            sending: false
        }
    },
    methods:{
        addIngredient() {
            this.ingredientIndex++;
            this.recette.compositions.push(
                {
                    id:this.ingredientIndex,
                    quantite: null,
                    unite: 'gr',
                    ingredient: null
                }
            );
        },
        updateUnit(compo, mesure){
            compo.unite = (mesure === "Masse" ? "kg" : "l");
        },
        removeIngredient(index){
            let itemIndex = this.recette.compositions.findIndex((e) => e.id === index);
            if(itemIndex > -1){
                this.recette.compositions.splice(itemIndex,1)
            }
        },
        post(){
            console.log("post")
            if(this.validate()){
                this.sending = true;
                axios.post("https://hook.integromat.com/rh9d6t7q8kxjiam2mx48q7d11ts00afs", this.recette)
                .then(response => {
                    this.slug = response.data.slug;
                    this.recordId = response.data.id;
                    this.ajoutee = true;
                    this.sending = false;
                })
            }
            else{
                alert("Certains champs semblent vides, vérifie tes données - il ne faut pas d'ingrédients vides")
            }
        },
        validate(){
            let valid = (this.recette.nom && this.recette.auteur && this.recette.couverts && this.recette.procedure &&
                         this.recette.type);
            this.recette.compositions.forEach(c => {
                valid = valid && (c.ingredient && c.unite && c.quantite);
            });
            return valid;
        },
        fetchIngredients(){
            return axios({
                url: "https://api.baseql.com/airtable/graphql/apptVpg9XpET0IEyv",
                method: "post",
                data: {
                    query: `{
                        ingredients(_order_by: "nom", etat: "Validé") {
                                id
                                nom
                                mesure
                            }
                    }`
                }
            }).then((result) => {
                this.ingredients = result.data.data.ingredients;
            })
        }
    },
    mounted(){
        return this.fetchIngredients();
    }
  }
</script>

<style>
@import 'vue-select/dist/vue-select.css';
</style>