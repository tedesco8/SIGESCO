<template>
  <v-app id="app">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
       <template>
        <v-list-item>
          <v-list-item-action>
            <v-icon>home</v-icon>
          </v-list-item-action>
          <v-list-item-title>
            Inicio
          </v-list-item-title>
        </v-list-item>
       </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-3"
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span class="hidden-sm-and-down">SIGESCO</span>
      </v-toolbar-title>
      
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container
        fluid
        fill-height
      >
        <v-slide-y-transition mode="out-in">
          <router-view/>
        </v-slide-y-transition>
      </v-container>
    </v-content>
    <v-footer height="auto">
      <v-layout justify-center>
        <v-flex text-xs-center>
          <v-card flat title color="primary" class="white--text">
            <v-card-text class="white--text pt-0">
              TedescoDev &copy;2019
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      drawer: null
    }
  }
};
</script>
