<template>
  <v-container grid-list-sm class="pa-4 white">
    <v-layout row wrap>
      <v-flex xs12 sm4 md4 lg4 xl4>
        <v-select
          v-model="item.tipo_comprobante"
          :items="comprobantes"
          label="Tipo Comprobante"
        ></v-select>
      </v-flex>
      <v-flex xs12 sm4 md4 lg4 xl4>
        <v-text-field
          v-model="item.serie_comprobante"
          label="Serie Comprobante"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm4 md4 lg4 xl4>
        <v-text-field
          v-model="item.num_comprobante"
          label="Número Comprobante"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm8 md8 lg8 xl8>
        <v-autocomplete
          :items="personas"
          v-model="item.persona"
          label="Cliente"
        ></v-autocomplete>
      </v-flex>
      <v-flex xs12 sm4 md4 lg4 xl4>
        <v-text-field
          type="number"
          v-model="item.impuesto"
          label="Impuesto"
        ></v-text-field>
      </v-flex>
      <!--Buscar articulos -->
      <BuscarArticulos v-if="action != 1" @agregarDetalle="agregarDetalle" />
      <!-- Detalle -->
      <v-flex xs12 sm12 md12 lg12 xl12>
        <DetalleArticulos
          :detalles="item.detalles"
          @eliminarDetalle="eliminarDetalle"
        />
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
import axios from "axios";
import BuscarArticulos from "./buscar-articulos";
import DetalleArticulos from "./detalle-articulos";
import { mapState, mapActions } from "vuex";
export default {
  name: "venta-template-dialog",
  data() {
    return {
      impuesto: 0.18,
      valida: 0,
      personas: [],
      validaMensaje: [],
      comprobantes: ["BOLETA", "FACTURA", "TICKET", "GUIA"],
    };
  },
  components: {
    BuscarArticulos,
    DetalleArticulos,
  },
  props: {
    item: Object,
    action: Number, //0 = nuevo, 1 = ver, 2 = editar
  },
  created() {
    this.selectPersona();
  },
  computed: {
    ...mapState("usuariosNamespace", ["token"]),
  },
  methods: {
    ...mapActions("ventasNamespace", ["setVenta"]),
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
    agregarDetalle(articulos) {
        this.setVenta({detalle: articulos})
    },
    mounted() {
      this.$nextTick(() => {
        this.setVenta({data: this.item})
      });
    },
    eliminarDetalle(arr, item) {
      let i = arr.indexOf(item);
      if (i != -1) {
        arr.splice(i, 1);
      }
    },
    selectPersona() {
      let me = this;
      let personaArray = [];
      let header = { Token: this.token };
      let configuracion = { headers: header };
      axios
        .get("persona/listClientes", configuracion)
        .then(function (response) {
          personaArray = response.data;
          personaArray.map(function (x) {
            me.personas.push({ text: x.nombre, value: x._id });
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>