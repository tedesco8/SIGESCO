import axios from "axios";

export default {
  namespaced: true,
  state: {
    article: {},
    articles: [],
    articlesImages: [],
  },
  mutations: {
    setArticles(state, data) {
      state.articles = data;
    },
    setArticle(state, data) {
      state.article = data;
    },
    limpiar(state) {
      state.article = {};
    },
    llenarImages(state, data) {
      state.articlesImages = data;
    },
  },
  actions: {
    clear: async function({ commit }) {
      commit("limpiar");
    },
    newArticle: async function({ commit }) {
      commit("limpiar");
    },
    getArticles: async function({ commit }, token) {
      let header = { Token: token };
      let configuracion = { headers: header };
      let data = null;

      // debugger;
      await axios
        .get("article/get", configuracion)
        .then(function(response) {
          data = response.data;
          commit("setArticles", data);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    getArticle: async function({ commit }, dataArticle) {
      let header = { Token: dataArticle.token };
      let configuracion = { headers: header };
      let data = null;
      // debugger;
      await axios
        .get(`article/query?id=${dataArticle.id}`, configuracion)
        .then(function(response) {
          data = { data: response.data };
          commit("setArticle", data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getArticlesImages: async function({ commit }, token) {
      let header = { Token: token };
      let configuracion = { headers: header };
      let data = null;

      await axios
        .get("article/image-all", configuracion)
        .then(function(response) {
          data = response.data.resources;
          commit("llenarImages", data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    setArticle: async function({ commit }, dataArticle) {
      commit("setArticle", dataArticle.data);
    },
    saveArticle: async function({ dispatch }, dataArticle) {
      let header = { Token: dataArticle.token };
      let configuracion = { headers: header };
      let data = dataArticle.data;
      // debugger;
      await axios
        .post(
          "article/add",
          {
            name: data.name,
            type: data.type,
            description: data.description,
            priceUnity: data.priceUnity,
            priceWholesale: data.priceWholesale,
            stock: data.stock,
            image: data.image ? data.image : data.imagen,
            class: data.class

          },
          configuracion
        )
        .then(function(res) {
          // debugger;
          dispatch("getArticles", dataArticle.token);
          this.$swal.fire({
            title: "Buen trabajo!",
            text: `El artículo ${res.data.name} agregado exitosamente`,
            type: "success",
          });
          if (data.image != null && data.image != "unidefined" && data.image != "") {
            const formData = new FormData();
            formData.append("file0", data.image, data.image.name);

            axios
              .post(`article/upload-image/${res.data.id}`, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((response) => {
                console.log(response);
              })
              .catch((err) => {
                swal({
                  title: "Algo anda mal",
                  text: `La imagen no pudo ser subida`,
                  icon: "error",
                });
              });
          }
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
    updateArticle: async function({ dispatch }, dataArticle) {
      let header = { Token: dataArticle.token };
      let configuracion = { headers: header };
      //debugger;
      let data = dataArticle.data;
      await axios
        .put(
          "article/update",
          {
            id: data.id,
            name: data.name,
            type: data.type,
            description: data.description,
            priceUnity: data.priceUnity,
            priceWholesale: data.priceWholesale,
            stock: data.stock,
            image: data.image,
            class: data.class
          },
          configuracion
        )
        .then(function(res) {
          dispatch("getArticles", dataArticle.token);
          this.$swal.fire({
            title: "Buen trabajo!",
            text: `El artículo ${res.data.name} fue editado exitosamente`,
            type: "success",
          });
          if (data.image != null && data.image != "unidefined" && data.image != "") {
            const formData = new FormData();
            formData.append("file0", data.image, data.image.name);

            axios
              .post(`article/upload-image/${res.data.id}`, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((response) => {
                console.log(response);
              })
              .catch((err) => {
                swal({
                  title: "Algo anda mal",
                  text: `La imagen no pudo ser subida`,
                  icon: "error",
                });
              });
          }
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
    activateArticle: async function({ dispatch }, dataArticle) {
      let header = { Token: dataArticle.token };
      let configuracion = { headers: header };
      //debugger
      await axios
        .put("article/activate", { id: dataArticle.id }, configuracion)
        .then(function(res) {
          dispatch("getArticles", dataArticle.token);
          this.$swal.fire({
            title: "Buen trabajo!",
            text: `Artículo ${res.data.name} activado correctamente`,
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
    deactivateArticle: async function({ dispatch }, dataArticle) {
      let header = { Token: dataArticle.token };
      let configuracion = { headers: header };
      //debugger
      await axios
        .put("article/deactivate", { id: dataArticle.id }, configuracion)
        .then(function(res) {
          dispatch("getArticles", dataArticle.token);
          this.$swal.fire({
            title: "Buen trabajo!",
            text: `Artículo ${res.data.name} desactivado correctamente`,
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
