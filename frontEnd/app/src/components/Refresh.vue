<!--
 * @Author: 黄灿民
 * @Date: 2020-11-08 10:12:28
 * @LastEditTime: 2020-11-09 14:02:43
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \00.test\frontEnd\app\src\components\Refresh.vue
-->
<template>
  <div
    class="wrapper"
    @touchstart="touchstartHandle"
    @touchmove="touchmoveHandle"
    @touchend="touchendHandle"
  >
    <div class="refresh-login" ref="refreshLogin">
      <div
        class="circle-rotate refresh"
        ref="refresh"
        v-show="isShow.isRefresh"
      ></div>
      <slot></slot>
      <div class="circle-rotate loading" v-show="isShow.isLoading"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Refresh",
  data() {
    return {
      refreshLoginStatus: "normal",
      isShow: {
        isRefresh: false,
        isLoading: false,
      },
      startPos: {
        pageY: 0,
      },
    };
  },
  methods: {
    touchstartHandle(e) {
      //记录起始位置 和 组件距离window顶部的高度
      this.startPos.pageY = e.touches[0].pageY;
      //内容页在可视窗口最顶端或者在指定的位置（父级元素的顶部）
      if (window.scrollY <= 0) {
        this.refreshLoginStatus = "refresh";
      }
    },
    touchmoveHandle(e) {
      if (this.isShow.isRefresh) return;
      let dis = e.touches[0].pageY - this.startPos.pageY;
      if (this.refreshLoginStatus === "refresh" && dis > 0) {
        //下拉刷新成立条件
        this.isShow.isRefresh = true;
        //下拉到一定距离后，内容页不随touchmove移动
        this.$refs.refreshLogin.style.transform = `translateY(${
          dis < 100 ? dis : 100
        }px)`;
      }
    },
    async touchendHandle(e) {
      if (!this.isShow.isRefresh) return;
      //异步加载数据
      await this.$emit("refreshEmit");
      //松手后加载动画消失，并且内容页回到原位置
      this.isShow.isRefresh = false;
      this.$refs.refreshLogin.style.transform = `translateY(0px)`;
      this.refreshLoginStatus = "normal";
    },
  },
};
</script>

<style>
.wrapper {
  background-color: #fff;
  overflow: hidden;
}
/* .refresh{
    top:-20px;
    transition: all 0.3s linear;
} */
.circle-rotate {
  position: relative;
  left: 50%;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 10px solid #ccc;
  border-right-color: transparent;
  animation: loadingAnimation 0.75s infinite;
}
@keyframes loadingAnimation {
  0% {
    transform: translateX(-50%) rotate(0deg);
  }
  100% {
    transform: translateX(-50%) rotate(360deg);
  }
}
.refresh-login {
  transition: all 0.75s linear;
}
</style>