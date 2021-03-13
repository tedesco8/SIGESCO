<template>
  <div>
    <span v-if="item.status" class="green--text">{{ item.status }}</span>
    <span v-else class="red--text">{{ item.status }}</span>
    <v-btn v-if="!item" color="primary" @click="listar()">Resetear</v-btn>
  </div>
</template>

<script>
export default {
  name: "clientes-template-table",
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