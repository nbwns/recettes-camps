import VuexPersistence from 'vuex-persist'

export const state = () => ({
    attendees: null,
	name: null,
    unplannedRecipes: [],
    menu: null,
    trigger: 0,
    savedMenus: []
  })
  
  export const mutations = {
    addToUnplannedRecipes(state, recipe){
        if(recipe.length){
            state.unplannedRecipes.push(...recipe);
        }
        else{
            state.unplannedRecipes.push(recipe);
        }
    },
    updateUnplannedRecipes(state, value){
        state.unplannedRecipes = value;
    },
    updateMenu(state, menu){
        state.menu = menu;
    },
    updateDay(state, {value, key}){
        /*let menuServings = state.attendees;
        let recipes = value;
        recipes.forEach(r => {
            let ratio = menuServings / r.nombreDePersonnes;
            //only recalculate if needed
            if(ratio !== 1){
                r.nombreDePersonnes = menuServings
                //adapt price & quantity based on menu servings
                r.compositions.forEach(c => {
                    c.quantite = c.quantite * ratio
                    c.prix = c.prix * ratio
                });
            }
        });
        console.log(menuServings, recipes, value)*/


        state.menu[key] = value;
        state.trigger = value;
    },
    setAttendees(state, attendees){
        state.attendees = attendees;
    },
	setName(state, name){
        state.name = name;
    },
    addToSavedMenus(state, menuId){
        state.savedMenus.push(menuId);
    },
    updateSavedMenus(state, value){
        state.savedMenus = value;
    }
  }


  