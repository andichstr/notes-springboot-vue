import Vue from 'vue'
import Vuex from 'vuex'

import category from './modules/category'
import note from './modules/note'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    category, note
  }
})
