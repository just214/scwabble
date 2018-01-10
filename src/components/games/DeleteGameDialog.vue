<template>
  <div>
    
    <v-btn @click="showDialog = !showDialog" icon><v-icon color="grey">delete</v-icon></v-btn>
    <v-dialog v-model="showDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <h3> Are you sure you want to delete this game and all associated scores? </h3>
        </v-card-title>
      <v-card-actions>
        
        <v-btn flat @click.stop="showDialog=false">Cancel</v-btn>
        <v-btn :loading="loading" color="red" flat @click.stop="handleDelete">Delete this game</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <ErrorDialog :error="error" />
  </div>
</template>

<script>
import ErrorDialog from '../ErrorDialog';

export default {
  props: ['gameId'],
  components: { ErrorDialog },
  data: () => ({
    showDialog: false,
    error: '',
    loading: false,
  }),
  methods: {
    handleDelete() {
      this.loading = true;
      this.error = '';
      this.$store
        .dispatch('deleteGame', this.gameId)
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

