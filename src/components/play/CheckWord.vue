<template>
  <div>
    <!-- <v-btn @click="dialog = !dialog" flat>Check Word</v-btn> -->
    <v-btn @click="dialog = !dialog" icon><v-icon color='grey'>gavel</v-icon></v-btn>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card class="pa-4">
        <h4>Who is challenging {{$store.getters.currentPlayer.name}}?</h4>
          <v-radio-group v-model="challenger" :mandatory="false" row>
            <template v-for="player in players">
              <v-radio 
                :key="player.playerId"
                :label="player.name" 
                :value="player" 
              ></v-radio>
            </template>
          </v-radio-group>

            <v-text-field @input="wordChecked = false" label="Word in question" v-model.trim="wordInput" @keyup.enter="checkWord" ref="wordInput"/>


      <v-card-actions>
        <v-btn flat @click.stop="closeDialog">Cancel</v-btn>
        <v-btn v-if="challenger.name && wordInput" color="red" flat @click="checkWord">Challenge!</v-btn>
      </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import words from '../../words';

export default {
  props: ['onSubmit'],
  data: () => ({
    dialog: false,
    wordInput: '',
    isWord: false,
    challenger: {},
    playerName: '',
    word: '',
  }),
  computed: {
    players() {
      return this.$store.state.currentGame.players.filter(
        player =>
          player.playerId !== this.$store.getters.currentPlayer.playerId,
      );
    },
  },
  watch: {
    dialog(val) {
      if (val) {
        setTimeout(() => {
          this.$refs.wordInput.focus();
        }, 100);
      }
    },
  },
  methods: {
    checkWord() {
      this.wordChecked = false;
      if (!this.wordInput) return;
      const word = this.wordInput.toLowerCase();
      this.playerName = this.$store.getters.currentPlayer.name;
      if (words.indexOf(this.word) > -1) {
        this.onSubmit({ isWord: true, challenger: this.challenger, word });
        this.isWord = true;
      } else {
        this.onSubmit({ isWord: false, challenger: this.challenger, word });
        this.isWord = false;
      }

      this.wordInput = '';
      this.dialog = false;
    },
    closeDialog() {
      this.wordInput = '';
      this.challenger = {};
      this.dialog = false;
    },
  },
};
</script>
