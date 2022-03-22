<template>
  <div>
      <Header className="is-primary">
      </Header>
      <div class="container content-wrapper"> 
		  	<h2 class="title is-2 mt-4">
				Planifier un nouveau menu
			</h2>
		<div v-if="menu">
			<nav class="level">
				<div class="level-left"></div>
				<div class="level-right"><menu-price/></div>
			</nav>
			<div class="columns">
			<div class="column">
				<div class="level">
				<div>
					<h2 class="title is-3">Recettes à planifier</h2> 
					<p class="subtitle is-6">Ta collection de recettes trop miam que tu as envie de cuisiner pendant ton camp. <br/>Cette liste est sauvegardée automatiquement dans ton navigateur.</p>  
				</div>
				<button class="button mt-0" title="Vider la liste des recettes disponibles" @click="unplannedRecipes = []" :disabled="unplannedRecipes.length === 0">Vider la liste</button>
				</div>
				<div >
				<div class="dashed-slot">
					<draggable
					v-model="unplannedRecipes" group="menu" dragClass="dragged" @end="notifySave"  
					>
					<span class="tag is-medium m-2 grabbable" v-for="r in unplannedRecipes" :key="r.slug">
						<i class="fa fa-ellipsis-v is-size-7"></i><i class="fa fa-ellipsis-v is-size-7 mr-2"></i> {{r.nom}}
					</span>
					</draggable>
				</div>
				</div>
				<div v-if="unplannedRecipes.length == 0">
				<article class="message is-warning mt-5">
					<div class="message-body">
					Tu n'as aucune recette à placer dans ton menu. Pour ajouter une recette ici, clique sur "Ajouter au menu" pour les recettes que tu veux planifier.
					</div>
				</article>
				</div>
			</div>
			</div>
			<div class="columns mb-5">
				<div class="column">
					
					<div class="columns is-multiline mb-5">
						<MenuDay v-for="(recipes, day) in menu" :key="day" :day="day" :recipes="recipes"  />
					</div>						
				</div>
			</div>
			<div class="level mb-5">
				<div class="level-left"></div>
				<div class="level-right">
					<button class="button level-item" title="Recommencer" @click="resetMenu" :disabled="menu==null">Recommencer</button>
					<button class="button is-primary" @click="shareModal=true"  v-if="!this.menuUrl" title="Sauvegarder le menu en ligne"><i class="fa-solid fa-floppy-disk pr-2"></i> Sauvegarder</button>
				</div>
			</div>
		</div>
		<div v-else>
			<div class="columns is-centered mb-5">
				<div class="column is-half">
					<nav class="panel">
						<p class="panel-heading">
							Paramètres du menu
						</p>
						<div class="panel-block">
							<form v-on:submit.prevent="initMenu">
								<div class="field">
									<div class="label ">
										<label class="label">Nom</label>
									</div>
									<div class="control">
										<input class="input" type="text" v-model="name" placeholder="Menu d'été de la 97ème" required>
									</div>
								</div>
								<div class="field">
									<div class="label ">
										<label class="label">Date de début</label>
									</div>
									<div class="control">
										<input class="input" type="date" v-model="start" placeholder="15/07/2021" required>
									</div>
								</div>
								<div class="field">
									<div class="label">
										<label class="label">Date de fin</label>
									</div>
									<div class="control">
										<input class="input" type="date" v-model="end" placeholder="30/07/2021" required>
									</div>
								</div>
								<div class="field">
									<div class="label ">
										<label class="label">Couverts</label>
									</div>
									<div class="control">
										<input class="input" type="number" v-model="plates" placeholder="25" required>
									</div>
									<p class="help">Cela servira à étalonner les quantités de chaque recette, de calculer le budget et créer la liste de courses.</p>
								</div>
								<div class="field">
								<div class="control">
									<button class="button is-primary">
									OK
									</button>
								</div>
								</div>
							</form>
						</div>
					</nav>
				</div>
			</div>
	  	</div>
	  </div>
	  <div class="modal" :class="{'is-active': shareModal}">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">
                	Sauvergarder "{{this.menuName}}"
                </p>
              </header>
              <div class="card-content">
                  <div class="content" v-if="menu && !menuUrl">
                    <p>
                      Ton menu sera <strong>sauvegardé en ligne</strong> et tu pourras le <strong>partager</strong>. Tu le retrouveras dans la page "Mes menus".
                    </p>
                    <form v-on:submit.prevent="shareMenu">
                      <div class="level mb-4">
						<div class="level-left"></div>
						<div class="level-right">
                      		<button type="button" class="button mr-4" :disabled="sendingData" @click="shareModal=false">Annuler</button>
							<button type="submit" class="button is-primary" :disabled="sendingData">
								<span v-if="!sendingData">Sauvegarder</span>
								<span v-else>...</span>
							</button>
						</div>
					  </div>
					  
                    </form>
                  </div>
				  <div  class="content" v-if="!menu">
					<p>
						Yes, ton menu est sauvegardé en ligne !
					</p>
					<span class="control has-icons-right" >
						<input class="input" type="text" v-model="menuUrl" readonly>
						<span class="icon is-small is-right is-clickable" style="pointer-events:all">
							<i class="fas fa-copy" title="Copier dans le presse-papier" @click="copyToClipboard"></i>
						</span>
						
					</span>
					<div class="level mb-4 mt-4">
						<div class="level-left"></div>
						<div class="level-right">
                      		<button type="button" class="button" @click="shareModal=false">Fermer</button>
						</div>
					  </div>
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
import MenuDay from '~/components/MenuDay'
import MenuPrice from '~/components/MenuPrice'
import moment from 'moment'
import draggable from "vuedraggable";

export default {
    components: {
      Header,
      MenuDay,
      MenuPrice,
      draggable
    },
    data() {
      return {
        name: null,
		plates:null,
        start: null,
        end: null,
		shareModal: false,
		menuUrl: null,
		sendingData: false,
		shareId: null
      }
    },
    computed:{
      unplannedRecipes:{
        get(){
          return this.$store.state.unplannedRecipes || []
        },
        set(value){
          this.$store.commit('updateUnplannedRecipes', value);
        }
      },
      menu: {
        get() {
            return this.$store.state.menu
        },
        set(value){
          this.$store.commit('updateMenu', value);
        }
      },
	  menuName: {
		get(){
			return this.$store.state.name
		},
		set(value){
			this.$store.commit('setName', value);
		}
	  }
    },
    methods:{
      initMenu(){
        if(this.start && this.end && this.plates){
          this.$store.commit('setAttendees', this.plates);
			//save name in vuex store
		  this.menuName = this.name;
          let startMoment = moment(this.start);
          let endMoment = moment(this.end);
          let diff = endMoment.diff(startMoment, 'days');
          let menu= {};
          menu[startMoment.format('DD/MM/YYYY')] = [];
          for(let i = 0; i < diff; i++){
            menu[startMoment.add(1, 'days').format('DD/MM/YYYY')] = [];
          }
          this.$store.commit('updateMenu', menu);
        }
      },
      resetMenu(){
        let plannedRecipes = Object.values(this.menu).flat();
        this.$store.commit('addToUnplannedRecipes', plannedRecipes);
        this.menu = null;
		this.plates = null;
		this.start = null;
		this.end = null;
		this.name = null;
      },
      notifySave(){
        
      },
	  shareMenu(){
			let shareableMenu = {
				attendees: this.$store.state.attendees,
				menu: this.$store.state.menu,
				name: this.$store.state.name
			}

			this.sendingData = true;
			this.$axios.post("https://hook.integromat.com/sqep1g9vmcrbvt13tfzcjmvv1rcwzods?action=save&id=" + this.menuName, shareableMenu)
			.then(response => {
				this.shareId = response.data.ID;
				this.sendingData = false;
				this.menuUrl = `${window.location.origin}/menu/voir?id=${this.shareId}`;
				this.$store.commit('addToSavedMenus', {name: shareableMenu.name, id:this.shareId});
				//clear current menu
				this.resetMenu()
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
    }
}
</script>

<style>
.dragged{
  rotate: -10deg;
}

.dashed-slot{
  border: 1px gray solid;
  min-height: 80px;
  border-radius: 4px;

}
</style>