import _ from 'lodash'
// initial state
const state = {
    name: null,
    url: null,
    description: null,
    categories: [],
    created: false,
    bounties:[]

}

// getters
const getters = {
    getBountyByUUID: (state) => (uuid) => {
        return state.bounties.find( bounty => bounty.uuid === uuid)
    }
}

// actions
const actions = {
}

// mutations
const mutations = {
    // setName(state, name){
    //     state.name = name
    // },
    // setUrl(state, url){
    //     state.url = url
    // },
    // setDescription(state,description){
    //     state.description = description
    // },
    // setCategories(state,categories){
    //     state.categories = categories
    // },
    // addCategory(state,category){
    //     state.categories.push(category)
    // },
    createProject(state,project){
        state.name = project.name
        state.url = project.url
        state.description = project.description
        state.categories = _.cloneDeep(project.categories)
        state.created = true
    },
    createBounty(state,bounty){
        state.bounties.push(bounty)
    },
    updateBounty(state,bounty){
        const idx = state.bounties.findIndex( item =>{
            return item.uuid === bounty.uuid
        })
        state.bounties[idx]=bounty
    }

    
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}