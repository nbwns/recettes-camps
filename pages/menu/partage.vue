<template>
  <div>
      <Header>
          <h1 class="title is-1" v-if="name">{{name}}</h1>
          <div v-else class="emptystate emptytitle"></div>
      </Header>

            

     <div class="container is-fluid" v-if="menu">
        <nav class="level">
            <div class="level-left">
            </div>
            <div class="level-right">
                <div class="level-item">
                    <div class="buttons">
                        <button class="button" @click="print()" :disabled="menu === null">🖨️ Imprimer</button>
                    </div>
                </div>
            </div>
        </nav>


       <div class="block">
           <h2 class="title is-3">💰 Budget</h2>
           <table class="table">
               <thead>
                   <th>Tout le camp</th>
                   <th>Par personne</th>
                   <th>Moyen / jour</th>
                   <th>Moyen / personne / jour </th>
               </thead>
               <tr>
                   <td class="has-text-right">{{Number(budget.getTotalBudget()).toFixed(2)}}€</td>
                   <td class="has-text-right">{{Number(budget.getBudgetPerServing()).toFixed(2)}}€</td>
                   <td class="has-text-right">{{Number(budget.getAverageBudgetPerDay()).toFixed(2)}}€</td>
                   <td class="has-text-right">{{Number(budget.getAverageBudgetPerServingPerDay()).toFixed(2)}}€</td>
               </tr>
           </table>
       </div>
       <hr/>
       <div class="block">
            <h2 class="title is-3">📅 Calendrier</h2>
            <div class="columns">
                <div class="column" v-for="(recipes, day) in menu" :key="day">
                        <strong>{{day}}</strong>
                        <div v-for="r in recipes" :key="r.nom">
                            {{r.nom}}
                        </div>
                    </div>
            </div>
       </div>
       <hr/>
       <div class="block">
            <h2 class="title is-3">🍜 Recettes pour {{attendees}} personnes</h2>
           <div class="block" v-for="r in allRecipes" :key="r.id">
               <h2 class="title is-4">{{r.nom}}</h2>
               <div class="columns">
                <div class="column">
                    <table class="table">
                        <thead>
                            <th>Quantité</th>
                            <th>Unité</th>
                            <th>Ingrédient</th>
                            <th>Prix</th>
                        </thead>
                        <tbody>
                            <tr v-for="c in r.compositions" :key="c.nom">
                                <td class="has-text-right">{{Math.floor(c.quantite * (attendees / r.nombreDePersonnes))}}</td>
                                <td>{{c.unites}}</td>
                                <td>{{c.nomIngredient[0]}}</td>
                                <td class="has-text-right">{{Number(c.prix * (attendees / r.nombreDePersonnes)).toFixed(2)}}€</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <td colspan="3"><strong>Total</strong></td>
                            <td class="has-text-right">{{Number(r.budget).toFixed(2)}}€</td>
                        </tfoot>
                    </table>
                </div>
                <div class="column"><div class="block" v-html="markdown(r.procedure)"></div></div>
               </div>
               
           </div>

       </div>
     </div>
  </div>
</template>

<script>
import Header from '~/components/Header'
import marked from 'marked'
import BudgetCalculator from '~/assets/classes/BudgetCalculator'

export default {
    components: {
      Header
    },
    data(){
        return {
            attendees: 0,
            menu: null,
            name: null,
            budget: null
        }
    },
    computed:{
        allRecipes(){
            let allRecipes = Object.values(this.menu).flat();
            allRecipes.forEach(r => {
                let sortedCompositions = r.compositions.sort((a,b) => (a.quantite < b.quantite) ? 1 : -1);
                r.compositions = sortedCompositions;
                r.budget = this.budget.getRecipeBudget(r);
            });
            return allRecipes;
        }
    },
    methods:{
        markdown(text){
            return marked(text);
        },
        print(){
          window.print();
        },
        fetchData(recordId){
            if(recordId && recordId !== ''){
                return this.$axios("https://hook.integromat.com/sqep1g9vmcrbvt13tfzcjmvv1rcwzods?action=get&id="+ recordId)
                .then((result) => {
                    console.log(result.data)
                    this.attendees = result.data.attendees;
                    this.menu = result.data.menu;
                    this.name = result.data.name;
                    this.budget = new BudgetCalculator(this.menu,this.attendees);
                })
            }
        }
    },
    mounted(){
        return this.fetchData(this.$route.query.id);
    }
}
</script>

<style>

</style>