<template>
<div>
  <v-btn icon @click="handleDelete"><v-icon color="grey">delete</v-icon></v-btn>
      <v-layout row justify-center>
        <v-dialog v-model="showDialog" persistent max-width="290">
          <v-card>
            <v-card-title><h3>Are you sure you want to delete {{player.name}}?</h3></v-card-title>
            <br />
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn  flat @click.native="showDialog = false">Cancel</v-btn>
              <v-btn :loading="loading" color="red" flat @click.native="deletePlayer">Delete Player</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
      <ErrorDialog :error="error" />
    </div>
</template>

<script>
import ErrorDialog from '../ErrorDialog';

export default {
  props: ['player'],
  components: { ErrorDialog },
  data: () => ({
    showDialog: false,
    loading: false,
    error: '',
  }),
  methods: {
    handleDelete() {
      this.showDialog = true;
    },
    deletePlayer() {
      this.loading = true;
      this.$store
        .dispatch('deletePlayer', this.player.playerId)
        .catch(err => {
          this.error = err.message;
        })
        .finally(() => {
          this.showDialog = false;
          this.loading = false;
        });
    },
  },
};
</script>

