<template>
  <v-flex xs12 sm12 md12 lg12 xl12>
      <span class="headline">Agregue artículos al detalle</span>
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
  </v-flex>
</template>

<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";
export default {
  name: "buscar-articulos-venta-template",
  data() {
    return {
      texto: "",
      errorArticulo: null,
      articulos: [],
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
    };
  },
  computed: {
    ...mapState("usuariosNamespace", ["token"]),
    ...mapState("ventasNamespace", ["sale"]),
  },
  methods: {
    ...mapActions("ventasNamespace", ["setSale", "setDetail"]),
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
      debugger
      this.errorArticulo = null;
      if (this.encuentra(data.id) == true) {
        this.errorArticulo = "El artículo ya ha sido agregado.";
        this.texto = null;
      } else {
        let detalles = {
          id: data.id,
          name: data.name,
          amount: data.amount,
          price: data.priceUnity,
          descuento: data.descuento,
        };
        this.texto = null;
        this.setDetail(detalles);
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
  },
};
</script>