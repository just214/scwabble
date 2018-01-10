/* eslint-disable */
export default ({ state }, data) => {
  return new Promise(resolve => {
    const allScores = state.scores
      .filter(score => score.gameId === data.gameId)
      .sort((a, b) => b.createdAt - a.createdAt);

    const score_sum = allScores.length
      ? allScores.map(score => score.score).reduce((a, b) => +a + +b)
      : 0;

    let playerScores = [];

    data.players.map(player => {
      playerScores[player.playerId] = {};
      playerScores[player.playerId].allScores = [];
      const scores = allScores.filter(
        playerScore => playerScore.playerId === player.playerId,
      );

      let score_high = '';
      let score_low = '';
      let score_total = '';
      let score_average = '';
      let moves = '';

      if (scores.length) {
        const playerScores = scores;
        score_total = score_total = scores.length
          ? scores.map(obj => obj.score).reduce((a = 0, b = 0) => +a + +b)
          : 0;
        const s = playerScores.map(s => +s.score);

        score_high = Math.round(Math.max(...s));
        score_low = Math.round(Math.min(...s));
        score_average = Math.round(score_total / playerScores.length);
        moves = scores.length;
      } else {
        score_high = 0;
        score_low = 0;
        score_total = 0;
        score_average = 0;
        moves = 0;
      }

      playerScores.push({
        playerId: player.playerId,
        name: player.name,
        scores,
        score_total,
        score_high,
        score_low,
        score_average,
        moves,
      });
    });

    const stats = playerScores.sort((a, b) => b.score_total - a.score_total);

    resolve({ stats, allScores, score_sum });
  });
};
