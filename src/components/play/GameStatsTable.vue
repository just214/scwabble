<template>
  <v-data-table
      v-bind:headers="headers"
      :items="stats"
      class="elevation-1"
      hide-actions
    >
    <template slot="items" slot-scope="props">
      <td><b><h3>{{ props.item.name }}</h3></b></td>
      <td class="text-xs-right"><b><h3>{{ props.item.score_total  }}</h3></b></td>
      <td class="text-xs-right">{{ props.item.score_average }}</td>
      <td class="text-xs-right">{{ props.item.score_high }}</td>
      <td class="text-xs-right">{{ props.item.score_low }}</td>
      <td class="text-xs-right">{{ props.item.moves }}</td>
      
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: ['stats'],
  data() {
    return {
      headers: [
        {
          text: 'Player',
          align: 'left',
          value: 'name',
          sortable: false,
        },
        { text: 'Total', value: 'score_total', sortable: false },
        { text: 'Average', value: 'score_average', sortable: false },
        { text: 'High', value: 'score_high', sortable: false },
        { text: 'Low', value: 'score_low', sortable: false },
        { text: 'Moves', value: 'moves', sortable: false },
      ],
    };
  },
};
</script>

