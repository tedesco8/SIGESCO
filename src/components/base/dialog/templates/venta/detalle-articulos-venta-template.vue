<template>
  <v-flex xs12 sm12 md12 lg12 xl12>
    <template>
      <v-data-table
        v-if="renderComponent"
        :headers="cabeceraDetalles"
        :items="sale.details"
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
            <v-text-field v-model="item.amount" type="number"></v-text-field>
          </div>
        </template>
        <template v-slot:item.price="{ item }">
          <div class="text-xs-center">
            <v-text-field v-model="item.price" type="number"></v-text-field>
          </div>
        </template>
        <template v-slot:item.descuento="{ item }">
          <div class="text-xs-center">
            <v-text-field v-model="item.descuento" type="number"></v-text-field>
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
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "detalle-articulos-venta-template",
  data() {
    return {
      renderComponent: true,
      cabeceraDetalles: [
        { text: "Borrar", value: "borrar", sortable: false },
        { text: "Artículo", value: "name", sortable: false },
        { text: "Cantidad", value: "amount", sortable: false },
        { text: "Precio", value: "price", sortable: false },
        { text: "Descuento", value: "descuento", sortable: false },
        { text: "Sub Total", value: "subtotal", sortable: false },
      ],
    };
  },
  watch: {
    sale(val) {
      this.forceRerender()
    },
  },
  computed: {
    ...mapState("ventasNamespace", ["sale"]),
  },
  methods: {
    forceRerender() {
      this.renderComponent = false;
      this.$nextTick(() => {
        this.renderComponent = true;
      });
    },
    eliminarDetalle(item) {
      let i = this.sale.details.indexOf(item);
      if (i != -1) {
        arr.splice(i, 1);
      }
    },
  },
};
</script>