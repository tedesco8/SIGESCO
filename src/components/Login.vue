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
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      email: "invitado@invitado.com",
      password: "12345",
      errorM: null,
    };
  },
  computed: {
    ...mapState("usuariosNamespace", ["token"]),
  },
  methods: {
    ...mapActions("usuariosNamespace", ['guardarToken']),
    ingresar() {
      axios
        .post("usuario/login", { email: this.email, password: this.password })
        .then((respuesta) => {
          return respuesta.data;
        })
        .then((data) => {
          swal({
            title: "Genial!",
            text: "Bienvenido a SIGESCO",
            icon: "success",
          });
          this.guardarToken(data.tokenReturn);
        })
        .catch((error) => {
          //console.log(error);
          this.errorM = null;
          if (error.response.status == 404) {
            this.errorM =
              "No exíste el usuario o las credenciales son incorrectas";
          } else {
            this.errorM = "Ocurrió un error con el servidor";
          }
        });
    },
  },
};
</script>