<template>
  <n-loading-bar-provider>
    <n-message-provider>
      <router-view />
    </n-message-provider>
  </n-loading-bar-provider>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;400;700;900&display=swap");

#app {
  font-family: "Noto Sans TC", sans-serif, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
