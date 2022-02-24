<template>
  <div id="app">
    <NavigationBar/>
    <MainPage/>
  </div>
</template>

<script>
import MainPage from '@/components/MainPage';
import NavigationBar from '@/components/NavigationBar';
export default {
  name: 'App',
  components: {
    MainPage,
    NavigationBar
  }
}
</script>

<style>
#app {
  height: 100vh;
}
</style>
