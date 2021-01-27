<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      v-if="logueado"
    >
      <v-list dense>
        <!-- HOME -->
        <template
          v-if="
            esAdministrador ||
            esAlmacenero ||
            esVendedor ||
            esInvitado ||
            logueado
          "
        >
          <v-list-item :to="{ name: 'home' }">
            <v-list-item-action>
              <v-icon>home</v-icon>
            </v-list-item-action>
            <v-list-item-title> Inicio </v-list-item-title>
          </v-list-item>
        </template>

        <!-- ALMACEN -->
        <template
          v-if="esAdministrador || esAlmacenero || esInvitado || logueado"
        >
          <v-list-group>
            <v-list-item slot="activator">
              <v-list-item-content>
                <v-list-item-title> Almacén </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: 'categoria' }">
              <v-list-item-action>
                <v-icon>table_chart</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title> Categorías </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: 'articulo' }">
              <v-list-item-action>
                <v-icon>table_chart</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title> Artículos </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>

        <!-- COMPRAS -->
        <template
          v-if="esAdministrador || esAlmacenero || esInvitado || logueado"
        >
          <v-list-group>
            <v-list-item slot="activator">
              <v-list-item-content>
                <v-list-item-title> Compras </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: 'ingreso' }">
              <v-list-item-action>
                <v-icon>table_chart</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title> Ingresos </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: 'proveedor' }">
              <v-list-item-action>
                <v-icon>table_chart</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title> Proveedores </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>

        <!-- VENTAS -->
        <template
          v-if="esAdministrador || esVendedor || esInvitado || logueado"
        >
          <v-list-group>
            <v-list-item slot="activator">
              <v-list-item-content>
                <v-list-item-title> Ventas </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: 'venta' }">
              <v-list-item-action>
                <v-icon>table_chart</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title> Ventas </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: 'cliente' }">
              <v-list-item-action>
                <v-icon>table_chart</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title> Clientes </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>

        <!-- Usuarios -->
        <template v-if="esAdministrador || esInvitado || logueado">
          <v-list-group>
            <v-list-item slot="activator">
              <v-list-item-content>
                <v-list-item-title> Usuarios </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: 'usuario' }">
              <v-list-item-action>
                <v-icon>table_chart</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title> Usuarios </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>

        <!-- REPORTES -->
        <template
          v-if="
            esAdministrador ||
            esAlmacenero ||
            esVendedor ||
            esInvitado ||
            logueado
          "
        >
          <v-list-group>
            <v-list-item slot="activator">
              <v-list-item-content>
                <v-list-item-title> Reportes </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: 'reporteIngreso' }">
              <v-list-item-action>
                <v-icon>table_chart</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title> Consulta Compras </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: 'reporteVenta' }">
              <v-list-item-action>
                <v-icon>table_chart</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title> Consulta Ventas </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span class="hidden-sm-and-down">SIGESCO</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn @click="salirClick()" icon v-if="esInvitado || logueado">
        <v-icon>logout</v-icon>
      </v-btn>
      <v-btn :to="{ name: 'login' }" icon v-else>
        <v-icon>apps</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      drawer: true,
    };
  },
  computed: {
    ...mapState("usuariosNamespace", ["usuario"]),
    logueado() {
      return this.usuario;
    },
    esAdministrador() {
      return (
        this.usuario &&
        this.usuario.rol == "Administrador"
      );
    },
    esAlmacenero() {
      return (
        this.usuario &&
        this.usuario.rol == "Almacenero"
      );
    },
    esVendedor() {
      return (
        this.usuario && this.usuario.rol == "Vendedor"
      );
    },
    esInvitado() {
      return (
        this.usuario && this.usuario.rol == "Invitado"
      );
    },
  },
  methods: {
     ...mapActions("usuariosNamespace", ["salir"]),
    salirClick() {
      this.salir();
    },
  },
};
</script>

<style>
</style>