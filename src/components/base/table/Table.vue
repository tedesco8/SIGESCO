<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <span>{{ title }}</span>
      </v-col>
      <v-col>
        <v-text-field
          class="text-xs-center"
          v-model="search"
          append-icon="search"
          label="Búsqueda"
          single-line
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <!--Data Table-->
        <v-data-table
          :headers="headers"
          :items="arrayList"
          :search="search"
          :single-select="true"
          class="elevation-1"
        >
          <template v-if="opciones" v-slot:item.opciones="{ item }">
            <Opciones :item="item" />
          </template>
          <template v-if="ventas" v-slot:item="{ item }">
            <VentasTemplate :item="item" />
          </template>
          <template v-if="ingresos" v-slot:item="{ item }">
            <IngresosTemplate :item="item" />
          </template>
          <template v-if="categoria" v-slot:item="{ item }">
            <CategoriasTemplate :item="item" />
          </template>
          <template v-if="articulos" v-slot:item="{ item }">
            <ArticulosTemplate :item="item" />
          </template>
          <template v-if="provedores" v-slot:item="{ item }">
            <ProvedoresTemplate :item="item" />
          </template>
          <template v-if="clientes" v-slot:item="{ item }">
            <ClientesTemplate v-if="ventas" :item="item" />
          </template>
          <template v-if="usuarios" v-slot:item="{ item }">
            <UsuariosTemplate :item="item" />
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Opciones from "./Opciones.vue";
import VentasTemplate from "./templates/ventas-template";
import IngresosTemplate from "./templates/ingresos-template";
import CategoriasTemplate from "./templates/categorias-template";
import ArticulosTemplate from "./templates/articulos-template";
import ProvedoresTemplate from "./templates/provedores-template";
import ClientesTemplate from "./templates/clientes-template";
import UsuariosTemplate from "./templates/usuarios-template";
export default {
  components: {
    Opciones,
    VentasTemplate,
  },
  props: {
    title: String,
    headers: Array,
    arrayList: Array,
    search: "",
    select: "",
    articulos: {
      type: Boolean,
      default: false,
    },
    categorias: {
      type: Boolean,
      default: false,
    },
    ingresos: {
      type: Boolean,
      default: false,
    },
    ventas: {
      type: Boolean,
      default: false,
    },
    provedores: {
      type: Boolean,
      default: false,
    },
    clientes: {
      type: Boolean,
      default: false,
    },
    usuarios: {
      type: Boolean,
      default: false,
    },
    opciones: {
      type: Boolean,
      default: false,
    },
  },
};
</script>