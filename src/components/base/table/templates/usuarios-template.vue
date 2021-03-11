<template>
  <div>
    <span class="green--text">{{item.status}}</span>
    <v-btn v-if="!item" color="primary" @click="listar()">Resetear</v-btn>
  </div>
</template>

<script>
export default {
  name: "usuarios-template-table",
  props: {
    item: Object,
  },
  methods: {
    listar() {
      this.$emit("listarClick");
    },
  },
};
</script>