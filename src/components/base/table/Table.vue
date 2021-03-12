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
          :items="items"
          :search="search"
          :single-select="true"
          class="elevation-1"
        >
          <template v-if="opciones" v-slot:item.opciones="{ item }">
            <Opciones
              :item="item"
              @verItemClick="verItem"
              @editItemClick="editItem"
              @actdeaItemClick="actdeaItem"
            />
          </template>
          <template v-slot:item.status="{ item }">
            <div v-if="item.status">
              <span class="green--text">Activo</span>
            </div>
            <div v-else>
              <span class="red--text">Inactivo</span>
            </div>
          </template>
          <template v-if="usuarios" v-slot:item="{ item }">
            <UsuariosTemplate :item="item" @listarClick="listar" />
          </template>
          <template v-if="categoria" v-slot:item="{ item }">
            <CategoriasTemplate :item="item" />
          </template>
          <template v-if="ventas" v-slot:item="{ item }">
            <VentasTemplateTable :item="item" @listarClick="listar" />
          </template>
          <!-- <template v-if="ingresos" v-slot:item="{ item }">
            <IngresosTemplate :item="item" />
          </template>
          <template v-if="articulos" v-slot:item="{ item }">
            <ArticulosTemplate :item="item" />
          </template>
          <template v-if="provedores" v-slot:item="{ item }">
            <ProvedoresTemplate :item="item" />
          </template>
          <template v-if="clientes" v-slot:item="{ item }">
            <ClientesTemplate v-if="ventas" :item="item" />
          </template> -->
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Opciones from "./Opciones.vue";
import UsuariosTemplate from "./templates/usuarios-template-table";
import CategoriasTemplate from "./templates/categorias-template-table";
import VentasTemplateTable from "./templates/ventas-template-table";
import IngresosTemplate from "./templates/ingresos-template-table";
import ArticulosTemplate from "./templates/articulos-template-table";
import ProvedoresTemplate from "./templates/provedores-template-table";
import ClientesTemplate from "./templates/clientes-template-table";
export default {
  components: {
    Opciones,
    UsuariosTemplate,
    CategoriasTemplate,
    VentasTemplateTable
  },
  props: {
    title: String,
    headers: Array,
    items: Array,
    search: "",
    select: "",
    opciones: {
      type: Boolean,
      default: false,
    },
    categorias: {
      type: Boolean,
      default: false,
    },
    articulos: {
      type: Boolean,
      default: false,
    },
    ventas: {
      type: Boolean,
      default: false,
    },
    ingresos: {
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
  },
  methods: {
    listar() {
      this.$emit("listar");
    },
    verItem(item) {
      debugger
      this.$emit("verItem", item);
    },
    editItem(item) {
      this.$emit("editItem", item);
    },
    actdeaItem(act, item) {
      this.$emit("actdeaItem", act, item);
    },
  },
};
</script>