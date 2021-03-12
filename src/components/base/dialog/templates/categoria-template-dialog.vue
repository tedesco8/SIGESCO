<template>
  <v-container grid-list-sm class="pa-4 white">
    <v-layout row wrap>
      <v-flex xs12 sm4 md4 lg4 xl4>
        <v-text-field v-model="item.name" label="Nombre"></v-text-field>
      </v-flex>
      <v-flex xs12 sm4 md4 lg4 xl4>
        <v-text-field v-model="item.description" label="Descripción"></v-text-field>
      </v-flex>
      <v-flex xs12 sm12 md12 v-show="valida">
        <div
          class="red--text"
          v-for="v in validaMensaje"
          :key="v"
          v-text="v"
        ></div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "categoria-template-dialog",
  data() {
    return {
      valida: 0,
      validaMensaje: [],
    };
  },
  props: {
    item: Object,
    action: Number, //0 = nuevo, 1 = ver, 2 = editar
  },
  mounted() {
    this.$nextTick(() => {
      this.setCategory({ data: this.item });
    });
  },
  computed: {
    ...mapState("usuariosNamespace", ["token"]),
  },
  methods: {
    ...mapActions("categoriasNamespace", ["setCategory"]),
  },
};
</script>