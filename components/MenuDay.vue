<template>
  <div>
      <div class="column">
      <div class="card mb-2 calendar-day ">
            <header class="card-header">
            <p class="is-size-6 p-2">
                {{day}}
            </p>
            </header>
            <div class="card-content p-0">
                <div class="slot ">
                    <draggable
                    v-model="menuDay"
                    group="menu"
                    dragClass="dragged" @end="notifySave" ghostClass="ghost"
                >
                    <div class="tag m-2 is-medium grabbable calendar-item" v-for="r in menuDay" :key="r.id">
                        <i class="fa fa-ellipsis-v is-size-7"></i><i class="fa fa-ellipsis-v is-size-7 mr-2"></i> {{r.nom}}
                    </div>
                    </draggable>
                </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
    props: [
        'day',
        'recipes'
    ],
    components: {
      draggable
    },
    computed: {
        menuDay: {
            get () {
                return this.$store.state.menu[this.day]
            },
            set(value) {
                console.log("menu day changes")
                this.$store.commit('updateDay', {
                    value,
                    key: this.day,
                })
            }
        }
    },
    methods:{
        notifySave(){
            this.$toast.show('💾 Sauvegardé', { 
                theme: "bubble", 
                position: "top-center", 
                duration : 1000
            });
        }
    }
}
</script>

<style scoped>
  .slot{
    border: 1px gray dashed;
    min-height: 50px;
    border-radius: 2px;
  }

  .calendar-day{
      min-width: 180px;
      box-shadow: none;
  }

  .calendar-item{
      display: block;
  }

  .ghost{
      
  }
</style>