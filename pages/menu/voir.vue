<template>
  <div>
      <Header className="is-primary">
          
      </Header>

            

	<div v-if="notFound">Ce menu n'existe pas 👻</div>
	<div v-else class="container content-wrapper">
		<h1 class="title is-2 mt-4" v-if="name">{{name}}</h1>
        <div v-else class="emptystate emptytitle">Récupération du menu</div>
		
		<div v-if="menu">
			<nav>
				<div class="level-left">
					<div class="tabs">
						<ul>
							<li><a href="#calendrier">Calendrier</a></li>
							<li><a href="#recettes">Recettes</a></li>
							<li><a href="#liste">Liste de course</a></li>
						</ul>
					</div>
				</div>
				<div class="level-right">
					<div class="level-item">
						<div class="buttons">
							<button class="button" @click="print()" :disabled="menu === null"><i class="fa-solid fa-print pr-2"></i> Imprimer</button>
						</div>
					</div>
				</div>
			</nav>
			<!-- calendrier -->
			<div class="block" id="calendrier">
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
			<!-- recettes -->
			<div class="block" id="recettes">
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
								</thead>
								<tbody>
									<tr v-for="c in r.compositions" :key="c.nom">
										<td class="has-text-right">{{Math.floor(c.quantite * (attendees / r.nombreDePersonnes))}}</td>
										<td>{{c.unites}}</td>
										<td>{{c.nomIngredient[0]}}</td>
									</tr>
								</tbody>
								<tfoot>
									<td colspan="3"><strong>Total</strong></td>
								</tfoot>
							</table>
						</div>
						<div class="column"><div class="block" v-html="markdown(r.procedure)"></div></div>
					</div>
				</div>

			</div>
			<hr/>
			<!-- liste de courses -->
			<div class="block" id="liste">
					<nav class="level">
						<div class="level-left">
							<h2 class="title is-3">🛒 Liste de courses</h2>
						</div>
						<div class="level-right">
							<div class="level-item">
								<div class="buttons">
									<div class="mr-4 no-print"><toggle-button @change="viewDetails()"/> <span class="ml-1">Voir les détails</span></div>
								</div>
							</div>
						</div>
					</nav> 
				<shopping-list :list="shoppingList"/>
			</div>
		</div>
     </div>
  </div>
</template>

<script>
import Header from '~/components/Header'
import marked from 'marked'
import BudgetCalculator from '~/assets/classes/BudgetCalculator'
import ShoppingListGenerator from '~/assets/classes/ShoppingList'
import ShoppingList from '~/components/ShoppingList'

export default {
    components: {
      Header,
      ShoppingList
    },
    data(){
        return {
            loading:true,
			attendees: 0,
            menu: null,
            name: null,
            budget: null,
            shoppingList: null,
            unfold: false,
			notFound: false
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
        viewDetails(){
            this.unfold = !this.unfold
            this.shoppingList.forEach(item => {
                item.visible = this.unfold;
            });
        },
        fetchData(recordId){
            if(recordId && recordId !== ''){
                return this.$axios("https://hook.integromat.com/sqep1g9vmcrbvt13tfzcjmvv1rcwzods?action=get&id="+ recordId)
                .then((result) => {
                    console.log(result.data)
					this.loading = false;
                    this.attendees = result.data.attendees;
                    this.menu = result.data.menu;
                    this.name = result.data.name;
                    this.budget = new BudgetCalculator(this.menu,this.attendees);
                    let sl = new ShoppingListGenerator(this.menu,this.attendees);
                    this.shoppingList = sl.generate();
                })
				.catch((error) => {
					this.notFound = true;
					if (error.response) {
						console.log(error.response.data);
						console.log(error.response.status);
						console.log(error.response.headers);
					}
				});
            }
        }
    },
    mounted(){
		if(this.$route.query.id){
            //get a saved menu from the db
            return this.fetchData(this.$route.query.id);
        }
        else{
            //get the menu from the store
            this.attendees = this.$store.state.attendees;
            this.menu = this.$store.state.menu;
            this.name = "Récapitulatif de mon menu";
            this.budget = new BudgetCalculator(this.menu,this.attendees);
            let sl = new ShoppingListGenerator(this.menu,this.attendees);
            this.shoppingList = sl.generate();
        }
    }
}
</script>

<style>

</style>