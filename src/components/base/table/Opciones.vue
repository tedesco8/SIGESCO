<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-icon small class="mr-2" v-on="on" @click="verItem()">tab</v-icon>
      </template>
      <span>Ver detalle</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-icon small class="mr-2" v-on="on" @click="editItem()"
          >edit</v-icon
        >
      </template>
      <span>Editar</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-icon
          v-if="item.estado"
          small
          class="mr-2"
          v-on="on"
          @click="activarDesactivar(2)"
          >block</v-icon
        >
        <v-icon v-else small class="mr-2" @click="activarDesactivar(1)"
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
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-icon small class="mr-2" v-on="on" @click="imprimir(item)"
          >print</v-icon
        >
      </template>
      <span>Imprimir</span>
    </v-tooltip>
    <v-tooltip bottom>
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
  computed: {
    logueado() {
      return this.$store.state.usuario;
    },
    esAdministrador() {
      return (
        this.$store.state.usuario &&
        this.$store.state.usuario.rol == "Administrador"
      );
    },
    esAlmacenero() {
      return (
        this.$store.state.usuario &&
        this.$store.state.usuario.rol == "Almacenero"
      );
    },
    esVendedor() {
      return (
        this.$store.state.usuario && this.$store.state.usuario.rol == "Vendedor"
      );
    },
    esInvitado() {
      return (
        this.$store.state.usuario && this.$store.state.usuario.rol == "Invitado"
      );
    },
  },
  methods: {
    verItem() {
      this.$emit("verItemClick", this.item);
    },
    editItem() {
      this.$emit("editItemClick", this.item);
    },
    activarDesactivar(act) {
      this.$emit("actdeaItemClick", act, this.item);
    }
  },
};
</script>