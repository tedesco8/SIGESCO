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
      </v-toolbar>
      <!-- Imprimir comprobante -->
      <!-- <Imprimir :dialog="true" :imprimir="imprimir" /> -->
      <!-- Modal Activar desactivar -->
      <DialogModal
        @cerrar="close"
        @activar="activar"
        @desactivar="desactivar"
        :adModal="adModal"
        :accion="adAccion"
        :id="adId"
        :nombre="adNombre"
      />
      <!-- Template nueva venta -->
      <Dialog
        @close="close"
        @guardar="guardar"
        :title="'venta'"
        :venta="ventaBoo"
        :dialog="dialog"
        :action="action"
        :item="sale"
      />
      <!-- Tabla principal -->
      <Table
        @listar="listar"
        @verItem="verItem"
        @editItem="editItem"
        @actdeaItem="activarDesactivarMostrar"
        :ventas="true"
        :opciones="true"
        :title="'Ventas'"
        :headers="headers"
        :items="sales"
      />
    </v-flex>
  </v-layout>
</template>
<script>
import Table from "./base/table/Table";
import Dialog from "./base/dialog/Dialog";
import Imprimir from "./base/Imprimir";
import DialogModal from "./base/modal/DialogModal";
import { mapState, mapActions } from "vuex";
export default {
  name: "Venta",
  data() {
    return {
      dialog: false,
      action: null,
      ventaBoo: false,
      search: "",
      headers: [
        { text: "Opciones", value: "opciones", sortable: false },
        { text: "Cliente", value: "client", sortable: true },
        { text: "Usuario", value: "user", sortable: true },
        { text: "Tipo Comprobante", value: "voucherType", sortable: true },
        { text: "Serie comprobante", value: "voucherSeries", sortable: false },
        { text: "Número comprobante", value: "voucherNum", sortable: false },
        { text: "Fecha", value: "createdAt", sortable: false },
        { text: "Impuesto", value: "tax", sortable: false },
        { text: "Total", value: "total", sortable: false },
        { text: "Estado", value: "status", sortable: false },
      ],
      _id: "",
      adModal: false,
      adAccion: 0,
      adNombre: "",
      adId: null,
      fecha: null,
    };
  },
  components: {
    Table,
    Dialog,
    Imprimir,
    DialogModal,
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  created() {
    this.listar();
  },
  computed: {
    ...mapState("usuariosNamespace", ["token", "usuario"]),
    ...mapState("ventasNamespace", ["sales", "sale", "total"]),
  },
  methods: {
    ...mapActions("ventasNamespace", [
      "getSales",
      "newSale",
      "clear",
      "setSale",
      "saveSale",
      "updateSale",
      "activateSale",
      "deactivateSale",
    ]),
    listar() {
      this.getSales(this.token);
    },
    mostrarNuevo() {
      this.newSale();
      this.ventaBoo = true;
      this.action = 0;
      this.dialog = true;
    },
    verItem(item) {
      this.setSale({ data: item });
      this.action = 1;
      this.ventaBoo = true;
      this.dialog = true;
    },
    editItem(item) {
      this.setSale({ data: item });
      this.action = 2;
      this.ventaBoo = true;
      this.dialog = true;
    },
    close() {
      this.action = null;
      this.clear();
      this.adNombre = null;
      this.adAccion = null;
      this.adId = null;
      this.ventaBoo = false;
      this.dialog = false;
      this.adModal = false;
    },
    guardar() {
      debugger;
      if (this.action == 0) {
        //Código para guardar
        this.saveSale({ token: this.token, data: this.sale, user: this.usuario.id});
        this.close();
        this.listar();
      } else {
        //Código para editar
        this.updateSale({ token: this.token, data: this.sale, user: this.usuario.id });
        this.close();
        this.listar();
      }
    },
    activarDesactivarMostrar(accion, item) {
      this.adModal = false;
      this.adNombre = item.serie_comprobante + " " + item.num_comprobante;
      this.adId = item.id;
      if (accion == 1) {
        this.adAccion = 1;
      } else if (accion == 2) {
        this.adAccion = 2;
      } else {
        this.adModal = false;
      }
    },
    activar(id) {
      this.activateSale({ token: this.token, id: id });
      this.adModal = false;
      this.adAccion = 0;
      this.adNombre = "";
      this.adId = null;
      this.listar();
    },
    desactivar(id) {
      this.deactivateSale({ token: this.token, id: id });
      this.adModal = false;
      this.adAccion = 0;
      this.adNombre = "";
      this.adId = null;
      this.listar();
    },
  },
};
</script>