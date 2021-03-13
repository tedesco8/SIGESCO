<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="close">
            <v-icon>chevron_left</v-icon>
          </v-btn>
          <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text v-if="action != 1" @click.native="guardar()">
              Guardar
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <UsuarioTemplateDialog v-if="usuario" :item="item" :action="action" />
        <CategoriaTemplateDialog v-if="categoria" :item="item" :action="action" />
        <ArticuloTemplateDialog v-if="articulo" :item="item" :action="action" />
        <VentaTemplateDialog v-if="venta" :item="item" :action="action" />
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import UsuarioTemplateDialog from "./templates/usuario-template-dialog";
import CategoriaTemplateDialog from "./templates/categoria-template-dialog";
import ArticuloTemplateDialog from "./templates/articulo-template-dialog";
import VentaTemplateDialog from "./templates/venta-template-dialog";
export default {
  components: {
    UsuarioTemplateDialog,
    CategoriaTemplateDialog,
    ArticuloTemplateDialog,
    VentaTemplateDialog,
  },
  props: {
    title: String,
    dialog: {
      type: Boolean,
      default: false,
    },
    action: Number, //0 = nuevo, 1 = ver, 2 = editar
    item: Object,
    usuario: {
      type: Boolean,
      default: false,
    },
    categoria: {
      type: Boolean,
      default: false,
    },
    articulo: {
      type: Boolean,
      default: false,
    },
    venta: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    formTitle() {
      switch (this.action) {
        case 0:
          return "Nuevo";
          break;
        case 1:
          return "Detalle";
          break;
        case 2:
          return "Edición";
          break;
      }
      return this.action === -1 ? "Nuevo registro" : "Editar registro";
    },
  },
  methods: {
    guardar() {
      debugger;
      this.$emit("guardar", this.item);
    },
    close() {
      this.$emit("close");
    },
  },
  watch: {
    dialog(val) {
      val || this.$emit("close");
    },
  },
};
</script>