import Vue from 'vue';
/**
 * This mixin provides `attrs$` and `listeners$` to work around
 * vue bug https://github.com/vuejs/vue/issues/10115
 */

function makeWatcher(property) {
  return {
    handler(val, oldVal) {
      for (const attr in oldVal) {
        if (!Object.prototype.hasOwnProperty.call(val, attr)) {
          this.$delete(this.$data[property], attr);
        }
      }

      for (const attr in val) {
        this.$set(this.$data[property], attr, val[attr]);
      }
    },

    immediate: true
  };
}

export default Vue.extend({
  data: () => ({
    attrs$: {},
    listeners$: {}
  }),
  watch: {
    // Work around unwanted re-renders: https://github.com/vuejs/vue/issues/10115
    // Make sure to use `attrs$` instead of `$attrs` (confusing right?)
    $attrs: makeWatcher('attrs$'),
    $listeners: makeWatcher('listeners$')
  }
});
//# sourceMappingURL=index.js.map