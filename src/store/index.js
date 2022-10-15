import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      userId: "id test",
      username: "username test",
      jwToken: "token test",
      isAuthenticated: false
    },

    desks: []
  },

  getters: {
    getUser(state) {
      return state.user    
    },

    getDesks(state) {
      return state.desks
    }
  },

  mutations: {
    addUserToState(state, payload) {
      state.user.userId = payload.id
      state.user.username = payload.username
      state.user.jwToken = payload.jwt
      state.user.isAuthenticated = true
    },

    addDesksToState(state, payload) {
      state.desks = [...payload]
    }
  },

  actions: {
    addUserAction(context, payload) {
      context.commit('addUserToState', payload)
    },
    addDesksAction(context, payload) {
      context.commit('addDesksToState', payload)
    }
  },

  modules: {
  }
})
