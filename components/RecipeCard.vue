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
                par {{recipe.auteur}}
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
            url: this.$config.baseqlURL,
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
                                prixIngredient
                                prixManquant
                            }
                            prix
                            slug
                            assietteAutre
                            assietteCereale
                            assietteLegume
                            assietteLegumineuse
                            contactAuteur
                            auteur
                            id
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
                                    this.$router.push({ path: 'menu/creer' })
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
.omnivore::after {
  content: "🍖";
  font-size: 1rem;
  position: absolute;
  top: 17px;
  left: 280px;
}

.vege::after {
  content: "🥕";
  font-size: 1rem;
  position: absolute;
  top: 17px;
  left: 280px;
}
</style>