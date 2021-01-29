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
        <VentaTemplateDialog
          v-if="venta"
          :item="item"
          :action="action"
          @item="itemAction"
          @detalle="detalle"
        />
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import VentaTemplateDialog from "./templates/venta-template-dialog";
export default {
  components: { VentaTemplateDialog },
  props: {
    title: String,
    dialog: {
      type: Boolean,
      default: false,
    },
    action: Number, //0 = nuevo, 1 = ver, 2 = editar
    item: Object,
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
      this.$emit("guardar", this.item);
    },
    detalle(items) {
      this.$emit("detalle", items);
    },
    itemAction(item) {
      this.$emit("item", item);
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