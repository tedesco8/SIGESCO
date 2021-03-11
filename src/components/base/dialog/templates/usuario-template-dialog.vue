<template>
  <v-container grid-list-sm class="pa-4 white">
    <v-layout row wrap>
      <v-flex xs12 sm4 md4 lg4 xl4>
        <v-select v-model="item.rol" :items="roles" label="Roles"></v-select>
      </v-flex>
      <v-flex xs12 sm4 md4 lg4 xl4>
        <v-text-field v-model="item.name" label="Nombre"></v-text-field>
      </v-flex>
      <v-flex xs12 sm4 md4 lg4 xl4>
        <v-text-field v-model="item.surname" label="Apellido"></v-text-field>
      </v-flex>
      <v-flex xs12 sm4 md4 lg4 xl4>
        <v-text-field
          type="email"
          v-model="item.email"
          label="Email"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm4 md4 lg4 xl4>
        <v-text-field v-model="item.phone" label="Teléfono"></v-text-field>
      </v-flex>
      <v-flex xs12 sm4 md4 lg4 xl4>
        <v-text-field
          v-if="action == 0"
          type="password"
          v-model="item.password"
          label="Contraseña"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm12 md12 v-show="valida">
        <div
          class="red--text"
          v-for="v in validaMensaje"
          :key="v"
          v-text="v"
        ></div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "usuario-template-dialog",
  data() {
    return {
      impuesto: 0.18,
      valida: 0,
      personas: [],
      validaMensaje: [],
      roles: ["Administrador", "Almacenero", "Vendedor", "Invitado"],
    };
  },
  props: {
    item: Object,
    action: Number, //0 = nuevo, 1 = ver, 2 = editar
  },
  mounted() {
    this.$nextTick(() => {
      this.setUser({ data: this.item });
    });
  },
  computed: {
    ...mapState("usuariosNamespace", ["token"]),
  },
  methods: {
    ...mapActions("usuariosNamespace", ["setUser"]),
    validar() {
      this.valida = 0;
      this.validaMensaje = [];
      if (!this.item.persona) {
        this.validaMensaje.push("Seleccione un cliente.");
      }
      if (!this.item.tipo_comprobante) {
        this.validaMensaje.push("Seleccione un tipo de comprobante.");
      }
      if (!this.item.num_comprobante) {
        this.validaMensaje.push("Ingrese el número del comprobante.");
      }
      if (!this.item.impuesto || this.impuesto < 0 || this.impuesto > 1) {
        this.validaMensaje.push("Ingrese un impuesto válido.");
      }
      if (this.item.detalles.length <= 0) {
        this.validaMensaje.push("Ingrese al menos un artículo al detalle");
      }
      if (this.validaMensaje.length) {
        this.valida = 1;
      }
      return this.valida;
    },
  },
};
</script>