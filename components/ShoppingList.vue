<template>
  <div>
      <div v-for="(item, index) in list" :key="item.ingredient">
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
    </div>
                
  </div>
</template>

<script>
export default {
    props: ['list']
}
</script>

<style>

</style>