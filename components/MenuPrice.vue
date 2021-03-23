<template>
  <div>

  </div>
</template>

<script>
import Recipe from '~/assets/classes/Recipe'
export default {
    mounted(){
        let recipes = this.$store.state.menu;
        if(recipes){
            let recipesObjects = Object.values(recipes).flat().map(r => new Recipe(r));
            recipesObjects.forEach(element => {
                console.log(element.nom)
            });
        }
    }
}
</script>

<style>

</style>