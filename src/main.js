const version = require('../package.json').version
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//Adding buefy
import Buefy from "buefy";


import "buefy/dist/buefy.css";
import "./assets/sass/main.scss";
Vue.use(Buefy);

import VueLodash from 'vue-lodash'
import lodash from 'lodash'
Vue.use(VueLodash, { lodash: lodash })

import VuePapaParse from 'vue-papa-parse'
Vue.use(VuePapaParse)


import { ValidationProvider, extend } from 'vee-validate/dist/vee-validate.full.esm';
Vue.component('ValidationProvider', ValidationProvider);

store.commit('app/version', version || 'none')

extend('url', value => {
  // eslint-disable-next-line no-useless-escape
  const httpRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  // Validate URL
  if(httpRegex.test(value)) return true
  return 'The {_field_} field needs to be a valid URL'
  
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
