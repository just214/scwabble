<template>
  <v-app light class="main-container">
    <template v-if="!loading">
      <div class="grey lighten-5 main-container">
      <router-view></router-view>
      </div>
    </template>
    
    <AppNav />
  </v-app>
</template>

<script>
import AppNav from './components/AppNav';

export default {
  components: { AppNav },
  data: () => ({
    loading: true,
  }),

  mounted() {
    this.$store
      .dispatch('getScores')
      .then(() => {
        this.$store.dispatch('getGames').then(() => {
          this.$store.dispatch('getPlayers');
        });
      })
      .finally(() => {
        this.loading = false;
      });
  },
};
</script>

<style scoped>
.main-container {
  min-height: 100vh;
  height: 100%;
}
</style>
