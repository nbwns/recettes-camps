<template>
    <div class="column is-one-quarter" >
        <div class="card" >
            <div class="card-content">
            <p class="title mb-0" 
                :class="{'omnivore': recipe.diet === 'Omnivore', 'vege': recipe.diet === 'Végétarien'}"
                :title="recipe.diet">
                {{recipe.nom}} 
            </p>
                <p class="is-size-7">
                Par {{recipe.auteur}}
                </p>
            <div class="content mt-3">
                {{recipe.introduction}}
            </div>
            </div>
            <footer class="card-footer">
            <p class="card-footer-item">
                <span>
                <nuxt-link :to="{path: '/recette?id='+recipe.id}">
                    <button class="button">Voir la recette</button>
                </nuxt-link>
                <button class="button is-primary" @click="addToUnplannedRecipes(recipe.id)">Ajouter au menu</button>
                </span>
            </p>
            </footer>
        </div>
    </div>
</template>

<script>
export default {
    props: ['recipe'],
    methods:{
        addToUnplannedRecipes(recordId){
            this.$axios({
            url: "https://api.baseql.com/airtable/graphql/apptVpg9XpET0IEyv",
                    method: "post",
                    data: {
                    query: `{
                    recettes(id: "${recordId}") {
                            nom
                            description
                            nombreDePersonnes
                            procedure
                            compositions {
                                nom
                                quantite
                                unites
                                nomIngredient
                                prix
                                mesure
                            }
                            prix
                            slug
                            assietteAutre
                            assietteCereale
                            assietteLegume
                            assietteLegumineuse
                            contactAuteur
                            auteur
                        }
                    }`,
                    }
            }).then((result) => {
                let recette = result.data.data.recettes[0];
                if(recette){
                    this.$store.commit('addToUnplannedRecipes', recette);
                    this.$toast.show('👍 Recette ajoutée au menu', { 
                            theme: "bubble", 
                            position: "top-center", 
                            duration : 1550,
                            action : [
                            {
                                text : 'Voir le menu',
                                onClick : (e, toastObject) => {
                                    this.$router.push({ path: 'menu' })
                                }
                            }
                            ]
                    });
                }
            });
        }
    }
}
</script>

<style>

</style>