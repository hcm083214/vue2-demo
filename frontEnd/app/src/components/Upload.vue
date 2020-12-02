<!--
 * @Author: 黄灿民
 * @Date: 2020-12-02 15:20:40
 * @LastEditTime: 2020-12-02 20:32:54
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \00.test\frontEnd\app\src\components\Upload.vue
-->
<template>
  <div class="upload">
    <input
      type="file"
      name=""
      id="file"
      ref="input"
      @change="handleChange"
      multiple
    />
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
import md5 from "../../../../node_modules/md5";
export default {
  name: "Upload",
  data() {
    return {
      file: null,
      fileChunks: [],
    };
  },
  methods: {
    handleClick() {
      this.$refs.input.click();
    },

    handleChange(e) {
      const files = e.target.files;
      this.file = files[0];
      this.fileChunks = this.createFileChunk(files);
      this.uploadFile(this.fileChunks);
    },

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

    uploadFile(fileChunks) {
      if (!fileChunks.length) return;
      const uploadFileQuene = [];
      fileChunks.forEach((chunks, index) => {
        const form = new FormData();
        form.append(`chunks`, chunks);
        form.append("fileName", this.file.name.split(".")[0]);
        form.append("chunksNameIndex", this.file.name + "_" + index);
        console.log(md5(chunks));
        uploadFileQuene.push(
          this.uploadApi({
            url: "/api/upload",
            data: form,
          })
        );
      });
      Promise.all(uploadFileQuene).then((res) => {
        console.log(res);
      });
    },

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