import db from '../../config';

export default ({ state, commit }, playerId) =>
  db
    .collection('players')
    .doc(playerId)
    .delete();
