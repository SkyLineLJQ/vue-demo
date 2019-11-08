let state = {
  buttonPermissions: [],
}

let mutations = {
  setBtnRole:(state, val) =>{
    state.buttonPermissions = val
  }
}

export default {
  state,
  mutations,
}
