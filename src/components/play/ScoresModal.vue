<template>
  <v-layout row wrap>
    <v-dialog v-model="dialog" max-width="290">
      <v-btn icon slot="activator"><v-icon  color='grey'>list</v-icon></v-btn>
      <v-card class="pt-0 pb-0 pl-5 pr-5" >
        <v-layout justify-content align-center column>
        <v-card-title class="headline">Scores</v-card-title>
        <v-card-text v-for="score in scores" :key="score.gameId" class="ma-0 pa-1">
          <v-layout row wrap align-center justify-center>
            <v-flex xs3>
              <v-text-field
                type="number"
                pattern="[0-9]*"
                v-model="score.score" 
                @blur="handleScore($event, score)"
              />
            </v-flex>
            <v-flex xs8>
              <p>
                {{score.playerName}}</p>
              </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat flat @click.native="dialog = false">Close</v-btn>
        </v-card-actions>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: ['gameId', 'playerName'],
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    scores() {
      return this.$store.state.scores
        .filter(score => score.gameId === this.gameId)
        .sort((a, b) => b.createdAt - a.createdAt);
    },
  },
  methods: {
    handleScore($event, score) {
      if (!score.score || !Number(score.score)) return;
      this.$store.dispatch('updateScore', score).finally(() => {
        this.$store.dispatch('getCurrentGame', this.$route.params.gameId);
      });
    },
  },
};
</script>