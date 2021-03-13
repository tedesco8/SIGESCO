<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md6 lg5 xl4>
      <v-card>
        <v-toolbar dark color="blue darken-3">
          <v-toolbar-title> Acceso al Sistema </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-text-field
            v-model="email"
            autofocus
            color="accent"
            label="Email"
            required
          >
          </v-text-field>
          <v-text-field
            v-model="password"
            type="password"
            color="accent"
            label="Password"
            required
          >
          </v-text-field>
          <v-flex class="red--text" v-if="errorM">
            {{ errorM }}
          </v-flex>
        </v-card-text>
        <v-card-actions class="px-3 pb-3">
          <v-flex text-xs-right>
            <v-btn @click="ingresar()" color="primary">Ingresar</v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import axios from "axios";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      email: "invitado@invitado.com",
      password: "12345",
      errorM: null,
    };
  },
  methods: {
    ...mapActions("usuariosNamespace", ["guardarToken"]),
    ingresar() {
      debugger;
      axios
        .post("user/login", { email: this.email, password: this.password })
        .then((res) => {
          this.$swal.fire({
            title: "Genial!",
            text: "Bienvenido a SIGESCO",
            type: "success",
          });
          this.guardarToken(res.data.tokenReturn);
        })
        .catch((error) => {
          this.errorM = null;
          switch (error.status) {
            case 404:
              this.errorM = "No exíste el usuario";
              break;
            case 403:
              this.errorM = "Las credenciales son incorrectas";
              break;
            default:
              this.errorM = "Ocurrió un error con el servidor";
              break;
          }
        });
    },
  },
};
</script>