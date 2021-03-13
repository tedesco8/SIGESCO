import Vue from "vue";
import Router from "vue-router";
import store from './modules/usuarios'
import Home from "./views/Home.vue";
import Categoria from "./components/Categoria.vue";
import Login from "./components/Login.vue";
import Usuario from "./components/Usuario.vue";
import Articulo from "./components/Articulo.vue";
import Cliente from "./components/Cliente.vue";
import Proveedor from "./components/Proveedor.vue";
import Ingreso from "./components/Ingreso.vue";
import Venta from "./components/Venta.vue";
import ReporteVenta from "./components/ReporteVenta.vue";
import ReporteIngreso from "./components/ReporteIngreso.vue";

Vue.use(Router);

var router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        administrador: true,
        almacenero: true,
        vendedor: true,
        invitado: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        libre: true,
      },
    },
    {
      path: "/categoria",
      name: "categoria",
      component: Categoria,
      meta: {
        administrador: true,
        almacenero: true,
        invitado: true,
      },
    },
    {
      path: "/articulo",
      name: "articulo",
      component: Articulo,
      meta: {
        administrador: true,
        almacenero: true,
        invitado: true,
      },
    },
    {
      path: "/ingreso",
      name: "ingreso",
      component: Ingreso,
      meta: {
        administrador: true,
        almacenero: true,
        invitado: true,
      },
    },
    {
      path: "/cliente",
      name: "cliente",
      component: Cliente,
      meta: {
        administrador: true,
        vendedor: true,
        invitado: true,
      },
    },
    {
      path: "/venta",
      name: "venta",
      component: Venta,
      meta: {
        administrador: true,
        vendedor: true,
        invitado: true,
      },
    },
    {
      path: "/proveedor",
      name: "proveedor",
      component: Proveedor,
      meta: {
        administrador: true,
        almacenero: true,
        invitado: true,
      },
    },
    {
      path: "/usuario",
      name: "usuario",
      component: Usuario,
      meta: {
        administrador: true,
      },
    },
    {
      path: "/reporteVenta",
      name: "reporteVenta",
      component: ReporteVenta,
      meta: {
        administrador: true,
        invitado: true,
      },
    },
    {
      path: "/reporteIngreso",
      name: "reporteIngreso",
      component: ReporteIngreso,
      meta: {
        administrador: true,
        invitado: true,
      },
    },
  ],
});
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.libre)) {
    next();
  } else if (
    store.state.usuario &&
    store.state.usuario.rol == "Administrador"
  ) {
    if (to.matched.some((record) => record.meta.administrador)) {
      next();
    } else {
      this.$swal.fire({
        title: "Ups!",
        text: "No tienes acceso a esta ruta",
        type: "error",
      });
    }
  } else if (store.state.usuario && store.state.usuario.rol == "Vendedor") {
    if (to.matched.some((record) => record.meta.vendedor)) {
      next();
    } else {
      this.$swal.fire({
        title: "Ups!",
        text: "No tienes acceso a esta ruta",
        type: "error",
      });
    }
  } else if (store.state.usuario && store.state.usuario.rol == "Almacenero") {
    if (to.matched.some((record) => record.meta.almacenero)) {
      next();
    } else {
      this.$swal.fire({
        title: "Ups!",
        text: "No tienes acceso a esta ruta",
        type: "error",
      });
    }
  } else if (store.state.usuario && store.state.usuario.rol == "Invitado") {
    if (to.matched.some((record) => record.meta.invitado)) {
      next();
    } else {
      this.$swal.fire({
        title: "Ups!",
        text: "No tienes acceso a esta ruta",
        type: "error",
      });
    }
  } else {
    next({ name: "login" });
  }
});
export default router;
