export default ({ state, commit }, gameId) => {
  const currentGame = state.games.filter(game => game.gameId === gameId)[0];
  commit('UPDATE_CURRENT_GAME', currentGame);
};
