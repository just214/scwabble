<template>
  <v-bottom-nav :value="true" :active.sync="appNav" color="purple">
      <v-btn flat color="white" value="play" to="/new-game" v-if="this.$store.state.players.length > 1">
        <span>Play</span>
        <v-icon>play_arrow</v-icon>
      </v-btn>
      <v-btn flat color="white" value="games" to="/games" v-if="this.$store.state.games.length">
        <span>Games</span>
        <v-icon>games</v-icon>
      </v-btn>
    <v-btn flat color="white" value="players" to="/players">
      <span>Players</span>
      <v-icon>people</v-icon>
    </v-btn>
  </v-bottom-nav>
</template>

<script>
export default {
  data: () => ({
    appNav: '',
  }),
};
</script>
