import firebase from 'firebase';
import db from '../../config';

export default ({ state, getters }, scoreValue) => {
  const newScore = db.collection('scores').doc();
  const batch = db.batch();

  const scoresRef = db.collection('scores').doc(newScore.id);
  const gamesRef = db.collection('games').doc(state.currentGame.gameId);

  batch.set(scoresRef, {
    gameId: state.currentGame.gameId,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    scoreId: newScore.id,
    playerId: getters.currentPlayer.playerId,
    playerName: getters.currentPlayer.name,
    score: scoreValue,
  });

  const getCurrentPlayerIndex = () => {
    const len = state.currentGame.players.length;
    if (state.currentGame.currentPlayerIndex < len - 1) {
      //eslint-disable-next-line
      return (state.currentGame.currentPlayerIndex += 1);
      //eslint-disable-next-line
    } else {
      //eslint-disable-next-line
      return (state.currentGame.currentPlayerIndex = 0);
    }
  };

  batch.update(gamesRef, {
    currentPlayerIndex: getCurrentPlayerIndex(),
  });

  return batch.commit();
};
