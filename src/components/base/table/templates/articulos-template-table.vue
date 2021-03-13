<template>
<div>
  <span>{{showCategory}}</span>
  <v-btn v-if="!item" color="primary" @click="listar()">Resetear</v-btn>
</div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "articulos-template-table",
  props: {
    item: Object,
  },
  computed: {
    ...mapState("categoriasNamespace", ["categorys"]),
    showCategory() {
      debugger
      let me = this;
      let categorias = this.categorys;
      let name = '';
      categorias.forEach( x => {
        me.item.type == x.id && (name = x.name);
      })
      return name
    }
  },
  methods: {
    listar() {
      this.$emit("listarClick");
    },
  },
};
</script>