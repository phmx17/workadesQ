import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      userId: null,
      username: null,
      jwToken: null,
      isAuthenticated: false,
      isCheckedIn: false
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

    userCheckInOut(state, payload) {
      state.user.isCheckedIn = payload
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
    },

    

  },

  modules: {
  }
})
