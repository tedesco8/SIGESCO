<template>
  <div>
    <div v-if="item.estado">
      <span class="blue--text">Aceptado</span>
    </div>
    <div v-else>
      <span class="red--text">Anulado</span>
    </div>
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