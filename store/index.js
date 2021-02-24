export const state = () => ({
    attendees: 0,
    menu: []
  })
  
  export const mutations = {
    add(state, recipe) {
      state.menu.push(recipe);
    },
    setAttendees(state, attendees){
        state.attendees = attendees;
    }
  }
  