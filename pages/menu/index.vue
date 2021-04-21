<template>
  <div>
      <Header>
          <h1 class="title is-1">Mon menu de camp</h1>
      </Header>
      <div class="container">
        <div class="columns">
          <div class="column">
            <div class="level">
              <h2 class="title is-3">Recettes à planifier</h2> 
              <button class="button is-small" title="Vider la liste des recettes disponibles" @click="unplannedRecipes = []">🗑️</button>
            </div>
            <div class="container">
              <div class="dashed-slot">
                <draggable
                  v-model="unplannedRecipes" group="menu" dragClass="dragged" @end="notifySave"  
                >
                  <span class="tag is-large m-2 grabbable" v-for="r in unplannedRecipes" :key="r.slug">
                    <i class="fa fa-ellipsis-v is-size-7"></i><i class="fa fa-ellipsis-v is-size-7 mr-2"></i> {{r.nom}}
                  </span>
                </draggable>
              </div>
            </div>
            <div class="container" v-if="unplannedRecipes.length == 0">
              <article class="message is-warning mt-5">
                <div class="message-body">
                  Tu n'as aucune recette à placer dans ton menu. Pour ajouter une recette ici, clique sur "📝 Ajouter au menu" dans les recettes que tu veux planifier.
                </div>
              </article>
            </div>
          </div>
          <div class="column">
            <div class="level">
              <h2 class="title is-3">Calendrier</h2>
              <button class="button is-small" title="Recommencer" @click="menu = null">🔄</button>
              <button class="button is-primary" @click="shareModal=true">🔗 Partager</button>
            </div>
            <div class="container" v-if="menu">
              <MenuDay v-for="(recipes, day) in menu" :key="day" :day="day" :recipes="recipes"  />
            </div>
            <div class="container" v-else>
              <article class="message is-warning">
                <div class="message-body">
                  Sélectionne d'abord le nombre de couverts et les dates de ton camp.
                </div>
              </article>
              <div class="field is-horizontal">
                  <div class="field-label ">
                      <label class="label">Couverts</label>
                  </div>
                  <div class="field-body">
                      <div class="field is-narrow">
                          <div class="control">
                              <input class="input" type="number" v-model="plates" placeholder="25">
                          </div>
                      </div>
                  </div>
              </div>
              <div class="field is-horizontal">
                  <div class="field-label ">
                      <label class="label">Date de début</label>
                  </div>
                  <div class="field-body">
                      <div class="field is-narrow">
                          <div class="control">
                              <input class="input" type="date" v-model="start" placeholder="15/07/2021">
                          </div>
                      </div>
                  </div>
              </div>
              <div class="field is-horizontal">
                  <div class="field-label ">
                      <label class="label">Date de fin</label>
                  </div>
                  <div class="field-body">
                      <div class="field is-narrow">
                          <div class="control">
                              <input class="input" type="date" v-model="end" placeholder="30/07/2021">
                          </div>
                      </div>
                  </div>
              </div>
              <div class="field is-horizontal">
                <div class="field-label">
                  <!-- Left empty for spacing -->
                </div>
                <div class="field-body">
                  <div class="field">
                    <div class="control">
                      <button class="button is-primary" @click="initMenu">
                        OK
                      </button>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          </div>
          <div class="column">
            <div class="level">
              <h2 class="title is-3">Budget</h2>
            </div>
            <menu-price/>
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
                          Ton menu sera sauvegardé en ligne et tu pourras le retrouver sur cette page. 
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
                            <span v-if="!sendingData">Sauvegarder le menu en ligne</span>
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
        plates:0,
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
          console.log("menu state changes");
          this.$store.commit('updateMenu', value);
        }
    }
    },
    methods:{
      initMenu(){
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
              this.$store.commit('addToSavedMenus', this.shareId);
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
  min-height: 150px;
  border-radius: 4px;

}
</style>