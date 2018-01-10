import db from '../../config';

export default ({ state, commit }, gameId) => {
  const batch = db.batch();

  batch.delete(db.collection('games').doc(gameId));

  state.games
    .filter(game => game.gameId === gameId)[0]
    .allScores.map(score =>
      batch.delete(db.collection('scores').doc(score.scoreId)),
    );
  return batch.commit();
};
