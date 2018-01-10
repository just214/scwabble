<template>
  <v-container class="pb-5 mb-5">
    <v-main-title text="New Game" />
    <v-stepper v-model="step" class="stepper" style="min-height: 90vh">
      <v-stepper-header>
        <v-stepper-step step="1" :complete="step > 1"></v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" :complete="step > 2"></v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3"></v-stepper-step>
      </v-stepper-header>

      <v-stepper-items >

        <v-stepper-content step="1">
          <h4>Choose up to 4 players.</h4>
          <br />
          <v-layout wrap row>
            <v-flex xs6 sm4 md3 lg2 v-for="player in $store.state.players" :key="player.playerId">
              <v-checkbox 
                color="teal"
                :label="player.name" 
                v-model="selectedPlayers" 
                :value="player"
                :disabled="disableCheckbox(player.playerId)"
              ></v-checkbox>
            </v-flex>
          </v-layout>
          <v-btn flat to="/" exact>Cancel</v-btn>
          <v-btn dark color="teal" @click.native="step = 2" :disabled="selectedPlayers.length < 2">Next</v-btn>
          
        </v-stepper-content>

        <v-stepper-content step="2">
          <h4>Roll the dice to see who goes first and drag the players to the right order.</h4>
          <br />
          <v-layout row wrap>
            <v-flex xs4 sm2 md1>
              <div v-for="n in selectedPlayers.length" :key="n" class="pa-2 ma-1">
                <h3>Player {{n}}</h3>
              </div>
            </v-flex>
            <v-flex xs8 sm6>
            <draggable :list="selectedPlayers" @start="drag=true" @end="drag=false">
            <v-card v-for="player in selectedPlayers" :key="player.playerId" class="dragndrop pa-2 ma-1">
              <h3 style="color: purple"><v-icon color="gray" class="mr-3">vertical_align_center</v-icon>{{player.name}}</h3>
            </v-card>
          </draggable>
            </v-flex>
          </v-layout>

          <v-btn flat to="/" exact>Cancel</v-btn>
          <v-btn flat @click.native="step -= 1">Back</v-btn>
          <v-btn dark color="teal" @click.native="step += 1">Next</v-btn>
          
        </v-stepper-content>

        <v-stepper-content step="3">
          <h4>Set the timer duration.</h4>
          <br />
          <v-time-picker 
            color="teal" 
            v-model="timer" 
            format="24hr"
            @input="handleTimerSetting"
            ></v-time-picker>
          <v-btn flat to="/" exact>Cancel</v-btn>
          <v-btn  flat @click.native="step -= 1">Back</v-btn>
          <v-btn dark color="teal" @click.native="createGame">Play!</v-btn>
          
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <ErrorDialog :error="error" />
  </v-container>
</template>

<script>
import draggable from 'vuedraggable';
import ErrorDialog from '../ErrorDialog';

export default {
  components: {
    draggable,
    ErrorDialog,
  },
  data: () => ({
    step: 0,
    selectedPlayers: [],
    timer: '03:00',
    error: '',
  }),
  computed: {
    minutes() {
      return this.timer.split(':')[0];
    },
    seconds() {
      return this.timer.split(':')[1];
    },
  },
  methods: {
    createGame() {
      this.error = '';
      this.$store
        .dispatch('createGame', {
          minutes: this.minutes,
          seconds: this.seconds,
          players: this.selectedPlayers,
        })
        .then(doc => {
          this.$router.push(`/play/${doc}`);
        })
        .catch(err => {
          this.error = err.message;
        });
    },
    disableCheckbox(id) {
      const playerIsSelected = this.selectedPlayers.filter(
        player => player.playerId === id,
      );
      if (this.selectedPlayers.length === 4 && !playerIsSelected.length) {
        return true;
      }
      return false;
    },

    handleTimerSetting() {
      if ('vibrate' in navigator) {
        // enable vibration support
        navigator.vibrate =
          navigator.vibrate ||
          navigator.webkitVibrate ||
          navigator.mozVibrate ||
          navigator.msVibrate;

        if (navigator.vibrate) {
          navigator.vibrate(1000);
        }
      }
    },
  },
};
</script>

<style scoped>
.dragndrop {
  cursor: move;
}

.main-title {
  font-family: Lobster, cursive;
}
</style>

