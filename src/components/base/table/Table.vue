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
            <VentasC :item="item" />
          </template>
          <template v-if="ingresos" v-slot:item="{ item }">
            <IngresosC :item="item" />
          </template>
          <template v-if="categoria" v-slot:item="{ item }">
            <CategoriasC :item="item" />
          </template>
          <template v-if="articulos" v-slot:item="{ item }">
            <ArticulosC :item="item" />
          </template>
          <template v-if="provedores" v-slot:item="{ item }">
            <ProvedoresC :item="item" />
          </template>
          <template v-if="clientes" v-slot:item="{ item }">
            <ClientesC v-if="ventas" :item="item" />
          </template>
          <template v-if="usuarios" v-slot:item="{ item }">
            <UsuariosC :item="item" />
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Opciones from "./Opciones.vue";
import VentasC from "./templates/VentasC";
import IngresosC from "./templates/IngresosC";
import CategoriasC from "./templates/CategoriasC";
import ArticulosC from "./templates/ArticulosC";
import ProvedoresC from "./templates/ProvedoresC";
import ClientesC from "./templates/ClientesC";
import UsuariosC from "./templates/UsuariosC";
export default {
  components: {
    Opciones,
    VentasC,
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