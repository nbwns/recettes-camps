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
                            <div class="mr-4 no-print"><toggle-button @change="viewDetails()"/> <span class="ml-1">Voir les détails</span></div>
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

            <shopping-list :list="shoppingList"/>
        </div>
  </div>
</template>

<script>
import ShoppingListGenerator from '~/assets/classes/ShoppingList'
import ShoppingList from '~/components/ShoppingList'

export default {
    components: {
        ShoppingList
    },
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
        let sl = new ShoppingListGenerator(this.$store.state.menu, this.$store.state.attendees);
        this.shoppingList = sl.generate();
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