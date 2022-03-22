<template>
  <div>
      <Header className="is-primary">
      </Header>
      <div class="container content-wrapper"> 
		  	<h2 class="title is-2 mt-4">
				Mes menus
			</h2>
			<div class="columns mb-5">
			<div class="column">
				<div class="level">
				<div>
					<p class="subtitle is-6">Les menus que tu as sauvegardé en ligne afin de les partager. Ta liste de menus est conservée dans ton navigateur.</p>  
				</div>
				</div>
				<div >
					<div class="columns is-multiline  mt-4">
						<div class="column is-one-quarter" v-if="menuBeingCreated">
							<nuxt-link  to="menu/creer">
								<div class="card has-background-info" >
									<div class="card-content has-text-white">
										<i class="fas fa-edit pr-2"></i> Editer "{{this.currentMenuName}}"
									</div>
								</div>
							</nuxt-link>
						</div>
						<div class="column is-one-quarter" v-for="m in savedMenus" :key="m.id" >
							<nuxt-link  :to="'menu/voir?id='+m.id">
								<div class="card" >
									<div class="card-content">
										{{m.name}}
									</div>
								</div>
							</nuxt-link>
						</div>
						<div class="column is-one-quarter">
							<nuxt-link  to="menu/creer">
								<div class="card has-background-primary" >
									<div class="card-content has-text-white">
										<i class="fa fa-solid fa-plus pr-2"></i> Créer un nouveau menu
									</div>
								</div>
							</nuxt-link>
						</div>
					</div>
				</div>
			</div>
			</div>
      </div>
      
      
  </div>
</template>

<script>
import Header from '~/components/Header'

export default {
    components: {
      Header
    },
    data() {
      return {
        
      }
    },
    computed:{
      savedMenus: {
        get() {
            return this.$store.state.savedMenus
        },
        set(value){
          this.$store.commit('updateSavedMenus', value);
        }
      },
	  menuBeingCreated: {
		  get() {
            return this.$store.state.menu !== null
        }
	  },
	  currentMenuName: {
		  get(){
			  return this.$store.state.name
		  }
	  }
    },
    methods:{
      
    }
}
</script>

<style>

</style>