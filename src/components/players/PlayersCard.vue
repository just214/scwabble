<template>
  <v-layout row wrap justify-center>
    <v-flex xs12 sm3 v-for="player in $store.state.players" :key="player.playerId"> 
      <v-card class="ma-3 pa-3">
        <h2>{{player.name}}</h2>
          <v-card-text v-if="player.games_played">
            <v-layout row wrap justify-center>
              <v-flex xs6 class="grey--text ">
                <h4>Games Played</h4>
                <h4>Games Won</h4>
                <h4>Win %</h4>
                <h4>Average Score</h4>
                <h4>High Score</h4>
                <h4>Low Score</h4>
                <h4>Total Score</h4>
                <h4>Score Count</h4>
              </v-flex>
              <v-flex xs6>
                <h4>{{player.games_played}}</h4>
                <h4>{{player.games_won}}</h4>
                <h4>{{player.win_percentage}}%</h4>
                <h4>{{player.score_average}}</h4>
                <h4>{{player.score_high}}</h4>
                <h4>{{player.score_low}}</h4>
                <h4>{{player.score_total}}</h4>
                <h4>{{player.score_count}}</h4>
              </v-flex>
              
              <DeletePlayerDialog :player="player" />
            </v-layout>
        </v-card-text>
        <v-card-text v-else>
          <h4>No games played</h4>
        </v-card-text>
      </v-card>
    </v-flex>
    
  </v-layout>
</template>

<script>
import DeletePlayerDialog from './DeletePlayerDialog';

export default {
  components: { DeletePlayerDialog },
};
</script>

