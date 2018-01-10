import { Doughnut } from 'vue-chartjs';

export default {
  extends: Doughnut,
  props: { player: Object },
  data() {
    return {};
  },
  computed: {
    datacollection() {
      return {
        labels: [
          `Games Won (${this.player.games_won})`,
          `Games Lost (${this.player.games_played - this.player.games_won})`,
        ],
        datasets: [
          {
            data: [
              +this.player.win_percentage,
              100 - this.player.win_percentage,
            ],
            backgroundColor: ['teal', 'purple'],
          },
        ],
      };
    },
  },
  mounted() {
    this.renderChart(this.datacollection, {
      responsive: true,
      maintainAspectRatio: false,
    });
  },
};
