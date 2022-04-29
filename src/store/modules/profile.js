// initial state
import DefaultState from "../DefaultState"
const state = DefaultState.profile()

// getters
const getters = {}

// actions
const actions = {
}

const checkInitialized = state => (state.info.name !== '') && (state.info.email !== '')

// mutations
const mutations = {
  setName (state, name) {
    state.info.name = name
    state.initialized = checkInitialized(state)
  },
  setEmail (state, email) {
    state.info.email = email
    state.initialized = checkInitialized(state)
  },
  setLocalDb (state, localDb) {
    state.localDb = localDb
  },
  resetState (state) {
    Object.assign(state, DefaultState.profile())
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
