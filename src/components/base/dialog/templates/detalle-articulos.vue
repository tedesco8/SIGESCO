<template>
  <v-flex xs12 sm12 md12 lg12 xl12>
    <template>
      <v-data-table
        :headers="cabeceraDetalles"
        :items="detalles"
        hide-default-footer
        class="elevation-1"
      >
        <template v-slot:item.borrar="{ item }">
          <v-icon small class="mr-2" @click="eliminarDetalle(detalles, item)"
            >delete</v-icon
          >
        </template>
        <template v-slot:item.articulo="{ item }">
          <div class="text-xs-center">{{ item.articulo }}</div>
        </template>
        <template v-slot:item.cantidad="{ item }">
          <div class="text-xs-center">
            <v-text-field v-model="item.cantidad" type="number"></v-text-field>
          </div>
        </template>
        <template v-slot:item.precio="{ item }">
          <div class="text-xs-center">
            <v-text-field v-model="item.precio" type="number"></v-text-field>
          </div>
        </template>
        <template v-slot:item.descuento="{ item }">
          <div class="text-xs-center">
            <v-text-field v-model="item.descuento" type="number"></v-text-field>
          </div>
        </template>
        <template v-slot:item.subtotal="{ item }">
          <div class="text-xs-right">
            $ {{ item.cantidad * item.precio - item.descuento }}
          </div>
        </template>
        <template slot="no-data">
          <h3>No hay artículos agregados al detalle.</h3>
        </template>
      </v-data-table>
      <v-flex class="text-xs-right">
        <strong>Total Parcial:</strong>
        $
        {{ (totalParcial = (total - totalImpuesto).toFixed(2)) }}
      </v-flex>
      <v-flex class="text-xs-right">
        <strong>Total Impuesto:</strong>
        $
        {{ (totalImpuesto = ((total * impuesto) / (1 + impuesto)).toFixed(2)) }}
      </v-flex>
      <v-flex class="text-xs-right">
        <strong>Total Neto:</strong>
        $ {{ (total = calcularTotal) }}
      </v-flex>
    </template>
  </v-flex>
</template>

<script>
export default {
  name: "detalle-articulos",
  data() {
    return {
      total: 0,
      totalParcial: 0,
      impuesto: 0.18,
      totalImpuesto: 0,
      cabeceraDetalles: [
        { text: "Borrar", value: "borrar", sortable: false },
        { text: "Artículo", value: "articulo", sortable: false },
        { text: "Cantidad", value: "cantidad", sortable: false },
        { text: "Precio", value: "precio", sortable: false },
        { text: "Descuento", value: "descuento", sortable: false },
        { text: "Sub Total", value: "subtotal", sortable: false },
      ],
    };
  },
  props: {
    detalles: Array,
  },
  computed: {
    calcularTotal: function () {
      debugger;
      let resultado = 0.0;
      for (var i = 0; i < this.detalles.length; i++) {
        resultado =
          resultado +
          (this.detalles[i].cantidad * this.detalles[i].precio -
            this.detalles[i].descuento);
      }
      return resultado;
    },
  },
  methods: {
    eliminarDetalle(arr, item) {
      this.$emit("eliminarDetalle", arr, item);
    },
  },
};
</script>