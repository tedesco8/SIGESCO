<template>
  <v-container grid-list-sm class="pa-4 white">
    <v-row row wrap>
      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="4">
        <v-text-field v-model="item.name" label="Nombre"></v-text-field>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="4">
        <v-select
          v-model="item.type"
          :items="selectCategoria"
          label="Categoría"
        ></v-select>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="4">
        <v-text-field
          v-model="item.description"
          label="Descripción"
        ></v-text-field>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="4">
        <v-text-field
          v-model="item.priceUnity"
          label="Precio x Unidad"
        ></v-text-field>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="4">
        <v-text-field
          v-model="item.priceWholesale"
          label="Precio x Mayor"
        ></v-text-field>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="4">
        <v-text-field v-model="item.stock" label="Stock"></v-text-field>
      </v-col>
      <v-col v-if="action != 1" cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
        <span>Sube una imágen</span>
        <v-file-input
          :rules="rulesImage"
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Imagen"
          name="file0"
          prepend-icon="photo_camera"
          @change="obtenerImagen"
        ></v-file-input>
      </v-col>
      <v-col v-if="action != 1" cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
        <span class="align-center">Asignar imágen desde la galería</span>
        <v-btn class="mx-2" @click="showGallery" fab dark color="primary">
          <v-icon dark> image </v-icon>
        </v-btn>
      </v-col>
      <v-col xs12 sm12 md12 v-show="valida">
        <div
          class="red--text"
          v-for="v in validaMensaje"
          :key="v"
          v-text="v"
        ></div>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" class="text-center">
          <img
            aspect-ratio="1"
            height="300"
            :src="(item.image ? item.image : imageDefault)"
          />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "articulo-template-dialog",
  data() {
    return {
      valida: 0,
      validaMensaje: [],
      imageDefault:"https://futureuniversity.com/wp-content/uploads/sites/3/2015/02/default-placeholder-1024x1024-570x321.png",
      image: "",
      rulesImage: [
        (value) =>
          !value ||
          value.size < 2000000 ||
          "Avatar size should be less than 2 MB!",
      ],
    };
  },
  props: {
    item: Object,
    action: Number, //0 = nuevo, 1 = ver, 2 = editar
  },
  created() {
    this.getCategorys(this.token);
  },
  mounted() {
    this.$nextTick(() => {
      this.setArticle({ data: this.item });
    });
  },
  computed: {
    ...mapState("usuariosNamespace", ["token"]),
    ...mapState("categoriasNamespace", ["categorys"]),
    selectCategoria() {
      let cat = [];
      let categorias = this.categorys;
      categorias.forEach(function (x) {
        cat.push({ text: x.name, value: x.id });
      });
      return cat;
    },
  },
  methods: {
    ...mapActions("articulosNamespace", ["setArticle"]),
    ...mapActions("categoriasNamespace", ["getCategorys"]),
    obtenerImagen(file) {
      this.item.image = file;
    },
    showGallery() {
      debugger
      this.$emit("gallery");
    }
  },
};
</script>