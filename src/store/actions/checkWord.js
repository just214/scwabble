import axios from 'axios';

export default ({ commit }, word) => {
  const url = 'http://www.wordgamedictionary.com/api/v1/references/scrabble/';
  const API_KEY = '7.421396114679624e29';
  const fullPath = `${url}${word}?key=${API_KEY}`;
  const config = {
    method: 'get',
    'Access-Control-Allow-Origin': '*',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  };
  axios
    .get(fullPath, config)
    .then(response => {
      commit('CHECK_WORD', {
        word,
        isWord: response.data.includes('<scrabble>1</scrabble>'),
      });
    })
    .catch(err => err);
};
