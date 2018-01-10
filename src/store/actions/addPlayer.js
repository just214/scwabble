import db from '../../config';

export default ({ dispatch, state, commit }, playerName) =>
  db.collection('players').add({ name: playerName });
