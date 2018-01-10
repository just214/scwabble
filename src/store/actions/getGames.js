import db from '../../config';

export default ({ commit, dispatch }) => {
  db.collection('games').onSnapshot(query => {
    const games = [];
    query.forEach(doc => {
      dispatch('updateGameStats', doc.data()).then(stats => {
        games.push({ gameId: doc.id, ...doc.data(), ...stats });
      });
    });
    commit('UPDATE_GAMES', games);
  });
};
