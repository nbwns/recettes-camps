<template>
  <section class="hero" :class="className">
            <div class="hero-body" >
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
                            
                                <nuxt-link class="button" to="/menu">Mon menu de camp</nuxt-link>
                                
                            
                        </div>
                    </nav>
                </div>
            </div>
        </section>
</template>

<script>
export default {
    props: ['className'],
    computed: {
        menu () {
            return this.$store.state.menu || []
        }
    },
}
</script>

<style>

</style>