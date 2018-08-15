<template>
  <div id="app">

  <el-container>

    <el-header class="text-center">
      <h1 class="app-title mt-0">coin index</h1>
    </el-header>

    <el-main>
      <CoinList :pagination="true" />
    </el-main>

  </el-container>

  </div>
</template>

<script>
import CoinList from "./components/CoinList";

export default {
  name: "App",
  components: {
    CoinList
  },
};
</script>

<style>
#app {
  font-family: "Nunito", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.app-title {
  font-size: 1.5rem !important;
}
.app-logo {
  font-size: 4rem;
  font-weight: 800;
}

.el-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3000;
  background: #409eff;
  color: white;
  padding: 1rem 24px;
}

.el-main {
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding-top: 60px;
}

ul, ol {
  list-style: none;
  padding: 0;
}

h1, h2, h3, h4, h5, h6, p {
  margin-top: 1.5rem;
  margin-bottom: 0;
}

.mt-0 {
  margin-top: 0;
}

.flex {
  display: flex;
}
.align-center {
  align-items: center;
}
.justify-space-between {
  justify-content: space-between;
}
.justify-center {
  justify-content: center;
}
.justify-end {
  margin-left: auto;  
}

.faded {
  opacity: 0.5;
}
.text-center {
  text-align:center;
}

</style>
