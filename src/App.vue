<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}

html {
  height: 100%;
}

body {
  height: 100%;
  background: rgba(244, 244, 244, 1);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}

.adapterMixin();
.createFontSize();
.createLineHeight();
.createPaddingTop();
.createPaddingBottom();
.createPaddingLeft();
// .createPaddingRight();
.createPaddingX();
.createPaddingY();
.createPadding();
</style>
