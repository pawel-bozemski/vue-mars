<template>
  <div id="app">
    <div class="container-fluid">
      <Header />
      <Main />
    </div>
  </div>
</template>

<script>

const Main = () => import("./components/Main.vue");
const Header = () => import("./components/Header.vue");


export default {
  name: 'App',
  components: {
    Header,
    Main

  }
}
</script>

<style>
 @import "./styles/style.scss";
</style>
