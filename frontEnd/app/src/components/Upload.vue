<!--
 * @Author: 黄灿民
 * @Date: 2020-12-02 15:20:40
 * @LastEditTime: 2020-12-04 14:49:14
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \00.test\frontEnd\app\src\components\Upload.vue
-->
<template>
  <div class="upload">
    <input type="file" name="" id="file" ref="input" @change="handleChange" />
    <div @click="handleClick">
      <slot></slot>
    </div>
    <div v-if="!!file">
      <span>上传的文件大小:</span>
      {{ file.size }}
    </div>
    <ul>
      <div>切割成文件块</div>
      <li v-for="(item, index) in fileChunks" :key="index">
        文件块{{ index + 1 }}:{{ item.size }}
      </li>
    </ul>
  </div>
</template>

<script>
// import md5 from "../../../../node_modules/md5";
export default {
  name: "Upload",
  data() {
    return {
      file: null, //保存需要上传的文件
      fileChunks: [], //保存所有的切片
      chunksNameList: [], //保存切片名称，用于切片合并
      start:null,
      times:null,
    };
  },
  methods: {
    handleClick() {
      //用户点击
      this.$refs.input.click();
    },

    handleChange(e) {
      this.start = Date.now();
      //input：file change事件，
      const files = e.target.files;
      this.file = files[0];
      this.fileChunks = this.createFileChunk(files); //文件转变未切片
      this.uploadFile(this.fileChunks); //切片上传
    },

    /**
     * @description: 切片函数
     * @param {file} files
     * @return {Array} 切片数组
     */
    createFileChunk(files) {
      if (!files.length) return;
      const SIZE = 1 * 1024 * 1024; //1M
      const fileChunks = [];
      files.forEach((file) => {
        let curSize = 0;
        let index = 0;
        const fileSize = file.size;
        while (curSize <= fileSize) {
          let end = curSize + SIZE <= fileSize ? curSize + SIZE : fileSize;
          index++;
          fileChunks.push(file.slice(curSize, end));
          curSize += SIZE;
        }
      });
      return fileChunks;
    },

    /**
     * @description: 切片上传
     * @param {Blob} fileChunks
     * @return {*}
     */
    uploadFile(fileChunks) {
      if (!fileChunks.length) return;
      const uploadFileQuene = [];
      this.chunksNameList = [];
      fileChunks.forEach((chunks, index) => {
        const chunksName = this.file.name + "_" + index;
        const form = new FormData();
        form.append(`chunks`, chunks);
        form.append("fileName", this.file.name);
        form.append("chunksNameList", chunksName);
        this.chunksNameList.push(chunksName);
        uploadFileQuene.push(
          this.uploadApi({
            url: "/api/upload", //上传切片
            data: form,
          })
        );
      });
      Promise.all(uploadFileQuene).then((res) => {
        console.log(res);
        this.uploadApi({
          url: "/api/merge", //合并切片
          data: JSON.stringify({
            fileName: this.file.name,
            chunksNameList: this.chunksNameList,
          }),
        }).then(res=>{
          this.times = Date.now()-this.start;
          console.log("🚀 ~ file: Upload.vue ~ line 112 ~ Promise.all ~ this.times", this.times)
          
        });
      });
    },

    /**
     * @description:切片及合并切片请求接口
     * @param {String} url
     * @param {Object} data
     * @return {*}
     */
    uploadApi({ url, data }) {
      return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.onload = function () {
          resolve(JSON.parse(xhr.response));
        };
        xhr.send(data);
      });
    },
  },
};
</script>

<style>
</style>