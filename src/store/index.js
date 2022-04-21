import Vue from 'vue'
import Vuex from 'vuex'
import createPersist from 'vuex-localstorage'
import profile from './modules/profile'
import project from './modules/project'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

let localStorage = createPersist({
  namespace: 'bounty-tool',
  initialState: {},
  expires: 30 * 24 * 60 * 60 * 1e3 // 30 days
})

export default new Vuex.Store({
  actions: {
  },
  modules: {
    profile,
    project
  },
  strict: debug,
  plugins: [localStorage]
})
