<template>
  <div>
      <p>
        <strong>Budget pour tout le camp</strong> {{totalBudget.toFixed()}} €
      </p>
      <p>
        <strong>Budget par personne pour tout le camp</strong> {{budgetPerServing.toFixed()}} €
      </p>
      <p>
        <strong>Budget moyen par jour </strong> {{avgPerDay.toFixed()}} €
      </p>
      <p>
        <strong>Budget moyen par personne par jour </strong> {{avgPerServingPerDay.toFixed()}} €
      </p>
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
            avgPerServingPerDay: 0
        }
    },
    computed: {
        menu() {
            return this.$store.state.menu;
        }
    },
    methods:{
        calculateBudget(){
            let bc = new BudgetCalculator(this.menu,this.$store.state.attendees);
            this.totalBudget =  bc.getTotalBudget();
            this.budgetPerServing = bc.getBudgetPerServing();
            this.avgPerDay = bc.getAverageBudgetPerDay();
            this.avgPerServingPerDay = bc.getAverageBudgetPerServingPerDay();
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