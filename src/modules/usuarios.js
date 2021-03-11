import decode from "jwt-decode";
import axios from "axios";
import router from "../router";

export default {
  namespaced: true,
  state: {
    token: null,
    usuario: null,
    user: {},
    users: [],
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUsuario(state, usuario) {
      state.usuario = usuario;
    },
    setUsers(state, data) {
      state.users = data;
    },
    setUser(state, data) {
      state.user = data;
    },
    limpiar(state) {
      state.user = {};
    },
  },
  actions: {
    clear: async function({ commit }) {
      commit("limpiar");
    },
    newUser: async function({ commit }) {
      commit("limpiar");
    },
    getUsers: async function({ commit }, token) {
      let header = { Token: token };
      let configuracion = { headers: header };
      let data = null;

      // debugger;
      await axios
        .get("user/get", configuracion)
        .then(function(response) {
          data = response.data;
          commit("setUsers", data);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    getUser: async function({ commit }, dataUser) {
      let header = { Token: dataUser.token };
      let configuracion = { headers: header };
      let data = null;
      // debugger;
      await axios
        .get(`user/query?id=${dataUser.id}`, configuracion)
        .then(function(response) {
          data = { data: response.data };
          commit("setUser", data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    setUser: async function({ commit }, dataUser) {
      commit("setUser", dataUser.data);
    },
    saveUser: async function({ dispatch }, dataUser) {
      let header = { Token: dataUser.token };
      let configuracion = { headers: header };
      let data = dataUser.data;
      // debugger;
      await axios
        .post(
          "user/add",
          {
            name: data.name,
            surname: data.surname,
            email: data.email,
            rol: data.rol,
            phone: data.phone,
            password: data.password,
          },
          configuracion
        )
        .then(function(res) {
          // debugger;
          dispatch("getUsers", dataUser.token);
          swal({
            title: "Buen trabajo!",
            text: `Usuario ${res.data.name} ${res.data.surname} agregado exitosamente`,
            icon: "success",
          });
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status == 422) {
              return swal({
                title: "Lo sentimos!",
                text: `${error.response.data.message}`,
                icon: "warning",
              });
            }
          } else {
            swal({
              title: "Lo sentimos!",
              text: `Ha ocurrido un error de tipo ${error}`,
              icon: "error",
            });
          }
        });
    },
    updateUser: async function({ dispatch }, dataUser) {
      let header = { Token: dataUser.token };
      let configuracion = { headers: header };
      //debugger;
      let data = dataUser.data;
      await axios
        .put(
          "user/update",
          {
            id: data.id,
            name: data.name,
            surname: data.surname,
            email: data.email,
            rol: data.rol,
            phone: data.phone,
            password: data.password,
          },
          configuracion
        )
        .then(function(res) {
          dispatch("getUsers", dataUser.token);
          swal({
            title: "Buen trabajo!",
            text: `El usuario ${res.data.name} ${res.data.surname} fue editado exitosamente`,
            icon: "success",
          });
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status == 422) {
              return swal({
                title: "Lo sentimos!",
                text: `${error.response.data.message}`,
                icon: "warning",
              });
            }
          } else {
            swal({
              title: "Lo sentimos!",
              text: `Ha ocurrido un error de tipo ${error}`,
              icon: "error",
            });
          }
        });
    },
    activateUser: async function({ dispatch }, dataUser) {
      let header = { Token: dataUser.token };
      let configuracion = { headers: header };
      //debugger
      await axios
        .put("user/activate", { id: dataUser.id }, configuracion)
        .then(function(res) {
          dispatch("getUsers", dataUser.token);
          swal({
            title: "Buen trabajo!",
            text: `Usuario ${res.data.name} ${res.data.surname} activado correctamente`,
            icon: "success",
          });
        })
        .catch(function(error) {
          swal({
            title: "Lo sentimos!",
            text: `Ha ocurrido un error de tipo ${error}`,
            icon: "error",
          });
        });
    },
    deactivateUser: async function({ dispatch }, dataUser) {
      let header = { Token: dataUser.token };
      let configuracion = { headers: header };
      //debugger
      await axios
        .put("user/deactivate", { id: dataUser.id }, configuracion)
        .then(function(res) {
          dispatch("getUsers", dataUser.token);
          swal({
            title: "Buen trabajo!",
            text: `Usuario ${res.data.name} ${res.data.surname} desactivado correctamente`,
            icon: "success",
          });
        })
        .catch(function(error) {
          swal({
            title: "Lo sentimos!",
            text: `Ha ocurrido un error de tipo ${error}`,
            icon: "error",
          });
        });
    },
    guardarToken({ commit }, token) {
      commit("setToken", token);
      commit("setUsuario", decode(token));
      localStorage.setItem("token", token);
      router.push({ name: "home" });
    },
    autoLogin({ commit }) {
      let token = localStorage.getItem("token");
      if (token) {
        commit("setToken", token);
        commit("setUsuario", decode(token));
      }
      router.push({ name: "home" });
    },
    salir({ commit }) {
      commit("setToken", null);
      commit("setUsuario", null);
      localStorage.removeItem("token");
      router.push({ name: "login" });
    },
  },
};
