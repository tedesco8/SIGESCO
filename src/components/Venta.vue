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
        @guardar="guardar"
        @item="itemAction"
        :title="'venta'"
        :venta="ventaBoo"
        :dialog="dialog"
        :action="action"
        :item="venta"
      />
      <!-- Tabla principal -->
      <Table
        @listar="listar"
        @verItem="verItem"
        @editItem="editItem"
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
      action: null,
      ventaBoo: false,
      venta: null,
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
      this.action = 0;
      this.dialog = true;
    },
    verItem(item) {
      this.venta = item;
      this.action = 1;
      this.ventaBoo = true;
      this.dialog = true;
    },
    editItem(item) {
      this.venta = item;
      this.action = 2;
      this.ventaBoo = true;
      this.dialog = true;
    },
    itemAction(item) {
      this.venta = item;
    },
    close() {
      this.action = null;
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
      debugger;
      if(this.action == 0) {
        //Código para guardar
      axios
        .post(
          "venta/add", me.venta, configuracion
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
      } else {
        //Código para guardar
      axios
        .put(
          "venta/update", me.venta, configuracion
        )
        .then(function (response) {
          swal({
            title: "Buen trabajo!",
            text: "Venta editada correctamente",
            icon: "success",
          });
          me.close();
          me.listar();
        })
        .catch(function (error) {
          console.log(error);
        });
      }
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