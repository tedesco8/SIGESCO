<template>
  <v-dialog v-model="adModal" max-width="290">
    <v-card>
      <v-card-title class="headline" v-if="accion == 1"
        >Activar Item</v-card-title
      >
      <v-card-title class="headline" v-if="accion == 2"
        >Desactivar Item</v-card-title
      >
      <v-card-text>
        Estás a punto de
        <span v-if="accion == 1">activar</span>
        <span v-if="accion == 2">desactivar</span>
        el item {{ nombre }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="$emit('cerrar')" color="green darken-1" text="text"
          >Cancelar</v-btn
        >
        <v-btn
          v-if="accion == 1"
          @click="$emit('activar', id)"
          color="orange darken-4"
          text="text"
          >Activar</v-btn
        >
        <v-btn
          v-if="accion == 2"
          @click="$emit('desactivar', id)"
          color="orange darken-4"
          text="text"
          >Desactivar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DialogModal",
  props: {
    adModal: {
      type: Boolean,
      default: false,
    },
    accion: Number,
    id: Number,
    nombre: String,
  },
};
</script>