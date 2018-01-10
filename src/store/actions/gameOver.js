import db from '../../config';

export default ({ state }) =>
  db
    .collection('games')
    .doc(state.currentGame.gameId)
    .update({
      gameOver: true,
      winner: {
        name: state.currentGame.stats[0].name,
        playerId: state.currentGame.stats[0].playerId,
      },
    });
