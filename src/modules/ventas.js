import axios from "axios";

export default {
  namespaced: true,
  state: {
    venta: {},
    ventas: [],
  },
  mutations: {
    llenarVentas(state, data) {
      state.ventas = data;
    },
    llenarVenta(state, data) {
      data.data
        ? (state.venta = data.data)
        : (state.venta.detalles = data.detalle);
    },
    nuevaVenta(state, data) {
      state.venta = data;
    },
    limpiar(state) {
      state.venta = {};
    },
  },
  actions: {
    clear: async function({ commit }) {
      commit("limpiar");
    },
    setVenta: async function({ commit }, data) {
      commit("llenarVenta", data);
    },
    newVenta: async function({ commit }) {
      let data = { impuesto: 0.18 };
      commit("nuevaVenta", data);
    },
    getVentas: async function({ commit }, token) {
      let header = { Token: token };
      let configuracion = { headers: header };
      let data = null;

      // debugger
      await axios
        .get("sale/get", configuracion)
        .then(function(response) {
          data = response.data;
          commit("llenarVentas", data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getVenta: async function({ commit }, dataVenta) {
      let header = { Token: dataVenta.token };
      let configuracion = { headers: header };
      let data = null;
      debugger;
      await axios
        .get(`sale/query?id=${dataVenta.id}`, configuracion)
        .then(function(response) {
          data = { data: response.data };
          commit("llenarVenta", data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    saveVenta: async function({ dispatch }, dataVenta) {
      let header = { Token: dataVenta.token };
      let configuracion = { headers: header };
      let data = dataVenta.data;
      debugger;
      await axios
        .post("sale/add", { data }, configuracion)
        .then(function(res) {
          debugger;
          dispatch("getVentas", dataVenta.token);
          this.$swal.fire({
            title: "Buen trabajo!",
            text: "Venta agregada exitosamente",
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
    updateVenta: async function({ dispatch }, dataVenta) {
      let header = { Token: dataVenta.token };
      let configuracion = { headers: header };
      //debugger;
      let data = dataVenta.data;
      await axios
        .put("sale/update", { id: data.id }, configuracion)
        .then(function(res) {
          dispatch("getVentas", dataVenta.token);
          this.$swal.fire({
            title: "Buen trabajo!",
            text: `La venta fue editada exitosamente`,
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
    activateVenta: async function({ dispatch }, dataVenta) {
      let header = { Token: dataVenta.token };
      let configuracion = { headers: header };
      //debugger
      await axios
        .put("sale/activate", { id: dataVenta.id }, configuracion)
        .then(function() {
          dispatch("getVentas", dataVenta.token);
          this.$swal.fire({
            title: "Buen trabajo!",
            text: `Venta activada correctamente`,
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
    deactivateVenta: async function({ dispatch }, dataVenta) {
      let header = { Token: dataVenta.token };
      let configuracion = { headers: header };
      //debugger
      await axios
        .put("sale/deactivate", { id: dataVenta.id }, configuracion)
        .then(function() {
          dispatch("getVentas", dataVenta.token);
          this.$swal.fire({
            title: "Buen trabajo!",
            text: `Venta desactivada correctamente`,
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
    deleteVenta: async function({ dispatch }, dataVenta) {
      let token = dataVenta.token;
      let header = { Token: token };
      let configuracion = { headers: header };

      await axios
        .delete(`sale/remove?id=${dataVenta.id}`, configuracion)
        .then(function() {
          // debugger
          dispatch("getVentas", dataVenta.token);
          this.$swal.fire({
            title: "Buen trabajo!",
            text: `Pedido eliminado correctamente`,
            type: "success",
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
};
