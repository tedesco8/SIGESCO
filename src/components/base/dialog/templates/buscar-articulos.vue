<template>
  <v-card>
    <v-card-title>
      <span class="headline">Agregue artículo s al detalle</span>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12 sm12 md12 lg12 xl12>
            <v-text-field
              v-model="texto"
              @keyup.enter="listarArticulos()"
              class="text-xs-center"
              append-icon="search"
              label="Búsqueda"
            ></v-text-field>
            <template v-if="texto.length > 0">
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
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "buscar-articulos",
  data() {
    return {
      texto: "",
      codigo: "",
      errorArticulo: null,
      articulos: [],
      detalles: [],
      cabeceraArticulos: [
        { text: "Seleccionar", value: "seleccionar", sortable: false },
        { text: "Código", value: "codigo", sortable: false },
        { text: "Nombre", value: "nombre", sortable: true },
        { text: "Categoría", value: "categoria.nombre", sortable: true },
        { text: "Stock", value: "stock", sortable: false },
        { text: "Precio Venta", value: "precio_venta", sortable: false },
        { text: "Descripción", value: "descripcion", sortable: false },
        { text: "Estado", value: "estado", sortable: false },
      ],
    };
  },
  computed: {
    ...mapState("usuariosNamespace", ["token"]),
  },
  methods: {
    listarArticulos() {
      let me = this;
      let header = { Token: this.token };
      let configuracion = { headers: header };
      axios
        .get("articulo/list?valor=" + this.texto, configuracion)
        .then(function (response) {
          me.articulos = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    agregarDetalle(data) {
      this.errorArticulo = null;
      if (this.encuentra(data._id) == true) {
        this.errorArticulo = "El artículo ya ha sido agregado.";
      } else {
        this.detalles.push({
          _id: data._id,
          articulo: data.nombre,
          cantidad: 1,
          precio: data.precio_venta,
          descuento: 0,
        });
        this.codigo = "";
        this.$emit("agregarDetalle", this.detalles);
      }
    },
    encuentra(id) {
      let sw = 0;
      for (var i = 0; i < this.detalles.length; i++) {
        if (this.detalles[i]._id == id) {
          sw = true;
        }
      }
      return sw;
    },
  },
};
</script>