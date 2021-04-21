<template>
  <div>
      <div class="tag is-rounded is-large clickable" @click="active=true">
           <span class="is-size-3">{{totalBudget.toFixed()}}€</span>
      </div>


      <div class="modal" :class="{'is-active': active}">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">
                  Ton budget
                </p>
              </header>
              <div class="card-content">
                <div class="columns">
                    <div class="column">

                    </div>
                    <div class="column">

                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        Budget pour tout le camp
                    </div>
                    <div class="column">
                        <strong>{{totalBudget.toFixed()}} €</strong>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                         Budget par personne pour tout le camp
                    </div>
                    <div class="column">
                         <strong>{{budgetPerServing.toFixed()}} €</strong>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        Budget moyen par jour 
                    </div>
                    <div class="column">
                        <strong>{{avgPerDay.toFixed()}} €</strong>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        Budget moyen par personne par jour 
                    </div>
                    <div class="column">
                        <strong>{{avgPerServingPerDay.toFixed()}} €</strong>
                    </div>
                </div>
              </div>
            </div>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="active=false"></button>
      </div>
  </div>
</template>

<script>
import BudgetCalculator from '~/assets/classes/BudgetCalculator'
export default {
    data(){
        return {
            totalBudget: 0,
            budgetPerServing: 0,
            avgPerDay: 0,
            avgPerServingPerDay: 0,
            active:false
        }
    },
    computed: {
        menu() {
            return this.$store.state.menu;
        }
    },
    methods:{
        calculateBudget(){
            if(this.menu){
                let bc = new BudgetCalculator(this.menu,this.$store.state.attendees);
                this.totalBudget =  bc.getTotalBudget();
                this.budgetPerServing = bc.getBudgetPerServing();
                this.avgPerDay = bc.getAverageBudgetPerDay();
                this.avgPerServingPerDay = bc.getAverageBudgetPerServingPerDay();
            }
        }
    },
    created(){
        this.calculateBudget();
        this.$store.watch((state) => state.trigger, (oldValue, newValue) => {
            this.calculateBudget();
        })
    }
}
</script>

<style>

</style>