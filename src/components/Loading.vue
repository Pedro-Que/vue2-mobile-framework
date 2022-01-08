<template>
  <van-overlay
    :show="show"
    z-index="9999"
    :custom-style="{ background: 'none' }"
  >
    <div id="loading" :style="{ backgroundColor }">
      <van-loading
        :color="color"
        type="spinner"
        size="1.2rem"
        text-size="0.56rem"
        :text-color="color"
        vertical
        >{{ $t("components.加载中") }}...</van-loading
      >
    </div>
  </van-overlay>
</template>

<script>
export default {
  props: {
    // 是否显示loading
    show: {
      type: Boolean,
      default: false,
    },
    // loading框的颜色
    color: {
      type: String,
      default: "white",
    },
    // loading框的背景颜色
    backgroundColor: {
      type: String,
      default: "rgba(0, 0, 0, 0.7)",
    },
  },
};
</script>

<style lang='less' scoped>
#loading {
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 0.64rem;
  width: 3.52rem;
  max-width: 70%;
  min-height: 3.52rem;
  border-radius: 0.32rem;
  transform: translate3d(-50%, -50%, 0);
  box-sizing: content-box;
  .flex(center, center);
  flex-direction: column;
}
</style>
