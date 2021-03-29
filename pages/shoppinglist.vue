<template>
  <div>
        <Header>
            <h1 class="title is-1">Ma liste de courses</h1>
        </Header>
        <div class="container">  
            <div class="columns">
                <div class="column">
                    <div v-for="(value, ingredient) in shoppingList" :key="ingredient">
                        <i class="fas fa-angle-right clickable" @click="showLine(ingredient, $event)"></i> {{ingredient}} : {{value.totalQuantity.toFixed(2)}} {{value.unit}}
                        <ul class="ml-5 hidden" :ref="ingredient">
                            <li v-for="r in value.recipes" :key="r.name">{{r.name}} {{r.quantity.toFixed(1)}} {{r.unit}}</li>
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
    methods:{
        showLine(line, event){
            this.$refs[line][0].classList.toggle("hidden");  
            event.target.classList.toggle("expanded");        
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
.hidden{
    display:none;
}

.fa-angle-right{
    transition: all 0.3s;
}

.expanded{
    transform: rotate(90deg);
    transition: all 0.3s;
}
</style>