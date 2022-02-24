<template>
  <div class="event-page">
    <h2>Lesson1:Event</h2>
    <h3><span class="badge badge-secondary">Vue.js</span></h3>
    <span>クリックされた回数は{{count}}回です </span><br><br>
    <button id="button" class="btn btn-sm btn-info" @click="onClickButton()">Click Me</button><br><br>
    <button class="btn btn-sm btn-info" @click="onClickReset()">RESET</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      count: 0
    };
  },
  methods: {
    onClickButton () {
      this.count++;
    },
    onClickReset () {
      this.count = 0;
    }
  }
}
</script>

<style scoped>
.event-page {
  padding: 20px;
}
</style>
