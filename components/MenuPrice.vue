<template>
  <div>
      <strong>Budget pour tout le camp</strong> {{totalBudget}}
  </div>
</template>

<script>
import BudgetCalculator from '~/assets/classes/BudgetCalculator'
export default {
    data(){
        return {
            totalBudget: 0
        }
    },
    computed: {
        menu() {
            return this.$store.state.menu;
        }
    },
    created(){
        let bc = new BudgetCalculator(this.menu,this.$store.state.attendees);
        this.totalBudget =  bc.getTotalBudget();
        this.$store.watch((state) => state.trigger, (oldValue, newValue) => {
            console.log('search string is changing')
            console.log(oldValue)
            console.log(this.$store.state.menu)
            let bc = new BudgetCalculator(this.$store.state.menu,this.$store.state.attendees);
            this.totalBudget =  bc.getTotalBudget();
        })
    }
}
</script>

<style>

</style>