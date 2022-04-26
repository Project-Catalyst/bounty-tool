import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/HomeView.vue"
import Instructions from "../views/InstructionsView.vue"
import ProjectFormView from "../views/ProjectFormView.vue"
import ProfileView from "../views/ProfileView.vue"
import DashboardView from "../views/DashboardView.vue"
import BountyFormView from "../views/BountyFormView.vue"
import store from "../store/index"

Vue.use(VueRouter)

// eslint-disable-next-line no-unused-vars
function projectExistsGuard(to,from,next){
  if(store.state.project.created) next({path:'dashboard',replace: true})
  else next()  
}
// eslint-disable-next-line no-unused-vars
function projectDoesNotExistGuard(to,from,next){
  if(!store.state.project.created) next({path:'home',replace: true})
  else next()  
}

const routes = [
  {
    path: "/",
    name: "home",
    alias: "/home",
    component: Home,
    
    
    beforeEnter: projectExistsGuard,
  },
  {
    path: "/instructions",
    name: "instructions",
    component: Instructions,
  },
  {
    path: "/project",
    name: "project",
    component: ProjectFormView
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardView,
    beforeEnter: projectDoesNotExistGuard
  },
  {
    path: "/bounty",
    name: "bounty",
    component: BountyFormView,
    beforeEnter: projectDoesNotExistGuard
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
