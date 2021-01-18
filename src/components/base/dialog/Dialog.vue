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
          <v-btn icon dark @click="dialog = false">
            <v-icon>chevron_left</v-icon>
          </v-btn>
          <v-toolbar-title>{{
            detalle ? "Detalle" : `Nueva ${title}`
          }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text v-if="!detalle" @click.native="guardar()">
              Guardar
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <VentaTemplate v-if="venta" :item="item" />
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import VentaTemplate from "./templates/venta-template";
export default {
  components: { VentaTemplate },
  props: {
    title: String,
    dialog: {
      type: Boolean,
      default: false,
    },
    item: Object,
    nuevo: {
      type: Boolean,
      default: false,
    },
    detalle: {
      type: Boolean,
      default: false,
    },
    venta: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    guardar() {
      this.$emit("guardar", this.item);
    },
  },
  watch: {
    dialog(val) {
      val || this.$emit("close");
    }
  },
};
</script>