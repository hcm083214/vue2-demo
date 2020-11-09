<!--
 * @Author: 黄灿民
 * @Date: 2020-11-08 10:12:28
 * @LastEditTime: 2020-11-09 21:01:40
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
      refreshLoginStatus: "normal", //组件当前状态：正常浏览模式normal，下拉刷新模式refresh，上拉加载模式loading
      isShow: {
        //加载动画控制开关
        isRefresh: false,
        isLoading: false,
      },
      startPos: {
        //手指初始按压位置
        pageY: 0,
      },
      dis: {
        //手移动距离
        pageY: 0,
      },
    };
  },
  methods: {
    debounce(fn) {
      let timer = null;
      timer && clearTimeout(timer);
      return function () {
        timer = setTimeout(fn, 300);
      };
    },
    touchstartHandle(e) {
      //记录起始位置 和 组件距离window顶部的高度
      this.startPos.pageY = e.touches[0].pageY;
      //内容页在可视窗口最顶端或者在指定的位置（父级元素的顶部）
      if (window.scrollY <= 0) {
        this.refreshLoginStatus = "refresh";
      } else {
        this.refreshLoginStatus = "loading";
      }
    },
    touchmoveHandle(e) {
      let dis = e.touches[0].pageY - this.startPos.pageY;
      this.dis.pageY = dis;
      /* //触发下拉刷新 */
      this.refreshLoginStatus === "refresh" && this.refreshMove(dis);
      /* //触发上拉加载 */
      if (this.isShow.isLoading) return;
      this.refreshLoginStatus === "loading" && this.loadingMove(dis);
    },
    loadingMove(dis) {
      // 计算内容页底部距离可视窗口顶部的距离
      let disToTop = this.$refs.refreshLogin.getBoundingClientRect().bottom;
      //计算可视窗口的高度
      let clientHeight = document.documentElement.clientHeight;
      if (disToTop <= clientHeight) {
        if (this.refreshLoginStatus === "loading" && this.dis.pageY < 0) {
          this.isShow.isLoading = true;
        }
      }
    },
    refreshMove(dis) {
      if (this.isShow.isRefresh) return;
      if (this.refreshLoginStatus === "refresh" && this.dis.pageY > 0) {
        //下拉刷新成立条件
        this.isShow.isRefresh = true;
        //下拉到一定距离后，内容页不随touchmove移动
        this.$refs.refreshLogin.style.transform = `translateY(${
          dis < 100 ? dis : 100
        }px)`;
      }
    },

    async touchendHandle(e) {
      this.refreshLoginStatus === "refresh" && this.refreshToucnend();
      this.refreshLoginStatus === "loading" && this.loadingTouchend();
    },
    async refreshToucnend() {
      //加上限定条件，防止不在刷新状态，后面的代码执行
      if (!this.isShow.isRefresh) return;
      //必须下拉一定距离，才进行异步加载数据
      this.dis.pageY > 10 && (await this.$emit("refreshEmit"));
      //松手后加载动画消失，并且内容页回到原位置
      this.isShow.isRefresh = false;
      this.$refs.refreshLogin.style.transform = `translateY(0px)`;
      this.refreshLoginStatus = "normal";
    },
    async loadingTouchend() {
      //加上限定条件，防止不在刷新状态，后面的代码执行
      if (!this.isShow.isLoading) return;
      await this.$emit("loadingEmit");
      this.isShow.isLoading = false;
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