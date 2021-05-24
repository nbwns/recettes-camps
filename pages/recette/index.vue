<template>
    <div>
        <div>
            <Header>
            <nuxt-link to="/" class="no-print">&lt; Retour</nuxt-link>
            <div class="block" v-if="recette">
                <h1 class="title is-1 pt-2 mb-0" >
                    {{recette.nom}}
                </h1>
                par <a :href="`mailto:${recette.contactAuteur}&subject=Question sur ta recette de ${recette.nom}`">{{recette.auteur}}</a>
            </div>
            <div class="emptystate emptytitle" v-else>&nbsp;</div>
            </Header>
        
            <div class="container is-fluid">  
            <nav class="level no-print">
                <div class="level-left">
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <div class="buttons">
                            <button class="button is-primary" @click="addToUnplannedRecipes(recette)" :disabled="recette === null">📝 Ajouter au menu</button>
                            <!--<button class="button">✨ Personnaliser</button>-->
                            <button class="button" @click="print()" :disabled="recette === null">🖨️ Imprimer</button>
                        </div>
                    </div>
                </div>
            </nav>
            

            <div class="columns" v-if="recette && recette.description != null">
                <div class="column">
                    <article class="message is-info">
                        <div class="message-body">
                            {{recette.description}}
                        </div>
                    </article>
                </div>
            </div>  
            <div class="columns">
                <div class="column">
                    <h2 class="is-size-4">Ingrédients</h2>
                    
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
                   
                    <div class="columns m-0 p-0 is-mobile">
                        <div class="column">
                            <strong>Quantité</strong>
                        </div>
                        <div class="column">
                            <strong>Prix indicatif</strong>
                             <span class="clickable"  @click="modalPrice = true"><i class="fa fa-info-circle"></i></span>
                        </div>
                    </div>
                    <div v-if="recette">
                        <div v-for="compo in recette.compositions" :key="compo.nom" class="columns m-0 p-0 is-mobile">
                            <div class="column">
                                {{Math.round((compo.quantite * plateRatio)*1000)/1000}} {{compo.unites}} {{compo.nomIngredient[0]}}
                            </div>
                            <div class="column" :class="{'has-text-danger' : compo.prixManquant == 1}" :title="(compo.prixManquant == 1) ? 'Le prix de cet ingrédient n\'est pas encore encodé, cela peut fausser le calcul du budget' : ''">
                                {{ (compo.prix * plateRatio).toFixed(2) }} €
                            </div>
                        </div>
                        <div class="columns is-mobile m-0 p-0">
                            <div class="column"><strong>Prix du plat</strong></div>
                            <div class="column">{{(recette.prix * plateRatio).toFixed(2)}} €</div>
                        </div>
                    </div>
                    <div v-else>
                        <div class="emptystate emptyline my-2"></div>
                        <div class="emptystate emptyline my-2"></div>
                        <div class="emptystate emptyline my-2"></div>
                        <div class="emptystate emptyline my-2"></div>
                        <div class="emptystate emptyline my-2"></div>
                    </div>
                </div>
                <div class="column">
                    <div class="block">
                        <h2 class="is-size-4">Préparation</h2>
                        <div class="pl-5" v-html="procedure" v-if="recette"></div>
                        <div v-else>
                            <div class="emptystate emptyline my-2"></div>
                            <div class="emptystate emptyline my-2"></div>
                            <div class="emptystate emptyline my-2"></div>
                            <div class="emptystate emptyline my-2"></div>
                            <div class="emptystate emptyline my-2"></div>
                        </div>
                    </div>
                    <div class="block">
                        <h2 class="is-size-4">Score assiette écologique</h2>                   
                        <div class="block px-2" v-if="recette">
                            <p>Par portion <span class="clickable"  @click="modalEco = true"><i class="fa fa-info-circle"></i></span></p>
                            <table class="table is-size-7">
                                <tbody>
                                    <tr>
                                        <td><strong>Céréales</strong></td>
                                        <td>{{parseInt(recette.assietteCereale)}}g</td>
                                        <td>
                                            <meter class="meter is-small"
                                            min="0" max="120"
                                            low="39" high="61" optimum="50"
                                            :value="recette.assietteCereale"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><strong>Légumineuses</strong></td>
                                        <td>{{parseInt(recette.assietteLegumineuse)}}g</td>
                                        <td>
                                            <meter class="meter is-small"
                                            min="0" max="60"
                                            low="19" high="31" optimum="25"
                                            :value="recette.assietteLegumineuse"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><strong>Légumes</strong></td>
                                        <td>{{parseInt(recette.assietteLegume)}}g</td>
                                        <td>
                                            <meter class="meter is-small"
                                            min="0" max="400"
                                            low="150" high="299" optimum="300"
                                            :value="recette.assietteLegume"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><strong>Autre</strong></td>
                                        <td>{{parseInt(recette.assietteAutre)}}g</td>
                                        <td>
                                            <meter class="meter is-small"
                                            min="0" max="95"
                                            low="31" high="89" optimum="30"
                                            :value="recette.assietteAutre"/>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div v-else>
                            <div class="emptystate emptyline my-2"></div>
                            <div class="emptystate emptyline my-2"></div>
                            <div class="emptystate emptyline my-2"></div>
                            <div class="emptystate emptyline my-2"></div>
                        </div>
                    </div>
                </div>
            </div>            
            </div>
            <div class="modal" :class="{'is-active': modalPrice}">
            <div class="modal-background"></div>
            <div class="modal-content">
                <article class="message is-info">
                    <div class="message-header">
                        <p>Prix indicatif</p>
                    </div>
                    <div class="message-body">
                        Les prix sont basés sur l'offre du Marché de la Glacière à Saint-Gilles qui travaille en direct avec des petits producteurs et grossistes bio.
                    </div>
                    </article>
            </div>
            <button class="modal-close is-large" aria-label="close" @click="modalPrice=false"></button>
            </div>
            <div class="modal" :class="{'is-active': modalEco}">
            <div class="modal-background"></div>
            <div class="modal-content">
                <article class="message is-info">
                    <div class="message-header">
                        <p>Score écologique</p>
                    </div>
                    <div class="message-body">
                        <ul>
                            <li><strong>Céréales:</strong> Valeur optimale entre 40 et 60g sec par personne</li>
                            <li><strong>Légumineuses:</strong> Valeur optimale entre 20 et 30g sec par personne</li>
                            <li><strong>Légumes:</strong> Valeur optimale au moins 300g par personne</li>
                            <li><strong>Autres (Viande, fromage, huile, beurre,...):</strong> Valeur optimale max 30g par personne</li>
                        </ul>
                    </div>
                    </article>
            </div>
            <button class="modal-close is-large" aria-label="close" @click="modalEco=false"></button>
            </div>
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
            modalPrice: false,
            modalEco: false,
            menuButton: false
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
    watch:{
        plates(newValue, oldValue){
            if(newValue < 0){
                this.plates = 0
            }
        }
    },
    methods:{
      addToUnplannedRecipes(recette){
          this.$store.commit('addToUnplannedRecipes', recette);
          this.$toast.show('👍 Recette ajoutée au menu', { 
                theme: "bubble", 
                position: "top-center", 
                duration : 1550,
                action : [
                  {
                      text : 'Voir le menu',
                      onClick : (e, toastObject) => {
                          this.$router.push({ path: 'menu' })
                      }
                  }
                ]
            });
      },
      print(){
          window.print();
      },
      fetchData(recordId){
          if(recordId && recordId !== ''){
            return axios({
                    url: "https://api.baseql.com/airtable/graphql/apptVpg9XpET0IEyv",
                    method: "post",
                    data: {
                    query: `{
                    recettes(id: "${recordId}") {
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
                                mesure
                                prixIngredient
                                prixManquant
                            }
                            prix
                            slug
                            assietteAutre
                            assietteCereale
                            assietteLegume
                            assietteLegumineuse
                            contactAuteur
                            auteur
                            id
                        }
                    }`,
                    },
                }).then((result) => {
                    this.recette = result.data.data.recettes[0],
                    this.plates = result.data.data.recettes[0].nombreDePersonnes
                })
          }
      }
    },
    mounted(){
        return this.fetchData(this.$route.query.id);
    }
    /*asyncData({ params, error, payload }){
        console.log(payload);
        console.log(params)
        if (payload){
            return { recette: payload, plates: payload.nombreDePersonnes };
        }
        else {
            
        }
  }*/
}
</script>

<style>
.meter, .meter::-webkit-meter-bar{
    background: none;
    background-color: whiteSmoke;
    border: none;
    border-radius: 100px;
    display: block;
    height: 1rem;
    overflow: hidden;
    padding: 0;
}

.meter:-moz-meter-optimum::-moz-meter-bar{
    background: hsl(141, 71%, 48%)
}

.meter::-webkit-meter-optimum-value{
    background: hsl(141, 71%, 48%)

}

.meter:-moz-meter-sub-optimum::-moz-meter-bar{
    background: hsl(48, 100%, 67%)
}

.meter::-webkit-meter-suboptimum-value{
    background: hsl(48, 100%, 67%)
}

.meter::-webkit-meter-even-less-good-value{
    background: hsl(348, 100%, 61%)
}

.meter:-moz-meter-sub-sub-optimum::-moz-meter-bar{
    background: hsl(348, 100%, 61%)
}

.meter.is-small {
    height: 0.75rem;
}
</style>