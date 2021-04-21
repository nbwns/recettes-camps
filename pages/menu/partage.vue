<template>
  <div>
      <Header>
          <h1 class="title is-1">Menu partagé</h1>
      </Header>

        <button @click="fetchData('recBhfdqUyqfmaQsV')">go</button>
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
            menu: null
        }
    },
    methods:{
        fetchData(recordId){
            if(recordId && recordId !== ''){
                return this.$axios("https://hook.integromat.com/sqep1g9vmcrbvt13tfzcjmvv1rcwzods?action=get&id="+ recordId)
                .then((result) => {
                    console.log(result.data)
                    
                })
            }
        }
    },
    mounted(){
        //return this.fetchData(this.$route.query.id);
    }
}
</script>

<style>

</style>