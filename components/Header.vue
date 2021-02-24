<template>
  <section class="hero">
            <div class="hero-body" :class="className">
                <div class="container">
                    <nav class="level">
                        <div class="level-left">
                        <div class="level-item">
                            <div class="container">
                               <slot></slot>
                            </div>
                        </div>
                        </div>
                        <div class="level-right">
                            
                                <button class="button">Mon menu de camp
                                    <span class="tag ml-2">{{menu.length}}</span>
                                </button>
                            
                        </div>
                    </nav>
                </div>
            </div>
        </section>
</template>

<script>
export default {
    props: ['className']
}
</script>

<style>

</style>