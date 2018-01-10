<template>
  <v-data-table
      :headers="headers"
      :items="this.$store.state.players"
      class="elevation-1"
      hide-actions
    >
    <template slot="items" slot-scope="props">
      <td><b><h3>{{ props.item.name }}</h3></b></td>
      <td class="text-xs-center">{{ props.item.games_played  }}</td>
      <td class="text-xs-center">{{ props.item.games_won  }}</td>
      <td class="text-xs-center">{{ props.item.win_percentage  }}</td>
      <td class="text-xs-center">{{ props.item.score_average }}</td>
      <td class="text-xs-center">{{ props.item.score_high }}</td>
      <td class="text-xs-center">{{ props.item.score_low }}</td>
      <td class="text-xs-center">{{ props.item.score_total  }}</td>
      <td class="text-xs-center">{{ props.item.score_count  }}</td>
      <DeletePlayerDialog :player="props.item" />
    </template>
  </v-data-table>
</template>

<script>
import DeletePlayerDialog from './DeletePlayerDialog';

export default {
  components: { DeletePlayerDialog },
  mounted() {
    this.$store.dispatch('getPlayers');
  },
  data() {
    return {
      showDialog: false,
      selectedPlayer: {},
      headers: [
        {
          text: 'Player',
          value: 'name',
          align: 'center',
        },
        {
          text: 'Games Played',
          value: 'games_played',
          sortable: false,
          align: 'center',
        },
        {
          text: 'Games Won',
          value: 'games_won',
          sortable: false,
          align: 'center',
        },
        {
          text: 'Win %',
          value: 'win_percentage',
          sortable: false,
          align: 'center',
        },
        {
          text: 'Average',
          value: 'score_average',
          sortable: false,
          align: 'center',
        },
        {
          text: 'High',
          value: 'score_high',
          sortable: false,
          align: 'center',
        },
        {
          text: 'Low',
          value: 'score_low',
          sortable: false,
          align: 'center',
        },
        {
          text: 'Total',
          value: 'score_total',
          sortable: false,
          align: 'center',
        },
        {
          text: 'Count',
          value: 'score_count',
          sortable: false,
          align: 'center',
        },
      ],
    };
  },
};
</script>

