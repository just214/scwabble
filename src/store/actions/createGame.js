import firebase from 'firebase';
import db from '../../config';

export default (context, gameDetails) =>
  new Promise((resolve, reject) => {
    const newGame = db.collection('games').doc();
    return newGame
      .set({
        gameId: newGame.id,
        gameOver: false,
        currentPlayerIndex: 0,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        timer: {
          minutes: gameDetails.minutes,
          seconds: gameDetails.seconds,
        },

        players: gameDetails.players.map(p => ({
          name: p.name,
          playerId: p.playerId,
        })),
      })
      .then(() => resolve(newGame.id))
      .catch(err => reject(err));
  });
