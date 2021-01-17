<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-icon small class="mr-2" v-on="on" @click="verIngreso(item)"
          >tab</v-icon
        >
      </template>
      <span>Ver detalle</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-icon small class="mr-2" v-on="on" @click="editItem(item)"
          >edit</v-icon
        >
      </template>
      <span>Editar artículo</span>
    </v-tooltip>
    <v-tooltip v-if="!extra && !precio_extra" bottom>
      <template v-slot:activator="{ on }">
        <v-icon
          v-if="item.estado"
          small
          class="mr-2"
          v-on="on"
          @click="activarDesactivar(2, item)"
          >block</v-icon
        >
        <v-icon v-else small class="mr-2" @click="activarDesactivar(1, item)"
          >check</v-icon
        >
      </template>
      <span>{{ item.estado ? "Anular" : "Activar" }}</span>
    </v-tooltip>
    <v-tooltip v-if="esAdministrador" bottom>
      <template v-slot:activator="{ on }">
        <v-icon small class="mr-2" v-on="on" @click="eliminar(item)"
          >delete</v-icon
        >
      </template>
      <span>Eliminar</span>
    </v-tooltip>
    <v-tooltip v-if="reserva" bottom>
      <template v-slot:activator="{ on }">
        <v-icon small class="mr-2" v-on="on" @click="imprimir(item)"
          >print</v-icon
        >
      </template>
      <span>Imprimir</span>
    </v-tooltip>
    <v-tooltip v-if="reserva" bottom>
      <template v-slot:activator="{ on }">
        <v-icon small class="mr-2" v-on="on" @click="email(item)">email</v-icon>
      </template>
      <span>Enviar por email</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
  },
};
</script>