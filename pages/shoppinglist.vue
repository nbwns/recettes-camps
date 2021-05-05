<template>
  <div>
        <Header>
            <h1 class="title is-1">Ma liste de courses</h1>
        </Header>
        <div class="container is-fluid"> 
            <nav class="level">
                <div class="level-left">
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <div class="buttons">
                            <div class="mr-4"><toggle-button @change="viewDetails()"/> <span class="ml-1">Voir les détails</span></div>
                            <button class="button" @click="print()">🖨️ Imprimer</button>
                        </div>
                    </div>
                </div>
            </nav> 
            <article class="message is-warning" v-if="Object.keys(shoppingList).length == 0">
                <div class="message-body ">
                    Il n'y a rien ici ! Tu dois d'abord <nuxt-link to="menu">créer un menu de camp</nuxt-link> 🤓
                </div>
            </article>

            <div v-for="(item, index) in shoppingList" :key="item.ingredient">
                <div class="clickable is-size-5 columns is-mobile mb-0" @click="item.visible = !item.visible" :class="{'has-background-info-light': index % 2 == 1}">
                    <div class="column">
                        <i class="fas fa-angle-right" :class="{'expanded': item.visible}" ></i> 
                        <span>{{item.ingredient}}</span>
                    </div>
                    <div class="column">
                            <span>{{parseFloat(item.totalQuantity.toFixed(2))}} {{item.unit}}</span>
                    </div>
                </div>
                <div v-if="item.visible">
                    <div class="columns ml-5 mb-0" v-for="r in item.recipes" :key="r.name">
                        <div class="column">
                            {{r.name}}
                        </div>
                        <div class="column">
                            {{parseFloat(r.quantity.toFixed(1))}} {{r.unit}}
                        </div>
                    </div>
                </div>
                <!--<ul class="ml-5" v-if="item.visible">
                    <li v-for="r in item.recipes" :key="r.name">{{r.name}} {{parseFloat(r.quantity.toFixed(1))}} {{r.unit}}</li>
                </ul>-->
            </div>
                
        </div>
  </div>
</template>

<script>
import ShoppingList from '~/assets/classes/ShoppingList'
export default {
    data(){
        return {
            shoppingList: {},
            unfold: false
        }
    },
    methods:{
        print(){
            window.print()
        },
        viewDetails(){
            this.unfold = !this.unfold
            this.shoppingList.forEach(item => {
                item.visible = this.unfold;
            });
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
.fa-angle-right{
    transition: all 0.3s;
}

.expanded{
    transform: rotate(90deg);
    transition: all 0.3s;
}
</style>