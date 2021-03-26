<template>
  <v-container>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="600" hide-overlay>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="close">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-col
          v-for="image in articlesImages"
          :key="image.public_id"
          cols="12"
          class="gallery-card"
          md="12"
        >
          <v-hover>
            <template v-slot="{ hover }">
              <v-card
                :img="image.url"
                class="white--text overflow-hidden"
                dark
                height="300"
                hover
                @click="select(image.url)"
              >
                <v-fade-transition>
                  <v-overlay v-if="hover" absolute>
                    <v-icon large> mdi-magnify </v-icon>
                  </v-overlay>
                </v-fade-transition>
                <v-slide-y-reverse-transition>
                  <v-footer
                    v-if="hover"
                    absolute
                    class="justify-center"
                    height="75"
                  >
                    <div class="heading">
                      {{ image.filename }}
                    </div>
                  </v-footer>
                </v-slide-y-reverse-transition>
              </v-card>
            </template>
          </v-hover>
        </v-col>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: {
    dialog: Boolean,
  },
  created() {
    this.getArticlesImages();
  },
  computed: {
    ...mapState("articulosNamespace", ["articlesImages"]),
  },
  methods: {
    ...mapActions("articulosNamespace", ["getArticlesImages"]),
    select(url) {
      this.$emit("select", url);
    },
    close() {
      this.$emit("close");
    }
  },
};
</script>

<style scoped>
.gallery-card {
  transform-origin: center center 0;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.fade-transition-leave,
.fade-transition-leave-active,
.fade-transition-leave-to {
  display: none;
}
</style>
