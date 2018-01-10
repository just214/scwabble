<template>
  <v-container class="mb-5">
    <v-main-title text="Games" />
    <v-layout row wrap text-xs-center v-if="gamesInProgress.length">
      <v-flex xs12 text-xs-left><h2 class="purple--text">In Progress</h2></v-flex>
      
      <v-flex xs12 sm6 md3 v-for="game in gamesInProgress" :key="game.gameId">
        <v-card class="pa-3 ma-3">
          <p class="teal--text">{{getDate(game.createdAt)}}</p>
          <div v-for="player in game.stats" :key="player.scoreId">
            <v-layout row wrap>
              <v-flex xs6>
                <p>{{player.name}}</p>
              </v-flex>
              <v-flex xs6>
                <p>{{player.score_total}}</p>
              </v-flex>
            </v-layout>
          </div>
          <v-layout row>
            <v-flex xs6>
              <DeleteGameDialog :gameId="game.gameId" />
            </v-flex>
            <v-flex xs6>
              <v-btn  flat :to="`play/${game.gameId}`">Resume</v-btn>
            </v-flex>

          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    
    <v-layout row wrap text-xs-center v-if="completedGames.length">
      <v-flex xs12 text-xs-left><h2 class="purple--text">Completed</h2></v-flex>
      
      <v-flex xs12 sm6 md3 v-for="game in completedGames" :key="game.gameId">
        <v-card class="pa-3 ma-3">
          <p class="teal--text">{{getDate(game.createdAt)}}</p>
          <v-chip color="purple" class="pa-0 mb-3"><v-avatar class="green darken-4"><img src="static/img/trophy.png" /></v-avatar><h2 class="white--text"><b>{{game.winner.name}}</b></h2></v-chip>
          <br />
            <v-layout row wrap>
              <v-flex xs6>
                <p><b>Total</b></p>
              </v-flex>
              <v-flex xs6>
                <p><b>{{game.score_sum}}</b></p>
              </v-flex>
            </v-layout>
          <div v-for="player in game.stats" :key="player.scoreId">
            <v-layout row wrap>
              <v-flex xs6>
                <p>{{player.name}}</p>
              </v-flex>
              <v-flex xs6>
                <p>{{player.score_total}}</p>
              </v-flex>
            </v-layout>
          </div>
          <DeleteGameDialog :gameId="game.gameId" />

        </v-card>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from 'moment';
import DeleteGameDialog from './DeleteGameDialog';

export default {
  components: { DeleteGameDialog },
  computed: {
    gamesInProgress() {
      return this.$store.state.games
        .filter(({ gameOver }) => gameOver === false)
        .sort((a, b) => b.createdAt - a.createdAt);
    },
    completedGames() {
      return this.$store.state.games
        .filter(({ gameOver }) => gameOver === true)
        .sort((a, b) => b.createdAt - a.createdAt);
    },
  },
  methods: {
    getDate(date) {
      return moment(date, 'YYYYMMDD').fromNow();
    },
  },
};
</script>

<style scoped>
.main-title {
  font-family: Lobster, cursive;
}
</style>
