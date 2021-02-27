export const state = () => ({
    attendees: null,
    unplannedRecipes: [],
    menu: null
  })
  
  export const mutations = {
    addToUnplannedRecipes(state, recipe){
        state.unplannedRecipes.push(recipe);
    },
    initializeMenu(state, menu){
        state.menu = menu;
    },
    setAttendees(state, attendees){
        state.attendees = attendees;
    }
  }
  