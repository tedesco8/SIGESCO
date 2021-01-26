<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar text color="white">
        <v-toolbar-title>Ventas</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          class="text-xs-center"
          v-model="search"
          append-icon="search"
          label="Búsqueda"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="mostrarNuevo()" dark class="mb-2"
          >Nuevo</v-btn
        >
        <!-- Modal Activar desactivar -->
        <v-dialog v-model="adModal" max-width="290">
          <v-card>
            <v-card-title class="headline" v-if="adAccion == 1"
              >Activar Item</v-card-title
            >
            <v-card-title class="headline" v-if="adAccion == 2"
              >Desactivar Item</v-card-title
            >
            <v-card-text>
              Estás a punto de
              <span v-if="adAccion == 1">activar</span>
              <span v-if="adAccion == 2">desactivar</span>
              el item {{ adNombre }}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                @click="activarDesactivarCerrar()"
                color="green darken-1"
                text="text"
                >Cancelar</v-btn
              >
              <v-btn
                v-if="adAccion == 1"
                @click="activar()"
                color="orange darken-4"
                text="text"
                >Activar</v-btn
              >
              <v-btn
                v-if="adAccion == 2"
                @click="desactivar()"
                color="orange darken-4"
                text="text"
                >Desactivar</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <!-- Imprimir comprobante -->
      <!-- <Imprimir :dialog="true" :imprimir="imprimir" /> -->
      <!-- Template nueva venta -->
      <Dialog
        @close="close"
        :title="'venta'"
        :venta="ventaBoo"
        :dialog="dialog"
        :nuevo="nuevo"
        :detalle="verDetalle"
        :item="venta"
      />
      <!-- Tabla principal -->
      <Table
        @verItem="verItem"
        @listar="listar"
        :ventas="true"
        :opciones="true"
        :title="'Ventas'"
        :headers="headers"
        :arrayList="ventas"
      />
    </v-flex>
  </v-layout>
</template>
<script>
import axios from "axios";
import Table from "./base/table/Table";
import Dialog from "./base/dialog/Dialog";
import Imprimir from "./base/Imprimir";
export default {
  data() {
    return {
      dialog: false,
      ventaBoo: false,
      venta: null,
      nuevo: false,
      verDetalle: false,
      search: "",
      ventas: [],
      headers: [
        { text: "Opciones", value: "opciones", sortable: false },
        { text: "Usuario", value: "usuario.nombre", sortable: true },
        { text: "Cliente", value: "persona.nombre", sortable: true },
        { text: "Tipo Comprobante", value: "tipo_comprobante", sortable: true },
        {
          text: "Serie comprobante",
          value: "serie_comprobante",
          sortable: false,
        },
        {
          text: "Número comprobante",
          value: "num_comprobante",
          sortable: false,
        },
        { text: "Fecha", value: "createdAt", sortable: false },
        { text: "Impuesto", value: "impuesto", sortable: false },
        { text: "Total", value: "total", sortable: false },
        { text: "Estado", value: "estado", sortable: false },
      ],
      _id: "",

      adModal: 0,
      adAccion: 0,
      adNombre: "",
      adId: "",
      fecha: null,
    };
  },
  components: {
    Table,
    Dialog,
    Imprimir,
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  created() {
    this.listar();
  },
  methods: {
    mostrarNuevo() {
      this.venta = {};
      this.ventaBoo = true;
      this.nuevo = true;
      this.verDetalle = false;
      this.dialog = true;
    },
    verItem(item) {
      this.venta = item;
      this.verDetalle = true;
      this.ventaBoo = true;
      this.dialog = true;
    },
    close() {
      this.verDetalle = false;
      this.venta = null;
      this.ventaBoo = false;
      this.dialog = false;
    },
    listar() {
      let me = this;
      let header = { Token: this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .get("venta/list", configuracion)
        .then(function (response) {
          me.ventas = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    guardar() {
      let me = this;
      let header = { Token: this.$store.state.token };
      let configuracion = { headers: header };
      if (this.validar()) {
        return;
      }
      debugger;
      //Código para guardar
      axios
        .post(
          "venta/add",
          {
            persona: this.persona,
            usuario: this.$store.state.usuario._id,
            tipo_comprobante: this.tipo_comprobante,
            serie_comprobante: this.serie_comprobante,
            num_comprobante: this.num_comprobante,
            impuesto: this.impuesto,
            total: this.total,
            detalles: this.detalles,
          },
          configuracion
        )
        .then(function (response) {
          swal({
            title: "Buen trabajo!",
            text: "Venta agregada exitosamente",
            icon: "success",
          });
          me.close();
          me.listar();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    activarDesactivarMostrar(accion, item) {
      this.adModal = 1;
      this.adNombre = item.num_comprobante;
      this.adId = item._id;
      if (accion == 1) {
        this.adAccion = 1;
      } else if (accion == 2) {
        this.adAccion = 2;
      } else {
        this.adModal = 0;
      }
    },
    activarDesactivarCerrar() {
      this.adModal = 0;
    },
    activar() {
      let me = this;
      let header = { Token: this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .put("venta/activate", { _id: this.adId }, configuracion)
        .then(function (response) {
          swal({
            title: "Buen trabajo!",
            text: "Venta activada exitosamente",
            icon: "success",
          });
          me.adModal = 0;
          me.adAccion = 0;
          me.adNombre = "";
          me.adId = "";
          me.listar();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    desactivar() {
      let me = this;
      let header = { Token: this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .put("venta/deactivate", { _id: this.adId }, configuracion)
        .then(function (response) {
          swal({
            title: "Buen trabajo!",
            text: "Venta desactivada exitosamente",
            icon: "success",
          });
          me.adModal = 0;
          me.adAccion = 0;
          me.adNombre = "";
          me.adId = "";
          me.listar();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>