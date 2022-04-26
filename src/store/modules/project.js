import _ from 'lodash'

const getDefaultState = () => ({
        name: null,
        url: null,
        description: null,
        properties: [],
        created: false,
        bounties:[]
    
    })
// initial state
const state = getDefaultState()

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
    createProject(state,project){
        state.name = project.name
        state.url = project.url
        state.description = project.description
        state.properties = _.cloneDeep(project.properties)
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
    },
    deleteProject(state){
        Object.assign(state, getDefaultState())
    }


    
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}