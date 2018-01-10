import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Players from '@/components/players/Players';
import Games from '@/components/games/Games';
import NewGame from '@/components/play/NewGame';
import CurrentGame from '@/components/play/CurrentGame';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },

    {
      path: '/new-game',
      name: 'NewGame',
      component: NewGame,
    },
    {
      path: '/players',
      name: 'Players',
      component: Players,
    },
    {
      path: '/games',
      name: 'Games',
      component: Games,
    },
    {
      path: '/play/:gameId',
      name: 'CurrentGame',
      component: CurrentGame,
    },
  ],
});
