<template>
  <v-container grid-list-sm class="pa-4 white">
    <v-layout row wrap>
      <v-flex xs12 sm4 md4 lg4 xl4>
        <v-select
          v-model="item.voucherType"
          :items="comprobantes"
          label="Tipo Comprobante"
        ></v-select>
      </v-flex>
      <v-flex xs12 sm4 md4 lg4 xl4>
        <v-text-field
          v-model="item.voucherSeries"
          label="Serie Comprobante"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm4 md4 lg4 xl4>
        <v-text-field
          v-model="item.voucherNum"
          label="Número Comprobante"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm8 md8 lg8 xl8>
        <v-autocomplete
          :items="clients"
          v-model="item.client"
          label="Cliente"
        ></v-autocomplete>
      </v-flex>
      <v-flex xs12 sm4 md4 lg4 xl4>
        <v-text-field
          type="number"
          v-model="item.tax"
          label="Impuesto"
        ></v-text-field>
      </v-flex>
      <!--Buscar articulos -->
      <BuscarArticulos v-if="action != 1" />
      <!-- Detalle -->
      <DetalleArticulos />
      <v-flex v-if="item.details" class="text-xs-right">
        <strong>Total:</strong>
        $ {{ calcTotal }}
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";
import DetalleArticulos from "./venta/detalle-articulos-venta-template";
import BuscarArticulos from "./venta/buscar-articulos-venta-template";

export default {
  name: "venta-template-dialog",
  data() {
    return {
      codigo: "",
      total: 0,
      valida: 0,
      cantidad: 1,
      descuento: 0,
      clients: [],
      comprobantes: ["BOLETA", "FACTURA", "TICKET", "GUIA"],
    };
  },
  props: {
    item: Object,
    action: Number, //0 = nuevo, 1 = ver, 2 = editar
  },
  components: {
    DetalleArticulos,
    BuscarArticulos
  },
  created() {
    this.selectPersona();
  },
  watch: {
    total(val) {
      this.setTotal(val);
    },
  },
  computed: {
    ...mapState("usuariosNamespace", ["token"]),
    ...mapState("ventasNamespace", ["sale"]),
    calcTotal: function() {
      let resultado = 0.0;
      if (this.sale.details != "undefined" && this.sale.details != null) {
        let details = this.sale.details;
        for (var i = 0; i < details.length; i++) {
          resultado =
            resultado +
            (details[i].amount * details[i].price - details[i].descuento);
        }
      }
      this.total = resultado;
      return resultado
    }
  },
  methods: {
    ...mapActions("ventasNamespace", [
      "setSale",
      "setDetail",
      "setTotal",
      "deleteDetail",
    ]),
    selectPersona() {
      let me = this;
      let personaArray = [];
      let header = { Token: this.token };
      let configuracion = { headers: header };
      axios
        .get("client/get", configuracion)
        .then(function (response) {
          personaArray = response.data;
          personaArray.map(function (x) {
            me.clients.push({ text: `${x.name} ${x.surname}`, value: x.id });
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>