import firebase from 'firebase';
import db from '../../config';

export default ({ dispatch, state, commit }, newScore) => {
  const batch = db.batch();
  const docRef = db.collection('scores').doc(newScore.scoreId);

  const gameRef = db.collection('games').doc(newScore.gameId);

  batch.update(docRef, { score: +newScore.score });
  batch.update(gameRef, {
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  });

  return batch.commit();
};
