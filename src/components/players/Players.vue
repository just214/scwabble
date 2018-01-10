<template>
<v-container text-xs-center class="mb-5">
  <v-main-title text="Players" />
  <AddPlayer />
  <div v-if="this.$store.state.players.length">
    <v-btn 
      icon 
      @click="show = 'PlayersTable'"
    ><v-icon :color="show==='PlayersTable' ? 'purple' : 'grey'">grid_on</v-icon></v-btn>
    <v-btn 
      icon 
      @click="show = 'PlayersCard'"
    ><v-icon :color="show==='PlayersCard' ? 'purple' : 'grey'">assignment_ind</v-icon></v-btn>
    <component :is="show" />
  </div>
  <h3 v-else>Time to add some players!</h3>
</v-container>
</template>

<script>
import AddPlayer from './AddPlayer';
import PlayersTable from './PlayersTable';
import PlayersCard from './PlayersCard';

export default {
  components: { AddPlayer, PlayersTable, PlayersCard },
  data: () => ({
    show: 'PlayersTable',
  }),
};
</script>

<style scoped>
.main-title {
  font-family: Lobster, cursive;
}
</style>

