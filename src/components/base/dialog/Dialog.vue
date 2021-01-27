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
          <v-toolbar-title>{{
            action == 1 ? "Detalle" : `Nueva ${title}`
          }}</v-toolbar-title>
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
    action: Number,
    item: Object,
    venta: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    guardar() {
      this.$emit("guardar", this.item);
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