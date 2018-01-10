<template>
<v-container v-if="currentGame">

  <v-layout justify-center wrap row>
    <v-flex xs12 sm6 md3 xs-offset-0 sm-offset-3 md-offset-4>
      <v-card style="border-radius: 22px" class="text-xs-center mb-2 pa-1 elevation-1">
        <Timer 
          v-if="currentGame.timer"
          :min="currentGame.timer.minutes"
          :sec="currentGame.timer.seconds"
          ref="timerRef"
        />
      </v-card>
    </v-flex>
  </v-layout>

  <v-layout justify-center align-center wrap row >
    <v-flex xs8 sm3 md2 >
      <v-text-field 
        :label="currentPlayer.name + '\'s score'"
        type="number"
        pattern="[0-9]*"
        v-model="scoreInput"
        @keyup.enter="updateScore"

      />
    </v-flex>
    <v-flex xs3  sm1>
      <v-layout row wrap>
      <v-flex xs6>
              <v-btn 
        icon 
        v-if="!!scoreInput"
        :loading="loading"  
        @click="updateScore"
      ><v-icon  color="teal">save</v-icon></v-btn>
      </v-flex>
      <v-flex xs6>
              <CheckWord v-if="!!scoreInput" :onSubmit="handleChallenge" />
      </v-flex>

</v-layout>

      
    </v-flex>
        
  </v-layout>
  <div v-if="currentGame.allScores.length" >
    <br />
    <v-layout row justify-center >
      <v-flex xs1 class="ml-4 mr-4"><ScoresModal :gameId="currentGame.gameId" :playerName="currentPlayer.name" /></v-flex>
      <v-flex xs1 class="ml-4 mr-4"><GameOverDialog :game="currentGame"/></v-flex>
    </v-layout>
    <GameStatsTable :stats="currentStats" />
      
  </div>
  <ErrorDialog :error="error" />
  <v-snackbar 
        top
        :timeout="3000"
        v-model="skipDialog"
      >
        <p class="ma-3">{{skippedPlayer}} was skipped.</p>
        <v-btn flat color="pink" @click.native="skipDialog = false">Close</v-btn>
      </v-snackbar>
      <v-dialog
        max-width="500px"
        v-model="wordChecked"
      >
      <v-card class="pa-4">
        <div v-if="isWord">
          <h1><v-icon large class="mr-3" color="green">check</v-icon>{{word}}</h1>
          <p class="ma-3">{{word}} is a word! Sorry, {{thisChallenger.name}}. Your next turn will be skipped.</p>
        </div>
        <div v-else>
          <h1><v-icon large class="mr-3" color="red">clear</v-icon>{{word}}</h1>
          <p class="ma-3">Nice try, {{playerName}}. You just got a 0.</p>
        </div>

        <v-btn flat @click.native="wordChecked = false">Close</v-btn>
        </v-card>
      </v-dialog>
</v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Timer from '../Timer';
import GameStatsTable from './GameStatsTable';
import ScoresModal from './ScoresModal';
import GameOverDialog from './GameOverDialog';
import CheckWord from './CheckWord';
import ErrorDialog from '../ErrorDialog';

export default {
  components: {
    Timer,
    GameStatsTable,
    ScoresModal,
    GameOverDialog,
    CheckWord,
    ErrorDialog,
  },
  data: () => ({
    currentMove: 0,
    scoreInput: '',
    loading: false,
    error: '',
    challengers: [],
    isWord: false,
    playerName: '',
    showDialog: false,
    skipDialog: false,
    skippedPlayer: '',
    wordChecked: false,
    currentChallenger: {},
    thisChallenger: {},
    word: '',
  }),
  beforeMount() {
    this.$store.dispatch('getCurrentGame', this.$route.params.gameId);
  },
  computed: {
    ...mapState({
      currentGame: state => state.currentGame,
    }),
    ...mapGetters(['currentPlayer', 'currentStats']),
  },
  methods: {
    updateScore() {
      if (!this.scoreInput && this.scoreInput !== 0) return;
      this.loading = true;
      this.$store
        .dispatch('addScore', +this.scoreInput)
        .then(() => {
          this.$store.dispatch('getCurrentGame', this.$route.params.gameId);
          this.scoreInput = '';
          this.$refs.timerRef.resetTimer();
        })
        .catch(err => {
          this.error = err.message;
        })
        .finally(() => {
          this.loading = false;
          this.currentChallenger = this.challengers.filter(
            challenger =>
              challenger.playerId ===
              this.$store.getters.currentPlayer.playerId,
          );
          if (this.currentChallenger.length) {
            this.scoreInput = 0;
            this.skippedPlayer = this.$store.getters.currentPlayer.name;
            const i = this.challengers
              .map(c => c.playerId)
              .indexOf(this.$store.getters.currentPlayer.playerId);
            this.challengers.splice(i, 1);
            this.updateScore();
            this.skipDialog = true;
          }
        });
    },
    handleChallenge({ isWord, challenger, word }) {
      if (isWord === false) {
        this.scoreInput = 0;
      } else {
        this.isWord = isWord;
        this.thisChallenger = challenger;
        this.challengers.push(challenger);
        this.word = word;
      }
      this.wordChecked = true;
      this.updateScore();
    },
  },
};
</script>

