import VuexPersistence from 'vuex-persist'

export const state = () => ({
    attendees: null,
    unplannedRecipes: [],
    menu: null
  })
  
  export const mutations = {
    addToUnplannedRecipes(state, recipe){
        state.unplannedRecipes.push(recipe);
    },
    updateUnplannedRecipes(state, value){
        state.unplannedRecipes = value;
    },
    updateMenu(state, menu){
        state.menu = menu;
    },
    updateDay(state, {value, key}){
        state.menu[key] = value;
    },
    setAttendees(state, attendees){
        state.attendees = attendees;
    }
  }

  