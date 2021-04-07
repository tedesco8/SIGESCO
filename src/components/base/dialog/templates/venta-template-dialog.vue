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
      <v-card v-if="action != 1" elevation="2">
        <v-card-title>
          <span class="headline">Agregue artículos al detalle</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-layout wrap>
              <v-flex xs12 sm12 md12 lg12 xl12>
                <v-text-field
                  v-model="texto"
                  @keyup.enter="listarArticulos()"
                  class="text-xs-center"
                  append-icon="search"
                  label="Búsqueda"
                ></v-text-field>
                <template v-if="texto">
                  <v-data-table
                    :headers="cabeceraArticulos"
                    :items="articulos"
                    class="elevation-1"
                  >
                    <template v-slot:item.seleccionar="{ item }">
                      <v-icon small class="mr-2" @click="agregarDetalle(item)"
                        >add</v-icon
                      >
                    </template>
                    <template v-slot:item.estado="{ item }">
                      <div v-if="item.estado">
                        <span class="blue--text">Activo</span>
                      </div>
                      <div v-else>
                        <span class="red--text">Inactivo</span>
                      </div>
                    </template>
                  </v-data-table>
                </template>
              </v-flex>
              <v-flex xs12 sm2 md2 lg2 xl2 v-show="errorArticulo">
                <div class="red--text" v-text="errorArticulo"></div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
      <!-- Detalle -->
      <v-flex xs12 sm12 md12 lg12 xl12>
        <template>
          <v-data-table
            :headers="cabeceraDetalles"
            :items="detalles"
            hide-default-footer
            class="elevation-1"
          >
            <template v-slot:item.borrar="{ item }">
              <v-icon small class="mr-2" @click="eliminarDetalle(item)"
                >delete</v-icon
              >
            </template>
            <template v-slot:item.name="{ item }">
              <div class="text-xs-center">{{ item.name }}</div>
            </template>
            <template v-slot:item.amount="{ item }">
              <div class="text-xs-center">
                <v-text-field
                  v-model="item.amount"
                  type="number"
                ></v-text-field>
              </div>
            </template>
            <template v-slot:item.price="{ item }">
              <div class="text-xs-center">
                <v-text-field v-model="item.price" type="number"></v-text-field>
              </div>
            </template>
            <template v-slot:item.descuento="{ item }">
              <div class="text-xs-center">
                <v-text-field
                  v-model="item.descuento"
                  type="number"
                ></v-text-field>
              </div>
            </template>
            <template v-slot:item.subtotal="{ item }">
              <div class="text-xs-right">
                $
                {{ item.amount * item.price - item.descuento }}
              </div>
            </template>
            <template slot="no-data">
              <h3>No hay artículos agregados al detalle.</h3>
            </template>
          </v-data-table>
        </template>
      </v-flex>
      <v-flex v-if="item.details" class="text-xs-right">
        <strong>Total:</strong>
        $ {{ total }}
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";
export default {
  name: "venta-template-dialog",
  data() {
    return {
      texto: "",
      codigo: "",
      total: 0,
      valida: 0,
      cantidad: 1,
      descuento: 0,
      errorArticulo: null,
      articulos: [],
      detalles: [],
      clients: [],
      validaMensaje: [],
      cabeceraDetalles: [
        { text: "Borrar", value: "borrar", sortable: false },
        { text: "Artículo", value: "name", sortable: false },
        { text: "Cantidad", value: "amount", sortable: false },
        { text: "Precio", value: "price", sortable: false },
        { text: "Descuento", value: "descuento", sortable: false },
        { text: "Sub Total", value: "subtotal", sortable: false },
      ],
      cabeceraArticulos: [
        { text: "Seleccionar", value: "seleccionar", sortable: false },
        { text: "Nombre", value: "name", sortable: false },
        { text: "Código", value: "code", sortable: false },
        { text: "Tipo", value: "type", sortable: true },
        { text: "Descripción", value: "description", sortable: true },
        { text: "Precio x Unidad", value: "priceUnity", sortable: false },
        { text: "Precio x Mayor", value: "priceWholesale", sortable: false },
        { text: "Stock", value: "stock", sortable: false },
        { text: "Estado", value: "status", sortable: false },
      ],
      comprobantes: ["BOLETA", "FACTURA", "TICKET", "GUIA"],
    };
  },
  props: {
    item: Object,
    action: Number, //0 = nuevo, 1 = ver, 2 = editar
  },
  created() {
    this.selectPersona();
  },
  mounted() {
    this.$nextTick(() => {
      this.setSale(this.item);
    });
  },
  watch: {
    total(val) {
      this.setTotal(val);
    },
    item(val) {
      let resultado = 0.0;
      let details = val.details;
      for (var i = 0; i < details.length; i++) {
        resultado =
          resultado +
          (details[i].amount * details[i].price - details[i].descuento);
      }
      this.total = resultado;
    },
  },
  computed: {
    ...mapState("usuariosNamespace", ["token"]),
    ...mapState("ventasNamespace", ["sale"]),
    // calcularTotal: function () {
    //   debugger;
    //   let resultado = 0.0;

    //   if (this.item.details) {
    //     let details = this.item.details;
    //     for (var i = 0; i < details.length; i++) {
    //       resultado =
    //         resultado +
    //         (details[i].amount * details[i].price - details[i].descuento);
    //     }
    //   }
    //   this.total = resultado;
    //   return resultado;
    // },
  },
  methods: {
    ...mapActions("ventasNamespace", [
      "setSale",
      "setDetail",
      "setTotal",
      "deleteDetail",
    ]),
    listarArticulos() {
      let me = this;
      let header = { Token: this.token };
      let configuracion = { headers: header };
      axios
        .get("article/search?value=" + this.texto, configuracion)
        .then(function (response) {
          response.data.forEach((i) => {
            i.amount = 1;
            i.descuento = 0;
          });
          me.articulos = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    agregarDetalle(data) {
      debugger;
      this.errorArticulo = null;
      if (this.encuentra(data.id) == true) {
        this.errorArticulo = "El artículo ya ha sido agregado.";
        this.texto = null;
      } else {
        this.detalles.push({
          id: data.id,
          name: data.name,
          amount: data.amount,
          price: data.priceUnity,
          descuento: data.descuento,
        });
        this.texto = null;
        this.setDetail(this.detalles);
      }
    },
    encuentra(id) {
      let sw = 0;
      let detalles = this.sale.details;
      if ((detalles != undefined) & (detalles != null)) {
        detalles.forEach((i) => {
          if (i.id == id) {
            sw = true;
          }
        });
      }
      return sw;
    },
    eliminarDetalle(item) {
      let i = this.sale.details.indexOf(item);
      if (i != -1) {
        arr.splice(i, 1);
      }
      this.calcularTotal();
    },
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