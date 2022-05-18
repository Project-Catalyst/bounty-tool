import _ from 'lodash'
import DefaultState from '../DefaultState'
// initial state
const state = DefaultState.project()

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
        if(project.bounties !== undefined){
            state.bounties = _.cloneDeep(project.bounties)
        }
        
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
        Object.assign(state, DefaultState.project())
    },
    deleteBounty(state,uuid){
        console.log("Deleting",uuid)
        const idx = state.bounties.findIndex( item =>{
            return item.uuid === uuid
        })
        state.bounties.splice(idx,1)
    },


    
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}