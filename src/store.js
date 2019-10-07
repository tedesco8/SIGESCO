import Vue from 'vue'
import Vuex from 'vuex'
import decode from 'jwt-decode'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    usuario: null
  },
  mutations: {
    setToken(state,token){
      state.token=token;
    },
    setUsuario(state,usuario){
      state.usuario=usuario;
    }
  },
  actions: {
    guardarToken({commit}, token){
      commit("setToken", token)
      commit("setUsuario", decode(token))
      localStorage.setItem("token", token)
    },
    autoLogin({commit}){
      let token = localStorage.getItem("token");
      if(token) {
        commit("setToken", token);
        commit("setUsuario", decode(token));
      }
      router.push({name: 'home'});
    },
    salir({commit}){
      commit("setToken", null);
      commit("setUsuario", null);
      localStorage.removeItem("token");
      router.push({name: 'login'});
    }
  }
})
