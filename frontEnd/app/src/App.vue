<!--
 * @Author: 黄灿民
 * @Date: 2020-11-28 14:43:03
 * @LastEditTime: 2020-11-28 15:42:25
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \00.test\frontEnd\app\src\App.vue
-->
<template>
  <div id="app">
    <input type="file" ref="file" />
    <button class="btn" @click="uploadImg">提交</button>
    <div v-if="imgPath"><img :src="imgPath" alt="" ></div>
  </div>
</template>

<script>
import { upload } from "@/server/index.js";
export default {
  name: "App",
  components: {},
  data() {
    return {
      imgPath: null,
    }
  },
  methods: {
    async uploadImg() {
      const file = this.$refs.file.files[0];
      const form = new FormData();
      form.append("file", file);
      const result = await upload(form);
      console.log("🚀 ~ file: App.vue ~ line 33 ~ uploadImg ~ result", result)
      this.imgPath = result.data.imgPath
    },
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
</style>
