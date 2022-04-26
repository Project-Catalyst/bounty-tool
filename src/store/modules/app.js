// initial state
const state = {
  version: '1.0'
}

// getters
const getters = {
  version: (state) => {
    return state.version
  }
}

// actions
const actions = {
}

// mutations
const mutations = {
  version(state,version){
    state.version=version
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
