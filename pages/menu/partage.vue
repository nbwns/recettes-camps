<template>
  <div>
      <Header>
          <h1 class="title is-1" v-if="name">{{name}}</h1>
          <div v-else class="emptystate emptytitle"></div>
      </Header>

     <div class="container is-fluid" v-if="menu">
         <div v-for="(recipes, day) in menu" :key="day">
             {{day}}
             <div v-for="r in recipes" :key="r.nom">
                 {{r.nom}}
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
    data(){
        return {
            attendees: 0,
            menu: null,
            name: null
        }
    },
    methods:{
        fetchData(recordId){
            if(recordId && recordId !== ''){
                return this.$axios("https://hook.integromat.com/sqep1g9vmcrbvt13tfzcjmvv1rcwzods?action=get&id="+ recordId)
                .then((result) => {
                    this.attendees = result.data.attendees;
                    this.menu = result.data.menu;
                    this.name = result.data.name;
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