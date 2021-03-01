<template>
  <div>
      <div class="card mb-2">
            <header class="card-header">
            <p class="card-header-title">
                {{day}}
            </p>
            </header>
            <div class="card-content">
                <div class="slot">
                    <draggable
                    v-model="menuDay"
                    group="menu"
                >
                    <span class="tag is-large m-2 grabbable" v-for="r in menuDay" :key="r.slug">
                        <i class="fa fa-ellipsis-v is-size-7 mr-2"></i> {{r.nom}}
                    </span>
                    </draggable>
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
                this.$store.commit('updateDay', {
                    value,
                    key: this.day,
                })
            }
        }
    },
    mounted(){
        console.log("MenuDay param", this.day)
        console.log("MenuDay value", this.menuDay.length)
    }
}
</script>

<style scoped>
  .slot{
    border: 1px gray dashed;
    min-height: 48px;
    border-radius: 2px;
  }
</style>