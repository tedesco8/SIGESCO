<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar text color="white">
        <v-toolbar-title>Clientes</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
       
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="mostrarNuevo()" dark class="mb-2"
          >Nuevo</v-btn
        >
      </v-toolbar>
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
      <!-- Template -->
      <Dialog
        @close="close"
        @guardar="guardar"
        :title="'cliente'"
        :cliente="clientBoo"
        :dialog="dialog"
        :action="action"
        :item="client"
      />
      <!-- Tabla principal -->
      <Table
        @listar="listar"
        @verItem="verItem"
        @editItem="editItem"
        @actdeaItem="activarDesactivarMostrar"
        :clientes="true"
        :opciones="true"
        :title="''"
        :headers="headers"
        :items="clients"
      />
    </v-flex>
  </v-layout>
</template>
<script>
import Table from "./base/table/Table";
import Dialog from "./base/dialog/Dialog";
import DialogModal from "./base/modal/DialogModal";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      dialog: false,
      search: "",
      action: null,
      clientBoo: false,
      headers: [
        { text: "Opciones", value: "opciones", sortable: false },
        { text: "Nombre", value: "name", sortable: true },
        { text: "Apellido", value: "surname", sortable: true },
        { text: "Rol", value: "rol", sortable: true },
        { text: "Teléfono", value: "phone", sortable: false },
        { text: "Email", value: "email", sortable: false },
        { text: "Ciudad", value: "city", sortable: false },
        { text: "Domicilio", value: "address", sortable: false },
        { text: "Estado", value: "status", sortable: false },
      ],
      editedIndex: -1,
      _id: "",
      adModal: false,
      adAccion: 0,
      adNombre: "",
      adId: null,
    };
  },
  components: {
    Table,
    Dialog,
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
    ...mapState("clientesNamespace", ["client", "clients"]),
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo registro" : "Editar registro";
    },
  },
  methods: {
    ...mapActions("clientesNamespace", [
      "getClient",
      "getClients",
      "newClient",
      "setClient",
      "saveClient",
      "updateClient",
      "activateClient",
      "deactivateClient",
      "clear",
    ]),
    listar() {
      this.getClients(this.token);
    },
    mostrarNuevo() {
      this.newClient();
      this.clientBoo = true;
      this.action = 0;
      this.dialog = true;
    },
    verItem(item) {
      this.setClient({ data: item });
      this.action = 1;
      this.clientBoo = true;
      this.dialog = true;
    },
    editItem(item) {
      this.setClient({ data: item });
      this.action = 2;
      this.clientBoo = true;
      this.dialog = true;
    },
    close() {
      this.action = null;
      this.clear();
      this.adNombre = null;
      this.adAccion = null;
      this.adId = null;
      this.clientBoo = false;
      this.dialog = false;
      this.adModal = false;
    },
    guardar() {
      debugger;
      if (this.action == 0) {
        //Código para guardar
        this.saveClient({ token: this.token, data: this.client });
        this.close();
        this.listar();
      } else {
        //Código para editar
        this.updateClient({ token: this.token, data: this.client });
        this.close();
        this.listar();
      }
    },
    activarDesactivarMostrar(accion, item) {
      this.adModal = true;
      this.adNombre = item.name + " " + item.surname;
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
      this.activateClient({ token: this.token, id: id });
      this.adModal = false;
      this.adAccion = 0;
      this.adNombre = "";
      this.adId = null;
      this.listar();
    },
    desactivar(id) {
      this.deactivateClient({ token: this.token, id: id });
      this.adModal = false;
      this.adAccion = 0;
      this.adNombre = "";
      this.adId = null;
      this.listar();
    },
  },
};
</script>