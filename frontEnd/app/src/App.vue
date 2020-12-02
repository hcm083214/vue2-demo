<!--
 * @Author: 黄灿民
 * @Date: 2020-11-28 14:43:03
 * @LastEditTime: 2020-12-03 00:00:58
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \00.test\frontEnd\app\src\App.vue
-->
<template>
  <div id="app">
    <!-- <input type="file" ref="file" /> -->
    <!-- <button class="btn" @click="uploadImg">提交</button> -->
    <div><img src="./img/1606785635450_dog.da76812b.jpg" alt=""></div>
    <upload :multiple="true" action="/api/upload">
      <button class="btn">上传</button>
    </upload>
  </div>
</template>

<script>
import { uploadAxios } from "@/server/index.js";
import Upload from "@/components/Upload.vue";
export default {
  name: "App",
  components: { Upload },
  data() {
    return {
      img: null,
      imgUrl: "",
    };
  },
  methods: {
    async uploadImg() {
      const file = this.$refs.file.files[0];
      const form = new FormData();
      form.append("file", file);
      const result = await uploadAxios(form);
      this.img = result.data;
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
