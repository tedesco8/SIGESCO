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
    setImage(state, data) {
      state.article.image = data;
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
    setArticle: async function({ commit }, dataArticle) {
      commit("setArticle", dataArticle.data);
    },
    setImage: async function({ commit }, image) {
      commit("setImage", image);
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
    saveArticle: async function({ dispatch }, dataArticle) {
      let header = { Token: dataArticle.token };
      let configuracion = { headers: header };
      let data = dataArticle.data;
      debugger;
      if (data.image.name) {
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
              class: data.class,
            },
            configuracion
          )
          .then(function(res) {
            // debugger;
            dispatch("getArticles", dataArticle.token);
            debugger;
            if (
              data.image != null &&
              data.image != "unidefined" &&
              data.image != ""
            ) {
              const formData = new FormData();
              formData.append("file0", data.image, data.image.name);

              axios
                .post(`article/upload-image/${res.data.result.id}`, formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                })
                .then((response) => {
                  swal({
                    title: "Buen trabajo!",
                    text: `Artículo creado con éxito`,
                    icon: "success",
                  });
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
      } else {
        await axios
          .post(
            "article/add",
            {
              name: data.name,
              type: data.type,
              description: data.description,
              image: data.image,
              priceUnity: data.priceUnity,
              priceWholesale: data.priceWholesale,
              stock: data.stock,
              class: data.class,
            },
            configuracion
          )
          .then(function(res) {
            swal({
              title: "Buen trabajo!",
              text: `Artículo creado con éxito`,
              icon: "success",
            });
          })
          .catch(function(error) {
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
      }
    },
    updateArticle: async function({ dispatch }, dataArticle) {
      let header = { Token: dataArticle.token };
      let configuracion = { headers: header };
      //debugger;
      let data = dataArticle.data;
      if (data.image.name) {
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
              class: data.class,
            },
            configuracion
          )
          .then(function(res) {
            if (
              data.image != null &&
              data.image != "unidefined" &&
              data.image != ""
            ) {
              const formData = new FormData();
              formData.append("file0", data.image, data.image.name);

              axios
                .post(`article/upload-image/${res.data.id}`, formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                })
                .then((response) => {
                  dispatch("getArticles", dataArticle.token);
                  swal({
                    title: "Buen trabajo!",
                    text: `Artículo actualizado con éxito`,
                    icon: "success",
                  });
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
      } else {
        debugger
        await axios
          .put(
            "article/update",
            {
              id: data.id,
              name: data.name,
              type: data.type,
              description: data.description,
              image: data.image,
              priceUnity: data.priceUnity,
              priceWholesale: data.priceWholesale,
              stock: data.stock,
              class: data.class,
            },
            configuracion
          )
          .then(function(res) {
            swal({
              icon: 'success',
              title: "Buen trabajo!",
              text: `Artículo actualizado con éxito`
            })
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
      }
    },
    activateArticle: async function({ dispatch }, dataArticle) {
      let header = { Token: dataArticle.token };
      let configuracion = { headers: header };
      //debugger
      await axios
        .put("article/activate", { id: dataArticle.id }, configuracion)
        .then(function(res) {
          dispatch("getArticles", dataArticle.token);
          swal({
            title: "Buen trabajo!",
            text: `Artículo ${res.data.name} activado correctamente`,
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
    deactivateArticle: async function({ dispatch }, dataArticle) {
      let header = { Token: dataArticle.token };
      let configuracion = { headers: header };
      //debugger
      await axios
        .put("article/deactivate", { id: dataArticle.id }, configuracion)
        .then(function(res) {
          dispatch("getArticles", dataArticle.token);
          swal({
            title: "Buen trabajo!",
            text: `Artículo ${res.data.name} desactivado correctamente`,
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
