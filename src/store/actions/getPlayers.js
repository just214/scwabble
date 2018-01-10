import db from '../../config';

export default ({ state, commit }) => {
  db.collection('players').onSnapshot(query => {
    const players = [];
    const playersGames = [];

    state.games
      .map(game => game.players)
      .map(player => playersGames.push(...player));

    query.forEach(doc => {
      // SCORES
      const playerScores = state.scores
        .filter(score => score.playerId === doc.id)
        .map(score => +score.score);

      let score_high = 0;
      let score_low = 0;
      let score_total = 0;
      let score_average = 0;
      let score_count = 0;

      if (playerScores.length) {
        score_high = Math.round(Math.max(...playerScores));
        score_low = Math.round(Math.min(...playerScores));
        score_total = Math.round(playerScores.reduce((a, b) => +a + +b));
        score_average = Math.round(score_total / playerScores.length);
        score_count = playerScores.length;
      }

      const games_played = playersGames.filter(
        ({ playerId }) => playerId === doc.id,
      ).length;
      const games_won = state.games.filter(
        game => (game.winner ? game.winner.playerId === doc.id : ''),
      ).length;

      // eslint-disable-next-line
      const win_percentage = games_played ? games_won / games_played * 100 : 0;

      players.push({
        playerId: doc.id,
        ...doc.data(),
        games_played,
        games_won,
        score_high,
        score_low,
        score_total,
        score_count,
        score_average,
        win_percentage,
      });
    });

    commit('UPDATE_PLAYERS', players);
  });
};
