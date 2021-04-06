import axios from "axios";
import swal from "sweetalert";

export default {
  namespaced: true,
  state: {
    total: 0,
    sale: { total: 0, tax: 0.0 },
    sales: [],
  },
  mutations: {
    setSales(state, data) {
      state.sales = data;
    },
    setTotal(state, data) {
      debugger;
      state.total = data;
    },
    setSale(state, data) {
      state.sale = data;
    },
    setDetail(state, data) {
      state.sale.details = data;
    },
    deleteDetail(state, data) {
      debugger;
      state.sale.details.splice(data, 1);
    },
    clear(state) {
      state.sale = { total: 0, tax: 0.0 };
    },
  },
  actions: {
    clear: async function({ commit }) {
      commit("clear");
    },
    setTotal: async function({ commit }, data) {
      commit("setTotal", data);
    },
    setSale: async function({ commit }, data) {
      commit("setSale", data);
    },
    setDetail: async function({ commit }, data) {
      commit("setDetail", data);
    },
    deleteDetail: async function({ commit }, data) {
      commit("deleteDetail", data);
    },
    newSale: async function({ commit }) {
      commit("clear");
    },
    getSales: async function({ commit }, token) {
      let header = { Token: token };
      let configuracion = { headers: header };
      let data = null;

      // debugger
      await axios
        .get("sale/get", configuracion)
        .then(function(response) {
          data = response.data;
          commit("setSales", data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getSale: async function({ commit }, dataVenta) {
      let header = { Token: dataVenta.token };
      let configuracion = { headers: header };
      let data = null;
      debugger;
      await axios
        .get(`sale/query?id=${dataVenta.id}`, configuracion)
        .then(function(response) {
          data = { data: response.data };
          commit("setSale", data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    saveSale: async function({ dispatch }, dataVenta) {
      let header = { Token: dataVenta.token };
      let configuracion = { headers: header };
      let data = dataVenta.data;
      debugger;
      await axios
        .post(
          "sale/add",
          {
            client: data.client,
            user: dataVenta.user,
            voucherType: data.voucherType,
            voucherSeries: data.voucherSeries,
            voucherNum: data.voucherNum,
            total: data.total,
            details: data.details,
          },
          configuracion
        )
        .then(function(res) {
          debugger;
          dispatch("getSales", dataVenta.token);
          swal({
            title: "Buen trabajo!",
            text: "Venta agregada exitosamente",
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
    updateSale: async function({ dispatch }, dataVenta) {
      let header = { Token: dataVenta.token };
      let configuracion = { headers: header };
      //debugger;
      let data = dataVenta.data;
      await axios
        .put("sale/update", { id: data.id }, configuracion)
        .then(function(res) {
          dispatch("getSales", dataVenta.token);
          swal({
            title: "Buen trabajo!",
            text: `La venta fue editada exitosamente`,
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
    activateSale: async function({ dispatch }, dataVenta) {
      let header = { Token: dataVenta.token };
      let configuracion = { headers: header };
      //debugger
      await axios
        .put("sale/activate", { id: dataVenta.id }, configuracion)
        .then(function() {
          dispatch("getSales", dataVenta.token);
          swal({
            title: "Buen trabajo!",
            text: `Venta activada correctamente`,
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
    deactivateSale: async function({ dispatch }, dataVenta) {
      let header = { Token: dataVenta.token };
      let configuracion = { headers: header };
      //debugger
      await axios
        .put("sale/deactivate", { id: dataVenta.id }, configuracion)
        .then(function() {
          dispatch("getSales", dataVenta.token);
          swal({
            title: "Buen trabajo!",
            text: `Venta desactivada correctamente`,
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
    deleteSale: async function({ dispatch }, dataVenta) {
      let token = dataVenta.token;
      let header = { Token: token };
      let configuracion = { headers: header };

      await axios
        .delete(`sale/remove?id=${dataVenta.id}`, configuracion)
        .then(function() {
          // debugger
          dispatch("getSales", dataVenta.token);
          swal({
            title: "Buen trabajo!",
            text: `Pedido eliminado correctamente`,
            icon: "success",
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
};
