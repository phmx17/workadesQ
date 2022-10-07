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
    getUser(state) {
      return state.user    
    }
  },

  mutations: {
    addUserToState(state, payload) {
      state.user.userId = payload.id
      state.user.username = payload.username
      state.user.jwToken = payload.jwt
    }
  },

  actions: {
    addUserAction(context, payload ) {
      context.commit('addUserToState', payload)
    }
    // addUserAction: ({ commit, payload }) => commit('addUserToState', {userId: payload.user.userId})
  },

  modules: {
  }
})
