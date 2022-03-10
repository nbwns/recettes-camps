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
                        <button class="button is-primary" @click="shareModal=true" :disabled="menu==null" v-if="!this.$route.query.id && !this.menuUrl">🔗 Partager</button>
                         <span class="control has-icons-right" v-if="!this.$route.query.id && this.menuUrl">
						 	<input class="input" type="text" v-model="menuUrl" readonly>
							 <span class="icon is-small is-right is-clickable" style="pointer-events:all">
								<i class="fas fa-copy" title="Copier dans le presse-papier" @click="copyToClipboard"></i>
							</span>
						 </span>
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
       <hr/>
       <div class="block">
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
     <div class="modal" :class="{'is-active': shareModal}">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">
                  Partage ton menu !
                </p>
              </header>
              <div class="card-content">
                  <div class="content">
                    <p>
                      Ton menu sera <strong>sauvegardé en ligne</strong> et tu pourras le <strong>partager</strong>. 
                    </p>
                    <p>
                      Quand ton menu changera, tu devras le sauvegarder de nouveau.
                    </p>
                    <form  v-on:submit.prevent="shareMenu">
                      <div class="field">
                        <label class="label">Nom du menu</label>
                          <div class="control">
                              <input class="input" type="text" v-model="menuName" placeholder="Menu du camp d'été de la 97ème" required>
                          </div>
                      </div>
                      <button class="button is-primary" :disabled="sendingData">
                        <span v-if="!sendingData">☁️ Sauvegarder le menu en ligne</span>
                        <span v-else>...</span>
                      </button>
                      <button class="button" :disabled="sendingData" @click="shareModal=false">Annuler</button>
                    </form>
                  </div>
                </div>
            </div>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="shareModal=false"></button>
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
            attendees: 0,
            menu: null,
            name: null,
            budget: null,
            shoppingList: null,
            unfold: false,
            shareModal: false,
            menuName: null,
			menuUrl: null,
            sendingData: false,
            shareId: null,
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
                    this.attendees = result.data.attendees;
                    this.menu = result.data.menu;
                    this.name = result.data.name;
                    this.budget = new BudgetCalculator(this.menu,this.attendees);
                    let sl = new ShoppingListGenerator(this.menu,this.attendees);
                    this.shoppingList = sl.generate();
                })
            }
        },
        shareMenu(){
			let shareableMenu = {
				attendees: this.$store.state.attendees,
				menu: this.$store.state.menu,
				name: this.menuName
			}

			this.sendingData = true;
			this.$axios.post("https://hook.integromat.com/sqep1g9vmcrbvt13tfzcjmvv1rcwzods?action=save&id=" + this.menuName, shareableMenu)
			.then(response => {
				this.shareId = response.data.ID;
				console.log(this.shareId)
				this.sendingData = false;
				this.shareModal = false;
				this.menuUrl = `${window.location.origin}/menu/voir?id=${this.shareId}`;
				this.$store.commit('addToSavedMenus', {name: this.menuName, id:this.shareId});
				this.$toast.show('👍 Menu sauvegardé ', { 
					theme: "bubble", 
					position: "top-center", 
					duration : 1500,
					action : [
					{
						text : 'Voir',
						onClick : (e, toastObject) => {
							this.$router.push({ path: `/menu/voir?id=${this.shareId}` })
						}
					}
					]
				});
			});
      	},
		copyToClipboard(){
			navigator.clipboard.writeText(this.menuUrl).then(() => {
				this.$toast.show('Copié dans le presse-papier', { 
					theme: "bubble", 
					position: "top-center", 
					duration : 1000
				});
			},() => {
				this.$toast.show('Oups, ça n\'a pas marché', { 
					theme: "bubble", 
					position: "top-center", 
					duration : 1000
				});
			});
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