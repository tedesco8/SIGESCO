<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar text color="white">
        <v-toolbar-title>Categorías</v-toolbar-title>
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
        :title="'categoría'"
        :categoria="categoryBoo"
        :dialog="dialog"
        :action="action"
        :item="category"
      />
      <!-- Tabla principal -->
      <Table
        @listar="listar"
        @verItem="verItem"
        @editItem="editItem"
        @actdeaItem="activarDesactivarMostrar"
        :categorias="true"
        :opciones="true"
        :title="'Categorias'"
        :headers="headers"
        :items="categorys"
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
      categoryBoo: false,
      headers: [
        { text: "Opciones", value: "opciones", sortable: false },
        { text: "Nombre", value: "name", sortable: true },
        { text: "Descripción", value: "description", sortable: true },
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
    ...mapState("categoriasNamespace", ["categorys", "category"]),
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo registro" : "Editar registro";
    },
  },
  methods: {
    ...mapActions("categoriasNamespace", [
      "getCategory",
      "getCategorys",
      "newCategory",
      "setCategory",
      "saveCategory",
      "updateCategory",
      "activateCategory",
      "deactivateCategory",
      "clear",
    ]),
    listar() {
      this.getCategorys(this.token);
    },
    mostrarNuevo() {
      this.newCategory();
      this.categoryBoo = true;
      this.action = 0;
      this.dialog = true;
    },
    verItem(item) {
      this.setCategory({ data: item });
      this.action = 1;
      this.categoryBoo = true;
      this.dialog = true;
    },
    editItem(item) {
      this.setCategory({ data: item });
      this.action = 2;
      this.categoryBoo = true;
      this.dialog = true;
    },
    close() {
      this.action = null;
      this.clear();
      this.adNombre = null;
      this.adAccion = null;
      this.adId = null;
      this.categoryBoo = false;
      this.dialog = false;
      this.adModal = false;
    },
    guardar() {
      debugger;
      if (this.action == 0) {
        //Código para guardar
        this.saveCategory({ token: this.token, data: this.category });
        this.close();
        this.listar();
      } else {
        //Código para editar
        this.updateCategory({ token: this.token, data: this.category });
        this.close();
        this.listar();
      }
    },
    activarDesactivarMostrar(accion, item) {
      this.adModal = true;
      this.adNombre = item.name;
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
      this.activateCategory({ token: this.token, id: id });
      this.adModal = false;
      this.adAccion = 0;
      this.adNombre = "";
      this.adId = null;
      this.listar();
    },
    desactivar(id) {
      this.deactivateCategory({ token: this.token, id: id });
      this.adModal = false;
      this.adAccion = 0;
      this.adNombre = "";
      this.adId = null;
      this.listar();
    },
  },
};
</script>