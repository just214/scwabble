import db from '../../config';

export default ({ commit, state, dispatch }) => {
  db.collection('scores').onSnapshot(query => {
    const scores = [];
    query.forEach(doc => {
      scores.push({ scoreId: doc.id, ...doc.data() });
    });
    const games = [];
    state.games.map(game =>
      dispatch('updateGameStats', game).then(stats =>
        games.push({ ...game, ...stats }),
      ),
    );
    commit('UPDATE_GAMES', games);
    commit('UPDATE_SCORES', scores);
  });
};
