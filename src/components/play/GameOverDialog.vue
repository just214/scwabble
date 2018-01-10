<template>
  <div>
    <v-btn icon @click="dialog = !dialog"><v-icon color='grey'>flag</v-icon></v-btn>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <h4>
          Are you sure you want to end this game and declare {{game.stats[0].name}} the supreme champion?
          </h4>
        </v-card-title>
      <v-card-actions>
        
        <v-btn flat @click.stop="dialog=false">Cancel</v-btn>
        <v-btn color="red" flat @click.stop="handleGameOver">End this game</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
          <v-dialog v-model="winnerDialog" max-width="500px">

        <v-card>
          <v-card-title>
           <h1 style="margin: 0 auto">Congratulations, {{game.stats[0].name}}!</h1>
           <img style="margin: 0 auto" src="/static/img/cat.png" alt="celebrating cat" />
          </v-card-title>
          
          <v-card-actions>   
            <v-btn style="margin: 0 auto" color="primary" flat @click.stop="goHome">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <ErrorDialog :error="error" />
  </div>
</template>

<script>
import ErrorDialog from '../ErrorDialog';

export default {
  props: ['game'],
  components: { ErrorDialog },
  data: () => ({
    dialog: false,
    winnerDialog: false,
    error: '',
  }),
  methods: {
    handleGameOver() {
      this.dialog = false;
      this.$store
        .dispatch('gameOver', this.game.gameId)
        .then(() => {
          this.winnerDialog = true;
        })
        .catch(err => {
          this.error = err.message;
        });
    },
    goHome() {
      this.$router.push('/');
    },
  },
};
</script>
