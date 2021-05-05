class BudgetCalculator{
    #totalBudget;

    constructor(menu, servings){
        this.menu = menu;
        this.servings = servings;
        this.reducer = (accumulator, currentValue) => accumulator + currentValue;
        this.#totalBudget = null;
    }

    getTotalBudget(){
        if(!this.#totalBudget){
            if(this.menu && this.servings > 0){
                let allRecipes = Object.values(this.menu).flat();
                let recipesPrices = allRecipes.map(recipe => {
                    return this.getRecipeBudget(recipe)
                });
                if(recipesPrices.length > 0){
                    this.#totalBudget = recipesPrices.reduce(this.reducer);
                    return this.#totalBudget
                }
                else{
                    return 0;
                }
            }
        }
        else{
            return this.#totalBudget
        }
    }

    getRecipeBudget(recipe){
        let ratio = this.servings / recipe.nombreDePersonnes;
        let compositionPrices = recipe.compositions.map(c => {
            return c.prix * ratio
        });
        return compositionPrices.reduce(this.reducer);
    }

    getBudgetPerServing(){
        if(this.#totalBudget && this.servings){
            return this.#totalBudget / this.servings;
        }
        else{
            return 0;
        }
    }

    getAverageBudgetPerDay(){
        if(this.#totalBudget){
            return this.#totalBudget / Object.keys(this.menu).length;
        }
        else{
            return 0;
        }
    }

    getAverageBudgetPerServingPerDay(){
        if(this.servings){
            return this.getAverageBudgetPerDay() / this.servings;
        }
        else{
            return 0;
        }
    }
}

export default BudgetCalculator
