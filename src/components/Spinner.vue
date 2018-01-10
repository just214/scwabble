<template>
<div class="spinner">
  <v-progress-circular v-if="show" indeterminate color="primary"></v-progress-circular>
</div>
</template>

<script>
export default {
  props: ['show'],
};
</script>

<style scoped>
.spinner {
  position: relative;
  top: 50%;
  left: 50%;
}
</style>
