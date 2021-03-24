<template>
  <v-container grid-list-sm class="pa-4 white">
    <v-layout row wrap>
      <v-flex xs12 sm4 md4 lg4 xl4>
        <v-text-field v-model="item.name" label="Nombre"></v-text-field>
      </v-flex>
      <v-flex xs12 sm4 md4 lg4 xl4>
        <v-select
          v-model="item.type"
          :items="selectCategoria"
          label="Categoría"
        ></v-select>
      </v-flex>
      <v-flex xs12 sm4 md4 lg4 xl4>
        <v-text-field
          v-model="item.description"
          label="Descripción"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm4 md4 lg4 xl4>
        <v-text-field
          v-model="item.priceUnity"
          label="Precio x Unidad"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm4 md4 lg4 xl4>
        <v-text-field
          v-model="item.priceWholesale"
          label="Precio x Mayor"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm4 md4 lg4 xl4>
        <v-text-field v-model="item.stock" label="Stock"></v-text-field>
      </v-flex>
      <v-flex v-if="action != 1" xs12 sm4 md6 lg6 xl6>
        <span>Sube una imágen</span>
        <v-file-input
          :rules="rulesImage"
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Imagen"
          name="file0"
          prepend-icon="photo_camera"
          @change="obtenerImagen"
        ></v-file-input>
      </v-flex>
      <v-flex v-if="action != 1" xs12 sm4 md6 lg6 xl6>
        <span class="align-center">Asignar imágen desde la galería</span>
        <v-btn class="mx-2" @click="showGallery" fab dark color="primary">
          <v-icon dark> image </v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs12 sm12 md12 v-show="valida">
        <div
          class="red--text"
          v-for="v in validaMensaje"
          :key="v"
          v-text="v"
        ></div>
      </v-flex>
      <v-flex xs12 sm4 md12 lg12 xl12 class="text-center">
        <v-responsive class="pt-4">
          <img
            aspect-ratio="1"
            :src="item.image ? item.image : imageDefault"
          />
        </v-responsive>
      </v-flex>
    </v-layout>
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