<template>
  <div>
      <Header>
          <h1 class="title is-1">Mon menu de camp</h1>
      </Header>
      <div class="container is-fluid">
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
              <button class="button mt-0" title="Vider la liste des recettes disponibles" @click="unplannedRecipes = []" :disabled="unplannedRecipes.length === 0">🗑️ Vider la liste</button>
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
                  Tu n'as aucune recette à placer dans ton menu. Pour ajouter une recette ici, clique sur "📝 Ajouter au menu" dans les recettes que tu veux planifier.
                </div>
              </article>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="level">
              <div>
                <h2 class="title is-3">Calendrier</h2>
                <p class="subtitle is-6">Le calendrier te permet de planifier ton menu de camp. Tu peux également déplacer des recettes de nouveau dans tes recettes à planifier. <br/>Le calendrier est sauvegardé automatiquement dans ton navigateur.</p>  
              </div>
              <div>
                <button class="button is-primary" @click="shareModal=true" :disabled="menu==null">🔗 Partager</button>
                <button class="button" title="Recommencer" @click="resetMenu" :disabled="menu==null">🗑️ Recommencer</button>
              </div>
            </div>
            <div v-if="menu">
              <div class="columns is-multiline mb-5">
                <MenuDay v-for="(recipes, day) in menu" :key="day" :day="day" :recipes="recipes"  />
              </div>
            </div>
            <div v-else>
              <article class="message is-warning">
                <div class="message-body">
                  Sélectionne d'abord les dates de ton camp et le nombre de couverts.
                </div>
              </article>
              <form v-on:submit.prevent="initMenu">
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
                      C'est bon !
                    </button>
                  </div>
                </div>
              </form>
          </div>
          </div>
        </div>
        <div class="columns mb-5">
          <div class="column">
            <div class="level">
              <div>
                <h2 class="title is-3">Mes menus</h2> 
                <p class="subtitle is-6">Les menus que tu as sauvegardé en ligne afin de les partager. Ta liste de menus est conservée dans ton navigateur.</p>  
              </div>
            </div>
            <div v-if="this.savedMenus != null && this.savedMenus.length > 0">
              <p v-for="m in savedMenus" :key="m.id">
                <nuxt-link  :to="'menu/partage?id='+m.id">{{m.name}}</nuxt-link>
              </p>
            </div>
            <div v-else>
              <article class="message is-warning">
                <div class="message-body">
                  Tu n'as pas encore partagé de menus
                </div>
              </article>
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
        plates:null,
        start: null,
        end: null,
        shareModal: false,
        menuName: null,
        sendingData: false,
        shareId: null,
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
      savedMenus: {
        get() {
            return this.$store.state.savedMenus
        },
        set(value){
          this.$store.commit('updateSavedMenus', value);
        }
      }
    },
    methods:{
      initMenu(){
        if(this.start && this.end && this.plates){
          this.$store.commit('setAttendees', this.plates);
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
              this.$store.commit('addToSavedMenus', {name: this.menuName, id:this.shareId});
              this.$toast.show('👍 Menu sauvegardé ', { 
                theme: "bubble", 
                position: "top-center", 
                duration : 5000,
                action : [
                  {
                      text : 'Voir',
                      onClick : (e, toastObject) => {
                          this.$router.push({ path: 'menu/partage', query: { id: this.shareId } })
                      }
                  }
                ]
                });
          })
      },
      resetMenu(){
        let plannedRecipes = Object.values(this.menu).flat();
        this.$store.commit('addToUnplannedRecipes', plannedRecipes);
        this.menu = null;
      },
      notifySave(){
        this.$toast.show('💾 Sauvegardé', { 
            theme: "bubble", 
            position: "top-center", 
            duration : 1000
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