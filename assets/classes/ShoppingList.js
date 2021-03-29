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
                console.log(ratio);
                r.compositions.forEach(c => {
                    let ingredient = c.nomIngredient[0];
                    //all quantities will be kg or l
                    let conversionRatio = (c.unites === "gr" || c.unites === "ml") ? 1000 : 1;
                    let ingredientQty = ((c.quantite / conversionRatio) * ratio);
                    let ingredientUnit = c.mesure[0] === "Masse" ? "kg" : "l";
                    if(!this.#ingredients.hasOwnProperty(ingredient)){
                        this.#ingredients[ingredient] = {totalQuantity: 0, recipes: [], unit: ingredientUnit}
                    }
                    //change if unit is different
                    this.#ingredients[ingredient].totalQuantity += ingredientQty;
                    this.#ingredients[ingredient].recipes.push({
                        name: r.nom,
                        quantity: c.quantite * ratio,
                        unit: c.unites
                    })
                })
            });
        }
        return this.#ingredients;
    }
}

export default ShoppingList;