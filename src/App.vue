<template>
  <v-app id="app">
    <NavBar />
    <v-content>
      <v-container fluid fill-height>
        <v-slide-y-transition mode="out-in">
          <router-view />
        </v-slide-y-transition>
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Footer from './components/layout/Footer.vue'
import NavBar from './components/layout/NavBar.vue'
export default {
  name: "App",
  
  components: {
    Footer,
    NavBar
  },
  created() {
    this.$store.dispatch("autoLogin");
  },
};
</script>
