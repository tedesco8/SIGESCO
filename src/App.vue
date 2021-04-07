<template>
  <v-app id="app">
    <NavBar />
    <v-main>
      <v-container fluid fill-height>
        <v-slide-y-transition mode="out-in">
          <router-view />
        </v-slide-y-transition>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Footer from './components/layout/Footer.vue'
import NavBar from './components/layout/NavBar.vue'
import { mapActions } from "vuex";
export default {
  name: "App",
  components: {
    Footer,
    NavBar
  },
  created() {
    this.autoLogin()
  },
  methods: {
    ...mapActions("usuariosNamespace", ['autoLogin']),
  }
};
</script>
