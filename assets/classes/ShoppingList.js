class ShoppingList{
    #ingredients;

    constructor(menu, servings){
        this.menu = menu;
        this.servings = servings;
    }

    generate(){
        this.#ingredients = {};
        if(this.menu && this.servings > 0){
            let allRecipes = Object.values(this.menu).flat().sort((a,b) => (a.nom > b.nom) ? 1 : -1);
            allRecipes.forEach(r => {
                let ratio = this.servings / r.nombreDePersonnes;
                console.log(ratio);
                r.compositions.forEach(c => {
                    let ingredient = c.nomIngredient[0];
                    //all quantities will be kg or l
                    let conversionRatio = (c.unites === "gr" || c.unites === "ml") ? 1000 : 1;
                    let ingredientQty = ((c.quantite / conversionRatio) * ratio);
                    let ingredientUnit = c.mesure ? (c.mesure[0] === "Masse" ? "kg" : "l") : "kg";
                    if(!this.#ingredients.hasOwnProperty(ingredient)){
                        this.#ingredients[ingredient] = {totalQuantity: 0, recipes: [], unit: ingredientUnit, ingredient: ingredient, visible:false}
                    }
                    //change if unit is different
                    this.#ingredients[ingredient].totalQuantity += ingredientQty;
                    this.#ingredients[ingredient].recipes.push({
                        name: r.nom,
                        quantity: c.quantite * ratio,
                        unit: c.unites
                    })
                });
            });
            
            return Object.values(this.#ingredients).sort((a, b) => (a.ingredient > b.ingredient) ? 1 : -1);
        }
        else{
            return [];
        }
    }
}

export default ShoppingList;