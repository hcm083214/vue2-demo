<!--
 * @Author: 黄灿民
 * @Date: 2020-12-01 14:41:13
 * @LastEditTime: 2020-12-02 15:26:54
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \00.test\frontEnd\app\src\App.vue
-->
<template>
  <div id="app">
    <upload>
      <button class="btn" >点击上传</button>
    </upload>
  </div>
</template>

<script>
import Upload from "@/components/Upload";
export default {
  name: "App",
  components: {
    Upload,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
input {
  display: none;
}
</style>
