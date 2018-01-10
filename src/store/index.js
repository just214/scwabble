import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    games: [],
    players: [],
    scores: [],
    currentGame: {},
    checkWord: {},
  },
  getters: {
    currentPlayer: state => {
      if (state.currentGame) {
        return state.currentGame.players[state.currentGame.currentPlayerIndex];
      }
      return {};
    },
    currentStats: state => {
      if (state.currentGame) {
        return state.currentGame.stats.sort(
          (a, b) => b.score_total - a.score_total,
        );
      }
      return {};
    },
  },

  mutations: {
    UPDATE_GAMES: (state, payload) => {
      state.games = payload;
    },
    UPDATE_GAME_STATS: (state, game) => {
      state.games = Object.assign({}, ...state.games, game);
    },
    UPDATE_PLAYERS: (state, payload) => {
      state.players = payload;
    },
    UPDATE_SCORES: (state, payload) => {
      state.scores = payload;
    },
    UPDATE_CURRENT_GAME: (state, payload) => {
      state.currentGame = payload;
    },
    CHECK_WORD: (state, payload) => {
      state.checkWord = payload;
    },
  },
  actions,
});
