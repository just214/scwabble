<template>
  <div class="display-2">
    <v-btn v-if="started" icon @click="toggleTimer"><v-icon large color="grey">pause</v-icon></v-btn>
    <v-btn v-else icon @click="toggleTimer"><v-icon large color="grey">play_arrow</v-icon></v-btn>
    <span>{{minutes}}:{{secondsShown}}</span>
    <v-btn icon @click="resetTimer"><v-icon color="grey">replay</v-icon></v-btn>
  </div>
</template>

<script>
export default {
  props: {
    min: String,
    sec: String,
  },
  mounted() {
    this.interval = setInterval(this.intervalCallback, 1000);
    this.minutes = +this.min || 0;
    this.seconds = +this.sec || 0;
  },
  data: () => ({
    minutes: '',
    seconds: '',
    interval: null,
    started: false,
  }),
  methods: {
    toggleTimer() {
      if (this.started) {
        this.started = false;
      } else {
        if (!this.minutes && !this.seconds) this.resetTimer();
        this.started = true;
      }
    },
    resetTimer() {
      this.minutes = +this.min || 0;
      this.seconds = +this.sec || 0;
      clearInterval(this.interval);
      this.started = false;
      this.interval = setInterval(this.intervalCallback, 1000);
    },
    intervalCallback() {
      if (!this.started) return false;

      if (this.totalSeconds < 30 && this.totalSeconds > 1) {
        const audio = new Audio('../static/sounds/tick.mp3');
        audio.play();
      }
      if (this.seconds === 0) {
        if (this.minutes === 0) {
          this.timerComplete();
          return null;
        }
        this.seconds = 59;
        this.minutes -= 1;
      } else {
        this.seconds -= 1;
      }
      return this;
    },

    timerComplete() {
      this.started = false;
      const audio = new Audio('../static/sounds/womp.mp3');
      audio.play();
      if ('vibrate' in navigator) {
        // enable vibration support
        navigator.vibrate =
          navigator.vibrate ||
          navigator.webkitVibrate ||
          navigator.mozVibrate ||
          navigator.msVibrate;

        if (navigator.vibrate) {
          navigator.vibrate(1000);
        }
      }
    },
  },
  computed: {
    secondsShown() {
      if (this.seconds < 10) {
        return `0${parseInt(this.seconds, 10)}`;
      }
      return this.seconds;
    },
    totalSeconds() {
      const minutesToSeconds = this.minutes * 60;
      return minutesToSeconds + this.seconds;
    },
  },
};
</script>

