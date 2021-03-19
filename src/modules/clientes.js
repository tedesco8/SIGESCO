import axios from "axios";

export default {
  namespaced: true,
  state: {
    client: {},
    clients: [],
  },
  mutations: {
    setClients(state, data) {
      state.clients = data;
    },
    setClient(state, data) {
      state.client = data;
    },
    clear(state) {
      state.client = {};
    },
  },
  actions: {
    clear: async function({ commit }) {
      commit("clear");
    },
    newClient: async function({ commit }) {
      commit("clear");
    },
    getClients: async function({ commit }, token) {
      let header = { Token: token };
      let configuracion = { headers: header };
      let data = null;

      // debugger;
      await axios
        .get("client/get", configuracion)
        .then(function(response) {
          data = response.data;
          commit("setClients", data);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    getClient: async function({ commit }, dataClient) {
      let header = { Token: dataClient.token };
      let configuracion = { headers: header };
      let data = null;
      // debugger;
      await axios
        .get(`client/query?id=${dataClient.id}`, configuracion)
        .then(function(response) {
          data = { data: response.data };
          commit("setClient", data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    setClient: async function({ commit }, dataClient) {
      commit("setClient", dataClient.data);
    },
    saveClient: async function({ dispatch }, dataClient) {
      let header = { Token: dataClient.token };
      let configuracion = { headers: header };
      let data = dataClient.data;
      debugger;
      await axios
        .post(
          "client/add",
          {
            rol: data.rol,
            name: data.name,
            surname: data.surname,
            email: data.email,
            password: data.password,
            phone: data.phone,
            address: data.address,
            city: data.city

          },
          configuracion
        )
        .then(function(res) {
          // debugger;
          dispatch("getClients", dataClient.token);
          this.$swal.fire({
            title: "Buen trabajo!",
            text: `El Cliente ${res.data.name} agregado exitosamente`,
            type: "success",
          });
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status == 422) {
              return this.$swal.fire({
                title: "Lo sentimos!",
                text: `${error.response.data.message}`,
                type: "warning",
              });
            }
          } else {
            this.$swal.fire({
              title: "Lo sentimos!",
              text: `Ha ocurrido un error de tipo ${error}`,
              type: "error",
            });
          }
        });
    },
    updateClient: async function({ dispatch }, dataClient) {
      let header = { Token: dataClient.token };
      let configuracion = { headers: header };
      //debugger;
      let data = dataClient.data;
      await axios
        .put(
          "client/update",
          {
            id: data.id,
            rol: data.rol,
            name: data.name,
            surname: data.surname,
            email: data.email,
            password: data.password,
            phone: data.phone,
            address: data.address,
            city: data.city
          },
          configuracion
        )
        .then(function(res) {
          dispatch("getClients", dataClient.token);
          this.$swal.fire({
            title: "Buen trabajo!",
            text: `El Cliente ${res.data.name} fue editado exitosamente`,
            type: "success",
          });
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status == 422) {
              return this.$swal.fire({
                title: "Lo sentimos!",
                text: `${error.response.data.message}`,
                type: "warning",
              });
            }
          } else {
            this.$swal.fire({
              title: "Lo sentimos!",
              text: `Ha ocurrido un error de tipo ${error}`,
              type: "error",
            });
          }
        });
    },
    activateClient: async function({ dispatch }, dataClient) {
      let header = { Token: dataClient.token };
      let configuracion = { headers: header };
      //debugger
      await axios
        .put("client/activate", { id: dataClient.id }, configuracion)
        .then(function(res) {
          dispatch("getClients", dataClient.token);
          this.$swal.fire({
            title: "Buen trabajo!",
            text: `Cliente ${res.data.name} activado correctamente`,
            type: "success",
          });
        })
        .catch(function(error) {
          this.$swal.fire({
            title: "Lo sentimos!",
            text: `Ha ocurrido un error de tipo ${error}`,
            type: "error",
          });
        });
    },
    deactivateClient: async function({ dispatch }, dataClient) {
      let header = { Token: dataClient.token };
      let configuracion = { headers: header };
      //debugger
      await axios
        .put("client/deactivate", { id: dataClient.id }, configuracion)
        .then(function(res) {
          dispatch("getClients", dataClient.token);
          this.$swal.fire({
            title: "Buen trabajo!",
            text: `Cliente ${res.data.name} desactivado correctamente`,
            type: "success",
          });
        })
        .catch(function(error) {
          this.$swal.fire({
            title: "Lo sentimos!",
            text: `Ha ocurrido un error de tipo ${error}`,
            type: "error",
          });
        });
    },
  },
};
