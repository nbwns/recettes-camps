<template>
  <section class="hero" :class="className">
            <div class="hero-body" >
                <div class="container">
                    <nav class="level">
                          <div class="navbar-brand">
                              <div class="container">
                               <slot></slot>
                            </div>
                            <a role="button" class="navbar-burger" :class="{'is-active': burgerNav}" aria-label="menu" aria-expanded="false" @click="burgerNav = !burgerNav">
                                <span aria-hidden="true"></span>
                                <span aria-hidden="true"></span>
                                <span aria-hidden="true"></span>
                            </a>
                          </div>
                        <div class="navbar-menu" :class="{'is-active': burgerNav}">
                            <div class="navbar-end">
                                <nuxt-link class="navbar-item" to="/">Les recettes</nuxt-link>
                                <nuxt-link class="navbar-item" to="/menu">Mon menu de camp</nuxt-link>
                                <nuxt-link class="navbar-item" to="/shoppinglist">Ma liste de courses</nuxt-link>
                            </div>
                        </div>

                    </nav>
                </div>
            </div>
        </section>
</template>

<script>
export default {
    props: ['className'],
    data(){
        return {
            burgerNav: false
        }
    }
}
</script>

<style>

</style>