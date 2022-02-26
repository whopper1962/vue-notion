<template>
  <div class="event-page">
    <h2>CONTENT3</h2>
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
