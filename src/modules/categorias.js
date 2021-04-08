import axios from "axios";
import swal from "sweetalert";

export default {
  namespaced: true,
  state: {
    category: {},
    categorys: [],
  },
  mutations: {
    setCategorys(state, data) {
      state.categorys = data;
    },
    setCategory(state, data) {
      state.category = data;
    },
    limpiar(state) {
      state.category = {};
    },
  },
  actions: {
    clear: async function({ commit }) {
      commit("limpiar");
    },
    newCategory: async function({ commit }) {
      commit("limpiar");
    },
    getCategorys: async function({ commit }, token) {
      let header = { Token: token };
      let configuracion = { headers: header };
      let data = null;

      // debugger;
      await axios
        .get("type/get", configuracion)
        .then(function(response) {
          data = response.data;
          commit("setCategorys", data);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    getCategory: async function({ commit }, dataCategory) {
      let header = { Token: dataCategory.token };
      let configuracion = { headers: header };
      let data = null;
      // debugger;
      await axios
        .get(`type/query?id=${dataCategory.id}`, configuracion)
        .then(function(response) {
          data = { data: response.data };
          commit("setCategory", data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    setCategory: async function({ commit }, dataCategory) {
      commit("setCategory", dataCategory.data);
    },
    saveCategory: async function({ dispatch }, dataCategory) {
      let header = { Token: dataCategory.token };
      let configuracion = { headers: header };
      let data = dataCategory.data;
      // debugger;
      await axios
        .post(
          "type/add",
          {
            name: data.name,
            description: data.description,
          },
          configuracion
        )
        .then(function(res) {
          // debugger;
          dispatch("getCategorys", dataCategory.token);
          swal({
            title: "Buen trabajo!",
            text: `Categoría ${res.data.name} agregada exitosamente`,
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
              type: "error",
            });
          }
        });
    },
    updateCategory: async function({ dispatch }, dataCategory) {
      let header = { Token: dataCategory.token };
      let configuracion = { headers: header };
      //debugger;
      let data = dataCategory.data;
      await axios
        .put(
          "type/update",
          {
            id: data.id,
            name: data.name,
            description: data.description,
          },
          configuracion
        )
        .then(function(res) {
          dispatch("getCategorys", dataCategory.token);
          swal({
            title: "Buen trabajo!",
            text: `La Categoría ${res.data.name} fue editada exitosamente`,
            type: "success",
          });
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status == 422) {
              return swal({
                title: "Lo sentimos!",
                text: `${error.response.data.message}`,
                type: "warning",
              });
            }
          } else {
            swal({
              title: "Lo sentimos!",
              text: `Ha ocurrido un error de tipo ${error}`,
              type: "error",
            });
          }
        });
    },
    activateCategory: async function({ dispatch }, dataCategory) {
      let header = { Token: dataCategory.token };
      let configuracion = { headers: header };
      //debugger
      await axios
        .put("type/activate", { id: dataCategory.id }, configuracion)
        .then(function(res) {
          dispatch("getCategorys", dataCategory.token);
          swal({
            title: "Buen trabajo!",
            text: `Categoría ${res.data.name} activada correctamente`,
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
    deactivateCategory: async function({ dispatch }, dataCategory) {
      let header = { Token: dataCategory.token };
      let configuracion = { headers: header };
      //debugger
      await axios
        .put("type/deactivate", { id: dataCategory.id }, configuracion)
        .then(function(res) {
          dispatch("getCategorys", dataCategory.token);
          swal({
            title: "Buen trabajo!",
            text: `Categoría ${res.data.name} desactivada correctamente`,
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
  },
};
