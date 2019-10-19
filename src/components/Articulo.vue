<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar text color="white">
        <!-- <template v-slot:item.opciones="{item}">
                    <v-icon small class="mr-2" @click="crearPDF()">print</v-icon>
        </template>-->
        <v-btn @click="crearPDF()">
          <v-icon>print</v-icon>
        </v-btn>
        <v-toolbar-title>Artículos</v-toolbar-title>
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
        <!--Modal agregar o editar artículo-->
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Nuevo</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md6>
                    <v-text-field v-model="codigo" label="Código"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-select v-model="categoria" :items="categorias" label="Categoría"></v-select>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="nombre" label="Nombre"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field type="number" v-model="stock" label="Stock"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field v-model="precio_venta" label="precio_venta"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="descripcion" label="Descripción"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12 v-show="valida">
                    <div class="red--text" v-for="v in validaMensaje" :key="v" v-text="v"></div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="guardar">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!--Modal activar o desactivar-->
        <v-dialog v-model="adModal" max-width="290">
          <v-card>
            <v-card-title class="headline" v-if="adAccion==1">Activar Item</v-card-title>
            <v-card-title class="headline" v-if="adAccion==2">Desactivar Item</v-card-title>
            <v-card-text>
              Estás a punto de
              <span v-if="adAccion==1">activar</span>
              <span v-if="adAccion==2">desactivar</span>
              el item {{adNombre}}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="activarDesactivarCerrar()" color="green darken-1" text="text">Cancelar</v-btn>
              <v-btn
                v-if="adAccion==1"
                @click="activar()"
                color="orange darken-4"
                text="text"
              >Activar</v-btn>
              <v-btn
                v-if="adAccion==2"
                @click="desactivar()"
                color="orange darken-4"
                text="text"
              >Desactivar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-data-table :headers="headers" :items="articulos" :search="search" class="elevation-1">
        <template v-slot:item.opciones="{item}">
          <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
          <div v-if="item.estado">
            <v-icon small @click="activarDesactivarMostrar(2,item)">block</v-icon>
          </div>
          <div v-else>
            <v-icon small @click="activarDesactivarMostrar(1,item)">check</v-icon>
          </div>
        </template>
        <template v-slot:item.estado="{item}">
          <div v-if="item.estado">
            <span class="blue--text">Activo</span>
          </div>
          <div v-else>
            <span class="red--text">Inactivo</span>
          </div>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="listar()">Resetear</v-btn>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>
<script>
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import swal from 'sweetalert';

export default {
  data() {
    return {
      dialog: false,
      search: "",
      articulos: [],
      headers: [
        { text: "Opciones", value: "opciones", sortable: false },
        { text: "Código", value: "codigo", sortable: false },
        { text: "Nombre", value: "nombre", sortable: true },
        { text: "Categoría", value: "categoria.nombre", sortable: false },
        { text: "Stock", value: "stock", sortable: false },
        { text: "Precio Venta", value: "precio_venta", sortable: false },
        { text: "Descripción", value: "descripcion", sortable: false },
        { text: "Estado", value: "estado", sortable: false }
      ],
      editedIndex: -1,
      _id: "",
      categoria: "",
      categorias: [],
      codigo: "",
      nombre: "",
      stock: 0,
      precio_venta: 0,
      descripcion: "",
      valida: 0,
      validaMensaje: [],
      adModal: 0,
      adAccion: 0,
      adNombre: "",
      adId: ""
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo registro" : "Editar registro";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    this.listar(), this.selectCategoria();
  },
  methods: {
    crearPDF() {
      var columns = [
        { title: "Nombre", dataKey: "nombre" },
        { title: "Código", dataKey: "codigo" },
        { title: "Categoría", dataKey: "categoria" },
        { title: "Stock", dataKey: "stock" },
        { title: "Precio Venta", dataKey: "precio_venta" }
      ];
      var rows = [];

      this.articulos.map(function(x) {
        rows.push({
          nombre: x.nombre,
          codigo: x.codigo,
          categoria: x.categoria.nombre,
          stock: x.stock,
          precio_venta: x.precio_venta
        });
      });
      var doc = new jsPDF("p", "pt");
      doc.autoTable(columns, rows, {
        margin: { top: 60 },
        addPageContent: function(data) {
          doc.text("Lista de Artículos", 40, 30);
        }
      });

      doc.save("Articulos.pdf");
    },
    selectCategoria() {
      let me = this;
      let categoriaArray = [];
      let header = { Token: this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .get("categoria/list", configuracion)
        .then(function(response) {
          categoriaArray = response.data;
          categoriaArray.map(function(x) {
            me.categorias.push({ text: x.nombre, value: x._id });
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    listar() {
      let me = this;
      let header = { Token: this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .get("articulo/list", configuracion)
        .then(function(response) {
          me.articulos = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    limpiar() {
      this._id = "";
      this.nombre = "";
      (this.codigo = ""),
        (this.stock = 0),
        (this.precio_venta = 0),
        (this.descripcion = "");
      this.valida = 0;
      this.validaMensaje = [];
      this.editedIndex = -1;
    },
    validar() {
      this.valida = 0;
      this.validaMensaje = [];
      if (!this.categoria) {
        this.validaMensaje.push("Seleccione una categoría");
      }
      if (this.codigo.length > 64) {
        this.validaMensaje.push("El código no debe tener más de 64 caracteres");
      }
      if (this.nombre.length < 1 || this.nombre.length > 50) {
        this.validaMensaje.push(
          "El nombre del artículo debe tener entre 1-50 caracteres."
        );
      }
      if (this.descripcion.length > 255) {
        this.validaMensaje.push(
          "La descripción del artículo no debe tener más de 255 caracteres."
        );
      }
      if (this.stock < 0) {
        this.validaMensaje.push("Ingrese un stock valido");
      }
      if (this.precio_venta < 0) {
        this.validaMensaje.push("Ingrese un precio de venta valido");
      }
      if (this.validaMensaje.length) {
        this.valida = 1;
      }
      return this.valida;
    },
    guardar() {
      let me = this;
      let header = { Token: this.$store.state.token };
      let configuracion = { headers: header };
      if (this.validar()) {
        return;
      }
      if (this.editedIndex > -1) {
        //Código para editar
        axios
          .put(
            "articulo/update",
            {
              _id: this._id,
              categoria: this.categoria,
              codigo: this.codigo,
              nombre: this.nombre,
              stock: this.stock,
              precio_venta: this.precio_venta,
              descripcion: this.descripcion
            },
            configuracion
          )
          .then(function(response) {
            // swal("", "Artículo editado exitosamente", "success");
            swal({
              title: "Buen trabajo!",
              text: "Artículo editado exitosamente",
              icon: "success"
            });
            me.limpiar();
            me.close();
            me.listar();
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        //Código para guardar
        axios
          .post(
            "articulo/add",
            {
              categoria: this.categoria,
              codigo: this.codigo,
              nombre: this.nombre,
              stock: this.stock,
              precio_venta: this.precio_venta,
              descripcion: this.descripcion
            },
            configuracion
          )
          .then(function(response) {
           swal({
              title: "Buen trabajo!",
              text: "Artículo editado exitosamente",
              icon: "success"
            });
            me.limpiar();
            me.close();
            me.listar();
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    editItem(item) {
      this._id = item._id;
      this.categoria = item.categoria._id;
      this.codigo = item.codigo;
      this.nombre = item.nombre;
      this.stock = item.stock;
      this.precio_venta = item.precio_venta;
      this.descripcion = item.descripcion;
      this.dialog = true;
      this.editedIndex = 1;
    },
    activarDesactivarMostrar(accion, item) {
      this.adModal = 1;
      this.adNombre = item.nombre;
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
        .put("articulo/activate", { _id: this.adId }, configuracion)
        .then(function(response) {
          swal({
              title: "Buen trabajo!",
              text: "Artículo activado exitosamente",
              icon: "success"
            });
          me.adModal = 0;
          me.adAccion = 0;
          me.adNombre = "";
          me.adId = "";
          me.listar();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    desactivar() {
      let me = this;
      let header = { Token: this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .put("articulo/deactivate", { _id: this.adId }, configuracion)
        .then(function(response) {
          swal({
              title: "Buen trabajo!",
              text: "Artículo desactivado exitosamente",
              icon: "success"
            });
          me.adModal = 0;
          me.adAccion = 0;
          me.adNombre = "";
          me.adId = "";
          me.listar();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    close() {
      this.dialog = false;
    }
  }
};
</script>