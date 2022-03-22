<template>
  <section class="hero" :class="className">
            <div class="hero-body" >
                <div class="container">
                    <nav class="level">
                          <div class="navbar-brand">
                            	<div class="container">
                            		<h1 class="title is-1">
										Super Intendance
									</h1>
							   		
                            </div>
                            <a role="button" class="navbar-burger" :class="{'is-active': burgerNav}" aria-label="menu" aria-expanded="false" @click="burgerNav = !burgerNav">
                                <span aria-hidden="true"></span>
                                <span aria-hidden="true"></span>
                                <span aria-hidden="true"></span>
                            </a>
                          </div>
                        <div class="navbar-menu" :class="{'is-active': burgerNav}">
                            <div class="navbar-end">
                                <nuxt-link class="navbar-item" to="/" :class="{'is-active': $route.path === '/'}">1. Les recettes</nuxt-link>
                                <nuxt-link class="navbar-item" to="/menu/creer" :class="{'is-active': $route.path === '/menu/creer'}">2. Planifier</nuxt-link>
                                <nuxt-link class="navbar-item" to="/menu" :class="{'is-active': $route.path === '/menu'}">3. Mes menus</nuxt-link>
                                
                            </div>
                        </div>

                    </nav>
                </div>
				<slot></slot>
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