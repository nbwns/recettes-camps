class ShoppingList{
    #ingredients;

    constructor(menu, servings){
        this.menu = menu;
        this.servings = servings;
    }

    generate(){
        this.#ingredients = {};
        if(this.menu && this.servings > 0){
            let allRecipes = Object.values(this.menu).flat();
            allRecipes.forEach(r => {
                let ratio = this.servings / r.nombreDePersonnes;
                r.compositions.forEach(c => {
                    let ingredient = c.nomIngredient[0];
                    if(!this.#ingredients.hasOwnProperty(ingredient)){
                        this.#ingredients[ingredient] = {totalQuantity: 0, recipes: []}
                    }
                    //change if unit is different
                    this.#ingredients[ingredient].totalQuantity += c.quantite;
                    this.#ingredients[ingredient].recipes.push({
                        name: r.nom,
                        quantity: c.quantite,
                        unit: c.unites
                    })
                })
            });
        }
        return this.#ingredients;
    }
}

export default ShoppingList;