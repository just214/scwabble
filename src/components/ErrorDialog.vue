<template>
    <v-snackbar
    :timeout="5000"
    bottom
    v-model="dialog"
  >
    {{error}}
    <v-btn flat color="purple" @click.native="dialog = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  props: ['error'],
  data: () => ({
    dialog: false,
  }),
  watch: {
    error(val) {
      if (val) {
        this.dialog = true;
      }
    },
  },
};
</script>


