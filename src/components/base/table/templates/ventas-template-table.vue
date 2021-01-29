<template>
  <div>
    <span class="green--text">{{item.total}}</span>
    <v-btn v-if="!item" color="primary" @click="listar()">Resetear</v-btn>
  </div>
</template>

<script>
export default {
  name: "ventas-template-table",
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