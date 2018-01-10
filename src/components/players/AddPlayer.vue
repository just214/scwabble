<template>
<v-layout justify-center wrap>
  <v-flex xs12 sm4>
    <v-text-field 
      v-model="playerName" 
      label="Add a Player"
      @keyup.enter="addPlayer"
    />
  </v-flex>

  <ErrorDialog :error="error" />

</v-layout>
</template>

<script>
import ErrorDialog from '../ErrorDialog';

export default {
  components: { ErrorDialog },
  data: () => ({
    playerName: '',
    error: '',
  }),
  methods: {
    addPlayer() {
      this.error = '';
      if (!this.playerName) return;
      this.$store.dispatch('addPlayer', this.playerName).catch(err => {
        this.error = err.message;
      });
      this.playerName = '';
    },
  },
};
</script>
