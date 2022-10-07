import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      userId: "id test",
      username: "username test",
      jwToken: "token test"
    },

  },

  getters: {
    getUser: state => state.user    
  },

  mutations: {
    // addUserToState(state, payload) {
    //   state.user = payload.user
    // }
  },

  actions: {
  },

  modules: {
  }
})
