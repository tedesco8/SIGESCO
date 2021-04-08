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
        <ClienteTemplateDialog v-if="cliente" :item="item" :action="action" />
        <CategoriaTemplateDialog
          v-if="categoria"
          :item="item"
          :action="action"
        />
        <ArticuloTemplateDialog
          v-if="articulo"
          :item="item"
          :action="action"
          @gallery="showGallery"
        />
        <VentaTemplateDialog v-if="venta" :item="item" :action="action" />
        <Gallery
          v-if="dialogGallery"
          @select="selectImage"
          @close="(dialogGallery = false)"
          :dialog="(dialog = true)"
        />
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      dialogGallery: false,
    };
  },
  components: {
    UsuarioTemplateDialog: () => import(/* webpackPrefetch: true */ "./templates/usuario-template-dialog"),
    ClienteTemplateDialog: () => import(/* webpackPrefetch: true */ "./templates/cliente-template-dialog"),
    CategoriaTemplateDialog: () => import(/* webpackPrefetch: true */ "./templates/categoria-template-dialog"),
    ArticuloTemplateDialog: () => import(/* webpackPrefetch: true */ "./templates/articulo-template-dialog"),
    VentaTemplateDialog: () => import(/* webpackPrefetch: true */ "./templates/venta-template-dialog"),
    Gallery: () => import(/* webpackPrefetch: true */ "./Gallery")
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
    cliente: {
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
    ...mapActions("articulosNamespace", ["setArticle", "setImage"]),
    guardar() {
      this.$emit("guardar", this.item);
    },
    showGallery() {
      this.dialogGallery = true;
    },
    selectImage(url) {
      this.setImage(url);
      this.dialogGallery = false;
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