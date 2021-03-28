<template>
  <div>
        <Header>
            <h1 class="title is-1">Liste de courses</h1>
        </Header>
        <div class="container">  
            <div class="columns">
                <div class="column">
                    <div v-for="(value, ingredient) in shoppingList" :key="ingredient">
                        {{ingredient}} : {{value.totalQuantity}}
                        <ul class="ml-5">
                            <li v-for="r in value.recipes" :key="r.name">{{r.name}} {{r.quantity}}{{r.unit}}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import ShoppingList from '~/assets/classes/ShoppingList'

export default {
    data(){
        return {
            shoppingList: {}
        }
    },
    mounted(){
        let sl = new ShoppingList(this.$store.state.menu, this.$store.state.attendees);
        this.shoppingList = sl.generate();
        console.log(this.shoppingList);
    }
}
</script>

<style>

</style>