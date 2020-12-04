<!--
 * @Author: 黄灿民
 * @Date: 2020-11-28 20:42:27
 * @LastEditTime: 2020-12-04 15:16:20
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \00.test\frontEnd\app\src\components\Upload.vue
-->
<template>
  <div>
    <input
      type="file"
      name="file"
      id=""
      ref="input"
      :multiple="multiple"
      @change="handleChange"
    />

    <div class="upload" @click="onClickTrigger">
      <slot></slot>
    </div>
    <ul class="upload-list" >
      <li v-for="(list,index) in uploadFinishList" :key="list.id">
        <span>{{ files[index].name }}</span> - <span>总大小：{{ list.processBar.total }}</span> -
        <span>进度:{{ list.processBar.loaded }}</span>
        <!-- - <span>{{list.filesData[0].imgUrl}}</span>  -->
        <!-- <img :src="list.filesData[0].imgUrl" alt=""> -->
      </li>
    </ul>
  </div>
</template>

<script>
import { upload } from "@/server/index.js";
export default {
  name: "Upload",
  props: {
    multiple: { //是否可以上传多个文件
      type: Boolean,
      default: false,
    },
    action: {  //后端接口
      type: String,
      default: "",
      required: true,
    },
  },
  data() {
    return {
      files: null,//得到需要上传的文件
      uploadFinishList: [], //存储上传完成后，后端返回的数据
      //   [{
      //       filesData:[], //存储后端返回的数据
      //       processBar:{} //存储进度条信息
      //   }]
      processBarIsShow: false,
      start:null,
      timers:null,
    };
  },
  methods: {
    onClickTrigger() {
      this.$refs.input.click();
    },
    async handleChange(e) {
      const files = e.target.files;
      this.files = files;
      this.uploadFinishList = [];
      this.processBarIsShow = true;
      this.start = Date.now();
      files.forEach((file, index) => {  //将需要上传的文件存放在formData
        const form = new FormData();
        form.append(`files`, file);
        this.uploadFinishList.push({ //初始化进度条信息
          processBar: { loaded: 0, total: 0 },
        });
        
        this.sendUpload(form, index);
      });
    },
    async sendUpload(form, index) {
      //上传
      const result = await upload(
        {
          methods: "post",
          url: this.action,
          form,
        },
        this.progress,
        index
      );
      this.timers = Date.now() - this.start;
      console.log("🚀 ~ file: Upload.vue ~ line 94 ~ sendUpload ~ this.timers", this.timers)
      console.log("🚀 ~ file: Upload.vue ~ line 94 ~ sendUpload ~ this.timers", result)

      if (this.uploadFinishList[index]) {
        this.$set(
          this.uploadFinishList[index],
          "filesData",
          JSON.parse(result).files
        );
      } else {
        this.uploadFinishList.push({
          filesData: JSON.parse(result).files,
        });
      }
    },
    progress(index, loaded, total) {
      //添加进度条信息
      this.uploadFinishList[index].processBar.loaded = loaded;
      this.uploadFinishList[index].processBar.total = total;
    },
  },
};
</script>

<style>
input {
  display: none;
}
ul {
  list-style: none;
}
ul > li {
  padding: 0;
}
</style>