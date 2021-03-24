class BudgetCalculator{
    constructor(menu, servings){
        this.menu = menu;
        this.servings = servings;
        this.reducer = (accumulator, currentValue) => accumulator + currentValue;
    }

    getTotalBudget(){
        if(this.menu && this.servings > 0){
            let allRecipes = Object.values(this.menu).flat();
            let recipesPrices = allRecipes.map(recipe => {
                let ratio = this.servings / recipe.nombreDePersonnes;
                let compositionPrices = recipe.compositions.map(c => {
                    return c.prix * ratio
                });
                return compositionPrices.reduce(this.reducer);
            });
            if(recipesPrices.length > 0){
                return recipesPrices.reduce(this.reducer);
            }
            else{
                return 0;
            }
        }
    }
}

export default BudgetCalculator
